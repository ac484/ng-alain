/**
 * 樹狀設定元件（極簡主義，官方推薦）
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tree-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzSwitchModule, NzInputModule, NzButtonModule],
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label>拖曳</nz-form-label>
        <nz-form-control><nz-switch formControlName="drag"></nz-switch></nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>多選</nz-form-label>
        <nz-form-control><nz-switch formControlName="multi"></nz-switch></nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>搜尋</nz-form-label>
        <nz-form-control><nz-switch formControlName="search"></nz-switch></nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>展開層級</nz-form-label>
        <nz-form-control><input nz-input type="number" formControlName="expandLevel" min="1" /></nz-form-control>
      </nz-form-item>
      <button nz-button nzType="primary" type="submit">儲存</button>
    </form>
  `
})
export class TreeSettingsComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      drag: [true],
      multi: [false],
      search: [true],
      expandLevel: [1]
    });
  }
  onSubmit(): void {
    // 可依需求儲存設定
    console.log(this.form.value);
  }
}
