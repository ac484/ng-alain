import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, NzCardModule],
  template: `
    <nz-card title="創建工作區">
      <form nz-form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>工作區名稱</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入工作區名稱">
            <input nz-input formControlName="name" placeholder="請輸入工作區名稱" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>工作區類型</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇工作區類型">
            <nz-select formControlName="type" placeholder="請選擇工作區類型">
              <nz-option nzValue="開發" nzLabel="開發"></nz-option>
              <nz-option nzValue="設計" nzLabel="設計"></nz-option>
              <nz-option nzValue="測試" nzLabel="測試"></nz-option>
              <nz-option nzValue="管理" nzLabel="管理"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">最大成員數</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <input nz-input type="number" formControlName="maxMembers" placeholder="請輸入最大成員數" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">描述</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <textarea
              nz-input
              formControlName="description"
              [nzAutosize]="{ minRows: 3, maxRows: 5 }"
              placeholder="請輸入工作區描述"
            ></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="4" [nzSpan]="20">
            <button nz-button nzType="primary" type="submit" [disabled]="!workspaceForm.valid">創建工作區</button>
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
      maxMembers: [10, [Validators.min(1), Validators.max(100)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const formValue = this.workspaceForm.value;
      console.log('創建工作區:', formValue);
      this.message.success('工作區創建成功');
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
