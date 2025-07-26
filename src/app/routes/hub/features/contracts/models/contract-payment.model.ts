import { BaseModel } from '../../../core/models';

export interface ContractPayment extends BaseModel {
    contractId: string;
    amount: number;
    status: PaymentStatus;
    remark?: string;
    createdAt?: Date;
    attachments?: string[];
    steps?: WorkflowStep[];
}

export type PaymentStatus = 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'invoiced';

export interface WorkflowStep {
    name: string;
    status: StepStatus;
    approver?: string;
    completedAt?: Date;
}

export type StepStatus = 'waiting' | 'processing' | 'done' | 'rejected';