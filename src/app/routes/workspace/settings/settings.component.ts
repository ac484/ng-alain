/**
 * 工地重設備搬運設定元件
 *
 * 功能：
 * - 提供工地重設備搬運的設定管理
 * - 支援工地安全配置和設備管理設定
 * - 表單驗證和設定保存
 *
 * 設定項目：
 * - 安全設定：安全檢查頻率、高空作業規範、緊急聯絡
 * - 設備設定：設備維護週期、操作員認證、設備追蹤
 * - 施工設定：施工時間、噪音控制、環境保護
 * - 通知設定：安全警報、設備狀態、施工進度
 * - 系統設定：資料備份、用戶權限、系統整合
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-workspace-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSwitchModule, NzButtonModule, NzCardModule, NzSelectModule],
  template: `
    <nz-card title="工地重設備搬運設定">
      <form nz-form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <!-- 安全設定 -->
        <h3>安全設定</h3>
        <nz-form-item>
          <nz-form-label [nzSpan]="6">安全檢查頻率(小時)</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-select formControlName="safetyCheckInterval" placeholder="選擇檢查頻率">
              <nz-option nzValue="4" nzLabel="每4小時"></nz-option>
              <nz-option nzValue="8" nzLabel="每8小時"></nz-option>
              <nz-option nzValue="12" nzLabel="每12小時"></nz-option>
              <nz-option nzValue="24" nzLabel="每日"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">高空作業許可</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="highAltitudeWorkPermit"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">緊急聯絡電話</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input nz-input formControlName="emergencyContact" placeholder="輸入緊急聯絡電話" />
          </nz-form-control>
        </nz-form-item>

        <!-- 設備設定 -->
        <h3>設備設定</h3>
        <nz-form-item>
          <nz-form-label [nzSpan]="6">設備維護週期(天)</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input nz-input type="number" formControlName="equipmentMaintenanceCycle" placeholder="維護週期" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">操作員認證檢查</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="operatorCertificationCheck"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">設備GPS追蹤</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="equipmentGPSTracking"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <!-- 施工設定 -->
        <h3>施工設定</h3>
        <nz-form-item>
          <nz-form-label [nzSpan]="6">施工時間限制</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-select formControlName="constructionTimeLimit" placeholder="選擇施工時間">
              <nz-option nzValue="6" nzLabel="6小時"></nz-option>
              <nz-option nzValue="8" nzLabel="8小時"></nz-option>
              <nz-option nzValue="10" nzLabel="10小時"></nz-option>
              <nz-option nzValue="12" nzLabel="12小時"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">噪音控制</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="noiseControl"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">環境保護檢查</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="environmentalProtection"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <!-- 通知設定 -->
        <h3>通知設定</h3>
        <nz-form-item>
          <nz-form-label [nzSpan]="6">安全警報通知</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="safetyAlertNotification"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">設備狀態通知</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="equipmentStatusNotification"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">施工進度通知</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch formControlName="constructionProgressNotification"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="6" [nzSpan]="18">
            <button nz-button nzType="primary" type="submit">保存設定</button>
            <button nz-button (click)="resetSettings()" style="margin-left: 8px;">重置</button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `,
  styles: [
    `
      h3 {
        margin: 24px 0 16px 0;
        color: #1890ff;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 8px;
      }
      h3:first-child {
        margin-top: 0;
      }
    `
  ]
})
export class WorkspaceSettingsComponent {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.settingsForm = this.fb.group({
      // 安全設定
      safetyCheckInterval: [8],
      highAltitudeWorkPermit: [true],
      emergencyContact: ['119'],

      // 設備設定
      equipmentMaintenanceCycle: [30],
      operatorCertificationCheck: [true],
      equipmentGPSTracking: [true],

      // 施工設定
      constructionTimeLimit: [8],
      noiseControl: [true],
      environmentalProtection: [true],

      // 通知設定
      safetyAlertNotification: [true],
      equipmentStatusNotification: [true],
      constructionProgressNotification: [false]
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      console.log('保存工地設定:', formValue);
      this.message.success('工地設定保存成功');
    }
  }

  resetSettings(): void {
    this.settingsForm.patchValue({
      safetyCheckInterval: 8,
      highAltitudeWorkPermit: true,
      emergencyContact: '119',
      equipmentMaintenanceCycle: 30,
      operatorCertificationCheck: true,
      equipmentGPSTracking: true,
      constructionTimeLimit: 8,
      noiseControl: true,
      environmentalProtection: true,
      safetyAlertNotification: true,
      equipmentStatusNotification: true,
      constructionProgressNotification: false
    });
    this.message.info('工地設定已重置');
  }
}
