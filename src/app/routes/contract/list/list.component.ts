import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { STComponent, STColumn, STData } from '@delon/abc/st';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HttpClient } from '@angular/common/http';

interface Contract {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createDate: Date;
  dueDate: Date;
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
    { title: '金額', index: 'amount', type: 'currency' },
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
