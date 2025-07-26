import { BaseModel } from '../../../core/models';
import { Timestamp } from '@angular/fire/firestore';

export interface WorkflowDefinition extends BaseModel {
    name: string;
    clientId: string;
    steps: WorkflowStepDefinition[];
    isActive: boolean;
    createdAt?: Date | Timestamp;
    updatedAt?: Date | Timestamp;
}

export interface WorkflowStepDefinition {
    name: string;
    approver: string;
    order: number;
    conditions?: WorkflowCondition[];
}

export interface WorkflowCondition {
    field: string;
    operator: 'equals' | 'greater_than' | 'less_than';
    value: any;
}

export interface WorkflowInstance extends BaseModel {
    definitionId: string;
    entityId: string;
    entityType: string;
    currentStep: number;
    status: WorkflowInstanceStatus;
    steps: WorkflowStepInstance[];
}

export interface WorkflowStepInstance {
    stepId: string;
    name: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    completedAt?: Date;
    comment?: string;
}

export type WorkflowInstanceStatus = 'running' | 'completed' | 'cancelled';