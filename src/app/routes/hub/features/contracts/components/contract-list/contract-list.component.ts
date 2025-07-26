import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ContractService } from '../../services';
import { Contract } from '../../models';
import { FabComponent } from '../../../../shared/components';

@Component({
    selector: 'hub-contract-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        NzTableModule,
        NzButtonModule,
        NzInputModule,
        NzPopconfirmModule,
        FabComponent
    ],
    template: `
    <hub-fab (onAction)="addContract()"></hub-fab>
    
    <nz-table [nzData]="contracts()" nzBordered>
      <thead>
        <tr>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        @for (contract of contracts(); track contract.key) {
          <tr>
            <td>{{ contract.contractSerial }}</td>
            <td>{{ contract.client }}</td>
            <td>
              @if (editId() === contract.key) {
                <input nz-input [(ngModel)]="contract.contractName" (blur)="saveContract(contract)" />
              } @else {
                <div (click)="startEdit(contract.key!)" class="editable-cell">
                  {{ contract.contractName }}
                </div>
              }
            </td>
            <td>{{ contract.amount | currency:'TWD' }}</td>
            <td>
              <a nz-popconfirm nzPopconfirmTitle="確定刪除？" (nzOnConfirm)="deleteContract(contract.key!)">
                刪除
              </a>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `,
    styles: [`
    .editable-cell {
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }
    .editable-cell:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class ContractListComponent implements OnInit {
    contracts = signal<Contract[]>([]);
    editId = signal<string | null>(null);

    constructor(private contractService: ContractService) { }

    ngOnInit() {
        this.loadContracts();
    }

    private loadContracts() {
        this.contractService.list().subscribe(contracts => {
            this.contracts.set(contracts);
        });
    }

    async addContract() {
        const contractSerial = await this.contractService.getNextContractSerial();
        const newContract: Omit<Contract, 'key'> = {
            contractSerial,
            client: '',
            contractName: '',
            amount: 0
        };

        const id = await this.contractService.add(newContract);
        this.loadContracts();
        setTimeout(() => this.startEdit(id), 100);
    }

    startEdit(id: string) {
        this.editId.set(id);
    }

    async saveContract(contract: Contract) {
        if (contract.key) {
            await this.contractService.update(contract.key, contract);
        }
        this.editId.set(null);
    }

    async deleteContract(id: string) {
        await this.contractService.delete(id);
        this.loadContracts();
    }
}