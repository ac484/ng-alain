import { BaseModel } from '../../../core/models';
import { Timestamp } from '@angular/fire/firestore';

// Payment status type union - minimal essential statuses
export type PaymentStatus =
    | 'draft'
    | 'submitted'
    | 'reviewing'
    | 'approved'
    | 'rejected'
    | 'invoiced'
    | 'countdown';

// Step status type union - minimal workflow step statuses
export type StepStatus = 'pending' | 'done' | 'rejected' | 'waiting';

// Contract payment step interface - minimal workflow step data
export interface ContractPaymentStep {
    name: string;
    status: StepStatus;
    approver: string;
    comment: string;
    updatedAt: Date | Timestamp;
}

// Contract payment interface - minimal payment request data
export interface ContractPayment extends BaseModel {
    contractId: string;
    amount: number;
    status: PaymentStatus;
    workflowId: string;
    steps: ContractPaymentStep[];
    attachments: string[];
    remark: string;
    createdAt: Date | Timestamp;
    updatedAt: Date | Timestamp;
}