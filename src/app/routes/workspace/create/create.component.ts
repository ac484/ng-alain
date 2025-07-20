/**
 * 工地重設備搬運創建元件
 *
 * 功能：
 * - 提供工地項目和設備的創建表單
 * - 支援工地基本資訊和設備登記設定
 * - 表單驗證和資料提交
 *
 * 表單欄位：
 * - 項目/設備名稱：必填，工地項目或設備的顯示名稱
 * - 類型：必選，工地項目/設備管理/施工區域/運輸任務
 * - 描述：選填，詳細說明
 * - 負責人：必填，項目負責人或設備操作員
 * - 開始日期：必填，項目開始時間
 * - 預計工期：必填，預計完成時間
 *
 * 業務邏輯：
 * - 表單驗證確保資料完整性
 * - 創建成功後導向工地列表
 * - 支援取消操作返回列表
 * - 項目類型影響後續功能配置
 *
 * 路由：/workspace/create
 * 依賴：Angular Reactive Forms、ng-zorro-antd/form
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzDatePickerModule
  ],
  template: `
    <nz-card title="創建工地項目/設備">
      <form nz-form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>項目/設備名稱</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入項目/設備名稱">
            <input nz-input formControlName="name" placeholder="請輸入項目/設備名稱" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>類型</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇類型">
            <nz-select formControlName="type" placeholder="請選擇類型">
              <nz-option nzValue="工地項目" nzLabel="工地項目"></nz-option>
              <nz-option nzValue="設備管理" nzLabel="設備管理"></nz-option>
              <nz-option nzValue="施工區域" nzLabel="施工區域"></nz-option>
              <nz-option nzValue="運輸任務" nzLabel="運輸任務"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>負責人</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入負責人">
            <input nz-input formControlName="manager" placeholder="請輸入負責人姓名" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>開始日期</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇開始日期">
            <nz-date-picker formControlName="startDate" placeholder="請選擇開始日期" style="width: 100%;"></nz-date-picker>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>預計工期(天)</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入預計工期">
            <input nz-input type="number" formControlName="duration" placeholder="請輸入預計工期" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">聯絡電話</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input formControlName="phone" placeholder="請輸入聯絡電話" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">描述</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <textarea
              nz-input
              formControlName="description"
              [nzAutosize]="{ minRows: 3, maxRows: 5 }"
              placeholder="請輸入詳細描述"
            ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="4" [nzSpan]="20">
            <button nz-button nzType="primary" type="submit" [disabled]="!workspaceForm.valid">創建項目/設備</button>
            <button nz-button (click)="onCancel()" style="margin-left: 8px;">取消</button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class WorkspaceCreateComponent {
  workspaceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {
    this.workspaceForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [null, [Validators.required]],
      manager: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      duration: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      phone: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const formValue = this.workspaceForm.value;
      console.log('創建工地項目/設備:', formValue);
      this.message.success('工地項目/設備創建成功');
      this.router.navigate(['/workspace/list']);
    } else {
      Object.values(this.workspaceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/workspace/list']);
  }
}
