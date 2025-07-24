import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DecimalPipe, NgStyle } from '@angular/common';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FabComponent } from '../basic/widget/fab/fab.component';
import { CommonModule } from '@angular/common';
import { Contract } from '../models/hub.model'; // 假設 Contract 型別已在 hub.model.ts 定義
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'hub-contract',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FabComponent,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    DecimalPipe,
    DragDropModule
  ],
  template: `
    <app-fab (onAction)="handleFabAction($event)"></app-fab>
    <div class="fab-form" *ngIf="showForm">
      <form [formGroup]="form" (ngSubmit)="submit()" nz-form>
        <div nz-form-item>
          <div nz-form-label><label>序號</label></div>
          <div nz-form-control>
            <input nz-input formControlName="contractSerial" />
          </div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>業主</label></div>
          <div nz-form-control>
            <input nz-input formControlName="client" />
          </div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>合約名稱</label></div>
          <div nz-form-control>
            <input nz-input formControlName="contractName" />
          </div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>合約案號識別碼</label></div>
          <div nz-form-control>
            <input nz-input formControlName="contractCode" />
          </div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>合約費用識別碼</label></div>
          <div nz-form-control>
            <input nz-input formControlName="feeCode" />
          </div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>合約金額</label></div>
          <div nz-form-control>
            <input nz-input type="number" formControlName="amount" />
          </div>
        </div>
        <div style="text-align:right; margin-top: 8px;">
          <button nz-button nzType="primary" [nzLoading]="isSubmitting" [disabled]="form.invalid" htmlType="submit">新增合約</button>
          <button nz-button style="margin-left: 8px;" (click)="toggleForm()" type="button">取消</button>
        </div>
      </form>
    </div>
    <nz-table #nzTable [nzData]="listOfData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th nzWidth="100px">序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>合約案號識別碼</th>
          <th>合約費用識別碼</th>
          <th>合約金額</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of listOfData">
          <td>{{ data.contractSerial }}</td>
          <td>{{ data.client }}</td>
          <td>{{ data.contractName }}</td>
          <td>{{ data.contractCode }}</td>
          <td>{{ data.feeCode }}</td>
          <td>{{ data.amount | number: '1.0-0' }}</td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      .fab-form {
        position: fixed;
        width: 260px;
        background: #fff;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
        border-radius: 8px;
        padding: 12px 12px 8px 12px;
        z-index: 1100;
      }
      .fab-form .nz-form-item {
        margin-bottom: 8px;
      }
      .fab-form input[nz-input] {
        font-size: 13px;
        padding: 2px 8px;
        height: 28px;
      }
      .fab-form label {
        font-size: 12px;
        margin-bottom: 2px;
      }
      .fab-form button[nz-button] {
        height: 28px;
        font-size: 13px;
        padding: 0 10px;
      }
    `
  ]
})
export class HubContractComponent {
  listOfData: Contract[] = [];
  isSubmitting = false;
  form: FormGroup;
  showForm = false;
  editKey: string | null = null;
  editField: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hubCrud: HubCrudService
  ) {
    this.form = this.fb.group({
      contractSerial: ['', [Validators.required]],
      client: ['', [Validators.required]],
      contractName: ['', [Validators.required]],
      contractCode: [''],
      feeCode: [''],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
    // 即時監聽 hub_contract 集合
    this.hubCrud.useCollection<Contract>('hub_contract').subscribe((data: Contract[]) => {
      this.listOfData = data;
    });
  }

  async handleFabAction(type: string) {
    if (type === 'add') {
      const serial = await this.hubCrud.getNextContractSerial();
      const defaultClient = await this.hubCrud.getDefaultClient();
      const newContract: Contract = {
        contractSerial: serial,
        client: defaultClient,
        contractName: '',
        contractCode: '',
        feeCode: '',
        amount: 0
      };
      const id = await this.hubCrud.add<Contract>('hub_contract', newContract);
      this.editKey = id;
      this.editField = 'client';
      this.showForm = false;
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.form.reset();
    }
  }

  async submit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    try {
      await this.hubCrud.add('hub_contract', this.form.value);
      this.showForm = false;
      this.form.reset();
    } finally {
      this.isSubmitting = false;
    }
  }
}
