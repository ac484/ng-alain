export interface ContractPayment {
  id?: string;
  contractId: string;
  amount: number;
  status: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'invoiced' | 'countdown';
  workflowId: string;
  steps: ContractPaymentStep[];
  attachments?: string[];
  remark?: string;
  createdAt: any;
  updatedAt: any;
}

export interface ContractPaymentStep {
  name: string;
  status: 'pending' | 'done' | 'rejected';
  approver: string;
  comment?: string;
  updatedAt: any;
}
