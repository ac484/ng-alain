import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { HubCrudService } from './hub-crud.service';
import { Contract } from '../models/hub.model';
import { FabComponent } from '../basic/widget/fab.component';

@Component({
  selector: 'hub-fire-crud',
  standalone: true,
  imports: [FormsModule, NzTableModule, NzButtonModule, NzInputModule, NzPopconfirmModule, FabComponent],
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
        <tr *ngFor="let data of contracts">
          <td>
            <input nz-input [(ngModel)]="data.contractSerial" (ngModelChange)="updateField(data, 'contractSerial', $event)" />
          </td>
          <td>
            <input nz-input [(ngModel)]="data.client" (ngModelChange)="updateField(data, 'client', $event)" />
          </td>
          <td>
            <input nz-input [(ngModel)]="data.contractName" (ngModelChange)="updateField(data, 'contractName', $event)" />
          </td>
          <td>
            <input nz-input [(ngModel)]="data.contractCode" (ngModelChange)="updateField(data, 'contractCode', $event)" />
          </td>
          <td>
            <input nz-input [(ngModel)]="data.feeCode" (ngModelChange)="updateField(data, 'feeCode', $event)" />
          </td>
          <td>
            <input nz-input type="number" [(ngModel)]="data.amount" (ngModelChange)="updateField(data, 'amount', $event)" />
          </td>
          <td>
            <a nz-popconfirm nzPopconfirmTitle="Sure to delete?" (nzOnConfirm)="deleteRow(data.key)">Delete</a>
          </td>
        </tr>
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

  constructor(private crud: HubCrudService) {}

  ngOnInit() {
    this.crud.useCollection<Contract>('hub_contract').subscribe(data => (this.contracts = data));
  }

  addRow() {
    const newContract: Contract = {
      contractSerial: '',
      client: '',
      contractName: '',
      contractCode: '',
      feeCode: '',
      amount: 0
    };
    this.crud.add<Contract>('hub_contract', newContract);
  }

  updateField(data: Contract, field: keyof Contract, value: any) {
    if (!data.key) return;
    this.crud.update<Contract>('hub_contract', data.key, { [field]: value });
  }

  deleteRow(id: string | undefined) {
    if (!id) return;
    this.crud.delete<Contract>('hub_contract', id);
  }
}
