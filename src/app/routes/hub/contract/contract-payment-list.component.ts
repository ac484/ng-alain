import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ContractPayment, ContractPaymentStep } from './contract-payment.model';
import { ContractPaymentService } from './contract-payment.service';

@Component({
  selector: 'contract-payment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzInputModule],
  template: `
    <nz-table [nzData]="payments">
      <thead>
        <tr>
          <th>金額</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of payments">
          <td>
            <div *ngIf="editId !== p.id" (click)="startEdit(p.id)">{{ p.amount }}</div>
            <input *ngIf="editId === p.id" type="number" nz-input [(ngModel)]="p.amount" (blur)="stopEdit(p)" />
          </td>
          <td>{{ p.status }}</td>
          <td>
            <button nz-button nzType="link" (click)="deleteRow(p.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <button nz-button nzType="primary" (click)="addRow()">新增請款</button>
  `
})
export class ContractPaymentListComponent implements OnInit {
  @Input() contractId!: string;
  payments: ContractPayment[] = [];
  editId: string | null = null;

  constructor(private paymentService: ContractPaymentService) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.list(this.contractId).subscribe(p => (this.payments = p));
  }

  addRow() {
    // TODO: 新增請款邏輯
  }

  startEdit(id: string) {
    this.editId = id;
  }

  stopEdit(p: ContractPayment) {
    // TODO: 更新請款金額
    this.editId = null;
  }

  deleteRow(id: string) {
    // TODO: 刪除請款
  }
}
