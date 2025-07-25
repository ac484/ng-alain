import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ContractPayment, PaymentStatus } from './contract-payment.model';
import { ContractPaymentService } from './contract-payment.service';
import { ContractPaymentFormComponent, PaymentFormData } from './contract-payment-form.component';

@Component({
  selector: 'app-contract-payment-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzPopconfirmModule,
    NzSpinModule,
    NzEmptyModule,
    ContractPaymentFormComponent
  ],
  template: `
    <div class="payment-list-container">
      <!-- Header with Add Button -->
      <div class="payment-header" style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <h4>付款請求列表</h4>
        <button 
          nz-button 
          nzType="primary" 
          nzSize="small"
          (click)="showAddForm()"
          [disabled]="isLoading()">
          <span nz-icon nzType="plus"></span>
          新增付款請求
        </button>
      </div>

      <!-- Loading Spinner -->
      <nz-spin [nzSpinning]="isLoading()" *ngIf="isLoading()">
        <div style="height: 200px;"></div>
      </nz-spin>

      <!-- Payment Form -->
      <div *ngIf="showForm()" style="margin-bottom: 16px; padding: 16px; border: 1px solid #d9d9d9; border-radius: 6px;">
        <app-contract-payment-form
          [payment]="editingPayment()"
          [contractId]="contractId"
          (formSubmit)="onFormSubmit($event)"
          (formCancel)="onFormCancel()">
        </app-contract-payment-form>
      </div>

      <!-- Payments Table -->
      <nz-table 
        #paymentsTable
        [nzData]="payments()"
        [nzLoading]="isLoading()"
        nzSize="small"
        [nzShowPagination]="false"
        *ngIf="!isLoading()">
        
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
          <tr *ngFor="let payment of payments(); trackBy: trackByPaymentId">
            <td>{{ payment.amount | currency:'TWD':'symbol':'1.0-0' }}</td>
            <td>
              <nz-tag [nzColor]="getStatusColor(payment.status)">
                {{ getStatusText(payment.status) }}
              </nz-tag>
            </td>
            <td>
              <div class="workflow-steps">
                <nz-tag 
                  *ngFor="let step of payment.steps; let i = index"
                  [nzColor]="getStepColor(step.status)"
                  nzSize="small"
                  style="margin-right: 4px; margin-bottom: 2px;">
                  {{ step.name }}
                </nz-tag>
              </div>
            </td>
            <td>{{ formatDate(payment.createdAt) }}</td>
            <td>
              <button 
                nz-button 
                nzType="link" 
                nzSize="small"
                (click)="editPayment(payment)"
                [disabled]="payment.status === 'approved' || payment.status === 'rejected'">
                編輯
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
        </tbody>
      </nz-table>

      <!-- Empty State -->
      <nz-empty 
        *ngIf="!isLoading() && payments().length === 0"
        nzNotFoundContent="暫無付款請求"
        [nzNotFoundFooter]="emptyFooter">
        <ng-template #emptyFooter>
          <button nz-button nzType="primary" (click)="showAddForm()">
            新增第一個付款請求
          </button>
        </ng-template>
      </nz-empty>
    </div>
  `,
  styles: [`
    .payment-list-container {
      padding: 8px;
    }
    
    .payment-header h4 {
      margin: 0;
      color: #262626;
    }
    
    .workflow-steps {
      max-width: 200px;
    }
    
    .ant-table-small .ant-table-tbody > tr > td {
      padding: 8px;
    }
  `]
})
export class ContractPaymentListComponent implements OnInit {
  @Input() contractId: string = '';
  @Input() clientId: string = '';

  private paymentService = inject(ContractPaymentService);
  private message = inject(NzMessageService);

  // Signals for reactive state management
  payments = signal<ContractPayment[]>([]);
  isLoading = signal(false);
  showForm = signal(false);
  editingPayment = signal<ContractPayment | null>(null);

  // Computed values
  hasPayments = computed(() => this.payments().length > 0);

  ngOnInit(): void {
    if (this.contractId) {
      this.loadPayments();
    }
  }

  async loadPayments(): Promise<void> {
    if (!this.contractId) return;

    this.isLoading.set(true);
    try {
      const payments = await this.paymentService.listByContract(this.contractId);
      this.payments.set(payments);
    } catch (error) {
      this.message.error('載入付款請求失敗');
      console.error('Load payments error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  showAddForm(): void {
    this.editingPayment.set(null);
    this.showForm.set(true);
  }

  editPayment(payment: ContractPayment): void {
    this.editingPayment.set(payment);
    this.showForm.set(true);
  }

  async onFormSubmit(formData: PaymentFormData): Promise<void> {
    try {
      if (this.editingPayment()) {
        // Update existing payment
        await this.paymentService.update(this.editingPayment()!.key!, {
          amount: formData.amount,
          remark: formData.remark,
          attachments: formData.attachments
        });
        this.message.success('付款請求更新成功');
      } else {
        // Create new payment
        await this.paymentService.add(
          this.contractId,
          formData.amount,
          formData.remark,
          this.clientId
        );
        this.message.success('付款請求創建成功');
      }

      this.onFormCancel();
      this.loadPayments();
    } catch (error) {
      this.message.error('操作失敗：' + (error as Error).message);
      console.error('Form submit error:', error);
    }
  }

  onFormCancel(): void {
    this.showForm.set(false);
    this.editingPayment.set(null);
  }

  async deletePayment(paymentId: string): Promise<void> {
    try {
      await this.paymentService.delete(paymentId);
      this.message.success('付款請求刪除成功');
      this.loadPayments();
    } catch (error) {
      this.message.error('刪除失敗');
      console.error('Delete payment error:', error);
    }
  }

  // Utility methods
  trackByPaymentId(index: number, payment: ContractPayment): string {
    return payment.key || index.toString();
  }

  getStatusColor(status: PaymentStatus): string {
    const colorMap: Record<PaymentStatus, string> = {
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

  getStatusText(status: PaymentStatus): string {
    const textMap: Record<PaymentStatus, string> = {
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

  getStepColor(status: string): string {
    const colorMap: Record<string, string> = {
      'pending': 'orange',
      'done': 'green',
      'rejected': 'red',
      'waiting': 'default'
    };
    return colorMap[status] || 'default';
  }

  formatDate(timestamp: any): string {
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
}