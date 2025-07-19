/**
 * NG-ALAIN 權限守衛演示元件
 *
 * 功能：展示權限控制和路由守衛
 * 角色：user1、admin 權限切換
 * 路由：子路由權限控制
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
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
}
