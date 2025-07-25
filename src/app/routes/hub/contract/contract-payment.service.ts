import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs, getDoc, serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { ContractPayment, ContractPaymentStep, PaymentStatus, StepStatus, WorkflowDefinition } from './contract-payment.model';
import { ContractWorkflowService } from './contract-workflow.service';
import { Contract } from '../contract/contract.model';
import { runTransaction } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ContractPaymentService {
  private readonly collectionName = 'hub_contract_payments';

  constructor(
    private hubCrud: HubCrudService,
    private workflowService: ContractWorkflowService
  ) { }

  // List all payments for a specific contract - 從合約陣列讀取
  async listByContract(contractId: string): Promise<ContractPayment[]> {
    const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractId);
    const contractSnap = await getDoc(contractRef);

    if (!contractSnap.exists()) {
      return [];
    }

    const contract = contractSnap.data() as Contract;
    return contract.payments || [];
  }

  // Add new payment with workflow initialization - 寫入合約陣列
  async add(contractId: string, amount: number, remark: string = '', clientId: string): Promise<string> {
    // Get workflow template for client
    const workflowTemplate = await this.workflowService.getTemplateForClient(clientId);
    const steps = workflowTemplate
      ? await this.initializeWorkflow(workflowTemplate.key!)
      : await this.initializeWorkflow((await this.createDefaultWorkflowTemplate(clientId)));

    // 產生新付款物件，使用 new Date() 而非 serverTimestamp()
    const paymentData: Omit<ContractPayment, 'key'> = {
      contractId,
      amount,
      status: 'draft' as PaymentStatus,
      workflowId: workflowTemplate ? workflowTemplate.key! : '',
      steps,
      attachments: [],
      remark,
      createdAt: new Date() as any, // 使用 new Date() 而非 serverTimestamp()
      updatedAt: new Date() as any
    };

    // 直接更新合約文件的 payments 陣列
    const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractId);
    await runTransaction(this.hubCrud.firestoreInstance, async (transaction) => {
      const contractSnap = await transaction.get(contractRef);
      if (!contractSnap.exists()) throw new Error('Contract not found');
      const contract = contractSnap.data() as Contract;
      const updatedPayments = [...(contract.payments || []), paymentData];
      transaction.update(contractRef, { payments: updatedPayments });
    });
    return 'local-array-id'; // 可根據需求產生唯一 id
  }

  // Update payment - 更新合約陣列中的付款
  async update(paymentId: string, data: Partial<ContractPayment>): Promise<void> {
    // 需要先找到包含此付款的合約
    const contractsCol = collection(this.hubCrud.firestoreInstance, 'hub_contract');
    const contractsSnapshot = await getDocs(contractsCol);

    for (const contractDoc of contractsSnapshot.docs) {
      const contract = contractDoc.data() as Contract;
      const paymentIndex = contract.payments?.findIndex(p => p.key === paymentId);

      if (paymentIndex !== undefined && paymentIndex >= 0) {
        const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractDoc.id);
        await runTransaction(this.hubCrud.firestoreInstance, async (transaction) => {
          const contractSnap = await transaction.get(contractRef);
          if (!contractSnap.exists()) throw new Error('Contract not found');

          const currentContract = contractSnap.data() as Contract;
          const updatedPayments = [...currentContract.payments];
          updatedPayments[paymentIndex] = {
            ...updatedPayments[paymentIndex],
            ...data,
            updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
          };

          transaction.update(contractRef, { payments: updatedPayments });
        });
        return;
      }
    }

    throw new Error(`Payment not found: ${paymentId}`);
  }

  // Delete payment - 從合約陣列中刪除付款
  async delete(paymentId: string): Promise<void> {
    // 需要先找到包含此付款的合約
    const contractsCol = collection(this.hubCrud.firestoreInstance, 'hub_contract');
    const contractsSnapshot = await getDocs(contractsCol);

    for (const contractDoc of contractsSnapshot.docs) {
      const contract = contractDoc.data() as Contract;
      const paymentIndex = contract.payments?.findIndex(p => p.key === paymentId);

      if (paymentIndex !== undefined && paymentIndex >= 0) {
        const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractDoc.id);
        await runTransaction(this.hubCrud.firestoreInstance, async (transaction) => {
          const contractSnap = await transaction.get(contractRef);
          if (!contractSnap.exists()) throw new Error('Contract not found');

          const currentContract = contractSnap.data() as Contract;
          const updatedPayments = currentContract.payments.filter((_, index) => index !== paymentIndex);

          transaction.update(contractRef, { payments: updatedPayments });
        });
        return;
      }
    }

    throw new Error(`Payment not found: ${paymentId}`);
  }

  // Submit payment to start workflow - 更新合約陣列中的付款狀態
  async submitPayment(paymentId: string): Promise<void> {
    // 需要先找到包含此付款的合約
    const contractsCol = collection(this.hubCrud.firestoreInstance, 'hub_contract');
    const contractsSnapshot = await getDocs(contractsCol);

    for (const contractDoc of contractsSnapshot.docs) {
      const contract = contractDoc.data() as Contract;
      const paymentIndex = contract.payments?.findIndex(p => p.key === paymentId);

      if (paymentIndex !== undefined && paymentIndex >= 0) {
        const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractDoc.id);
        await runTransaction(this.hubCrud.firestoreInstance, async (transaction) => {
          const contractSnap = await transaction.get(contractRef);
          if (!contractSnap.exists()) throw new Error('Contract not found');

          const currentContract = contractSnap.data() as Contract;
          const payment = currentContract.payments[paymentIndex];

          // Validate payment can be submitted
          if (payment.status !== 'draft') {
            throw new Error(`Payment cannot be submitted. Current status: ${payment.status}`);
          }

          // Update payment status and activate first workflow step
          const updatedSteps = [...payment.steps];
          if (updatedSteps.length > 0) {
            updatedSteps[0] = {
              ...updatedSteps[0],
              status: 'pending' as StepStatus,
              updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
            };
          }

          const updatedPayments = [...currentContract.payments];
          updatedPayments[paymentIndex] = {
            ...payment,
            status: 'submitted' as PaymentStatus,
            steps: updatedSteps,
            updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
          };

          transaction.update(contractRef, { payments: updatedPayments });
        });
        return;
      }
    }

    throw new Error(`Payment not found: ${paymentId}`);
  }

  // Initialize workflow steps from template - 使用 new Date() 替代 serverTimestamp()
  async initializeWorkflow(workflowTemplateId: string): Promise<ContractPaymentStep[]> {
    // Get workflow template directly from Firestore
    const col = collection(this.hubCrud.firestoreInstance, 'hub_workflow_definitions');
    const templateRef = doc(col, workflowTemplateId);
    const templateSnap = await getDoc(templateRef);

    if (!templateSnap.exists()) {
      throw new Error(`Workflow template not found: ${workflowTemplateId}`);
    }

    const workflowTemplate = { key: templateSnap.id, ...templateSnap.data() } as WorkflowDefinition;

    return workflowTemplate.steps.map((step, index) => ({
      name: step.name,
      status: 'waiting' as StepStatus, // All steps start as waiting, will be activated when submitted
      approver: step.approver,
      comment: '',
      updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
    }));
  }

  // Advance workflow to next step with atomic transaction - 更新合約陣列中的工作流程
  async advanceWorkflow(paymentId: string, currentStepIndex: number, approved: boolean, comment: string = ''): Promise<void> {
    // 需要先找到包含此付款的合約
    const contractsCol = collection(this.hubCrud.firestoreInstance, 'hub_contract');
    const contractsSnapshot = await getDocs(contractsCol);

    for (const contractDoc of contractsSnapshot.docs) {
      const contract = contractDoc.data() as Contract;
      const paymentIndex = contract.payments?.findIndex(p => p.key === paymentId);

      if (paymentIndex !== undefined && paymentIndex >= 0) {
        const contractRef = doc(this.hubCrud.firestoreInstance, 'hub_contract', contractDoc.id);
        await runTransaction(this.hubCrud.firestoreInstance, async (transaction) => {
          const contractSnap = await transaction.get(contractRef);
          if (!contractSnap.exists()) throw new Error('Contract not found');

          const currentContract = contractSnap.data() as Contract;
          const payment = currentContract.payments[paymentIndex];
          const updatedSteps = [...payment.steps];

          // Validate current step index
          if (currentStepIndex < 0 || currentStepIndex >= updatedSteps.length) {
            throw new Error(`Invalid step index: ${currentStepIndex}`);
          }

          // Validate current step status
          if (updatedSteps[currentStepIndex].status !== 'pending') {
            throw new Error(`Step ${currentStepIndex} is not in pending status`);
          }

          if (approved) {
            // Mark current step as done
            updatedSteps[currentStepIndex] = {
              ...updatedSteps[currentStepIndex],
              status: 'done' as StepStatus,
              comment,
              updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
            };

            // Check if there's a next step
            if (currentStepIndex + 1 < updatedSteps.length) {
              // Activate next step
              updatedSteps[currentStepIndex + 1] = {
                ...updatedSteps[currentStepIndex + 1],
                status: 'pending' as StepStatus,
                updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
              };

              // Update payment status to reviewing
              const updatedPayments = [...currentContract.payments];
              updatedPayments[paymentIndex] = {
                ...payment,
                steps: updatedSteps,
                status: 'reviewing' as PaymentStatus,
                updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
              };

              transaction.update(contractRef, { payments: updatedPayments });
            } else {
              // All steps completed - approve payment
              const updatedPayments = [...currentContract.payments];
              updatedPayments[paymentIndex] = {
                ...payment,
                steps: updatedSteps,
                status: 'approved' as PaymentStatus,
                updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
              };

              transaction.update(contractRef, { payments: updatedPayments });
            }
          } else {
            // Mark current step as rejected
            updatedSteps[currentStepIndex] = {
              ...updatedSteps[currentStepIndex],
              status: 'rejected' as StepStatus,
              comment,
              updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
            };

            // Reject entire payment
            const updatedPayments = [...currentContract.payments];
            updatedPayments[paymentIndex] = {
              ...payment,
              steps: updatedSteps,
              status: 'rejected' as PaymentStatus,
              updatedAt: new Date() as any // 使用 new Date() 而非 serverTimestamp()
            };

            transaction.update(contractRef, { payments: updatedPayments });
          }
        });
        return;
      }
    }

    throw new Error(`Payment not found: ${paymentId}`);
  }

  // Create a default workflow template for a client
  private async createDefaultWorkflowTemplate(clientId: string): Promise<string> {
    const defaultTemplate: Omit<WorkflowDefinition, 'key'> = {
      name: `${clientId} 預設審批流程`,
      clientId: clientId,
      isActive: true,
      steps: [
        {
          name: '主管審核',
          approver: 'supervisor',
          order: 1
        },
        {
          name: '財務審核',
          approver: 'finance',
          order: 2
        }
      ],
      createdAt: serverTimestamp() as Timestamp, // 這裡可以保留 serverTimestamp()，因為不是陣列操作
      updatedAt: serverTimestamp() as Timestamp
    };

    return await this.workflowService.createTemplate(defaultTemplate);
  }
}
