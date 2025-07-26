import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientSettingsComponent } from '../client-settings/client-settings.component';
import { WorkflowTemplatesComponent } from '../workflow-templates/workflow-templates.component';
import { ContractService } from '../../../contracts/services';
import { ContractWorkflowService } from '../../../contracts/services';
import { WorkflowDefinition } from '../../../contracts/models';
import { serverTimestamp, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'hub-settings-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    ClientSettingsComponent,
    WorkflowTemplatesComponent
  ],
  template: `
    <div class="settings-page">
      <nz-tabset nzType="card" [nzSelectedIndex]="selectedTabIndex()" (nzSelectedIndexChange)="onTabChange($event)">
        <nz-tab nzTitle="業主管理">
          <nz-card nzTitle="業主清單管理" [nzLoading]="isLoading()">
            <hub-client-settings (clientsChanged)="onClientsChanged($event)"></hub-client-settings>
          </nz-card>
        </nz-tab>

        <nz-tab nzTitle="流程模板">
          <nz-card nzTitle="工作流程模板管理">
            <hub-workflow-templates 
              [clients]="clients()" 
              (createWorkflow)="onCreateWorkflow()"
              (editWorkflow)="onEditWorkflow($event)">
            </hub-workflow-templates>
          </nz-card>
        </nz-tab>

        <nz-tab nzTitle="編輯模板" [nzDisabled]="!showWorkflowForm()">
          <nz-card [nzTitle]="editingWorkflow() ? '編輯流程模板' : '新增流程模板'" *ngIf="showWorkflowForm()">
            <form nz-form [formGroup]="workflowForm" (ngSubmit)="onSubmitWorkflow()">
              <nz-form-item>
                <nz-form-label [nzSpan]="6" nzRequired>模板名稱</nz-form-label>
                <nz-form-control [nzSpan]="18" nzErrorTip="請輸入模板名稱">
                  <input nz-input formControlName="name" placeholder="請輸入流程模板名稱" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label [nzSpan]="6" nzRequired>對應業主</nz-form-label>
                <nz-form-control [nzSpan]="18" nzErrorTip="請選擇業主">
                  <nz-select formControlName="clientId" nzPlaceHolder="請選擇業主">
                    <nz-option *ngFor="let client of clients()" [nzValue]="client" [nzLabel]="client">
                    </nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label [nzSpan]="6">審批步驟</nz-form-label>
                <nz-form-control [nzSpan]="18">
                  <div formArrayName="steps">
                    <nz-card *ngFor="let step of stepsFormArray.controls; let i = index" [formGroupName]="i"
                      [nzTitle]="'步驟 ' + (i + 1)" nzSize="small" style="margin-bottom: 16px;" [nzExtra]="stepExtra">

                      <ng-template #stepExtra>
                        <button nz-button nzType="text" nzDanger nzSize="small" type="button" (click)="removeStep(i)"
                          *ngIf="stepsFormArray.length > 1">
                          <span nz-icon nzType="delete"></span>
                        </button>
                      </ng-template>

                      <nz-form-item>
                        <nz-form-label [nzSpan]="8" nzRequired>步驟名稱</nz-form-label>
                        <nz-form-control [nzSpan]="16" nzErrorTip="請輸入步驟名稱">
                          <input nz-input formControlName="name" placeholder="請輸入步驟名稱" />
                        </nz-form-control>
                      </nz-form-item>

                      <nz-form-item>
                        <nz-form-label [nzSpan]="8" nzRequired>審批人</nz-form-label>
                        <nz-form-control [nzSpan]="16" nzErrorTip="請輸入審批人">
                          <input nz-input formControlName="approver" placeholder="請輸入審批人" />
                        </nz-form-control>
                      </nz-form-item>
                    </nz-card>
                  </div>

                  <button nz-button nzType="dashed" type="button" (click)="addStep()" style="width: 100%; margin-top: 8px;">
                    <span nz-icon nzType="plus"></span>
                    添加步驟
                  </button>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control [nzOffset]="6" [nzSpan]="18">
                  <button nz-button nzType="primary" [nzLoading]="isSubmitting()" [disabled]="!workflowForm.valid"
                    type="submit">
                    {{ editingWorkflow() ? '更新' : '創建' }}模板
                  </button>
                  <button nz-button type="button" (click)="cancelWorkflowEdit()" style="margin-left: 8px;">
                    取消
                  </button>
                </nz-form-control>
              </nz-form-item>
            </form>
          </nz-card>
        </nz-tab>
      </nz-tabset>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 24px;
    }
  `]
})
export class SettingsListComponent implements OnInit {
  private contractService = inject(ContractService);
  private workflowService = inject(ContractWorkflowService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  isLoading = signal(false);
  isSubmitting = signal(false);
  clients = signal<string[]>([]);
  showWorkflowForm = signal(false);
  editingWorkflow = signal<WorkflowDefinition | null>(null);
  selectedTabIndex = signal(0);

  workflowForm: FormGroup;

  constructor() {
    this.workflowForm = this.createWorkflowForm();
  }

  async ngOnInit(): Promise<void> {
    await this.loadClients();
  }

  get stepsFormArray(): FormArray {
    return this.workflowForm.get('steps') as FormArray;
  }

  private async loadClients(): Promise<void> {
    try {
      const settings = await this.contractService.getClientsSettings();
      this.clients.set(settings?.list || []);
    } catch (error) {
      console.error('載入業主清單失敗', error);
    }
  }

  onClientsChanged(clients: string[]): void {
    this.clients.set(clients);
  }

  onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
  }

  // Workflow form methods
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

  onCreateWorkflow(): void {
    this.editingWorkflow.set(null);
    this.workflowForm.reset();
    this.resetStepsArray();
    this.showWorkflowForm.set(true);
    this.selectedTabIndex.set(2); // Switch to edit tab
  }

  onEditWorkflow(workflow: WorkflowDefinition): void {
    this.editingWorkflow.set(workflow);
    this.populateWorkflowForm(workflow);
    this.showWorkflowForm.set(true);
    this.selectedTabIndex.set(2); // Switch to edit tab
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
      } catch (error) {
        this.message.error('操作失敗：' + (error as Error).message);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  cancelWorkflowEdit(): void {
    this.showWorkflowForm.set(false);
    this.editingWorkflow.set(null);
    this.workflowForm.reset();
    this.selectedTabIndex.set(1); // Switch back to templates tab
  }
}