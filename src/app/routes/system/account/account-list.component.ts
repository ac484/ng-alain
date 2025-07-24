import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeaderModule } from '@delon/abc/page-header';
import { STModule } from '@delon/abc/st';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'system-account-list',
  standalone: true,
  imports: [CommonModule, PageHeaderModule, STModule, NzCardModule, NzButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <page-header title="帳號管理"></page-header>
    <nz-card>
      <button nz-button nzType="primary">新增帳號</button>
      <st #st [data]="[]" [columns]="columns"></st>
    </nz-card>
  `
})
export class AccountListComponent {
  columns = [
    { title: '用戶名稱', index: 'displayName' },
    { title: '郵箱', index: 'email' },
    { title: '狀態', index: 'status' },
    { title: '操作', buttons: [] }
  ];
}
