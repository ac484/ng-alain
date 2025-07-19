import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';

interface PaymentRound {
  round: number;
  amount: number;
  status: 'paid' | 'pending';
  date: Date;
  paymentStatus: 'draft' | 'submitted' | 'reviewing' | 'invoiced' | 'completed';
  progress: number;
}

@Component({
  selector: 'app-contract-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzTagModule,
    NzProgressModule,
    NzSpaceModule
  ],
  template: `
    <nz-card title="合約請款">
      <!-- 合約資訊 -->
      <nz-card title="合約資訊" [nzSize]="'small'" style="margin-bottom: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div> <strong>合約標題：</strong>{{ contract?.title }} </div>
          <div> <strong>客戶：</strong>{{ contract?.client }} </div>
          <div> <strong>現行金額：</strong>{{ contract?.currentAmount | currency: 'TWD' : 'symbol' : '1.0-0' }} </div>
          <div> <strong>進度：</strong>{{ contract?.progress }}% </div>
        </div>
      </nz-card>

      <!-- 請款輪次列表 -->
      <nz-card title="請款輪次" style="margin-bottom: 16px;">
        <nz-table #paymentTable [nzData]="contract?.paymentRounds || []" [nzPageSize]="5">
          <thead>
            <tr>
              <th>輪次</th>
              <th>金額</th>
              <th>進度</th>
              <th>請款狀態</th>
              <th>付款狀態</th>
              <th>日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of paymentTable.data">
              <td>{{ payment.round }}</td>
              <td>{{ payment.amount | currency: 'TWD' : 'symbol' : '1.0-0' }}</td>
              <td>
                <nz-progress [nzPercent]="payment.progress" [nzSize]="'small'" [nzShowInfo]="false"> </nz-progress>
                <span style="font-size: 12px; color: #666;">{{ payment.progress }}%</span>
              </td>
              <td>
                <nz-tag [nzColor]="getPaymentStatusColor(payment.paymentStatus)">
                  {{ getPaymentStatusText(payment.paymentStatus) }}
                </nz-tag>
              </td>
              <td>
                <nz-tag [nzColor]="payment.status === 'paid' ? 'success' : 'processing'">
                  {{ payment.status === 'paid' ? '已付款' : '待付款' }}
                </nz-tag>
              </td>
              <td>{{ payment.date | date: 'yyyy-MM-dd' }}</td>
              <td>
                <nz-space>
                  <button
                    nz-button
                    nzType="primary"
                    nzSize="small"
                    (click)="updatePaymentStatus(payment, 'submitted')"
                    [disabled]="payment.paymentStatus !== 'draft'"
                  >
                    送出
                  </button>
                  <button
                    nz-button
                    nzType="default"
                    nzSize="small"
                    (click)="updatePaymentStatus(payment, 'reviewing')"
                    [disabled]="payment.paymentStatus !== 'submitted'"
                  >
                    審查
                  </button>
                  <button
                    nz-button
                    nzType="default"
                    nzSize="small"
                    (click)="updatePaymentStatus(payment, 'invoiced')"
                    [disabled]="payment.paymentStatus !== 'reviewing'"
                  >
                    開票
                  </button>
                  <button
                    nz-button
                    nzType="default"
                    nzSize="small"
                    (click)="updatePaymentStatus(payment, 'completed')"
                    [disabled]="payment.paymentStatus !== 'invoiced'"
                  >
                    完成
                  </button>
                </nz-space>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>

      <!-- 新增請款 -->
      <nz-card title="新增請款">
        <form nz-form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>請款輪次</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請選擇請款輪次">
              <nz-select formControlName="round" placeholder="請選擇請款輪次">
                <nz-option nzValue="1" nzLabel="第1輪"></nz-option>
                <nz-option nzValue="2" nzLabel="第2輪"></nz-option>
                <nz-option nzValue="3" nzLabel="第3輪"></nz-option>
                <nz-option nzValue="4" nzLabel="第4輪"></nz-option>
                <nz-option nzValue="5" nzLabel="第5輪"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>請款金額</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請輸入請款金額">
              <nz-input-number formControlName="amount" [nzMin]="0" [nzStep]="1000" style="width: 100%" placeholder="請輸入請款金額" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>請款日期</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請選擇請款日期">
              <nz-date-picker formControlName="date" style="width: 100%" placeholder="請選擇請款日期" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4">請款說明</nz-form-label>
            <nz-form-control [nzSpan]="20">
              <textarea nz-input formControlName="description" [nzAutosize]="{ minRows: 3, maxRows: 5 }" placeholder="請輸入請款說明">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="4" [nzSpan]="20">
              <button nz-button nzType="primary" type="submit" [disabled]="!paymentForm.valid"> 提交請款 </button>
              <button nz-button (click)="onCancel()" style="margin-left: 8px;"> 取消 </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </nz-card>
    </nz-card>
  `
})
export class ContractPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  contractId?: string;
  contract?: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private http: HttpClient
  ) {
    this.paymentForm = this.fb.group({
      round: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.contractId) {
      this.loadContractData();
    }
  }

  loadContractData(): void {
    // 使用 Mock API 載入合約資料
    this.http.get(`/contract/${this.contractId}`).subscribe((result: any) => {
      this.contract = result;
    });
  }

  requestPayment(payment: PaymentRound): void {
    // 請款功能
    this.message.info(`請款第${payment.round}輪，金額：${payment.amount}`);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;

      // 使用 Mock API 提交請款
      this.http.post(`/contract/${this.contractId}/payment`, formValue).subscribe(() => {
        this.message.success('請款提交成功');
        this.loadContractData();
        this.paymentForm.reset();
      });
    } else {
      Object.values(this.paymentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/contract/detail', this.contractId]);
  }

  getPaymentStatusColor(status?: string): string {
    switch (status) {
      case 'draft':
        return 'default';
      case 'submitted':
        return 'processing';
      case 'reviewing':
        return 'warning';
      case 'invoiced':
        return 'blue';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  }

  getPaymentStatusText(status?: string): string {
    switch (status) {
      case 'draft':
        return '草稿';
      case 'submitted':
        return '送出';
      case 'reviewing':
        return '審查';
      case 'invoiced':
        return '開票';
      case 'completed':
        return '完成';
      default:
        return '未知';
    }
  }

  updatePaymentStatus(payment: PaymentRound, newStatus: string): void {
    // 使用 Mock API 更新請款狀態
    this.http
      .post(`/contract/${this.contractId}/payment-status`, {
        round: payment.round,
        status: newStatus
      })
      .subscribe(() => {
        this.message.success(`請款狀態已更新為：${this.getPaymentStatusText(newStatus)}`);
        this.loadContractData();
      });
  }
}
