import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ContractService } from '../../services';
import { Contract } from '../../models';

@Component({
  selector: 'hub-contract-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzInputNumberModule
  ],
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label nzRequired>合約名稱</nz-form-label>
        <nz-form-control nzErrorTip="請輸入合約名稱">
          <input nz-input formControlName="contractName" placeholder="請輸入合約名稱" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label nzRequired>業主</nz-form-label>
        <nz-form-control nzErrorTip="請輸入業主">
          <input nz-input formControlName="client" placeholder="請輸入業主" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label nzRequired>合約金額</nz-form-label>
        <nz-form-control nzErrorTip="請輸入合約金額">
          <nz-input-number 
            formControlName="amount" 
            [nzMin]="0" 
            [nzFormatter]="currencyFormatter"
            [nzParser]="currencyParser"
            style="width: 100%">
          </nz-input-number>
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
export class ContractFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isEdit = false;
  contractId?: string;

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      contractName: ['', [Validators.required]],
      client: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEdit = !!this.contractId;

    if (this.isEdit && this.contractId) {
      this.loadContract();
    }
  }

  private loadContract() {
    // Implementation would load contract data
    // For now, keeping it simple
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      try {
        const formValue = this.form.value;

        if (this.isEdit && this.contractId) {
          await this.contractService.update(this.contractId, formValue);
        } else {
          const contractSerial = await this.contractService.getNextContractSerial();
          await this.contractService.add({
            ...formValue,
            contractSerial
          });
        }

        this.router.navigate(['/hub/contracts']);
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  onCancel() {
    this.router.navigate(['/hub/contracts']);
  }

  currencyFormatter = (value: number): string => `$ ${value}`;
  currencyParser = (value: string): number => {
    const parsed = value.replace(/\$ /g, '');
    return parseFloat(parsed) || 0;
  };
}