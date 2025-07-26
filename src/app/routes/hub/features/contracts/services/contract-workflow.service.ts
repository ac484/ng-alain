import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../../../core/services';

@Injectable({ providedIn: 'root' })
export class ContractWorkflowService {
    constructor(private hubCrud: HubCrudService) { }

    listTemplates(): Observable<any[]> {
        return this.hubCrud.useCollection('hub_workflow_templates');
    }

    async createTemplate(data: any): Promise<string> {
        return this.hubCrud.add('hub_workflow_templates', data);
    }

    async updateTemplate(id: string, data: any): Promise<void> {
        return this.hubCrud.update('hub_workflow_templates', id, data);
    }

    async deleteTemplate(id: string): Promise<void> {
        return this.hubCrud.delete('hub_workflow_templates', id);
    }
}