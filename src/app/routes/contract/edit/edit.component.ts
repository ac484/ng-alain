/**
 * 合約編輯元件
 *
 * 功能：
 * - 現有合約資訊的修改和更新
 * - 提供合約基本資訊編輯表單
 * - 載入現有合約資料並填入表單
 * - 提交更新後返回合約詳情頁面
 *
 * 表單欄位：
 * - 合約標題、客戶名稱、合約金額
 * - 開始日期、結束日期、合約描述
 *
 * 業務邏輯：
 * - 根據路由參數載入合約資料
 * - 表單驗證確保資料完整性
 * - 更新成功後導向合約詳情頁面
 *
 * 路由：/contract/edit/:id
 * 依賴：Mock API 進行資料載入和更新
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contract-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule
  ],
  template: `
    <nz-card title="編輯合約">
      <form nz-form [formGroup]="contractForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>合約標題</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入合約標題">
            <input nz-input formControlName="title" placeholder="請輸入合約標題" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>客戶名稱</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入客戶名稱">
            <input nz-input formControlName="client" placeholder="請輸入客戶名稱" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>合約金額</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入合約金額">
            <nz-input-number formControlName="amount" [nzMin]="0" [nzStep]="1000" style="width: 100%" placeholder="請輸入合約金額" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>開始日期</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇開始日期">
            <nz-date-picker formControlName="startDate" style="width: 100%" placeholder="請選擇開始日期" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>結束日期</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇結束日期">
            <nz-date-picker formControlName="endDate" style="width: 100%" placeholder="請選擇結束日期" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">合約描述</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <textarea
              nz-input
              formControlName="description"
              [nzAutosize]="{ minRows: 3, maxRows: 5 }"
              placeholder="請輸入合約描述"
            ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="4" [nzSpan]="20">
            <button nz-button nzType="primary" type="submit" [disabled]="!contractForm.valid"> 更新合約 </button>
            <button nz-button (click)="onCancel()" style="margin-left: 8px;"> 取消 </button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class ContractEditComponent implements OnInit {
  contractForm: FormGroup;
  contractId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private http: HttpClient
  ) {
    this.contractForm = this.fb.group({
      title: ['', [Validators.required]],
      client: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
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
      this.contractForm.patchValue({
        title: result.title,
        client: result.client,
        amount: result.amount,
        startDate: new Date(result.startDate),
        endDate: new Date(result.endDate),
        description: result.description
      });
    });
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const formValue = this.contractForm.value;

      // 使用 Mock API 更新合約
      this.http.put(`/contract/${this.contractId}`, formValue).subscribe(() => {
        this.message.success('合約更新成功');
        this.router.navigate(['/contract/detail', this.contractId]);
      });
    } else {
      Object.values(this.contractForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/contract/detail', this.contractId]);
  }
}
