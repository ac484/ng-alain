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
import { Auth, authState } from '@angular/fire/auth';
import { ACLService } from '@delon/acl';
import { Observable, from, map, switchMap, of, BehaviorSubject } from 'rxjs';

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
  private readonly auth = inject(Auth);
  private readonly aclSrv = inject(ACLService);

  private userACLSubject = new BehaviorSubject<UserACL | null>(null);
  userACL$ = this.userACLSubject.asObservable();

  constructor() {
    // 監聽認證狀態變化，自動載入用戶權限
    authState(this.auth)
      .pipe(switchMap(user => (user ? this.loadUserACL(user.uid) : of(null))))
      .subscribe(userACL => {
        this.userACLSubject.next(userACL);
        if (userACL) {
          this.applyACL(userACL);
        } else {
          this.clearACL();
        }
      });
  }

  /**
   * 載入用戶 ACL 資料
   */
  loadUserACL(uid: string): Observable<UserACL | null> {
    const userACLRef = doc(this.firestore, 'acl_users', uid);
    return from(getDoc(userACLRef)).pipe(map(doc => (doc.exists() ? (doc.data() as UserACL) : null)));
  }

  /**
   * 應用 ACL 到 @delon/acl 服務
   */
  private applyACL(userACL: UserACL): void {
    this.aclSrv.set({
      role: userACL.roles,
      ability: userACL.permissions
    });
  }

  /**
   * 清除 ACL
   */
  private clearACL(): void {
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

    return from(setDoc(userACLRef, userACL, { merge: true })).pipe(
      map(() => {
        // 如果是當前用戶，立即更新本地 ACL
        if (uid === this.auth.currentUser?.uid) {
          this.applyACL(userACL);
          this.userACLSubject.next(userACL);
        }
      })
    );
  }

  /**
   * 延續 @delon/acl 的 API 風格
   */
  can(permission: string): boolean {
    return this.aclSrv.can(permission);
  }

  hasRole(role: string): boolean {
    // @delon/acl 使用 can 方法檢查角色
    return this.aclSrv.can(role);
  }

  get data() {
    return this.aclSrv.data;
  }
}
