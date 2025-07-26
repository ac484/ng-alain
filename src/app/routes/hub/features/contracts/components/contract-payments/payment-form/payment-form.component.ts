import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ContractPayment } from '../../../models';

export interface PaymentFormData {
  amount: number;
  remark: string;
  attachments: string[];
}

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
    <form nz-form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>付款金額</nz-form-label>
        <nz-form-control [nzSpan]="18" nzErrorTip="請輸入有效的付款金額">
          <nz-input-number
            formControlName="amount"
            [nzMin]="0.01"
            [nzStep]="0.01"
            nzPlaceHolder="請輸入付款金額"
            style="width: 100%">
          </nz-input-number>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">備註</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <textarea
            nz-input
            formControlName="remark"
            rows="3"
            placeholder="請輸入備註說明">
          </textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzOffset]="6" [nzSpan]="18">
          <button
            nz-button
            nzType="primary"
            [nzLoading]="isSubmitting()"
            [disabled]="!paymentForm.valid || isSubmitting()"
            type="submit">
            {{ editMode() ? '更新' : '創建' }}付款請求
          </button>
          <button
            nz-button
            type="button"
            (click)="onCancel()"
            style="margin-left: 8px;">
            取消
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class PaymentFormComponent implements OnInit {
  @Input() payment: ContractPayment | null = null;
  @Input() contractId: string = '';
  @Output() formSubmit = new EventEmitter<PaymentFormData>();
  @Output() formCancel = new EventEmitter<void>();

  // Signals for reactive state management
  isSubmitting = signal(false);
  editMode = computed(() => !!this.payment);

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.payment) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      remark: ['']
    });
  }

  private populateForm(): void {
    if (this.payment) {
      this.paymentForm.patchValue({
        amount: this.payment.amount,
        remark: this.payment.remark
      });
    }
  }

  onSubmit(): void {
    if (this.paymentForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      const formData: PaymentFormData = {
        amount: this.paymentForm.value.amount,
        remark: this.paymentForm.value.remark || '',
        attachments: []
      };

      this.formSubmit.emit(formData);

      // Reset submitting state after a delay
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}