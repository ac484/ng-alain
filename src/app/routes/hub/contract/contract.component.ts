import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { Contract } from '../models/hub.model';
import { CommonModule } from '@angular/common';
import { FabComponent } from '../basic/widget/fab.component';
import { ContractFormComponent } from '../basic/widget/contract-form.component';
import { ContractTableComponent } from '../basic/widget/contract-table.component';

@Component({
  selector: 'hub-contract',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FabComponent, ContractFormComponent, ContractTableComponent],
  template: `
    <app-fab (onAction)="onFabAction($event)"></app-fab>
    <app-contract-form
      *ngIf="showForm"
      [contract]="editingContract"
      [submitText]="formMode === 'add' ? '新增合約' : '儲存'"
      (submit)="onFormSubmit($event)"
      (cancel)="onFormCancel()"
    ></app-contract-form>
    <app-contract-table [contracts]="contracts" (edit)="onEdit($event)" (delete)="onDelete($event)"></app-contract-table>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }
    `
  ]
})
export class HubContractComponent {
  contracts: Contract[] = [];
  showForm = false;
  formMode: 'add' | 'edit' = 'add';
  editingContract: Partial<Contract> | null = null;
  editingKey: string | null = null;

  constructor(private hubCrud: HubCrudService) {
    this.hubCrud.useCollection<Contract>('hub_contract').subscribe(data => {
      this.contracts = data;
    });
  }

  async onFabAction(type: string) {
    if (type === 'add') {
      const serial = await this.hubCrud.getNextContractSerial();
      const defaultClient = await this.hubCrud.getDefaultClient();
      this.editingContract = {
        contractSerial: serial,
        client: defaultClient,
        contractName: '',
        contractCode: '',
        feeCode: '',
        amount: 0
      };
      this.formMode = 'add';
      this.showForm = true;
      this.editingKey = null;
    }
  }

  onEdit(contract: Contract) {
    this.editingContract = { ...contract };
    this.formMode = 'edit';
    this.showForm = true;
    this.editingKey = contract.key || null;
  }

  async onFormSubmit(contract: Partial<Contract>) {
    if (this.formMode === 'add') {
      await this.hubCrud.add<Contract>('hub_contract', contract as Contract);
    } else if (this.formMode === 'edit' && this.editingKey) {
      await this.hubCrud.update<Contract>('hub_contract', this.editingKey, contract);
    }
    this.showForm = false;
    this.editingContract = null;
    this.editingKey = null;
  }

  onFormCancel() {
    this.showForm = false;
    this.editingContract = null;
    this.editingKey = null;
  }

  async onDelete(contract: Contract) {
    if (contract.key) {
      await this.hubCrud.delete<Contract>('hub_contract', contract.key);
    }
  }
}
