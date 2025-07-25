import { Component, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { ContractService } from '../contract/contract.service';
import { ContractWorkflowService } from '../contract/contract-workflow.service';
import { WorkflowDefinition } from '../contract/contract-payment.model';

@Component({
  selector: 'hub-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzFormModule,
    NzPopconfirmModule,
    NzSwitchModule,
    NzIconModule,
    NzCardModule,
    NzTagModule,
    NzAlertModule
  ]
})
export class HubSettingsComponent implements OnInit {
  private contractService = inject(ContractService);
  private workflowService = inject(ContractWorkflowService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  // Signals for reactive state management
  clients = signal<string[]>([]);
  defaultClient = signal<string>('');
  clientInput = signal<string>('');
  workflows = signal<WorkflowDefinition[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  showWorkflowForm = signal(false);
  editingWorkflow = signal<WorkflowDefinition | null>(null);

  // Computed values
  availableClients = computed(() => this.clients());
  hasClients = computed(() => this.clients().length > 0);

  workflowForm: FormGroup;

  constructor() {
    this.workflowForm = this.createWorkflowForm();
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadWorkflows();
  }

  get stepsFormArray(): FormArray {
    return this.workflowForm.get('steps') as FormArray;
  }

  // Client Management Methods
  async loadClients(): Promise<void> {
    this.isLoading.set(true);
    try {
      const settings = await this.contractService.getClientsSettings();
      this.clients.set(settings?.list || []);
      this.defaultClient.set(settings?.default || '');
    } catch (error) {
      this.message.error('載入業主清單失敗');
    } finally {
      this.isLoading.set(false);
    }
  }

  async addClient(): Promise<void> {
    const input = this.clientInput().trim();
    if (!input || this.clients().includes(input)) return;

    const newClients = [...this.clients(), input];
    this.clients.set(newClients);
    this.clientInput.set('');
    await this.saveClients();
  }

  async removeClient(client: string): Promise<void> {
    const newClients = this.clients().filter(c => c !== client);
    this.clients.set(newClients);

    if (this.defaultClient() === client) {
      this.defaultClient.set(newClients[0] || '');
    }

    await this.saveClients();
  }

  async setDefaultClient(client: string): Promise<void> {
    this.defaultClient.set(client);
    await this.saveClients();
  }

  private async saveClients(): Promise<void> {
    try {
      await this.contractService.setClientsSettings({
        list: this.clients(),
        default: this.defaultClient()
      });
      this.message.success('業主設定已保存');
    } catch (error) {
      this.message.error('保存失敗');
    }
  }

  // Workflow Management Methods
  private createWorkflowForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
      steps: this.fb.array([this.createStepForm()])
    });
  }

  private createStepForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      approver: ['', [Validators.required]],
      order: [0]
    });
  }

  async loadWorkflows(): Promise<void> {
    try {
      this.workflowService.listTemplates().subscribe(workflows => {
        this.workflows.set(workflows);
      });
    } catch (error) {
      this.message.error('載入流程模板失敗');
    }
  }

  showCreateWorkflowForm(): void {
    this.editingWorkflow.set(null);
    this.workflowForm.reset();
    this.resetStepsArray();
    this.showWorkflowForm.set(true);
  }

  editWorkflow(workflow: WorkflowDefinition): void {
    this.editingWorkflow.set(workflow);
    this.populateWorkflowForm(workflow);
    this.showWorkflowForm.set(true);
  }

  private populateWorkflowForm(workflow: WorkflowDefinition): void {
    this.workflowForm.patchValue({
      name: workflow.name,
      clientId: workflow.clientId
    });

    this.resetStepsArray();
    workflow.steps.forEach((step, index) => {
      if (index > 0) {
        this.addStep();
      }
      const stepForm = this.stepsFormArray.at(index) as FormGroup;
      stepForm.patchValue({
        name: step.name,
        approver: step.approver,
        order: step.order
      });
    });
  }

  private resetStepsArray(): void {
    while (this.stepsFormArray.length > 1) {
      this.stepsFormArray.removeAt(1);
    }
    this.stepsFormArray.at(0).reset();
  }

  addStep(): void {
    const newStep = this.createStepForm();
    newStep.patchValue({ order: this.stepsFormArray.length });
    this.stepsFormArray.push(newStep);
  }

  removeStep(index: number): void {
    if (this.stepsFormArray.length > 1) {
      this.stepsFormArray.removeAt(index);
      this.stepsFormArray.controls.forEach((control, i) => {
        control.patchValue({ order: i });
      });
    }
  }

  async onSubmitWorkflow(): Promise<void> {
    if (this.workflowForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      try {
        const formValue = this.workflowForm.value;
        const workflowData = {
          name: formValue.name,
          clientId: formValue.clientId,
          steps: formValue.steps.map((step: any, index: number) => ({
            name: step.name,
            approver: step.approver,
            order: index,
            conditions: []
          })),
          isActive: true,
          createdAt: serverTimestamp() as Timestamp,
          updatedAt: serverTimestamp() as Timestamp
        };

        if (this.editingWorkflow()) {
          await this.workflowService.updateTemplate(this.editingWorkflow()!.key!, {
            name: workflowData.name,
            clientId: workflowData.clientId,
            steps: workflowData.steps,
            isActive: workflowData.isActive,
            createdAt: this.editingWorkflow()!.createdAt,
            updatedAt: serverTimestamp() as Timestamp
          });
          this.message.success('流程模板更新成功');
        } else {
          await this.workflowService.createTemplate(workflowData);
          this.message.success('流程模板創建成功');
        }

        this.cancelWorkflowEdit();
        this.loadWorkflows();
      } catch (error) {
        this.message.error('操作失敗：' + (error as Error).message);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  async toggleWorkflowStatus(workflowId: string, isActive: boolean): Promise<void> {
    try {
      await this.workflowService.updateTemplate(workflowId, {
        isActive,
        updatedAt: serverTimestamp() as Timestamp
      });
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

  cancelWorkflowEdit(): void {
    this.showWorkflowForm.set(false);
    this.editingWorkflow.set(null);
    this.workflowForm.reset();
  }

  // Template helper methods for signals
  updateClientInput(value: string): void {
    this.clientInput.set(value);
  }
}
