/**
 * Firebase ACL 初始化服務
 *
 * 負責初始化系統預設的角色和權限
 */

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from, forkJoin, map, switchMap } from 'rxjs';
import { ACLRole, ACLPermission } from './firebase-acl.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseACLInitService {
  private readonly firestore = inject(Firestore);

  /**
   * 預設權限定義
   */
  private readonly defaultPermissions: Omit<ACLPermission, 'createdAt' | 'updatedAt'>[] = [
    {
      id: 'dashboard:read',
      name: '儀表板查看',
      description: '查看儀表板資料',
      resource: 'dashboard',
      action: 'read',
      isActive: true
    },
    {
      id: 'user:read',
      name: '用戶查看',
      description: '查看用戶資料',
      resource: 'user',
      action: 'read',
      isActive: true
    },
    {
      id: 'user:write',
      name: '用戶編輯',
      description: '編輯用戶資料',
      resource: 'user',
      action: 'write',
      isActive: true
    },
    {
      id: 'admin:access',
      name: '管理員訪問',
      description: '訪問管理員功能',
      resource: 'admin',
      action: 'access',
      isActive: true
    }
  ];

  /**
   * 預設角色定義
   */
  private readonly defaultRoles: Omit<ACLRole, 'createdAt' | 'updatedAt'>[] = [
    {
      id: 'user',
      name: '一般用戶',
      description: '基本用戶權限',
      permissions: ['dashboard:read', 'user:read'],
      isActive: true
    },
    {
      id: 'user1',
      name: '認證用戶',
      description: '已認證用戶權限',
      permissions: ['dashboard:read', 'user:read', 'user:write'],
      isActive: true
    },
    {
      id: 'admin',
      name: '管理員',
      description: '管理員權限',
      permissions: ['dashboard:read', 'user:read', 'user:write', 'admin:access'],
      isActive: true
    }
  ];

  /**
   * 初始化系統 ACL 資料
   */
  initializeACL(): Observable<void> {
    const permissionTasks = this.defaultPermissions.map(permission => this.createPermissionIfNotExists(permission));

    const roleTasks = this.defaultRoles.map(role => this.createRoleIfNotExists(role));

    return forkJoin([...permissionTasks, ...roleTasks]).pipe(map(() => void 0));
  }

  /**
   * 創建權限（如果不存在）
   */
  private createPermissionIfNotExists(permission: Omit<ACLPermission, 'createdAt' | 'updatedAt'>): Observable<void> {
    const permissionRef = doc(this.firestore, 'acl_permissions', permission.id);
    return from(getDoc(permissionRef)).pipe(
      switchMap(doc => {
        if (!doc.exists()) {
          const permissionData: ACLPermission = {
            ...permission,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          return from(setDoc(permissionRef, permissionData));
        }
        return from(Promise.resolve());
      }),
      map(() => void 0)
    );
  }

  /**
   * 創建角色（如果不存在）
   */
  private createRoleIfNotExists(role: Omit<ACLRole, 'createdAt' | 'updatedAt'>): Observable<void> {
    const roleRef = doc(this.firestore, 'acl_roles', role.id);
    return from(getDoc(roleRef)).pipe(
      switchMap(doc => {
        if (!doc.exists()) {
          const roleData: ACLRole = {
            ...role,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          return from(setDoc(roleRef, roleData));
        }
        return from(Promise.resolve());
      }),
      map(() => void 0)
    );
  }
}
