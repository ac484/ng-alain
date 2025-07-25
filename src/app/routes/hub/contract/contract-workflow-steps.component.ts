import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { runTransaction } from '@angular/fire/firestore';
import { ContractPayment, ContractPaymentStep, StepStatus } from './contract-payment.model';
import { ContractPaymentService } from './contract-payment.service';
import { HubCrudService } from '../fire-crud/hub-crud.service';

@Component({
    selector: 'app-contract-workflow-steps',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        NzStepsModule,
        NzButtonModule,
        NzInputModule,
        NzModalModule,
        NzIconModule,
        NzPopconfirmModule
    ],
    template: `
    <div class="workflow-steps-container">
      <h4>審批流程</h4>
      
      <!-- Steps Display -->
      <nz-steps 
        [nzCurrent]="currentStepIndex()" 
        [nzStatus]="getStepsStatus()"
        nzSize="small">
        <nz-step 
          *ngFor="let step of payment.steps; let i = index"
          [nzTitle]="step.name"
          [nzDescription]="getStepDescription(step)"
          [nzIcon]="getStepIcon(step.status)">
        </nz-step>
      </nz-steps>

      <!-- Action Buttons -->
      <div class="workflow-actions" style="margin-top: 16px;">
        <div *ngIf="canCurrentUserApprove()" class="approval-actions">
          <button 
            nz-button 
            nzType="primary"
            nzSize="small"
            (click)="showApprovalModal(true)"
            [nzLoading]="isProcessing()">
            <span nz-icon nzType="check"></span>
            核准
          </button>
          <button 
            nz-button 
            nzDanger
            nzSize="small"
            (click)="showApprovalModal(false)"
            [nzLoading]="isProcessing()"
            style="margin-left: 8px;">
            <span nz-icon nzType="close"></span>
            拒絕
          </button>
        </div>
        
        <div *ngIf="!canCurrentUserApprove() && getCurrentStep()" class="step-info">
          <span class="waiting-info">
            <span nz-icon nzType="clock-circle"></span>
            等待 {{ getCurrentStep()?.approver }} 審批
          </span>
        </div>
      </div>

      <!-- Approval Modal -->
      <nz-modal
        [nzVisible]="showModal()"
        [nzTitle]="modalTitle()"
        [nzOkText]="isApproving() ? '確認核准' : '確認拒絕'"
        [nzOkType]="isApproving() ? 'primary' : 'default'"
        [nzOkLoading]="isProcessing()"
        (nzOnOk)="handleApproval()"
        (nzOnCancel)="closeModal()"
        (nzVisibleChange)="onModalVisibleChange($event)">
        
        <div>
          <p>{{ modalMessage() }}</p>
          <textarea
            nz-input
            [ngModel]="approvalComment()"
            (ngModelChange)="approvalComment.set($event)"
            rows="3"
            placeholder="請輸入審批意見（選填）">
          </textarea>
        </div>
      </nz-modal>
    </div>
  `,
    styles: [`
    .workflow-steps-container {
      padding: 16px;
      background-color: #fafafa;
      border-radius: 6px;
      margin-top: 12px;
    }
    
    .workflow-steps-container h4 {
      margin: 0 0 16px 0;
      color: #262626;
      font-size: 14px;
    }
    
    .workflow-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .approval-actions {
      display: flex;
      gap: 8px;
    }
    
    .waiting-info {
      color: #8c8c8c;
      font-size: 12px;
    }
    
    .waiting-info span[nz-icon] {
      margin-right: 4px;
    }
  `]
})
export class ContractWorkflowStepsComponent {
    @Input() payment!: ContractPayment;
    @Input() currentUser: string = 'current-user'; // In real app, get from auth service
    @Output() workflowUpdated = new EventEmitter<void>();

    private paymentService = inject(ContractPaymentService);
    private hubCrud = inject(HubCrudService);
    private message = inject(NzMessageService);

    // Signals for reactive state management
    isProcessing = signal(false);
    showModal = signal(false);
    isApproving = signal(false);
    approvalComment = signal('');

    // Computed values
    currentStepIndex = computed(() => {
        const pendingIndex = this.payment.steps.findIndex(step => step.status === 'pending');
        return pendingIndex >= 0 ? pendingIndex : this.payment.steps.length;
    });

    modalTitle = computed(() =>
        this.isApproving() ? '確認核准' : '確認拒絕'
    );

    modalMessage = computed(() => {
        const currentStep = this.getCurrentStep();
        const action = this.isApproving() ? '核准' : '拒絕';
        return `確定要${action}「${currentStep?.name}」步驟嗎？`;
    });

    getCurrentStep(): ContractPaymentStep | null {
        const currentIndex = this.currentStepIndex();
        return currentIndex < this.payment.steps.length ? this.payment.steps[currentIndex] : null;
    }

    canCurrentUserApprove(): boolean {
        const currentStep = this.getCurrentStep();
        return currentStep?.status === 'pending' && currentStep?.approver === this.currentUser;
    }

    getStepsStatus(): 'wait' | 'process' | 'finish' | 'error' {
        if (this.payment.status === 'approved') return 'finish';
        if (this.payment.status === 'rejected') return 'error';
        return 'process';
    }

    getStepIcon(status: StepStatus): string {
        switch (status) {
            case 'done':
                return 'check';
            case 'rejected':
                return 'close';
            case 'pending':
                return 'clock-circle';
            case 'waiting':
                return 'ellipsis';
            default:
                return 'ellipsis';
        }
    }

    getStepDescription(step: ContractPaymentStep): string {
        switch (step.status) {
            case 'done':
                return step.comment || '已核准';
            case 'rejected':
                return step.comment || '已拒絕';
            case 'pending':
                return '待審批';
            case 'waiting':
                return '等待中';
            default:
                return '';
        }
    }

    showApprovalModal(isApproving: boolean): void {
        this.isApproving.set(isApproving);
        this.approvalComment.set('');
        this.showModal.set(true);
    }

    closeModal(): void {
        this.showModal.set(false);
        this.approvalComment.set('');
    }

    onModalVisibleChange(visible: boolean): void {
        this.showModal.set(visible);
        if (!visible) {
            this.approvalComment.set('');
        }
    }

    async handleApproval(): Promise<void> {
        if (this.isProcessing()) return;

        this.isProcessing.set(true);

        try {
            const currentIndex = this.currentStepIndex();
            const approved = this.isApproving();
            const comment = this.approvalComment();

            // Validate inputs
            if (currentIndex < 0 || currentIndex >= this.payment.steps.length) {
                throw new Error('Invalid workflow step');
            }

            // Call the service method which handles the transaction internally
            await this.paymentService.advanceWorkflow(
                this.payment.key!,
                currentIndex,
                approved,
                comment
            );

            const action = approved ? '核准' : '拒絕';
            this.message.success(`${action}成功`);

            this.closeModal();
            this.workflowUpdated.emit();

        } catch (error) {
            console.error('Workflow approval error:', error);
            const errorMessage = error instanceof Error ? error.message : '操作失敗，請重試';
            this.message.error(errorMessage);
        } finally {
            this.isProcessing.set(false);
        }
    }
}