/**
 * NG-ALAIN 權限守衛演示元件 (整合 Firebase)
 *
 * 功能：展示權限控制和路由守衛
 * 角色：user1、admin、Firebase 用戶角色權限切換
 * 路由：子路由權限控制
 * 整合：Firebase 認證與 ng-alain ACL
 */

import { AsyncPipe, JsonPipe, NgIf, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { FirebaseACLService, ACLRole } from '../../../core/firebase/firebase-acl.service';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  imports: [SHARED_IMPORTS, AsyncPipe, JsonPipe, NgIf, NgFor]
})
export class GuardComponent implements OnInit {
  private readonly aclSrv = inject(ACLService);
  private readonly menuSrv = inject(MenuService);
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly firebaseACLSrv = inject(FirebaseACLService);

  availableRoles: ACLRole[] = [];
  currentUserACL$ = this.firebaseACLSrv.userACL$;

  ngOnInit(): void {
    this.loadAvailableRoles();
  }

  get data() {
    return this.aclSrv.data;
  }

  private loadAvailableRoles(): void {
    this.firebaseACLSrv.getRoles().subscribe(roles => {
      this.availableRoles = roles;
    });
  }

  setRole(roleId: string): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const role = this.availableRoles.find(r => r.id === roleId);
    if (!role) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [roleId], role.permissions).subscribe(() => {
      this.menuSrv.resume();
      this.router.navigate(['/delon/guard']);
    });
  }

  setFull(full: boolean): void {
    this.aclSrv.setFull(full);
    this.menuSrv.resume();
    this.router.navigate(['/delon/guard']);
  }

  clearACL(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [], []).subscribe(() => {
      this.menuSrv.resume();
      this.router.navigate(['/delon/guard']);
    });
  }
}
