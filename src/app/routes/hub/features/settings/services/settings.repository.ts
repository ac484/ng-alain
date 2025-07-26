import { Injectable } from '@angular/core';
import { BaseRepository } from '../../../core/repositories';
import { HubCrudService } from '../../../core/services';
import { ClientSettings } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsRepository extends BaseRepository<ClientSettings> {
    constructor(crudService: HubCrudService) {
        super(crudService, 'hub_settings');
    }

    // 設定特定的查詢方法可在此擴展
}