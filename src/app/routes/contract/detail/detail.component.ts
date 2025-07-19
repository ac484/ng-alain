import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HttpClient } from '@angular/common/http';

interface ContractDetail {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  startDate: Date;
  endDate: Date;
  description: string;
  createDate: Date;
  updateDate: Date;
}

@Component({
  selector: 'app-contract-detail',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzDescriptionsModule, NzButtonModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card title="合約詳情">
      <nz-descriptions nzTitle="基本資訊" [nzColumn]="2" nzBordered>
        <nz-descriptions-item nzTitle="合約標題">{{ contract?.title }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="客戶名稱">{{ contract?.client }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="合約金額">{{ contract?.amount | currency: 'TWD' : 'symbol' : '1.0-0' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="合約狀態">
          <nz-tag [nzColor]="getStatusColor(contract?.status)">
            {{ getStatusText(contract?.status) }}
          </nz-tag>
        </nz-descriptions-item>
        <nz-descriptions-item nzTitle="開始日期">{{ contract?.startDate | date: 'yyyy-MM-dd' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="結束日期">{{ contract?.endDate | date: 'yyyy-MM-dd' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="建立日期">{{ contract?.createDate | date: 'yyyy-MM-dd HH:mm' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="更新日期">{{ contract?.updateDate | date: 'yyyy-MM-dd HH:mm' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="合約描述" [nzSpan]="2">{{ contract?.description || '無描述' }}</nz-descriptions-item>
      </nz-descriptions>

      <div style="margin-top: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="editContract()">編輯合約</button>
          <button nz-button (click)="goBack()">返回列表</button>
        </nz-space>
      </div>
    </nz-card>
  `
})
export class ContractDetailComponent implements OnInit {
  contract?: ContractDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadContractDetail(id);
    }
  }

  loadContractDetail(id: string): void {
    // 使用 Mock API 載入資料
    this.http.get(`/contract/${id}`).subscribe((result: any) => {
      this.contract = result;
    });
  }

  getStatusColor(status?: string): string {
    switch (status) {
      case 'draft':
        return 'default';
      case 'pending':
        return 'processing';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  }

  getStatusText(status?: string): string {
    switch (status) {
      case 'draft':
        return '草稿';
      case 'pending':
        return '待審核';
      case 'approved':
        return '已核准';
      case 'rejected':
        return '已拒絕';
      default:
        return '未知';
    }
  }

  editContract(): void {
    if (this.contract) {
      this.router.navigate(['/contract/edit', this.contract.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/contract/list']);
  }
}
