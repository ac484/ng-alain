import { Injectable } from '@angular/core';
import { BaseRepository } from '../../../core/repositories';
import { HubCrudService } from '../../../core/services';
import { Contract } from '../models';

@Injectable({ providedIn: 'root' })
export class ContractRepository extends BaseRepository<Contract> {
    constructor(crudService: HubCrudService) {
        super(crudService, 'hub_contract');
    }

    // 合約特定的查詢方法可在此擴展
    async findByClient(client: string): Promise<Contract[]> {
        // 未來可實作客戶端篩選邏輯
        return [];
    }
}