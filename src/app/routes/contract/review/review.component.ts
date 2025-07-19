import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { STComponent, STColumn, STData } from '@delon/abc/st';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';

interface ContractReview {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  submitDate: Date;
  reviewer?: string;
  reviewDate?: Date;
  comments?: string;
}

@Component({
  selector: 'app-contract-review',
  standalone: true,
  imports: [CommonModule, STComponent, NzButtonModule, NzCardModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card title="合約審查">
      <st #st [data]="data" [columns]="columns" [total]="total" [page]="{ show: true }">
        <ng-template st-row-button let-record>
          <nz-space>
            <button nz-button nzType="primary" nzSize="small" (click)="approveContract(record.id)" *ngIf="record.status === 'pending'">
              核准
            </button>
            <button nz-button nzType="default" nzSize="small" (click)="rejectContract(record.id)" *ngIf="record.status === 'pending'">
              拒絕
            </button>
            <button nz-button nzType="link" (click)="viewDetail(record.id)">查看</button>
          </nz-space>
        </ng-template>
      </st>
    </nz-card>
  `
})
export class ContractReviewComponent implements OnInit {
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
        pending: { text: '待審核', color: 'processing' },
        approved: { text: '已核准', color: 'success' },
        rejected: { text: '已拒絕', color: 'error' }
      }
    },
    { title: '提交日期', index: 'submitDate', type: 'date' },
    { title: '審核人', index: 'reviewer' },
    { title: '審核日期', index: 'reviewDate', type: 'date' },
    { title: '操作', buttons: [{ text: '操作' }] }
  ];

  constructor(
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
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
        submitDate: item.createDate
      }));
      this.total = result.total;
    });
  }

  approveContract(id: string): void {
    this.modal.confirm({
      nzTitle: '確認核准',
      nzContent: '確定要核准這個合約嗎？',
      nzOnOk: () => {
        // 使用 Mock API 更新合約狀態
        this.http
          .post(`/contract/${id}/review`, {
            status: 'approved',
            reviewer: '當前用戶',
            comments: '合約內容完整，符合公司規範'
          })
          .subscribe(() => {
            this.message.success('合約已核准');
            this.loadData();
          });
      }
    });
  }

  rejectContract(id: string): void {
    this.modal.confirm({
      nzTitle: '確認拒絕',
      nzContent: '確定要拒絕這個合約嗎？',
      nzOnOk: () => {
        // 使用 Mock API 更新合約狀態
        this.http
          .post(`/contract/${id}/review`, {
            status: 'rejected',
            reviewer: '當前用戶',
            comments: '合約內容需要修改'
          })
          .subscribe(() => {
            this.message.success('合約已拒絕');
            this.loadData();
          });
      }
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/contract/detail', id]);
  }
}
