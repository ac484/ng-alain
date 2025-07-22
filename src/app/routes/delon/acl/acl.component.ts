/**
 * NG-ALAIN 權限控制演示元件 (整合 Firebase)
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Firestore
 * 展示 ng-alain ACL 權限控制系統與 Firebase 認證的整合
 */

import { AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { FirebaseACLService, ACLRole } from '../../../core/firebase/firebase-acl.service';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  imports: [SHARED_IMPORTS, AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor]
})
export class ACLComponent implements OnInit {
  private readonly aclSrv = inject(ACLService);
  private readonly menuSrv = inject(MenuService);
  private readonly auth = inject(Auth);
  private readonly firebaseACLSrv = inject(FirebaseACLService);

  full = false;
  availableRoles: ACLRole[] = [];
  currentUserACL$ = this.firebaseACLSrv.userACL$;

  ngOnInit(): void {
    this.loadAvailableRoles();
  }

  get data() {
    return this.aclSrv.data;
  }

  private reMenu(): void {
    this.menuSrv.resume();
  }

  private loadAvailableRoles(): void {
    this.firebaseACLSrv.getRoles().subscribe(roles => {
      this.availableRoles = roles;
    });
  }

  toggleFull(): void {
    this.full = !this.full;
    this.aclSrv.setFull(this.full);
    this.reMenu();
  }

  setRole(roleId: string): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const role = this.availableRoles.find(r => r.id === roleId);
    if (!role) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [roleId], role.permissions).subscribe(() => {
      this.reMenu();
    });
  }

  clearACL(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [], []).subscribe(() => {
      this.reMenu();
    });
  }
}
