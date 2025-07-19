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
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  UserCredential
} from '@angular/fire/auth';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role?: string;
  permissions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private readonly auth = inject(Auth);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly http = inject(_HttpClient);

  /**
   * 使用 Email/Password 登入
   */
  loginWithEmail(email: string, password: string): Observable<FirebaseUser> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential: UserCredential) => this.getUserWithPermissions(credential.user))
    );
  }

  /**
   * 使用 Google 登入
   */
  loginWithGoogle(): Observable<FirebaseUser> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((credential: UserCredential) => this.getUserWithPermissions(credential.user))
    );
  }

  /**
   * 匿名登入
   */
  loginAnonymously(): Observable<FirebaseUser> {
    return from(signInAnonymously(this.auth)).pipe(switchMap((credential: UserCredential) => this.getUserWithPermissions(credential.user)));
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
   * 獲取用戶權限資訊
   */
  private getUserWithPermissions(user: User): Observable<FirebaseUser> {
    const firebaseUser: FirebaseUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    // 從 Firestore 獲取用戶權限（這裡可以擴展為從 Firestore 讀取）
    return this.http.get(`/user/${user.uid}/permissions`).pipe(
      map((permissions: any) => ({
        ...firebaseUser,
        role: permissions.role || 'user',
        permissions: permissions.permissions || []
      })),
      switchMap((userWithPermissions: FirebaseUser) => {
        // 設定 ng-alain token
        this.tokenService.set({
          token: user.uid,
          name: user.displayName || user.email || '',
          email: user.email || '',
          id: user.uid,
          time: +new Date(),
          role: userWithPermissions.role,
          permissions: userWithPermissions.permissions
        });
        return of(userWithPermissions);
      })
    );
  }
}
