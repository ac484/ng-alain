import { Component, OnInit, Input, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractWorkflowService } from '../../../contracts/services';
import { WorkflowDefinition } from '../../../contracts/models';

@Component({
  selector: 'hub-workflow-templates',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzSwitchModule,
    NzTagModule,
    NzPopconfirmModule,
    NzAlertModule,
    NzIconModule
  ],
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button nzType="primary" (click)="showCreateForm()" [disabled]="!hasClients()">
        <span nz-icon nzType="plus"></span>
        新增流程模板
      </button>
      <div *ngIf="!hasClients()" style="margin-top: 8px;">
        <nz-alert nzType="warning" nzMessage="請先在業主管理中添加業主，才能創建流程模板" nzShowIcon>
        </nz-alert>
      </div>
    </div>

    <nz-table [nzData]="workflows()" [nzLoading]="isLoading()" nzSize="middle">
      <thead>
        <tr>
          <th>模板名稱</th>
          <th>對應業主</th>
          <th>步驟數量</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let workflow of workflows()">
          <td>{{ workflow.name }}</td>
          <td>
            <nz-tag nzColor="blue">{{ workflow.clientId }}</nz-tag>
          </td>
          <td>{{ workflow.steps.length }} 步驟</td>
          <td>
            <nz-switch [ngModel]="workflow.isActive" (ngModelChange)="toggleStatus(workflow.key!, $event)">
            </nz-switch>
          </td>
          <td>
            <button nz-button nzType="link" nzSize="small" (click)="editWorkflow(workflow)">
              編輯
            </button>
            <nz-popconfirm nzTitle="確定要刪除此流程模板嗎？" (nzOnConfirm)="deleteWorkflow(workflow.key!)">
              <button nz-button nzType="link" nzSize="small" nzDanger nz-popconfirm>
                刪除
              </button>
            </nz-popconfirm>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class WorkflowTemplatesComponent implements OnInit {
  @Input() clients: string[] = [];

  private workflowService = inject(ContractWorkflowService);
  private message = inject(NzMessageService);

  workflows = signal<WorkflowDefinition[]>([]);
  isLoading = signal(false);

  hasClients = computed(() => this.clients.length > 0);

  ngOnInit(): void {
    this.loadWorkflows();
  }

  async loadWorkflows(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.workflowService.listTemplates().subscribe(workflows => {
        this.workflows.set(workflows);
        this.isLoading.set(false);
      });
    } catch (error) {
      this.message.error('載入流程模板失敗');
      this.isLoading.set(false);
    }
  }

  showCreateForm(): void {
    // Emit event to parent to show form
  }

  editWorkflow(workflow: WorkflowDefinition): void {
    // Emit event to parent to edit workflow
  }

  async toggleStatus(workflowId: string, isActive: boolean): Promise<void> {
    try {
      await this.workflowService.updateTemplate(workflowId, { isActive });
      this.message.success(`流程模板已${isActive ? '啟用' : '停用'}`);
      this.loadWorkflows();
    } catch (error) {
      this.message.error('狀態更新失敗');
    }
  }

  async deleteWorkflow(workflowId: string): Promise<void> {
    try {
      await this.workflowService.deleteTemplate(workflowId);
      this.message.success('流程模板刪除成功');
      this.loadWorkflows();
    } catch (error) {
      this.message.error('刪除失敗：' + (error as Error).message);
    }
  }
}