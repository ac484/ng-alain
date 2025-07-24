import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContractPayment } from './contract-payment.model';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'contract-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, NzButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>金額：<input formControlName="amount" type="number" /></label><br />
      <label>備註：<input formControlName="remark" /></label><br />
      <div style="margin-top: 16px;">
        <button nz-button nzType="primary" [disabled]="form.invalid">儲存</button>
        <button nz-button nzType="default" type="button" (click)="cancel.emit()">取消</button>
      </div>
    </form>
  `
})
export class ContractPaymentFormComponent implements OnChanges {
  @Input() payment: ContractPayment | null = null;
  @Output() save = new EventEmitter<Partial<ContractPayment>>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0)]],
      remark: ['']
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['payment'] && this.payment) {
      this.form.patchValue(this.payment);
    } else if (changes['payment'] && !this.payment) {
      this.form.reset({ amount: 0, remark: '' });
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
