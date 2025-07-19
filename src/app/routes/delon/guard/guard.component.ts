/**
 * NG-ALAIN 權限守衛演示元件 (整合 Firebase)
 *
 * 功能：展示權限控制和路由守衛
 * 角色：user1、admin、Firebase 用戶角色權限切換
 * 路由：子路由權限控制
 * 整合：Firebase 認證與 ng-alain ACL
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  imports: SHARED_IMPORTS
})
export class GuardComponent {
  private readonly aclSrv = inject(ACLService);
  private readonly menuSrv = inject(MenuService);
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  get data(): any {
    return this.aclSrv.data;
  }

  setRole(value: string | boolean): void {
    this.aclSrv.setFull(false);
    if (typeof value === 'boolean') {
      this.aclSrv.setFull(value);
    } else {
      this.aclSrv.set({ role: [value as string] });
    }
    this.menuSrv.resume();
    this.router.navigate(['/delon/guard']);
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

        // 使用 ng-alain 標準方法設定權限
        this.aclSrv.set({
          role: [role],
          ability: permissions
        });

        this.menuSrv.resume();
        this.router.navigate(['/delon/guard']);
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

      // 使用 ng-alain 標準方法設定權限
      this.aclSrv.set({
        role: [newRole],
        ability: permissions
      });

      this.menuSrv.resume();
      this.router.navigate(['/delon/guard']);
      console.log('更新 Firebase 用戶權限:', { role: newRole, permissions });
    } catch (error) {
      console.error('更新 Firebase 用戶權限失敗:', error);
    }
  }
}
