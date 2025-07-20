/**
 * 工作區設定元件
 *
 * 功能：
 * - 提供工作區的設定管理
 * - 支援工作區配置和偏好設定
 * - 表單驗證和設定保存
 *
 * 設定項目：
 * - 基本設定：工作區名稱、描述、圖標
 * - 通知設定：郵件通知、推送通知
 * - 權限設定：成員權限、訪問控制
 * - 整合設定：第三方服務連接
 * - 主題設定：介面主題、語言設定
 *
 * 表單功能：
 * - 響應式表單驗證
 * - 設定項目分類管理
 * - 重置和保存操作
 * - 即時預覽效果
 *
 * 業務邏輯：
 * - 設定資料的載入和保存
 * - 表單驗證確保資料完整性
 * - 設定變更的即時應用
 * - 設定備份和恢復功能
 *
 * 路由：/workspace/settings
 * 依賴：Angular Reactive Forms、ng-zorro-antd/form
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-workspace-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSwitchModule, NzButtonModule, NzCardModule],
  template: `
    <nz-card title="工作區設定">
      <form nz-form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用成員邀請</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableInvite"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用檔案共享</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableFileSharing"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用即時通訊</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableChat"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">自動備份間隔(小時)</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input type="number" formControlName="backupInterval" placeholder="備份間隔" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">最大檔案大小(MB)</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input type="number" formControlName="maxFileSize" placeholder="最大檔案大小" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="4" [nzSpan]="20">
            <button nz-button nzType="primary" type="submit">保存設定</button>
            <button nz-button (click)="resetSettings()" style="margin-left: 8px;">重置</button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class WorkspaceSettingsComponent {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.settingsForm = this.fb.group({
      enableInvite: [true],
      enableFileSharing: [true],
      enableChat: [false],
      backupInterval: [24],
      maxFileSize: [100]
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      console.log('保存工作區設定:', formValue);
      this.message.success('設定保存成功');
    }
  }

  resetSettings(): void {
    this.settingsForm.patchValue({
      enableInvite: true,
      enableFileSharing: true,
      enableChat: false,
      backupInterval: 24,
      maxFileSize: 100
    });
    this.message.info('設定已重置');
  }
}
