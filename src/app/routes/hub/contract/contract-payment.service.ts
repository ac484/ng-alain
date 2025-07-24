import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { ContractPayment } from './contract-payment.model';

@Injectable({ providedIn: 'root' })
export class ContractPaymentService {
  constructor(private hubCrud: HubCrudService) {}

  list(contractId: string): Observable<ContractPayment[]> {
    // TODO: 根據 contractId 過濾
    return this.hubCrud.useCollection<ContractPayment>('hub_contract_payment');
  }

  add(data: ContractPayment): Promise<string> {
    return this.hubCrud.add('hub_contract_payment', data);
  }

  update(id: string, data: Partial<ContractPayment>): Promise<void> {
    return this.hubCrud.update('hub_contract_payment', id, data);
  }

  delete(id: string): Promise<void> {
    return this.hubCrud.delete('hub_contract_payment', id);
  }

  // TODO: 狀態流轉、驗證等業務邏輯
}
