import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { Contract } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private hubCrud: HubCrudService) {}

  list(): Observable<Contract[]> {
    return this.hubCrud.useCollection<Contract>('hub_contract');
  }
  add(data: Contract): Promise<string> {
    return this.hubCrud.add('hub_contract', data);
  }
  update(id: string, data: Partial<Contract>): Promise<void> {
    return this.hubCrud.update('hub_contract', id, data);
  }
  delete(id: string): Promise<void> {
    return this.hubCrud.delete('hub_contract', id);
  }
  // 其他合約專屬邏輯可於此擴充
}
