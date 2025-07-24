export interface WorkflowDefinition {
  id?: string;
  name: string;
  ownerIds: string[];
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  createdAt: any;
  updatedAt: any;
}

export interface WorkflowStep {
  name: string;
  approverRole: string;
  actions: string[];
  nextStep: string | null;
  conditionId: string | null;
}

export interface WorkflowCondition {
  id: string;
  field: string;
  operator: '=' | '>' | '<' | 'in' | 'not in';
  value: any;
}
