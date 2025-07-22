/**
 * 合約列表元件
 *
 * 功能：
 * - 合約列表的展示和搜尋
 * - 使用 ng-alain ST 表格元件進行資料展示
 * - 提供合約基本資訊的快速檢視
 * - 支援分頁和操作按鈕
 *
 * 表格欄位：
 * - 合約標題、客戶、金額資訊（原始、變更、現行）
 * - 合約狀態、進度、建立日期、到期日期
 * - 操作按鈕（查看、編輯）
 *
 * 狀態顯示：
 * - 草稿（default）、待審核（processing）
 * - 已核准（success）、已拒絕（error）
 *
 * 路由：/contract/list
 * 依賴：@delon/abc/st 表格元件、Mock API
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STComponent, STColumn, STData } from '@delon/abc/st';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Contract {
  id: string;
  title: string;
  client: string;
  originalAmount: number;
  currentAmount: number;
  changeAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createDate: Date;
  dueDate: Date;
  progress: number;
}

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule, STComponent, NzButtonModule, NzCardModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card>
      <st #st [data]="data" [columns]="columns" [total]="total" [page]="{ show: true }">
        <ng-template st-row-button let-record>
          <nz-space>
            <button nz-button nzType="link" (click)="viewDetail(record.id)">查看</button>
            <button nz-button nzType="link" (click)="editContract(record.id)">編輯</button>
          </nz-space>
        </ng-template>
      </st>
    </nz-card>
  `
})
export class ContractListComponent implements OnInit {
  data: STData[] = [];
  total = 0;

  columns: STColumn[] = [
    { title: '合約標題', index: 'title' },
    { title: '客戶', index: 'client' },
    { title: '原始金額', index: 'originalAmount', type: 'currency' },
    { title: '變更金額', index: 'changeAmount', type: 'currency' },
    { title: '現行金額', index: 'currentAmount', type: 'currency' },
    {
      title: '狀態',
      index: 'status',
      render: 'status',
      type: 'tag',
      tag: {
        draft: { text: '草稿', color: 'default' },
        pending: { text: '待審核', color: 'processing' },
        approved: { text: '已核准', color: 'success' },
        rejected: { text: '已拒絕', color: 'error' }
      }
    },
    { title: '進度', index: 'progress', type: 'number', format: (item: any) => `${item.progress}%` },
    { title: '建立日期', index: 'createDate', type: 'date' },
    { title: '到期日期', index: 'dueDate', type: 'date' },
    { title: '操作', buttons: [{ text: '操作' }] }
  ];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // 使用 Mock API 載入資料
    this.http.get('/contract').subscribe((result: any) => {
      this.data = result.list.map((item: any) => ({
        ...item,
        dueDate: item.endDate
      }));
      this.total = result.total;
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/contract/detail', id]);
  }

  editContract(id: string): void {
    this.router.navigate(['/contract/edit', id]);
  }
}
