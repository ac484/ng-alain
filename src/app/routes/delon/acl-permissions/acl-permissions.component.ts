/**
 * ACL Permissions 權限清單組件
 *
 * 本檔案依據極簡主義原則建立，顯示 acl_permissions 集合中的權限資料
 * 使用 ST 表格元件展示權限清單
 */

import { Component, OnInit, inject } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseACLService, ACLPermission } from '../../../core/firebase/firebase-acl.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acl-permissions',
  template: `
    <div class="alain-default__content-title">
      <h1>權限管理</h1>
    </div>

    <st #st [data]="permissions$" [columns]="columns" [total]="total" [page]="{ show: true }">
      <ng-template st-row="actions" let-item>
        <button nz-button nzType="link" (click)="editPermission(item)">編輯</button>
        <button nz-button nzType="link" nzDanger (click)="deletePermission(item)">刪除</button>
      </ng-template>
    </st>
  `,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class ACLPermissionsComponent implements OnInit {
  private readonly firebaseACLSrv = inject(FirebaseACLService);
  private readonly message = inject(NzMessageService);

  permissions$!: Observable<ACLPermission[]>;
  total = 0;

  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: 120 },
    { title: '名稱', index: 'name', width: 150 },
    { title: '描述', index: 'description', width: 200 },
    { title: '資源', index: 'resource', width: 120 },
    { title: '動作', index: 'action', width: 120 },
    { title: '狀態', index: 'isActive', type: 'yn' },
    { title: '建立時間', index: 'createdAt', type: 'date' },
    { title: '操作', render: 'actions', width: 120 }
  ];

  ngOnInit(): void {
    this.loadPermissions();
  }

  private loadPermissions(): void {
    this.permissions$ = this.firebaseACLSrv.getPermissions();
    this.permissions$.subscribe(permissions => {
      this.total = permissions.length;
    });
  }

  editPermission(permission: ACLPermission): void {
    this.message.info(`編輯權限: ${permission.name}`);
  }

  deletePermission(permission: ACLPermission): void {
    this.message.warning(`刪除權限: ${permission.name}`);
  }
}
