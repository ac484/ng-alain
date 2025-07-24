import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { HubCrudService } from './hub-crud.service';
import { FabComponent } from '../basic/widget/fab/fab.component';
import { Contract } from '../models/hub.model';

@Component({
  selector: 'hub-fire-crud',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NzTableModule, NzButtonModule, ReactiveFormsModule, DecimalPipe, FabComponent],
  template: `
    <app-fab (onAction)="handleFabAction($event)"></app-fab>
    <form *ngIf="showForm" [formGroup]="form" (ngSubmit)="add()" style="margin-bottom: 16px;">
      <input nz-input placeholder="序號" formControlName="contractSerial" style="width: 100px; margin-right: 8px;" />
      <input nz-input placeholder="業主" formControlName="client" style="width: 100px; margin-right: 8px;" />
      <input nz-input placeholder="合約名稱" formControlName="contractName" style="width: 120px; margin-right: 8px;" />
      <input nz-input placeholder="案號" formControlName="contractCode" style="width: 80px; margin-right: 8px;" />
      <input nz-input placeholder="費用碼" formControlName="feeCode" style="width: 80px; margin-right: 8px;" />
      <input nz-input type="number" placeholder="金額" formControlName="amount" style="width: 100px; margin-right: 8px;" />
      <button nz-button nzType="primary" [disabled]="form.invalid">新增</button>
    </form>
    <nz-table [nzData]="contracts" nzTableLayout="fixed">
      <thead>
        <tr>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>案號</th>
          <th>費用碼</th>
          <th>金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of contracts">
          <td>{{ c.contractSerial }}</td>
          <td>{{ c.client }}</td>
          <td>{{ c.contractName }}</td>
          <td>{{ c.contractCode }}</td>
          <td>{{ c.feeCode }}</td>
          <td>{{ c.amount | number: '1.0-0' }}</td>
          <td>
            <button nz-button nzType="default" nzDanger (click)="delete(c.key!)">刪除</button>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class HubFireCrudComponent implements OnDestroy {
  contracts: Contract[] = [];
  form: FormGroup;
  showForm = false;
  private destroy$ = new Subject<void>();
  editKey: string | null = null;
  editField: string | null = null;

  constructor(
    private fb: FormBuilder,
    private crud: HubCrudService
  ) {
    this.form = this.fb.group({
      contractSerial: ['', Validators.required],
      client: ['', Validators.required],
      contractName: ['', Validators.required],
      contractCode: [''],
      feeCode: [''],
      amount: [0, [Validators.required, Validators.min(1)]]
    });

    this.crud
      .useCollection<Contract>('hub_contract')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Contract[]) => (this.contracts = data));
  }

  async handleFabAction(type: string) {
    if (type === 'add') {
      // 自動產生唯一序號，建立空白合約
      const serial = await this.crud.getNextContractSerial();
      const defaultClient = await this.crud.getDefaultClient();
      const newContract: Contract = {
        contractSerial: serial,
        client: defaultClient,
        contractName: '',
        contractCode: '',
        feeCode: '',
        amount: 0
      };
      const id = await this.crud.add<Contract>('hub_contract', newContract);
      this.editKey = id;
      this.editField = 'client'; // 可用於自動聚焦
      this.showForm = false; // 不顯示表單，直接進入單格編輯
    }
  }

  add() {
    if (this.form.invalid) return;
    this.crud.add<Contract>('hub_contract', this.form.value).then(() => this.form.reset());
  }

  delete(id: string) {
    this.crud.delete<Contract>('hub_contract', id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
