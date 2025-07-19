import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';

interface ContractDetail {
  id: string;
  title: string;
  client: string;
  originalAmount: number;
  currentAmount: number;
  changeAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  startDate: Date;
  endDate: Date;
  description: string;
  createDate: Date;
  updateDate: Date;
  version: string;
  changeVersion: string;
  progress: number;
  paymentRounds: PaymentRound[];
  changes: ContractChange[];
}

interface PaymentRound {
  round: number;
  amount: number;
  status: 'paid' | 'pending';
  date: Date;
}

interface ContractChange {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: Date;
  version: string;
}

@Component({
  selector: 'app-contract-detail',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzDescriptionsModule, NzButtonModule, NzTagModule, NzSpaceModule, NzProgressModule, NzTableModule],
  template: `
    <nz-card title="合約詳情">
      <nz-descriptions nzTitle="基本資訊" [nzColumn]="2" nzBordered>
        <nz-descriptions-item nzTitle="合約標題">{{ contract?.title }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="客戶名稱">{{ contract?.client }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="原始金額">{{
          contract?.originalAmount | currency: 'TWD' : 'symbol' : '1.0-0'
        }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="變更金額">{{ contract?.changeAmount | currency: 'TWD' : 'symbol' : '1.0-0' }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="現行金額">{{ contract?.currentAmount | currency: 'TWD' : 'symbol' : '1.0-0' }}</nz-descriptions-item>
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
        <nz-descriptions-item nzTitle="版本號">{{ contract?.version }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="變更版本號">{{ contract?.changeVersion }}</nz-descriptions-item>
        <nz-descriptions-item nzTitle="進度">{{ contract?.progress }}%</nz-descriptions-item>
      </nz-descriptions>

      <!-- 進度摘要 -->
      <nz-card title="進度摘要" style="margin-top: 16px;">
        <nz-progress [nzPercent]="contract?.progress || 0" [nzStatus]="getProgressStatus(contract?.progress || 0)"></nz-progress>
      </nz-card>

      <!-- 請款輪次 -->
      <nz-card title="請款輪次" style="margin-top: 16px;">
        <nz-table #paymentTable [nzData]="contract?.paymentRounds || []" [nzPageSize]="5">
          <thead>
            <tr>
              <th>輪次</th>
              <th>金額</th>
              <th>狀態</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of paymentTable.data">
              <td>{{ payment.round }}</td>
              <td>{{ payment.amount | currency: 'TWD' : 'symbol' : '1.0-0' }}</td>
              <td>
                <nz-tag [nzColor]="payment.status === 'paid' ? 'success' : 'processing'">
                  {{ payment.status === 'paid' ? '已付款' : '待付款' }}
                </nz-tag>
              </td>
              <td>{{ payment.date | date: 'yyyy-MM-dd' }}</td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>

      <!-- 合約變更 -->
      <nz-card title="合約變更" style="margin-top: 16px;">
        <nz-table #changeTable [nzData]="contract?.changes || []" [nzPageSize]="5">
          <thead>
            <tr>
              <th>類型</th>
              <th>描述</th>
              <th>金額</th>
              <th>版本</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let change of changeTable.data">
              <td>
                <nz-tag [nzColor]="change.type === '追加' ? 'success' : 'error'">
                  {{ change.type }}
                </nz-tag>
              </td>
              <td>{{ change.description }}</td>
              <td>{{ change.amount | currency: 'TWD' : 'symbol' : '1.0-0' }}</td>
              <td>{{ change.version }}</td>
              <td>{{ change.date | date: 'yyyy-MM-dd' }}</td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>

      <div style="margin-top: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="editContract()">編輯合約</button>
          <button nz-button nzType="default" (click)="requestPayment()">請款</button>
          <button nz-button nzType="default" (click)="addChange()">追加追減</button>
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

  getProgressStatus(progress: number): 'success' | 'normal' | 'active' | 'exception' {
    if (progress >= 100) return 'success';
    if (progress >= 80) return 'normal';
    if (progress >= 50) return 'active';
    return 'exception';
  }

  requestPayment(): void {
    // 請款功能
    this.router.navigate(['/contract/payment', this.contract?.id]);
  }

  addChange(): void {
    // 追加追減功能
    this.router.navigate(['/contract/change', this.contract?.id]);
  }
}
