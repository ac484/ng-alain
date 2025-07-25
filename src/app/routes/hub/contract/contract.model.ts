import { ContractPayment } from './contract-payment.model';

export interface Contract {
  key?: string;
  contractSerial: string;
  client: string;
  contractName: string;
  contractCode?: string;
  feeCode?: string;
  amount: number;
  payments: ContractPayment[]; // 新增，預設可為空陣列
}
