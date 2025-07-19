/**
 * Firebase 認證服務
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 整合 ng-alain @delon/auth 與 Firebase Authentication
 */

import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  UserCredential,
  sendEmailVerification,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role?: string;
  permissions?: string[];
  createdAt?: any;
  updatedAt?: any;
  lastLoginAt?: any;
  loginMethod?: 'email' | 'google' | 'anonymous';
  isActive?: boolean;
  // 擴展用戶設定欄位
  profile?: string;
  country?: string;
  address?: string;
  phone?: string;
  geographic?: {
    province: {
      key: string;
    };
    city: {
      key: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly http = inject(_HttpClient);

  /**
   * 使用 Email/Password 登入
   *
   * 功能：
   * - 使用 Firebase Email/Password 認證
   * - 透過 @delon/auth 標準流程設定 token
   * - 儲存用戶資料到 Firestore
   * - 返回完整的用戶資訊
   */
  loginWithEmail(email: string, password: string): Observable<FirebaseUser> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential: UserCredential) => {
        console.log('Email 登入成功:', credential.user);
        return this.saveOrUpdateUser(credential.user, 'email');
      }),
      switchMap((firebaseUser: FirebaseUser) => {
        // 透過 @delon/auth 標準流程設定 token
        return this.setDelonAuthToken(firebaseUser);
      }),
      catchError(error => {
        console.error('Email 登入失敗:', error);
        throw error;
      })
    );
  }

  /**
   * 使用 Email/Password 註冊
   */
  registerWithEmail(email: string, password: string): Observable<FirebaseUser> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential: UserCredential) => {
        // 發送郵箱驗證
        return from(sendEmailVerification(credential.user)).pipe(switchMap(() => this.saveOrUpdateUser(credential.user, 'email')));
      })
    );
  }

  /**
   * 發送密碼重置郵箱
   */
  sendPasswordReset(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  /**
   * 使用 Google 登入
   *
   * 功能：
   * - 使用 Firebase Google 認證
   * - 透過 @delon/auth 標準流程設定 token
   * - 儲存用戶資料到 Firestore
   * - 返回完整的用戶資訊
   */
  loginWithGoogle(): Observable<FirebaseUser> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((credential: UserCredential) => {
        console.log('Google 登入成功:', credential.user);
        return this.saveOrUpdateUser(credential.user, 'google');
      }),
      switchMap((firebaseUser: FirebaseUser) => {
        // 透過 @delon/auth 標準流程設定 token
        return this.setDelonAuthToken(firebaseUser);
      }),
      catchError(error => {
        console.error('Google 登入失敗:', error);
        throw error;
      })
    );
  }

  /**
   * 匿名登入
   *
   * 功能：
   * - 使用 Firebase 匿名認證
   * - 透過 @delon/auth 標準流程設定 token
   * - 儲存用戶資料到 Firestore
   * - 返回完整的用戶資訊
   */
  loginAnonymously(): Observable<FirebaseUser> {
    return from(signInAnonymously(this.auth)).pipe(
      switchMap((credential: UserCredential) => {
        console.log('匿名登入成功:', credential.user);
        return this.saveOrUpdateUser(credential.user, 'anonymous');
      }),
      switchMap((firebaseUser: FirebaseUser) => {
        // 透過 @delon/auth 標準流程設定 token
        return this.setDelonAuthToken(firebaseUser);
      }),
      catchError(error => {
        console.error('匿名登入失敗:', error);
        throw error;
      })
    );
  }

  /**
   * 登出
   */
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.tokenService.clear();
      })
    );
  }

  /**
   * 獲取當前用戶
   */
  getCurrentUser(): Observable<FirebaseUser | null> {
    return new Observable(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, async (user: User | null) => {
        if (user) {
          const userWithPermissions = await this.getUserWithPermissions(user).toPromise();
          observer.next(userWithPermissions || null);
        } else {
          observer.next(null);
        }
      });
      return () => unsubscribe();
    });
  }

  /**
   * 更新用戶資料
   */
  updateUserProfile(updates: Partial<FirebaseUser>): Observable<void> {
    const user = this.auth.currentUser;
    if (!user) {
      return of(void 0);
    }

    const userRef = doc(this.firestore, 'users', user.uid);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };

    return from(updateDoc(userRef, updateData));
  }

  /**
   * 獲取用戶資料
   */
  getUserProfile(uid: string): Observable<FirebaseUser | null> {
    const userRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userRef)).pipe(
      map(userDoc => {
        if (userDoc.exists()) {
          const userData = userDoc.data() as any;
          return {
            uid: userData['uid'],
            email: userData['email'],
            displayName: userData['displayName'],
            photoURL: userData['photoURL'],
            emailVerified: userData['emailVerified'],
            role: userData['role'],
            permissions: userData['permissions'],
            createdAt: userData['createdAt'],
            updatedAt: userData['updatedAt'],
            lastLoginAt: userData['lastLoginAt'],
            loginMethod: userData['loginMethod'],
            isActive: userData['isActive']
          } as FirebaseUser;
        }
        return null;
      })
    );
  }

  /**
   * 搜尋用戶 (簡化版本)
   */
  searchUsers(query: string): Observable<FirebaseUser[]> {
    // 暫時返回空陣列，避免複雜的查詢問題
    return of([]);
  }

  /**
   * 儲存或更新用戶資料到 Firestore
   */
  private saveOrUpdateUser(user: User, loginMethod: 'email' | 'google' | 'anonymous'): Observable<FirebaseUser> {
    const userRef = doc(this.firestore, 'users', user.uid);

    return from(getDoc(userRef)).pipe(
      switchMap(userDoc => {
        const now = serverTimestamp();

        if (userDoc.exists()) {
          // 用戶已存在，更新登入時間和最後登入方法
          const updateData = {
            lastLoginAt: now,
            updatedAt: now,
            loginMethod: loginMethod,
            displayName: user.displayName || userDoc.data()?.['displayName'],
            photoURL: user.photoURL || userDoc.data()?.['photoURL'],
            emailVerified: user.emailVerified
          };

          return from(updateDoc(userRef, updateData)).pipe(switchMap(() => this.getUserWithPermissions(user)));
        } else {
          // 新用戶，建立完整檔案
          const newUserData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            role: 'user',
            permissions: ['dashboard'],
            createdAt: now,
            updatedAt: now,
            lastLoginAt: now,
            loginMethod: loginMethod,
            isActive: true,
            // 預設用戶設定欄位
            profile: '',
            country: 'China',
            address: '',
            phone: '',
            geographic: {
              province: { key: '' },
              city: { key: '' }
            }
          };

          return from(setDoc(userRef, newUserData)).pipe(switchMap(() => this.getUserWithPermissions(user)));
        }
      }),
      catchError(error => {
        console.error('儲存用戶資料失敗:', error);
        // 即使儲存失敗，也要設定 token
        return this.getUserWithPermissions(user);
      })
    );
  }

  /**
   * 透過 @delon/auth 標準流程設定 token
   *
   * 功能：
   * - 模擬 @delon/auth 的標準登入流程
   * - 使用 HTTP 請求設定 token
   * - 確保與現有 Mock 系統相容
   * - 返回用戶資訊
   */
  private setDelonAuthToken(firebaseUser: FirebaseUser): Observable<FirebaseUser> {
    // 模擬 @delon/auth 的標準登入流程
    const loginData = {
      type: 0,
      userName: firebaseUser.email || firebaseUser.uid,
      password: 'firebase-auth' // 虛擬密碼，實際不驗證
    };

    return this.http.post('/login/account', loginData).pipe(
      map((response: any) => {
        if (response.msg === 'ok') {
          // 使用 Firebase 用戶資訊覆蓋 Mock 回應
          const tokenData = {
            ...response.user,
            token: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email || 'Anonymous',
            email: firebaseUser.email || '',
            id: firebaseUser.uid,
            time: +new Date(),
            role: firebaseUser.role || 'user',
            permissions: firebaseUser.permissions || ['dashboard']
          };

          console.log('透過 @delon/auth 設定 token:', tokenData);
          this.tokenService.set(tokenData);
        }
        return firebaseUser;
      }),
      catchError(error => {
        console.error('設定 @delon/auth token 失敗:', error);
        // 即使失敗也要設定基本 token
        const tokenData = {
          token: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email || 'Anonymous',
          email: firebaseUser.email || '',
          id: firebaseUser.uid,
          time: +new Date(),
          role: firebaseUser.role || 'user',
          permissions: firebaseUser.permissions || ['dashboard']
        };
        this.tokenService.set(tokenData);
        return of(firebaseUser);
      })
    );
  }

  /**
   * 獲取用戶權限資訊並設定 ng-alain token
   *
   * 功能：
   * - 從 Firestore 獲取用戶完整資料
   * - 設定 ng-alain token 服務
   * - 處理用戶資料不存在的情況
   * - 提供錯誤處理和預設值
   *
   * Token 設定：
   * - token: 使用 Firebase UID 作為 token
   * - name: 用戶顯示名稱或郵箱
   * - email: 用戶郵箱地址
   * - id: Firebase UID
   * - time: 當前時間戳
   * - role: 用戶角色
   * - permissions: 用戶權限列表
   */
  private getUserWithPermissions(user: User): Observable<FirebaseUser> {
    const userRef = doc(this.firestore, 'users', user.uid);

    return from(getDoc(userRef)).pipe(
      map(userDoc => {
        if (userDoc.exists()) {
          const userData = userDoc.data() as any;
          const firebaseUser: FirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            role: userData['role'] || 'user',
            permissions: userData['permissions'] || ['dashboard'],
            createdAt: userData['createdAt'],
            updatedAt: userData['updatedAt'],
            lastLoginAt: userData['lastLoginAt'],
            loginMethod: userData['loginMethod'],
            isActive: userData['isActive']
          };

          // 注意：token 設定已移至 setDelonAuthToken 方法
          // 這裡只返回用戶資訊，不設定 token

          return firebaseUser;
        } else {
          // 如果 Firestore 中沒有用戶資料，使用預設值
          const firebaseUser: FirebaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            role: 'user',
            permissions: ['dashboard']
          };

          // 注意：token 設定已移至 setDelonAuthToken 方法
          // 這裡只返回用戶資訊，不設定 token

          return firebaseUser;
        }
      }),
      catchError(error => {
        console.error('獲取用戶資料失敗:', error);
        // 發生錯誤時使用預設值
        const firebaseUser: FirebaseUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role: 'user',
          permissions: ['dashboard']
        };

        // 注意：token 設定已移至 setDelonAuthToken 方法
        // 這裡只返回用戶資訊，不設定 token

        return of(firebaseUser);
      })
    );
  }
}
