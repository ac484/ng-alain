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
  selector: 'app-tree-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, NzCardModule],
  template: `
    <nz-card title="創建樹狀結構">
      <form nz-form [formGroup]="treeForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>樹狀名稱</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入樹狀名稱">
            <input nz-input formControlName="name" placeholder="請輸入樹狀名稱" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>樹狀類型</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請選擇樹狀類型">
            <nz-select formControlName="type" placeholder="請選擇樹狀類型">
              <nz-option nzValue="組織" nzLabel="組織"></nz-option>
              <nz-option nzValue="分類" nzLabel="分類"></nz-option>
              <nz-option nzValue="權限" nzLabel="權限"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4" nzRequired>最大層級</nz-form-label>
          <nz-form-control [nzSpan]="20" nzErrorTip="請輸入最大層級">
            <input nz-input type="number" formControlName="maxLevel" placeholder="請輸入最大層級" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="4">描述</nz-form-label>
          <nz-form-control [nzSpan]="20">
            <textarea nz-input formControlName="description" [nzAutosize]="{ minRows: 3, maxRows: 5 }" placeholder="請輸入描述"></textarea>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control [nzOffset]="4" [nzSpan]="20">
            <button nz-button nzType="primary" type="submit" [disabled]="!treeForm.valid">創建樹狀結構</button>
            <button nz-button (click)="onCancel()" style="margin-left: 8px;">取消</button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class TreeCreateComponent {
  treeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {
    this.treeForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [null, [Validators.required]],
      maxLevel: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.treeForm.valid) {
      const formValue = this.treeForm.value;
      console.log('創建樹狀結構:', formValue);
      this.message.success('樹狀結構創建成功');
      this.router.navigate(['/tree/list']);
    } else {
      Object.values(this.treeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tree/list']);
  }
}
