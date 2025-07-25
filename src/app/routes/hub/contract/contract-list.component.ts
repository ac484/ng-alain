import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { ContractPayment } from './contract-payment.model';
import { ContractPaymentService } from './contract-payment.service';
import { FabComponent } from '../basic/widget/fab.component';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ContractWorkflowStepsComponent } from './contract-workflow-steps.component';

@Component({
  selector: 'contract-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, NzTableModule, NzButtonModule, NzInputModule, NzPopconfirmModule, NzDropDownModule, NzTagModule, NzIconModule, FabComponent, ContractWorkflowStepsComponent],
  template: `
    <app-fab (onAction)="addRow()"></app-fab>
    <br />
    <br />
    <nz-table 
      #editRowTable 
      nzBordered 
      [nzData]="contracts">
      <thead>
        <tr>
          <th nzWidth="50px"></th>
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
            <td 
              [nzExpand]="expandSet().has(c.key!)" 
              (nzExpandChange)="onExpandChange(c.key!, $event)">
            </td>
            <td>{{ c.contractSerial }}</td>
            <td>
              <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="menuRef" (nzClick)="currentDropdownRow = c">
                <a nz-dropdown (click)="currentDropdownRow = c">{{ c.client }} <span nz-icon nzType="down"></span></a>
              </div>
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
          @if (expandSet().has(c.key!)) {
            <tr>
              <td colspan="8" class="payment-expand-row">
                <div class="payment-sub-table">
                  <div class="payment-header">
                    <h4>付款請求列表</h4>
                    <button 
                      nz-button 
                      nzType="primary" 
                      nzSize="small"
                      (click)="addPayment(c)"
                      [nzLoading]="paymentLoading().has(c.key!)">
                      <span nz-icon nzType="plus"></span>
                      新增付款請求
                    </button>
                  </div>
                  
                  @if (paymentLoading().has(c.key!)) {
                    <div class="payment-loading">載入中...</div>
                  } @else if (getContractPayments(c.key!).length === 0) {
                    <div class="payment-empty">
                      <p>暫無付款請求</p>
                      <button nz-button nzType="dashed" (click)="addPayment(c)">
                        新增第一個付款請求
                      </button>
                    </div>
                  } @else {
                    <nz-table 
                      [nzData]="getContractPayments(c.key!)" 
                      nzSize="small"
                      [nzShowPagination]="false">
                      <thead>
                        <tr>
                          <th>付款金額</th>
                          <th>狀態</th>
                          <th>工作流程</th>
                          <th>創建時間</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (payment of getContractPayments(c.key!); track payment.key) {
                          <tr>
                            <td>{{ payment.amount | currency:'TWD':'symbol':'1.0-0' }}</td>
                            <td>
                              <nz-tag [nzColor]="getPaymentStatusColor(payment.status)">
                                {{ getPaymentStatusText(payment.status) }}
                              </nz-tag>
                            </td>
                            <td>
                              <div class="workflow-steps">
                                @for (step of payment.steps; track step.name) {
                                  <nz-tag 
                                    [nzColor]="getStepStatusColor(step.status)"
                                    nzSize="small"
                                    style="margin-right: 4px; margin-bottom: 2px;">
                                    {{ step.name }}
                                  </nz-tag>
                                }
                              </div>
                            </td>
                            <td>
                              <div>{{ formatPaymentDate(payment.createdAt) }}</div>
                              @if (payment.attachments && payment.attachments.length > 0) {
                                <div class="attachment-info">
                                  <span nz-icon nzType="paper-clip"></span>
                                  {{ payment.attachments.length }} 個附件
                                </div>
                              }
                            </td>
                            <td>
                              <button 
                                nz-button 
                                nzType="link" 
                                nzSize="small"
                                (click)="editPayment(payment)"
                                [disabled]="payment.status === 'approved' || payment.status === 'rejected'">
                                編輯
                              </button>
                              <button 
                                nz-button 
                                nzType="link" 
                                nzSize="small"
                                (click)="toggleWorkflowSteps(payment.key!)"
                                style="margin-left: 4px;">
                                <span nz-icon [nzType]="workflowStepsExpanded().has(payment.key!) ? 'up' : 'down'"></span>
                                流程
                              </button>
                              <nz-popconfirm
                                nzTitle="確定要刪除此付款請求嗎？"
                                (nzOnConfirm)="deletePayment(payment.key!)">
                                <button 
                                  nz-button 
                                  nzType="link" 
                                  nzSize="small" 
                                  nzDanger
                                  nz-popconfirm
                                  [disabled]="payment.status === 'approved'">
                                  刪除
                                </button>
                              </nz-popconfirm>
                            </td>
                          </tr>
                          @if (workflowStepsExpanded().has(payment.key!)) {
                            <tr>
                              <td colspan="5" class="workflow-steps-row">
                                <app-contract-workflow-steps
                                  [payment]="payment"
                                  (workflowUpdated)="onWorkflowUpdated(c.key!)">
                                </app-contract-workflow-steps>
                              </td>
                            </tr>
                          }
                        }
                      </tbody>
                    </nz-table>
                  }
                </div>
              </td>
            </tr>
          }
        }
      </tbody>
    </nz-table>
    <nz-dropdown-menu #menuRef="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item *ngFor="let cl of clients" (click)="changeClient(currentDropdownRow, cl)">{{ cl }}</li>
      </ul>
    </nz-dropdown-menu>
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
      .payment-expand-row {
        background-color: #fafafa;
        padding: 0 !important;
      }
      .payment-sub-table {
        padding: 16px;
        background-color: #fafafa;
      }
      .payment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .payment-header h4 {
        margin: 0;
        color: #595959;
        font-size: 14px;
      }
      .payment-loading {
        text-align: center;
        padding: 20px;
        color: #8c8c8c;
      }
      .payment-empty {
        text-align: center;
        padding: 20px;
        color: #8c8c8c;
      }
      .payment-empty p {
        margin-bottom: 12px;
      }
      .workflow-steps {
        max-width: 200px;
      }
      .payment-sub-table .ant-table-small .ant-table-tbody > tr > td {
        padding: 6px 8px;
      }
      .attachment-info {
        margin-top: 4px;
        font-size: 12px;
        color: #8c8c8c;
      }
      .attachment-info span {
        margin-right: 4px;
      }
      .workflow-steps-row {
        background-color: #f5f5f5;
        padding: 0 !important;
      }
    `
  ]
})
export class ContractListComponent implements OnInit {
  contracts: Contract[] = [];
  editId: string | null = null;
  clients: string[] = [];
  currentDropdownRow: Contract | null = null;

  // Signals for payment management
  expandSet = signal(new Set<string>());
  contractPayments = signal(new Map<string, ContractPayment[]>());
  paymentLoading = signal(new Set<string>());
  workflowStepsExpanded = signal(new Set<string>());

  constructor(
    private contractService: ContractService,
    private paymentService: ContractPaymentService,
    private hubCrud: HubCrudService
  ) { }

  ngOnInit() {
    this.refresh();
    this.contractService.getClientsSettings().then((settings: { list: string[]; default: string } | null) => {
      this.clients = settings?.list || [];
    });
  }

  refresh() {
    this.contractService.list().subscribe(c => (this.contracts = c));
  }

  async addRow() {
    const [defaultClient, contractSerial] = await Promise.all([
      this.contractService.getDefaultClient(),
      this.contractService.getNextContractSerial()
    ]);
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

  async changeClient(c: Contract | null, client: string) {
    if (c && c.key && c.client !== client) {
      c.client = client;
      await this.contractService.update(c.key, { client });
    }
  }

  // Payment management methods
  async onExpandChange(contractId: string, expand: boolean): Promise<void> {
    const currentExpandSet = this.expandSet();
    if (expand) {
      currentExpandSet.add(contractId);
      this.expandSet.set(new Set(currentExpandSet));
      await this.loadContractPayments(contractId);
    } else {
      currentExpandSet.delete(contractId);
      this.expandSet.set(new Set(currentExpandSet));
    }
  }

  async loadContractPayments(contractId: string): Promise<void> {
    const currentLoading = this.paymentLoading();
    currentLoading.add(contractId);
    this.paymentLoading.set(new Set(currentLoading));

    try {
      const payments = await this.paymentService.listByContract(contractId);
      const currentPayments = this.contractPayments();
      currentPayments.set(contractId, payments);
      this.contractPayments.set(new Map(currentPayments));
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      const updatedLoading = this.paymentLoading();
      updatedLoading.delete(contractId);
      this.paymentLoading.set(new Set(updatedLoading));
    }
  }

  getContractPayments(contractId: string): ContractPayment[] {
    return this.contractPayments().get(contractId) || [];
  }

  async addPayment(contract: Contract): Promise<void> {
    if (!contract.key) return;

    try {
      // Create a simple payment with default values
      await this.paymentService.add(contract.key, 0, '', contract.client);
      // Reload payments for this contract
      await this.loadContractPayments(contract.key);
    } catch (error) {
      console.error('Failed to add payment:', error);
    }
  }

  editPayment(payment: ContractPayment): void {
    // For now, just log - in a full implementation, this would open an edit form
    console.log('Edit payment:', payment);
  }

  async deletePayment(paymentId: string): Promise<void> {
    try {
      await this.paymentService.delete(paymentId);
      // Refresh all expanded contract payments
      const expandedContracts = Array.from(this.expandSet());
      for (const contractId of expandedContracts) {
        await this.loadContractPayments(contractId);
      }
    } catch (error) {
      console.error('Failed to delete payment:', error);
    }
  }

  // Utility methods for payment display
  getPaymentStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'draft': 'default',
      'submitted': 'blue',
      'reviewing': 'orange',
      'approved': 'green',
      'rejected': 'red',
      'invoiced': 'purple',
      'countdown': 'cyan'
    };
    return colorMap[status] || 'default';
  }

  getPaymentStatusText(status: string): string {
    const textMap: Record<string, string> = {
      'draft': '草稿',
      'submitted': '已提交',
      'reviewing': '審核中',
      'approved': '已核准',
      'rejected': '已拒絕',
      'invoiced': '已開票',
      'countdown': '倒數中'
    };
    return textMap[status] || status;
  }

  getStepStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'pending': 'orange',
      'done': 'green',
      'rejected': 'red',
      'waiting': 'default'
    };
    return colorMap[status] || 'default';
  }

  formatPaymentDate(timestamp: any): string {
    if (!timestamp) return '';

    try {
      // Handle Firestore Timestamp
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('zh-TW');
      }
      // Handle regular Date
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString('zh-TW');
      }
      // Handle timestamp number
      if (typeof timestamp === 'number') {
        return new Date(timestamp).toLocaleDateString('zh-TW');
      }
      return '';
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  }

  // Workflow steps management methods
  toggleWorkflowSteps(paymentId: string): void {
    const currentExpanded = this.workflowStepsExpanded();
    if (currentExpanded.has(paymentId)) {
      currentExpanded.delete(paymentId);
    } else {
      currentExpanded.add(paymentId);
    }
    this.workflowStepsExpanded.set(new Set(currentExpanded));
  }

  async onWorkflowUpdated(contractId: string): Promise<void> {
    // Reload payments for this contract to reflect workflow changes
    await this.loadContractPayments(contractId);
  }
}
