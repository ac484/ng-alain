import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractPayment, ContractPaymentStep, StepStatus } from '../../../models';
import { ContractPaymentService } from '../../../services';

@Component({
  selector: 'hub-workflow-steps',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    NzStepsModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzIconModule
  ],
  template: `
    <div class="workflow-steps-container">
      <h4>審批流程</h4>
      
      <!-- Visual workflow progress -->
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

      <!-- Interactive approval actions -->
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

      <!-- Approval modal with comment input -->
      <nz-modal
        [nzVisible]="showModal()"
        [nzTitle]="modalTitle()"
        [nzOkText]="isApproving() ? '確認核准' : '確認拒絕'"
        [nzOkType]="isApproving() ? 'primary' : 'default'"
        [nzOkLoading]="isProcessing()"
        (nzOnOk)="handleApproval()"
        (nzOnCancel)="closeModal()">
        
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
    }
    .approval-actions {
      margin-top: 16px;
    }
    .step-info {
      margin-top: 16px;
      color: #666;
    }
    .waiting-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class WorkflowStepsComponent {
  @Input() payment!: ContractPayment;
  @Input() currentUser: string = 'current-user';
  @Output() workflowUpdated = new EventEmitter<void>();

  private paymentService = inject(ContractPaymentService);
  private message = inject(NzMessageService);

  // Workflow state management
  isProcessing = signal(false);
  showModal = signal(false);
  isApproving = signal(false);
  approvalComment = signal('');

  canCurrentUserApprove(): boolean {
    const currentStep = this.getCurrentStep();
    return currentStep?.status === 'pending' && currentStep?.approver === this.currentUser;
  }

  getCurrentStep(): ContractPaymentStep | null {
    return this.payment.steps.find(step => step.status === 'pending') || null;
  }

  showApprovalModal(approve: boolean): void {
    this.isApproving.set(approve);
    this.showModal.set(true);
    this.approvalComment.set('');
  }

  closeModal(): void {
    this.showModal.set(false);
    this.approvalComment.set('');
  }

  modalTitle(): string {
    return this.isApproving() ? '確認核准' : '確認拒絕';
  }

  modalMessage(): string {
    const action = this.isApproving() ? '核准' : '拒絕';
    return `確定要${action}此付款請求嗎？`;
  }

  async handleApproval(): Promise<void> {
    if (this.isProcessing()) return;

    this.isProcessing.set(true);

    try {
      const currentStepIndex = this.payment.steps.findIndex(step => step.status === 'pending');

      if (currentStepIndex === -1) {
        throw new Error('No pending step found');
      }

      await this.paymentService.advanceWorkflow(
        this.payment.key!,
        currentStepIndex,
        this.isApproving(),
        this.approvalComment()
      );

      const action = this.isApproving() ? '核准' : '拒絕';
      this.message.success(`付款請求${action}成功`);

      this.closeModal();
      this.workflowUpdated.emit();
    } catch (error) {
      this.message.error('操作失敗：' + (error as Error).message);
    } finally {
      this.isProcessing.set(false);
    }
  }

  // UI helper methods
  currentStepIndex(): number {
    return this.payment.steps.findIndex(step => step.status === 'pending');
  }

  getStepsStatus(): string {
    const hasRejected = this.payment.steps.some(step => step.status === 'rejected');
    if (hasRejected) return 'error';

    const allDone = this.payment.steps.every(step => step.status === 'done');
    if (allDone) return 'finish';

    return 'process';
  }

  getStepDescription(step: ContractPaymentStep): string {
    switch (step.status) {
      case 'done':
        return `已完成 - ${step.approver}`;
      case 'pending':
        return `處理中 - ${step.approver}`;
      case 'rejected':
        return `已拒絕 - ${step.approver}`;
      case 'waiting':
        return `等待中 - ${step.approver}`;
      default:
        return step.approver;
    }
  }

  getStepIcon(status: StepStatus): string {
    switch (status) {
      case 'done':
        return 'check';
      case 'pending':
        return 'loading';
      case 'rejected':
        return 'close';
      case 'waiting':
        return 'clock-circle';
      default:
        return 'clock-circle';
    }
  }
}