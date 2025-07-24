import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { FabComponent } from '../basic/widget/fab.component';
import { HubCrudService } from '../fire-crud/hub-crud.service';

@Component({
  selector: 'contract-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzInputModule, NzPopconfirmModule, FabComponent],
  template: `
    <app-fab (onAction)="addRow()"></app-fab>
    <br />
    <br />
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
        @for (c of editRowTable.data; track c) {
          <tr class="editable-row">
            <td>{{ c.contractSerial }}</td>
            <td>
              <div class="editable-cell" [hidden]="editId === c.key" (click)="startEdit(c.key)">
                {{ c.client }}
              </div>
              <input [hidden]="editId !== c.key" type="text" nz-input [(ngModel)]="c.client" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId === c.key" (click)="startEdit(c.key)">
                {{ c.contractName }}
              </div>
              <input [hidden]="editId !== c.key" type="text" nz-input [(ngModel)]="c.contractName" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId === c.key" (click)="startEdit(c.key)">
                {{ c.contractCode }}
              </div>
              <input [hidden]="editId !== c.key" type="text" nz-input [(ngModel)]="c.contractCode" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId === c.key" (click)="startEdit(c.key)">
                {{ c.feeCode }}
              </div>
              <input [hidden]="editId !== c.key" type="text" nz-input [(ngModel)]="c.feeCode" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId === c.key" (click)="startEdit(c.key)">
                {{ c.amount }}
              </div>
              <input [hidden]="editId !== c.key" type="number" nz-input [(ngModel)]="c.amount" (blur)="stopEdit(c)" />
            </td>
            <td>
              <a nz-popconfirm nzPopconfirmTitle="確定刪除？" (nzOnConfirm)="deleteRow(c.key)">刪除</a>
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
export class ContractListComponent implements OnInit {
  contracts: Contract[] = [];
  editId: string | null = null;
  clients: string[] = [];

  constructor(
    private contractService: ContractService,
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

  async addRow() {
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
    this.contracts = [...this.contracts, { ...newContract, key: id }];
    setTimeout(() => {
      this.startEdit(id);
    }, 200);
  }

  startEdit(id: string | undefined) {
    if (!id) return;
    this.editId = id;
    setTimeout(() => {
      const input = document.querySelector('input[nz-input]:not([hidden])');
      if (input) (input as HTMLInputElement).focus();
    }, 50);
  }

  async stopEdit(c: Contract) {
    if (c.key) {
      await this.contractService.update(c.key, c);
    }
    this.editId = null;
  }

  async deleteRow(id: string | undefined) {
    if (!id) return;
    await this.contractService.delete(id);
    this.contracts = this.contracts.filter(d => d.key !== id);
  }
}
