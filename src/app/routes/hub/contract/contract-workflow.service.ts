import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { WorkflowDefinition } from './contract-workflow.model';

@Injectable({ providedIn: 'root' })
export class ContractWorkflowService {
  constructor(private hubCrud: HubCrudService) {}

  list(): Observable<WorkflowDefinition[]> {
    return this.hubCrud.useCollection<WorkflowDefinition>('hub_workflow_definition');
  }

  add(data: WorkflowDefinition): Promise<string> {
    return this.hubCrud.add('hub_workflow_definition', data);
  }

  update(id: string, data: Partial<WorkflowDefinition>): Promise<void> {
    return this.hubCrud.update('hub_workflow_definition', id, data);
  }

  delete(id: string): Promise<void> {
    return this.hubCrud.delete('hub_workflow_definition', id);
  }

  // TODO: 狀態機邏輯、流程運行時狀態管理
}
