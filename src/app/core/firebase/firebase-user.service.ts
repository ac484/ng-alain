/**
 * Firebase 用戶資料服務
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Firestore
 * 專門處理用戶資料的 Firestore 操作
 */

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: string;
  permissions: string[];
  createdAt?: any;
  updatedAt?: any;
  lastLoginAt?: any;
  loginMethod?: 'email' | 'google' | 'anonymous';
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {
  private readonly firestore = inject(Firestore);

  /**
   * 儲存或更新用戶資料
   */
  saveUser(user: User, loginMethod: 'email' | 'google' | 'anonymous'): Observable<void> {
    const userRef = doc(this.firestore, 'users', user.uid);
    const now = serverTimestamp();

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: 'user',
      permissions: ['dashboard'],
      lastLoginAt: now,
      updatedAt: now,
      loginMethod: loginMethod,
      isActive: true
    };

    return from(setDoc(userRef, userData, { merge: true }));
  }

  /**
   * 獲取用戶資料
   */
  getUserProfile(uid: string): Observable<UserProfile | null> {
    const userRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userRef)).pipe(
      map(userDoc => {
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            uid: data['uid'],
            email: data['email'],
            displayName: data['displayName'],
            photoURL: data['photoURL'],
            emailVerified: data['emailVerified'],
            role: data['role'] || 'user',
            permissions: data['permissions'] || ['dashboard'],
            createdAt: data['createdAt'],
            updatedAt: data['updatedAt'],
            lastLoginAt: data['lastLoginAt'],
            loginMethod: data['loginMethod'],
            isActive: data['isActive']
          } as UserProfile;
        }
        return null;
      })
    );
  }

  /**
   * 更新用戶資料
   */
  updateUserProfile(uid: string, updates: Partial<UserProfile>): Observable<void> {
    const userRef = doc(this.firestore, 'users', uid);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    return from(updateDoc(userRef, updateData));
  }
}
