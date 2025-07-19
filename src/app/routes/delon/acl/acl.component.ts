/**
 * NG-ALAIN 權限控制演示元件 (整合 Firebase)
 *
 * 功能：展示 ACL 權限控制
 * 角色：全權限、角色 A、角色 B、Firebase 用戶角色
 * 操作：權限切換和選單更新
 * 整合：Firebase 認證與 ng-alain ACL
 */

import { Component, inject } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { SHARED_IMPORTS } from '@shared';
import { from } from 'rxjs';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  imports: SHARED_IMPORTS
})
export class ACLComponent {
  private readonly aclSrv = inject(ACLService);
  private readonly menuSrv = inject(MenuService);
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  full = true;
  roleA = '';
  roleB = '';
  firebaseRole = '';

  get data(): {
    full: boolean;
    roles: string[];
    abilities: Array<string | number>;
  } {
    return this.aclSrv.data;
  }

  private reMenu(): void {
    this.menuSrv.resume();
  }

  toggleFull(): void {
    this.full = !this.full;
    this.aclSrv.setFull(this.full);
    this.reMenu();
  }

  toggleRoleA(): void {
    this.full = false;
    this.roleA = this.roleA === 'role-a' ? '' : 'role-a';
    this.aclSrv.setFull(this.full);
    this.aclSrv.setRole([this.roleA]);
    this.reMenu();
  }

  toggleRoleB(): void {
    this.full = false;
    this.roleB = this.roleB === 'role-b' ? '' : 'role-b';
    this.aclSrv.setFull(this.full);
    this.aclSrv.setRole([this.roleB]);
    this.reMenu();
  }

  /**
   * 載入 Firebase 用戶權限
   */
  async loadFirebaseUserRole(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      console.log('沒有 Firebase 用戶');
      return;
    }

    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData['role'] || 'user';
        const permissions = userData['permissions'] || ['read'];

        this.firebaseRole = role;
        this.full = false;

        // 使用 ng-alain 標準方法設定權限
        this.aclSrv.set({
          role: [role],
          ability: permissions
        });

        this.reMenu();
        console.log('載入 Firebase 用戶權限:', { role, permissions });
      }
    } catch (error) {
      console.error('載入 Firebase 用戶權限失敗:', error);
    }
  }

  /**
   * 更新 Firebase 用戶權限
   */
  async updateFirebaseUserRole(newRole: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      console.log('沒有 Firebase 用戶');
      return;
    }

    try {
      const userRef = doc(this.firestore, 'users', user.uid);
      const permissions = newRole === 'admin' ? ['read', 'write', 'delete', 'admin'] : ['read', 'write'];

      await updateDoc(userRef, {
        role: newRole,
        permissions: permissions,
        updatedAt: new Date()
      });

      this.firebaseRole = newRole;
      this.full = false;

      // 使用 ng-alain 標準方法設定權限
      this.aclSrv.set({
        role: [newRole],
        ability: permissions
      });

      this.reMenu();
      console.log('更新 Firebase 用戶權限:', { role: newRole, permissions });
    } catch (error) {
      console.error('更新 Firebase 用戶權限失敗:', error);
    }
  }
}
