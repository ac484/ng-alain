import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { PageHeaderModule } from '@delon/abc/page-header';
import { STModule, STColumn, STComponent } from '@delon/abc/st';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { AccountService } from './account.service';

interface AccountData {
  id: string;
  displayName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  role: string;
  department: string;
  lastLogin?: Date;
  createdAt: Date;
}

@Component({
  selector: 'system-account-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderModule,
    STModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzTagModule,
    NzAvatarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <page-header title="帳號管理" subtitle="管理系統用戶帳號"></page-header>

    <nz-card>
      <div class="mb-4">
        <button nz-button nzType="primary" (click)="addAccount()">
          <span nz-icon nzType="plus"></span>
          新增帳號
        </button>
      </div>

      <st
        #st
        [data]="accountService.getAccounts()"
        [columns]="columns"
        [total]="total"
        [page]="{ show: true, showSize: true }"
        [req]="{ method: 'GET' }"
        (change)="stChange($event)"
      >
      </st>
    </nz-card>
  `,
  styles: [
    `
      .mb-4 {
        margin-bottom: 16px;
      }
      .status-active {
        color: #52c41a;
      }
      .status-inactive {
        color: #ff4d4f;
      }
      .status-pending {
        color: #faad14;
      }
    `
  ]
})
export class AccountListComponent implements OnInit {
  private readonly message = inject(NzMessageService);
  readonly accountService = inject(AccountService);

  total = 0;

  columns: STColumn[] = [
    {
      title: '用戶',
      index: 'displayName',
      width: 200,
      render: 'user',
      fixed: 'left'
    },
    {
      title: '郵箱',
      index: 'email',
      width: 200
    },
    {
      title: '狀態',
      index: 'status',
      width: 100,
      render: 'status'
    },
    {
      title: '角色',
      index: 'role',
      width: 120
    },
    {
      title: '部門',
      index: 'department',
      width: 120
    },
    {
      title: '最後登入',
      index: 'lastLogin',
      type: 'date',
      width: 150
    },
    {
      title: '建立時間',
      index: 'createdAt',
      type: 'date',
      width: 150
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      buttons: [
        {
          text: '編輯',
          type: 'link',
          click: (record: AccountData) => this.editAccount(record)
        },
        {
          text: '刪除',
          type: 'del',
          pop: true,
          click: (record: AccountData) => this.deleteAccount(record)
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: accounts => {
        this.total = accounts.length;
      },
      error: error => {
        this.message.error('載入帳號列表失敗');
        console.error('Load accounts error:', error);
      }
    });
  }

  addAccount(): void {
    this.message.info('新增帳號功能開發中...');
  }

  editAccount(account: AccountData): void {
    this.message.info(`編輯帳號: ${account.displayName}`);
  }

  deleteAccount(account: AccountData): void {
    this.accountService.deleteAccount(account.id).subscribe({
      next: () => {
        this.message.success('帳號刪除成功');
        this.loadAccounts();
      },
      error: error => {
        this.message.error('帳號刪除失敗');
        console.error('Delete account error:', error);
      }
    });
  }

  stChange(event: any): void {
    console.log('ST change:', event);
  }
}
