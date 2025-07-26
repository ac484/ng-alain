import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../../../core/services';

@Injectable({ providedIn: 'root' })
export class ContractPaymentService {
    constructor(private hubCrud: HubCrudService) { }

    async listByContract(contractId: string): Promise<any[]> {
        // 極簡實作 - 未來可擴展
        return [];
    }

    async add(contractId: string, amount: number, remark?: string, client?: string): Promise<string> {
        const payment = {
            contractId,
            amount,
            remark: remark || '',
            status: 'draft',
            createdAt: new Date()
        };
        return this.hubCrud.add('hub_contract_payments', payment);
    }

    async update(id: string, data: any): Promise<void> {
        return this.hubCrud.update('hub_contract_payments', id, data);
    }

    async delete(id: string): Promise<void> {
        return this.hubCrud.delete('hub_contract_payments', id);
    }

    async submitPayment(paymentId: string): Promise<void> {
        return this.update(paymentId, { status: 'submitted' });
    }
}