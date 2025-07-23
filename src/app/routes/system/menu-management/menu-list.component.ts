import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '@delon/abc/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';

@Component({
  selector: 'system-menu-list',
  standalone: true,
  imports: [CommonModule, PageHeaderModule, NzCardModule, NzTreeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <page-header title="菜單管理"></page-header>
    <nz-card>
      <nz-tree [nzData]="[]" nzShowLine></nz-tree>
    </nz-card>
  `
})
export class MenuListComponent {}
