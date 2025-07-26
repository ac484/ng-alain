import { BaseModel } from '../../../core/models';
import { ContractPayment } from './contract-payment.model';

export interface Contract extends BaseModel {
    contractSerial: string;
    client: string;
    contractName: string;
    contractCode?: string;
    feeCode?: string;
    amount: number;
    payments: ContractPayment[]; // 付款請求數組
}