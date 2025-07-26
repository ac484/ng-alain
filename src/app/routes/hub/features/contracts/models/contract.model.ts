import { BaseModel } from '../../../core/models';

export interface Contract extends BaseModel {
    contractSerial: string;
    client: string;
    contractName: string;
    contractCode?: string;
    feeCode?: string;
    amount: number;
}