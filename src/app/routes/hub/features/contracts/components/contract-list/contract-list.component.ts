import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ContractService, ContractPaymentService } from '../../services';
import { Contract, ContractPayment } from '../../models';
import { FabComponent } from '../../../../shared/components';
import { PaymentFormComponent } from '../contract-payments/payment-form/payment-form.component';
import { WorkflowStepsComponent } from '../contract-workflow/workflow-steps/workflow-steps.component';

export interface PaymentFormData {
  amount: number;
  remark: string;
  attachments: string[];
}

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
    NzDropDownModule,
    NzModalModule,
    NzTagModule,
    NzIconModule,
    FabComponent,
    PaymentFormComponent,
    WorkflowStepsComponent
  ],
  template: `
    <hub-fab (onAction)="addContract()"></hub-fab>
    <br />
    <br />
    <nz-table 
      #editRowTable 
      nzBordered 
      [nzData]="contracts()">
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
        @for (c of contracts(); track c.key) {
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
              <div class="editable-cell" [hidden]="editId() === c.key" (click)="startEdit(c.key!)">
                {{ c.contractName }}
              </div>
              <input [hidden]="editId() !== c.key" type="text" nz-input [(ngModel)]="c.contractName" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId() === c.key" (click)="startEdit(c.key!)">
                {{ c.contractCode }}
              </div>
              <input [hidden]="editId() !== c.key" type="text" nz-input [(ngModel)]="c.contractCode" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId() === c.key" (click)="startEdit(c.key!)">
                {{ c.feeCode }}
              </div>
              <input [hidden]="editId() !== c.key" type="text" nz-input [(ngModel)]="c.feeCode" (blur)="stopEdit(c)" />
            </td>
            <td>
              <div class="editable-cell" [hidden]="editId() === c.key" (click)="startEdit(c.key!)">
                {{ c.amount }}
              </div>
              <input [hidden]="editId() !== c.key" type="number" nz-input [(ngModel)]="c.amount" (blur)="stopEdit(c)" />
            </td>
            <td>
              <nz-popconfirm nzTitle="確定刪除？" (nzOnConfirm)="deleteContract(c.key!)">
                <a nz-popconfirm>刪除</a>
              </nz-popconfirm>
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
                                *ngIf="payment.status === 'draft'"
                                nz-button 
                                nzType="primary" 
                                nzSize="small"
                                (click)="submitPayment(payment.key!)"
                                [nzLoading]="paymentSubmitting().has(payment.key!)"
                                style="margin-left: 4px;">
                                提交審批
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
                                <hub-workflow-steps
                                  [payment]="payment"
                                  (workflowUpdated)="onWorkflowUpdated(c.key!)">
                                </hub-workflow-steps>
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
    
    <!-- Client dropdown menu -->
    <nz-dropdown-menu #menuRef="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item *ngFor="let cl of clients()" (click)="changeClient(currentDropdownRow, cl)">{{ cl }}</li>
      </ul>
    </nz-dropdown-menu>

    <!-- Payment Form Modal -->
    <nz-modal
      [nzVisible]="showPaymentModal()"
      [nzTitle]="editingPayment() ? '編輯付款請求' : '新增付款請求'"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="onPaymentModalCancel()">
      
      <div *nzModalContent>
        <hub-payment-form
          [payment]="editingPayment()"
          [contractId]="currentContract()?.key || ''"
          (formSubmit)="onPaymentFormSubmit($event)"
          (formCancel)="onPaymentModalCancel()">
        </hub-payment-form>
      </div>
    </nz-modal>
  `,
  styles: [`
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
      padding: 0 !important;
    }
    .payment-sub-table {
      padding: 16px;
    }
    .payment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .payment-header h4 {
      margin: 0;
      font-size: 14px;
    }
    .payment-loading {
      text-align: center;
      padding: 24px;
    }
    .payment-empty {
      text-align: center;
      padding: 24px;
    }
    .payment-empty p {
      margin-bottom: 12px;
    }
    .workflow-steps {
      max-width: 200px;
    }
    .attachment-info {
      margin-top: 4px;
      font-size: 12px;
    }
    .attachment-info span {
      margin-right: 4px;
    }
    .workflow-steps-row {
      padding: 0 !important;
    }
  `]
})
export class ContractListComponent implements OnInit {
  private contractService = inject(ContractService);
  private paymentService = inject(ContractPaymentService);

  // Core state
  contracts = signal<Contract[]>([]);
  editId = signal<string | null>(null);
  clients = signal<string[]>([]);
  currentDropdownRow: Contract | null = null;

  // Payment management state
  expandSet = signal(new Set<string>());
  contractPayments = signal(new Map<string, ContractPayment[]>());
  paymentLoading = signal(new Set<string>());
  paymentSubmitting = signal(new Set<string>());
  workflowStepsExpanded = signal(new Set<string>());

  // Payment form modal state
  showPaymentModal = signal(false);
  currentContract = signal<Contract | null>(null);
  editingPayment = signal<ContractPayment | null>(null);

  ngOnInit() {
    this.loadContracts();
    this.loadClients();
  }

  private loadContracts() {
    this.contractService.list().subscribe(contracts => {
      this.contracts.set(contracts);
    });
  }

  private async loadClients() {
    try {
      const settings = await this.contractService.getClientsSettings();
      this.clients.set(settings?.list || []);
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  }

  async addContract() {
    const [defaultClient, contractSerial] = await Promise.all([
      this.contractService.getDefaultClient(),
      this.contractService.getNextContractSerial()
    ]);

    const newContract: Omit<Contract, 'key'> = {
      contractSerial,
      client: defaultClient,
      contractName: '',
      contractCode: '',
      feeCode: '',
      amount: 0,
      payments: []
    };

    const id = await this.contractService.add(newContract);
    this.loadContracts();
    setTimeout(() => this.startEdit(id), 200);
  }

  startEdit(id: string) {
    this.editId.set(id);
    setTimeout(() => {
      const input = document.querySelector('input[nz-input]:not([hidden])');
      if (input) (input as HTMLInputElement).focus();
    }, 50);
  }

  async stopEdit(contract: Contract) {
    if (contract.key) {
      await this.contractService.update(contract.key, contract);
    }
    this.editId.set(null);
  }

  async deleteContract(id: string) {
    await this.contractService.delete(id);
    this.loadContracts();
  }

  async changeClient(contract: Contract | null, client: string) {
    if (contract && contract.key && contract.client !== client) {
      contract.client = client;
      await this.contractService.update(contract.key, { client });
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

  addPayment(contract: Contract): void {
    if (!contract.key) {
      console.error('Contract key is missing');
      return;
    }

    this.currentContract.set(contract);
    this.editingPayment.set(null);
    this.showPaymentModal.set(true);
  }

  editPayment(payment: ContractPayment): void {
    this.editingPayment.set(payment);
    this.currentContract.set(this.contracts().find(c => c.key === payment.contractId) || null);
    this.showPaymentModal.set(true);
  }

  async onPaymentFormSubmit(formData: PaymentFormData): Promise<void> {
    try {
      if (this.editingPayment()) {
        await this.paymentService.update(this.editingPayment()!.key!, {
          amount: formData.amount,
          remark: formData.remark,
          attachments: formData.attachments
        });
      } else {
        const currentContract = this.currentContract();
        if (!currentContract?.key) {
          throw new Error('合約資訊缺失');
        }

        await this.paymentService.add(
          currentContract.key,
          formData.amount,
          formData.remark,
          currentContract.client
        );
      }

      this.onPaymentModalCancel();

      const contractId = this.currentContract()?.key;
      if (contractId) {
        await this.loadContractPayments(contractId);
      }
    } catch (error) {
      console.error('操作失敗：', error);
    }
  }

  onPaymentModalCancel(): void {
    this.showPaymentModal.set(false);
    this.currentContract.set(null);
    this.editingPayment.set(null);
  }

  async submitPayment(paymentId: string): Promise<void> {
    const currentSubmitting = this.paymentSubmitting();
    currentSubmitting.add(paymentId);
    this.paymentSubmitting.set(new Set(currentSubmitting));

    try {
      await this.paymentService.submitPayment(paymentId);

      const expandedContracts = Array.from(this.expandSet());
      for (const contractId of expandedContracts) {
        await this.loadContractPayments(contractId);
      }
    } catch (error) {
      console.error('Failed to submit payment:', error);
    } finally {
      const updatedSubmitting = this.paymentSubmitting();
      updatedSubmitting.delete(paymentId);
      this.paymentSubmitting.set(new Set(updatedSubmitting));
    }
  }

  async deletePayment(paymentId: string): Promise<void> {
    try {
      await this.paymentService.delete(paymentId);
      const expandedContracts = Array.from(this.expandSet());
      for (const contractId of expandedContracts) {
        await this.loadContractPayments(contractId);
      }
    } catch (error) {
      console.error('Failed to delete payment:', error);
    }
  }

  // Workflow methods
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
    await this.loadContractPayments(contractId);
  }

  // Utility methods
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
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('zh-TW');
      }
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString('zh-TW');
      }
      if (typeof timestamp === 'number') {
        return new Date(timestamp).toLocaleDateString('zh-TW');
      }
      return '';
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  }
}