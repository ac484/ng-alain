/**
 * Firebase ACL 服務 - @delon/acl 的 Firestore 擴展
 *
 * 極簡主義設計：
 * - 延續 @delon/acl 的 API 風格
 * - 無縫整合現有架構
 * - 透明的 Firestore 後端
 */

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ACLService } from '@delon/acl';
import { Observable, from, map, of } from 'rxjs';

export interface ACLRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface ACLPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface UserACL {
  uid: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  updatedAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseACLService {
  private readonly firestore = inject(Firestore);
  private readonly aclSrv = inject(ACLService);

  // 為了向後相容，提供空的 userACL$ Observable
  userACL$: Observable<UserACL | null> = of(null);

  /**
   * 以 uid 查詢用戶 ACL
   */
  loadUserACL(uid: string): Observable<UserACL | null> {
    const userACLRef = doc(this.firestore, 'acl_users', uid);
    return from(getDoc(userACLRef)).pipe(map(doc => (doc.exists() ? (doc.data() as UserACL) : null)));
  }

  /**
   * 將用戶 ACL 同步到 @delon/acl
   */
  applyACL(userACL: UserACL): void {
    this.aclSrv.set({
      role: userACL.roles,
      ability: userACL.permissions
    });
  }

  /**
   * 更新用戶 ACL
   */
  updateUserACL(uid: string, roles: string[], permissions: string[]): Observable<void> {
    const userACLRef = doc(this.firestore, 'acl_users', uid);
    const userACL: UserACL = {
      uid,
      roles,
      permissions,
      isActive: true,
      updatedAt: new Date()
    };
    return from(setDoc(userACLRef, userACL, { merge: true }));
  }

  /**
   * 清空 @delon/acl 權限
   */
  clearACL(): void {
    this.aclSrv.setFull(false);
    this.aclSrv.set({ role: [], ability: [] });
  }

  /**
   * 獲取所有角色
   */
  getRoles(): Observable<ACLRole[]> {
    const rolesRef = collection(this.firestore, 'acl_roles');
    const q = query(rolesRef, where('isActive', '==', true));
    return from(getDocs(q)).pipe(map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ACLRole)));
  }

  /**
   * 獲取所有權限
   */
  getPermissions(): Observable<ACLPermission[]> {
    const permissionsRef = collection(this.firestore, 'acl_permissions');
    const q = query(permissionsRef, where('isActive', '==', true));
    return from(getDocs(q)).pipe(map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ACLPermission)));
  }

  /**
   * 延續 @delon/acl 的 API 風格
   */
  can(permission: string): boolean {
    return this.aclSrv.can(permission);
  }

  hasRole(role: string): boolean {
    return this.aclSrv.can(role);
  }

  get data() {
    return this.aclSrv.data;
  }
}
