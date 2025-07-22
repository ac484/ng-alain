/**
 * ACL Roles 角色清單組件
 *
 * 本檔案依據極簡主義原則建立，顯示 acl_roles 集合中的角色資料
 * 使用 ST 表格元件展示角色清單
 */

import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { FirebaseACLService, ACLRole } from '../../../core/firebase/firebase-acl.service';

@Component({
  selector: 'app-acl-roles',
  template: `
    <div class="alain-default__content-title">
      <h1>角色管理</h1>
    </div>

    <st #st [data]="roles$" [columns]="columns" [total]="total" [page]="{ show: true }">
      <ng-template st-row="permissions" let-item>
        <nz-tag *ngFor="let permission of item.permissions" class="mb-xs">
          {{ permission }}
        </nz-tag>
      </ng-template>
      <ng-template st-row="actions" let-item>
        <button nz-button nzType="link" (click)="editRole(item)">編輯</button>
        <button nz-button nzType="link" nzDanger (click)="deleteRole(item)">刪除</button>
      </ng-template>
    </st>
  `,
  imports: [...SHARED_IMPORTS, NgFor]
})
export class ACLRolesComponent implements OnInit {
  private readonly firebaseACLSrv = inject(FirebaseACLService);
  private readonly message = inject(NzMessageService);

  roles$!: Observable<ACLRole[]>;
  total = 0;

  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: 150 },
    { title: '名稱', index: 'name' },
    { title: '描述', index: 'description' },
    { title: '權限', render: 'permissions', width: 300 },
    { title: '狀態', index: 'isActive', type: 'yn' },
    { title: '建立時間', index: 'createdAt', type: 'date' },
    { title: '操作', render: 'actions', width: 120 }
  ];

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.roles$ = this.firebaseACLSrv.getRoles();
    this.roles$.subscribe(roles => {
      this.total = roles.length;
    });
  }

  editRole(role: ACLRole): void {
    this.message.info(`編輯角色: ${role.name}`);
  }

  deleteRole(role: ACLRole): void {
    this.message.info(`刪除角色: ${role.name}`);
  }
}
