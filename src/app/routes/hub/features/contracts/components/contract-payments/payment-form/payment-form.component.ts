import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'hub-payment-form',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberModule,
        NzButtonModule
    ],
    template: `
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label nzRequired>付款金額</nz-form-label>
        <nz-form-control nzErrorTip="請輸入付款金額">
          <nz-input-number 
            formControlName="amount" 
            [nzMin]="0" 
            style="width: 100%">
          </nz-input-number>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label>備註</nz-form-label>
        <nz-form-control>
          <textarea nz-input formControlName="remark" rows="3" placeholder="請輸入備註"></textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [nzLoading]="loading">
            {{ isEdit ? '更新' : '創建' }}
          </button>
          <button nz-button type="button" (click)="onCancel()" style="margin-left: 8px;">
            取消
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class PaymentFormComponent {
    @Input() payment?: any;
    @Input() loading = false;
    @Output() formSubmit = new EventEmitter<any>();
    @Output() formCancel = new EventEmitter<void>();

    form: FormGroup;
    isEdit = false;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            amount: [0, [Validators.required, Validators.min(0)]],
            remark: ['']
        });
    }

    ngOnInit() {
        this.isEdit = !!this.payment;
        if (this.payment) {
            this.form.patchValue(this.payment);
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value);
        }
    }

    onCancel() {
        this.formCancel.emit();
    }
}