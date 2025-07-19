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
   */
  loginWithEmail(email: string, password: string): Observable<FirebaseUser> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential: UserCredential) => this.saveOrUpdateUser(credential.user, 'email'))
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
   */
  loginWithGoogle(): Observable<FirebaseUser> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((credential: UserCredential) => this.saveOrUpdateUser(credential.user, 'google'))
    );
  }

  /**
   * 匿名登入
   */
  loginAnonymously(): Observable<FirebaseUser> {
    return from(signInAnonymously(this.auth)).pipe(
      switchMap((credential: UserCredential) => this.saveOrUpdateUser(credential.user, 'anonymous'))
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
   * 獲取用戶權限資訊
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

          // 設定 ng-alain token
          this.tokenService.set({
            token: user.uid,
            name: user.displayName || user.email || '',
            email: user.email || '',
            id: user.uid,
            time: +new Date(),
            role: firebaseUser.role,
            permissions: firebaseUser.permissions
          });

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

          // 設定 ng-alain token
          this.tokenService.set({
            token: user.uid,
            name: user.displayName || user.email || '',
            email: user.email || '',
            id: user.uid,
            time: +new Date(),
            role: firebaseUser.role,
            permissions: firebaseUser.permissions
          });

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

        this.tokenService.set({
          token: user.uid,
          name: user.displayName || user.email || '',
          email: user.email || '',
          id: user.uid,
          time: +new Date(),
          role: firebaseUser.role,
          permissions: firebaseUser.permissions
        });

        return of(firebaseUser);
      })
    );
  }
}
