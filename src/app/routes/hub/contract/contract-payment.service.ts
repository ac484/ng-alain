import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs, getDoc, serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { ContractPayment, ContractPaymentStep, PaymentStatus, StepStatus, WorkflowDefinition } from './contract-payment.model';
import { ContractWorkflowService } from './contract-workflow.service';

@Injectable({ providedIn: 'root' })
export class ContractPaymentService {
  private readonly collectionName = 'hub_contract_payments';

  constructor(
    private hubCrud: HubCrudService,
    private workflowService: ContractWorkflowService
  ) { }

  // List all payments for a specific contract
  async listByContract(contractId: string): Promise<ContractPayment[]> {
    const col = collection(this.hubCrud.firestoreInstance, this.collectionName);
    const q = query(col, where('contractId', '==', contractId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      key: doc.id,
      ...doc.data()
    } as ContractPayment));
  }

  // Add new payment with workflow initialization
  async add(contractId: string, amount: number, remark: string = '', clientId: string): Promise<string> {
    // Get workflow template for client
    const workflowTemplate = await this.workflowService.getTemplateForClient(clientId);
    if (!workflowTemplate) {
      throw new Error(`No workflow template found for client: ${clientId}`);
    }

    // Initialize workflow steps
    const steps = await this.initializeWorkflow(workflowTemplate.key!);

    const paymentData: Omit<ContractPayment, 'key'> = {
      contractId,
      amount,
      status: 'draft' as PaymentStatus,
      workflowId: workflowTemplate.key!,
      steps,
      attachments: [],
      remark,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };

    const col = collection(this.hubCrud.firestoreInstance, this.collectionName);
    const docRef = await addDoc(col, paymentData);
    return docRef.id;
  }

  // Update payment
  async update(id: string, data: Partial<ContractPayment>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: serverTimestamp() as Timestamp
    };

    const ref = doc(this.hubCrud.firestoreInstance, this.collectionName, id);
    await updateDoc(ref, updateData);
  }

  // Delete payment
  async delete(id: string): Promise<void> {
    const ref = doc(this.hubCrud.firestoreInstance, this.collectionName, id);
    await deleteDoc(ref);
  }

  // Initialize workflow steps from template
  async initializeWorkflow(workflowTemplateId: string): Promise<ContractPaymentStep[]> {
    // Get workflow template directly from Firestore
    const col = collection(this.hubCrud.firestoreInstance, 'hub_workflow_definitions');
    const templateRef = doc(col, workflowTemplateId);
    const templateSnap = await getDocs(query(col, where('__name__', '==', workflowTemplateId)));

    if (templateSnap.empty) {
      throw new Error(`Workflow template not found: ${workflowTemplateId}`);
    }

    const workflowTemplate = { key: templateSnap.docs[0].id, ...templateSnap.docs[0].data() } as WorkflowDefinition;

    return workflowTemplate.steps.map((step, index) => ({
      name: step.name,
      status: (index === 0 ? 'pending' : 'waiting') as StepStatus,
      approver: step.approver,
      comment: '',
      updatedAt: serverTimestamp() as Timestamp
    }));
  }

  // Advance workflow to next step
  async advanceWorkflow(paymentId: string, currentStepIndex: number, approved: boolean, comment: string = ''): Promise<void> {
    // Get current payment directly from Firestore
    const paymentRef = doc(this.hubCrud.firestoreInstance, this.collectionName, paymentId);
    const paymentSnap = await getDoc(paymentRef);

    if (!paymentSnap.exists()) {
      throw new Error(`Payment not found: ${paymentId}`);
    }

    const paymentDoc = { key: paymentSnap.id, ...paymentSnap.data() } as ContractPayment;

    const updatedSteps = [...paymentDoc.steps];

    if (approved) {
      // Mark current step as done
      updatedSteps[currentStepIndex] = {
        ...updatedSteps[currentStepIndex],
        status: 'done' as StepStatus,
        comment,
        updatedAt: serverTimestamp() as Timestamp
      };

      // Check if there's a next step
      if (currentStepIndex + 1 < updatedSteps.length) {
        // Activate next step
        updatedSteps[currentStepIndex + 1] = {
          ...updatedSteps[currentStepIndex + 1],
          status: 'pending' as StepStatus,
          updatedAt: serverTimestamp() as Timestamp
        };

        // Update payment status to reviewing
        await this.update(paymentId, {
          steps: updatedSteps,
          status: 'reviewing' as PaymentStatus
        });
      } else {
        // All steps completed - approve payment
        await this.update(paymentId, {
          steps: updatedSteps,
          status: 'approved' as PaymentStatus
        });
      }
    } else {
      // Mark current step as rejected
      updatedSteps[currentStepIndex] = {
        ...updatedSteps[currentStepIndex],
        status: 'rejected' as StepStatus,
        comment,
        updatedAt: serverTimestamp() as Timestamp
      };

      // Reject entire payment
      await this.update(paymentId, {
        steps: updatedSteps,
        status: 'rejected' as PaymentStatus
      });
    }
  }
}
