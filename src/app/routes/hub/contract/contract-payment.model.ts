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
  updatedAt: Timestamp;
}

// Contract payment interface - minimal payment request data
export interface ContractPayment {
  key?: string;
  contractId: string;
  amount: number;
  status: PaymentStatus;
  workflowId: string;
  steps: ContractPaymentStep[];
  attachments: string[];
  remark: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Workflow condition interface - minimal condition logic
export interface WorkflowCondition {
  field: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  value: any;
}

// Workflow step interface - minimal workflow step definition
export interface WorkflowStep {
  name: string;
  approver: string;
  order: number;
  conditions?: WorkflowCondition[];
}

// Workflow definition interface - minimal workflow template
export interface WorkflowDefinition {
  key?: string;
  name: string;
  clientId: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}