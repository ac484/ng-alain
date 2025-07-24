import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { HubCrudService } from './hub-crud.service';
import { Contract } from '../contract/contract.model';
import { FabComponent } from '../basic/widget/fab.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hub-fire-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzInputModule, NzPopconfirmModule, FabComponent, NzSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-fab (onAction)="addRow()"></app-fab>
    <br /><br />
    <nz-table #editRowTable nzBordered [nzData]="contracts">
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
        @for (data of editRowTable.data; track data) {
          <tr class="editable-row">
            <td>
              <div class="editable-cell">
                {{ data.contractSerial }}
              </div>
            </td>
            <td>
              <div class="editable-cell" *ngIf="!(editId === data.key && editField === 'client')" (click)="startEdit(data.key!, 'client')">
                {{ data.client }}
              </div>
              <nz-select
                *ngIf="editId === data.key && editField === 'client'"
                [(ngModel)]="editValue"
                (ngModelChange)="stopEdit(data, 'client')"
                nzSize="small"
                [nzOpen]="true"
                style="min-width: 100px"
              >
                <nz-option *ngFor="let c of clients" [nzValue]="c" [nzLabel]="c"></nz-option>
              </nz-select>
            </td>
            <td>
              <div
                class="editable-cell"
                [hidden]="editId === data.key && editField === 'contractName'"
                (click)="startEdit(data.key!, 'contractName')"
              >
                {{ data.contractName }}
              </div>
              <input
                [hidden]="editId !== data.key || editField !== 'contractName'"
                type="text"
                nz-input
                [(ngModel)]="editValue"
                (blur)="stopEdit(data, 'contractName')"
              />
            </td>
            <td>
              <div
                class="editable-cell"
                [hidden]="editId === data.key && editField === 'contractCode'"
                (click)="startEdit(data.key!, 'contractCode')"
              >
                {{ data.contractCode }}
              </div>
              <input
                [hidden]="editId !== data.key || editField !== 'contractCode'"
                type="text"
                nz-input
                [(ngModel)]="editValue"
                (blur)="stopEdit(data, 'contractCode')"
              />
            </td>
            <td>
              <div
                class="editable-cell"
                [hidden]="editId === data.key && editField === 'feeCode'"
                (click)="startEdit(data.key!, 'feeCode')"
              >
                {{ data.feeCode }}
              </div>
              <input
                [hidden]="editId !== data.key || editField !== 'feeCode'"
                type="text"
                nz-input
                [(ngModel)]="editValue"
                (blur)="stopEdit(data, 'feeCode')"
              />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId === data.key && editField === 'amount'" (click)="startEdit(data.key!, 'amount')">
                {{ data.amount }}
              </div>
              <input
                [hidden]="editId !== data.key || editField !== 'amount'"
                type="number"
                nz-input
                [(ngModel)]="editValue"
                (blur)="stopEdit(data, 'amount')"
              />
            </td>
            <td>
              <a nz-popconfirm nzPopconfirmTitle="Sure to delete?" (nzOnConfirm)="deleteRow(data.key)">Delete</a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      .editable-cell {
        position: relative;
        padding: 5px 12px;
        cursor: pointer;
      }
      .editable-row:hover .editable-cell {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `
  ]
})
export class HubFireCrudComponent implements OnInit {
  contracts: Contract[] = [];
  editId: string | null = null;
  editField: keyof Contract | null = null;
  editValue: any = '';
  clients: string[] = [];

  constructor(
    private crud: HubCrudService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.crud.useCollection<Contract>('hub_contract').subscribe(data => {
      this.contracts = [...data]; // immutable
    });
    // 取得業主清單
    this.loadClients();
  }

  async loadClients() {
    const settings = await this.crud.getClientsSettings();
    this.clients = settings?.list || [];
  }

  async addRow() {
    // 並行取得預設業主與下一個合約序號
    const [defaultClient, contractSerial] = await Promise.all([this.crud.getDefaultClient(), this.crud.getNextContractSerial()]);
    const newContract: Contract = {
      contractSerial,
      client: defaultClient,
      contractName: '',
      contractCode: '',
      feeCode: '',
      amount: 0
    };
    const id = await this.crud.add<Contract>('hub_contract', newContract);
    // 取得新資料後自動進入編輯
    setTimeout(() => {
      this.startEdit(id, 'contractName');
    }, 200);
  }

  startEdit(id: string | undefined, field: keyof Contract) {
    if (!id) {
      this.message.error('資料異常，請重新整理');
      return;
    }
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
      await this.crud.update<Contract>('hub_contract', data.key, { [field]: this.editValue });
    }
    this.editId = null;
    this.editField = null;
    this.editValue = '';
  }

  async deleteRow(id: string | undefined) {
    if (!id) return;
    const contract = this.contracts.find(d => d.key === id);
    this.contracts = this.contracts.filter(d => d.key !== id);
    await this.crud.delete<Contract>('hub_contract', id);
    // 回收 contractSerial
    if (contract?.contractSerial) {
      await this.crud.recycleContractSerial(contract.contractSerial);
    }
  }
}
