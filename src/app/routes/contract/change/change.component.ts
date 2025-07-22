/**
 * 合約追加追減管理元件
 *
 * 功能：
 * - 合約變更的申請和管理
 * - 支援追加和追減兩種變更類型
 * - 顯示合約基本資訊和變更歷史
 * - 提供變更申請表單（類型、描述、金額、日期、版本）
 * - 自動計算新版本號
 *
 * 業務邏輯：
 * - 變更類型：追加（增加金額）、追減（減少金額）
 * - 版本管理：自動遞增變更版本號
 * - 歷史追蹤：記錄所有變更記錄
 *
 * 路由：/contract/change/:id
 * 依賴：Mock API 進行資料操作
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ContractChange {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: Date;
  version: string;
}

@Component({
  selector: 'app-contract-change',
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
    NzTagModule
  ],
  template: `
    <nz-card title="合約追加追減">
      <!-- 合約資訊 -->
      <nz-card title="合約資訊" [nzSize]="'small'" style="margin-bottom: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div> <strong>合約標題：</strong>{{ contract?.title }} </div>
          <div> <strong>客戶：</strong>{{ contract?.client }} </div>
          <div> <strong>原始金額：</strong>{{ contract?.originalAmount | currency: 'TWD' : 'symbol' : '1.0-0' }} </div>
          <div> <strong>現行金額：</strong>{{ contract?.currentAmount | currency: 'TWD' : 'symbol' : '1.0-0' }} </div>
          <div> <strong>版本號：</strong>{{ contract?.version }} </div>
          <div> <strong>變更版本號：</strong>{{ contract?.changeVersion }} </div>
        </div>
      </nz-card>

      <!-- 合約變更歷史 -->
      <nz-card title="變更歷史" style="margin-bottom: 16px;">
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

      <!-- 新增變更 -->
      <nz-card title="新增變更">
        <form nz-form [formGroup]="changeForm" (ngSubmit)="onSubmit()">
          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>變更類型</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請選擇變更類型">
              <nz-select formControlName="type" placeholder="請選擇變更類型">
                <nz-option nzValue="追加" nzLabel="追加"></nz-option>
                <nz-option nzValue="追減" nzLabel="追減"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>變更描述</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請輸入變更描述">
              <textarea nz-input formControlName="description" [nzAutosize]="{ minRows: 3, maxRows: 5 }" placeholder="請輸入變更描述">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>變更金額</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請輸入變更金額">
              <nz-input-number formControlName="amount" [nzMin]="0" [nzStep]="1000" style="width: 100%" placeholder="請輸入變更金額" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>變更日期</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請選擇變更日期">
              <nz-date-picker formControlName="date" style="width: 100%" placeholder="請選擇變更日期" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="4" nzRequired>新版本號</nz-form-label>
            <nz-form-control [nzSpan]="20" nzErrorTip="請輸入新版本號">
              <input nz-input formControlName="version" placeholder="請輸入新版本號" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="4" [nzSpan]="20">
              <button nz-button nzType="primary" type="submit" [disabled]="!changeForm.valid"> 提交變更 </button>
              <button nz-button (click)="onCancel()" style="margin-left: 8px;"> 取消 </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </nz-card>
    </nz-card>
  `
})
export class ContractChangeComponent implements OnInit {
  changeForm: FormGroup;
  contractId?: string;
  contract?: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private http: HttpClient
  ) {
    this.changeForm = this.fb.group({
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
      version: ['', [Validators.required]]
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
      // 預設新版本號
      this.changeForm.patchValue({
        version: this.getNextVersion(result.changeVersion)
      });
    });
  }

  getNextVersion(currentVersion: string): string {
    const parts = currentVersion.split('.');
    const major = parseInt(parts[0]);
    const minor = parseInt(parts[1]) + 1;
    return `${major}.${minor}`;
  }

  onSubmit(): void {
    if (this.changeForm.valid) {
      const formValue = this.changeForm.value;

      // 使用 Mock API 提交變更
      this.http.post(`/contract/${this.contractId}/change`, formValue).subscribe(() => {
        this.message.success('合約變更提交成功');
        this.loadContractData();
        this.changeForm.reset();
        this.changeForm.patchValue({
          version: this.getNextVersion(this.contract.changeVersion)
        });
      });
    } else {
      Object.values(this.changeForm.controls).forEach(control => {
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
