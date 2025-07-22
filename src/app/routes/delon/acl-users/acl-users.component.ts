/**
 * ACL Users 用戶清單組件
 *
 * 本檔案依據極簡主義原則建立，顯示 acl_users 集合中的用戶資料
 * 使用 ST 表格元件展示用戶清單
 */

import { Component, OnInit, inject } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { FirebaseUserService, UserProfile } from '../../../core/firebase/firebase-user.service';

@Component({
  selector: 'app-acl-users',
  template: `
    <div class="alain-default__content-title">
      <h1>用戶管理</h1>
    </div>

    <st #st [data]="users$" [columns]="columns" [total]="total" [page]="{ show: true }">
      <ng-template st-row="actions" let-item>
        <button nz-button nzType="link" (click)="editUser(item)">編輯</button>
        <button nz-button nzType="link" nzDanger (click)="deleteUser(item)">刪除</button>
      </ng-template>
    </st>
  `,
  imports: [...SHARED_IMPORTS]
})
export class ACLUsersComponent implements OnInit {
  private readonly firebaseUserSrv = inject(FirebaseUserService);
  private readonly message = inject(NzMessageService);

  users$!: Observable<UserProfile[]>;
  total = 0;

  columns: STColumn[] = [
    { title: 'UID', index: 'uid', width: 200 },
    { title: 'Email', index: 'email' },
    { title: '顯示名稱', index: 'displayName' },
    { title: '角色', index: 'role' },
    { title: '狀態', index: 'isActive', type: 'yn' },
    { title: '最後登入', index: 'lastLoginAt', type: 'date' },
    { title: '操作', render: 'actions', width: 120 }
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.users$ = this.firebaseUserSrv.getAllUsers();
    this.users$.subscribe(users => {
      this.total = users.length;
    });
  }

  editUser(user: UserProfile): void {
    this.message.info(`編輯用戶: ${user.email}`);
  }

  deleteUser(user: UserProfile): void {
    this.message.info(`刪除用戶: ${user.email}`);
  }
}
