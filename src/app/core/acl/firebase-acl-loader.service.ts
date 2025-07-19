/**
 * Firebase ACL 載入器服務
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Cloud Firestore
 * 從 Firestore 讀取用戶權限資料，整合 ng-alain @delon/acl
 */

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { ACLService } from '@delon/acl';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface UserPermissions {
  uid: string;
  role: string;
  permissions: string[];
  groups?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAclLoaderService {
  private readonly firestore = inject(Firestore);
  private readonly aclService = inject(ACLService);

  /**
   * 載入用戶權限
   */
  loadUserPermissions(uid: string): Observable<UserPermissions> {
    const userDoc = doc(this.firestore, 'users', uid);

    return from(getDoc(userDoc)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            uid,
            role: data['role'] || 'user',
            permissions: data['permissions'] || [],
            groups: data['groups'] || []
          };
        } else {
          // 預設權限
          return {
            uid,
            role: 'user',
            permissions: ['read'],
            groups: []
          };
        }
      }),
      map(permissions => {
        // 設定 ACL 權限
        this.aclService.set({
          role: [permissions.role],
          ability: permissions.permissions
        });
        return permissions;
      }),
      catchError(() => {
        // 錯誤時使用預設權限
        const defaultPermissions: UserPermissions = {
          uid,
          role: 'user',
          permissions: ['read'],
          groups: []
        };
        this.aclService.set({
          role: [defaultPermissions.role],
          ability: defaultPermissions.permissions
        });
        return of(defaultPermissions);
      })
    );
  }

  /**
   * 檢查用戶是否有特定權限
   */
  hasPermission(uid: string, permission: string): Observable<boolean> {
    return this.loadUserPermissions(uid).pipe(map(permissions => permissions.permissions.includes(permission)));
  }

  /**
   * 檢查用戶是否有特定角色
   */
  hasRole(uid: string, role: string): Observable<boolean> {
    return this.loadUserPermissions(uid).pipe(map(permissions => permissions.role === role));
  }

  /**
   * 獲取用戶群組權限
   */
  getUserGroups(uid: string): Observable<string[]> {
    return this.loadUserPermissions(uid).pipe(map(permissions => permissions.groups || []));
  }
}
