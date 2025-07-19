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
  selector: 'app-tree-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSwitchModule, NzButtonModule, NzCardModule],
  template: `
    <nz-card title="樹狀設定">
      <form nz-form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用拖拽排序</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableDrag"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用多選</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableMultiSelect"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">啟用搜尋</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <nz-switch formControlName="enableSearch"></nz-switch>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">預設展開層級</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input type="number" formControlName="defaultExpandLevel" placeholder="預設展開層級" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">節點間距</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input type="number" formControlName="nodeSpacing" placeholder="節點間距(px)" />
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
export class TreeSettingsComponent {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.settingsForm = this.fb.group({
      enableDrag: [true],
      enableMultiSelect: [false],
      enableSearch: [true],
      defaultExpandLevel: [1],
      nodeSpacing: [20]
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      console.log('保存樹狀設定:', formValue);
      this.message.success('設定保存成功');
    }
  }

  resetSettings(): void {
    this.settingsForm.patchValue({
      enableDrag: true,
      enableMultiSelect: false,
      enableSearch: true,
      defaultExpandLevel: 1,
      nodeSpacing: 20
    });
    this.message.info('設定已重置');
  }
}
