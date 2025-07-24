import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contract } from './contract.model';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'contract-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, NzButtonModule, NzSelectModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>合約名稱：<input formControlName="contractName" /></label><br />
      <label
        >業主：
        <nz-select formControlName="client" style="min-width: 120px;">
          <nz-option *ngFor="let c of clients" [nzValue]="c" [nzLabel]="c"></nz-option>
        </nz-select> </label
      ><br />
      <label>合約案號識別碼：<input formControlName="contractCode" /></label><br />
      <label>合約費用識別碼：<input formControlName="feeCode" /></label><br />
      <label>合約金額：<input type="number" formControlName="amount" /></label><br />
      <div style="margin-top: 16px;">
        <button nz-button nzType="primary" [disabled]="form.invalid">儲存</button>
        <button nz-button nzType="default" type="button" (click)="cancel.emit()">取消</button>
      </div>
    </form>
  `
})
export class ContractFormComponent implements OnChanges {
  @Input() contract: Contract | null = null;
  @Input() clients: string[] = [];
  @Output() save = new EventEmitter<Partial<Contract>>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contractName: ['', Validators.required],
      client: ['', Validators.required],
      contractCode: [''],
      feeCode: [''],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contract'] && this.contract) {
      this.form.patchValue(this.contract);
    } else if (changes['contract'] && !this.contract) {
      this.form.reset({ contractName: '', client: '', contractCode: '', feeCode: '', amount: 0 });
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
