import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../models/hub.model';
import { EditableCellComponent } from './editable-cell.component';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [CommonModule, EditableCellComponent],
  template: `
    <div class="contract-edit-table">
      <table>
        <tr>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>合約案號識別碼</th>
          <th>合約費用識別碼</th>
          <th>合約金額</th>
        </tr>
        <tr>
          <td>
            <app-editable-cell
              [value]="form.contractSerial"
              [editing]="editingField === 'contractSerial'"
              (editingChange)="setEditing('contractSerial', $event)"
              (valueChange)="form.contractSerial = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
          <td>
            <app-editable-cell
              [value]="form.client"
              [editing]="editingField === 'client'"
              (editingChange)="setEditing('client', $event)"
              (valueChange)="form.client = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
          <td>
            <app-editable-cell
              [value]="form.contractName"
              [editing]="editingField === 'contractName'"
              (editingChange)="setEditing('contractName', $event)"
              (valueChange)="form.contractName = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
          <td>
            <app-editable-cell
              [value]="form.contractCode"
              [editing]="editingField === 'contractCode'"
              (editingChange)="setEditing('contractCode', $event)"
              (valueChange)="form.contractCode = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
          <td>
            <app-editable-cell
              [value]="form.feeCode"
              [editing]="editingField === 'feeCode'"
              (editingChange)="setEditing('feeCode', $event)"
              (valueChange)="form.feeCode = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
          <td>
            <app-editable-cell
              [value]="form.amount"
              [type]="'number'"
              [editing]="editingField === 'amount'"
              (editingChange)="setEditing('amount', $event)"
              (valueChange)="form.amount = $event"
              (blur)="setEditing('', false)"
            ></app-editable-cell>
          </td>
        </tr>
      </table>
      <div style="text-align:right; margin-top: 12px;">
        <button (click)="onSubmit()" [disabled]="!isValid()">{{ submitText }}</button>
        <button style="margin-left: 8px;" (click)="onCancel()">取消</button>
      </div>
    </div>
  `,
  styles: [
    `
      .contract-edit-table table {
        width: 100%;
        border-collapse: collapse;
      }
      .contract-edit-table th,
      .contract-edit-table td {
        border: 1px solid #eee;
        padding: 4px 8px;
        text-align: left;
      }
    `
  ]
})
export class ContractFormComponent {
  @Input() contract: Partial<Contract> | null = null;
  @Input() submitText = '儲存';
  @Output() submit = new EventEmitter<Partial<Contract>>();
  @Output() cancel = new EventEmitter<void>();

  form: any = {
    contractSerial: '',
    client: '',
    contractName: '',
    contractCode: '',
    feeCode: '',
    amount: 0
  };
  editingField: string = '';

  ngOnChanges() {
    if (this.contract) {
      this.form = { ...this.form, ...this.contract };
    }
  }

  setEditing(field: string, editing: boolean) {
    this.editingField = editing ? field : '';
  }

  isValid() {
    return !!this.form.contractSerial && !!this.form.client && !!this.form.contractName && this.form.amount > 0;
  }

  onSubmit() {
    if (!this.isValid()) return;
    this.submit.emit({ ...this.form });
  }

  onCancel() {
    this.cancel.emit();
  }
}
