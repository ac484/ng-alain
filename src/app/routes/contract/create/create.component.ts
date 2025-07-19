import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-contract-create',
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
    <nz-card title="創建合約">
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
            <button nz-button nzType="primary" type="submit" [disabled]="!contractForm.valid"> 創建合約 </button>
            <button nz-button (click)="onCancel()" style="margin-left: 8px;"> 取消 </button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class ContractCreateComponent {
  contractForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  onSubmit(): void {
    if (this.contractForm.valid) {
      const formValue = this.contractForm.value;

      // 使用 Mock API 創建合約
      this.http.post('/contract', formValue).subscribe((result: any) => {
        this.message.success('合約創建成功');
        this.router.navigate(['/contract/list']);
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
    this.router.navigate(['/contract/list']);
  }
}
