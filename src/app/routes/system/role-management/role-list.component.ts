import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeaderModule } from '@delon/abc/page-header';
import { STModule } from '@delon/abc/st';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'system-role-list',
  standalone: true,
  imports: [CommonModule, PageHeaderModule, STModule, NzCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <page-header title="角色管理"></page-header>
    <nz-card>
      <st [data]="[]" [columns]="columns"></st>
    </nz-card>
  `
})
export class RoleListComponent {
  columns = [
    { title: '角色名稱', index: 'name' },
    { title: '角色編碼', index: 'code' },
    { title: '狀態', index: 'status' }
  ];
}
