import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Contract } from '../../models/hub.model';

@Component({
  selector: 'app-contract-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, DecimalPipe],
  template: `
    <nz-table [nzData]="contracts" nzTableLayout="fixed">
      <thead>
        <tr>
          <th nzWidth="100px">序號</th>
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
          <td>{{ data.contractSerial }}</td>
          <td>{{ data.client }}</td>
          <td>{{ data.contractName }}</td>
          <td>{{ data.contractCode }}</td>
          <td>{{ data.feeCode }}</td>
          <td>{{ data.amount | number: '1.0-0' }}</td>
          <td>
            <button nz-button nzType="default" (click)="edit.emit(data)">編輯</button>
            <button nz-button nzType="default" nzDanger (click)="delete.emit(data)">刪除</button>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class ContractTableComponent {
  @Input() contracts: Contract[] = [];
  @Output() edit = new EventEmitter<Contract>();
  @Output() delete = new EventEmitter<Contract>();
}
