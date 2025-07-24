import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'hub-contract',
  standalone: true,
  imports: [NzTableModule, NzInputModule, FormsModule, DecimalPipe],
  template: `
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
        <tr *ngFor="let data of nzTable.data">
          <td>{{ data.contractSerial }}</td>
          <td>
            <div *ngIf="editId !== data.contractSerial" (click)="startEdit(data.contractSerial)">
              {{ data.client }}
            </div>
            <input *ngIf="editId === data.contractSerial" nz-input [(ngModel)]="data.client" (blur)="stopEdit()" />
          </td>
          <td>
            <div *ngIf="editId !== data.contractSerial" (click)="startEdit(data.contractSerial)">
              {{ data.contractName }}
            </div>
            <input *ngIf="editId === data.contractSerial" nz-input [(ngModel)]="data.contractName" (blur)="stopEdit()" />
          </td>
          <td>
            <div *ngIf="editId !== data.contractSerial" (click)="startEdit(data.contractSerial)">
              {{ data.contractCode }}
            </div>
            <input *ngIf="editId === data.contractSerial" nz-input [(ngModel)]="data.contractCode" (blur)="stopEdit()" />
          </td>
          <td>
            <div *ngIf="editId !== data.contractSerial" (click)="startEdit(data.contractSerial)">
              {{ data.feeCode }}
            </div>
            <input *ngIf="editId === data.contractSerial" nz-input [(ngModel)]="data.feeCode" (blur)="stopEdit()" />
          </td>
          <td>
            <div *ngIf="editId !== data.contractSerial" (click)="startEdit(data.contractSerial)">
              {{ data.amount | number: '1.0-0' }}
            </div>
            <input *ngIf="editId === data.contractSerial" nz-input type="number" [(ngModel)]="data.amount" (blur)="stopEdit()" />
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class HubContractComponent {
  editId: string | null = null;

  listOfData = [
    {
      contractSerial: 'C00001',
      client: '台灣電力公司',
      contractName: '台電南部電廠維護合約',
      contractCode: '10001',
      feeCode: '20001',
      amount: 1000000
    },
    {
      contractSerial: 'C00002',
      client: '台灣自來水公司',
      contractName: '自來水管線維護合約',
      contractCode: '10002',
      feeCode: '20002',
      amount: 800000
    },
    {
      contractSerial: 'C00003',
      client: '中華電信',
      contractName: '光纖建置合約',
      contractCode: '10003',
      feeCode: '20003',
      amount: 1500000
    }
  ];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
}
