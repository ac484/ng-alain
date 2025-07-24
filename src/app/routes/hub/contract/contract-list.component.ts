import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FabComponent } from '../basic/widget/fab.component';
import { HubCrudService } from '../fire-crud/hub-crud.service';

@Component({
  selector: 'contract-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzSelectModule, FabComponent],
  template: `
    <app-fab (onAction)="add()"></app-fab>
    <nz-table [nzData]="contracts" nzBordered>
      <thead>
        <tr>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>合約案號識別碼</th>
          <th>合約費用識別碼</th>
          <th>合約金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of contracts">
          <td>{{ c.contractSerial }}</td>
          <td>
            <div *ngIf="!(editId === c.key && editField === 'client')" (click)="startEdit(c.key, 'client')">
              {{ c.client }}
            </div>
            <nz-select
              *ngIf="editId === c.key && editField === 'client'"
              [(ngModel)]="editValue"
              (ngModelChange)="stopEdit(c, 'client')"
              nzSize="small"
              [nzOpen]="true"
              style="min-width: 100px"
            >
              <nz-option *ngFor="let cl of clients" [nzValue]="cl" [nzLabel]="cl"></nz-option>
            </nz-select>
          </td>
          <td>
            <div *ngIf="!(editId === c.key && editField === 'contractName')" (click)="startEdit(c.key, 'contractName')">
              {{ c.contractName }}
            </div>
            <input
              *ngIf="editId === c.key && editField === 'contractName'"
              type="text"
              nz-input
              [(ngModel)]="editValue"
              (blur)="stopEdit(c, 'contractName')"
            />
          </td>
          <td>
            <div *ngIf="!(editId === c.key && editField === 'contractCode')" (click)="startEdit(c.key, 'contractCode')">
              {{ c.contractCode }}
            </div>
            <input
              *ngIf="editId === c.key && editField === 'contractCode'"
              type="text"
              nz-input
              [(ngModel)]="editValue"
              (blur)="stopEdit(c, 'contractCode')"
            />
          </td>
          <td>
            <div *ngIf="!(editId === c.key && editField === 'feeCode')" (click)="startEdit(c.key, 'feeCode')">
              {{ c.feeCode }}
            </div>
            <input
              *ngIf="editId === c.key && editField === 'feeCode'"
              type="text"
              nz-input
              [(ngModel)]="editValue"
              (blur)="stopEdit(c, 'feeCode')"
            />
          </td>
          <td>
            <div *ngIf="!(editId === c.key && editField === 'amount')" (click)="startEdit(c.key, 'amount')">
              {{ c.amount }}
            </div>
            <input
              *ngIf="editId === c.key && editField === 'amount'"
              type="number"
              nz-input
              [(ngModel)]="editValue"
              (blur)="stopEdit(c, 'amount')"
            />
          </td>
          <td>
            <button nz-button nzType="link" (click)="remove(c)">刪除</button>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [``]
})
export class ContractListComponent implements OnInit {
  contracts: Contract[] = [];
  clients: string[] = [];
  editId: string | null = null;
  editField: keyof Contract | null = null;
  editValue: any = '';

  constructor(
    private contractService: ContractService,
    private modal: NzModalService,
    private hubCrud: HubCrudService
  ) {}
  ngOnInit() {
    this.refresh();
    this.hubCrud.getClientsSettings().then(settings => {
      this.clients = settings?.list || [];
    });
  }
  refresh() {
    this.contractService.list().subscribe(c => (this.contracts = c));
  }
  async add() {
    // 取得預設業主與下一個合約序號
    const [defaultClient, contractSerial] = await Promise.all([this.hubCrud.getDefaultClient(), this.hubCrud.getNextContractSerial()]);
    const newContract: Contract = {
      contractSerial,
      client: defaultClient,
      contractName: '',
      contractCode: '',
      feeCode: '',
      amount: 0
    };
    const id = await this.contractService.add(newContract);
    // 取得新資料後自動進入編輯
    setTimeout(() => {
      this.startEdit(id, 'contractName');
    }, 200);
  }
  startEdit(id: string | undefined, field: keyof Contract) {
    if (!id) return;
    this.editId = id;
    this.editField = field;
    const row = this.contracts.find(c => c.key === id);
    this.editValue = row ? row[field] : '';
    setTimeout(() => {
      const input = document.querySelector('input[nz-input]:not([hidden])');
      if (input) (input as HTMLInputElement).focus();
    }, 50);
  }
  async stopEdit(data: Contract, field: keyof Contract) {
    if (data.key && this.editValue !== data[field]) {
      const updated = { ...data, [field]: this.editValue };
      this.contracts = this.contracts.map(c => (c.key === data.key ? updated : c));
      await this.contractService.update(data.key, { [field]: this.editValue });
    }
    this.editId = null;
    this.editField = null;
    this.editValue = '';
  }
  remove(c: Contract) {
    if (c.key) this.contractService.delete(c.key).then(() => this.refresh());
  }
}
