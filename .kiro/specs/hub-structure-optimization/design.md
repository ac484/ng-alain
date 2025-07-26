# Design Document

## Overview

This design document outlines the optimization of the hub directory structure to align with Angular v20 best practices, improve maintainability, and support future feature expansion. The design focuses on feature-based organization, standalone components, proper separation of concerns, and scalable architecture patterns.

## Architecture

### Current State Analysis

The existing hub structure has several architectural issues:
- Mixed concerns (business logic and generic utilities)
- Inconsistent organization patterns
- Tight coupling between generic and business-specific code
- Limited support for lazy loading and modern Angular patterns

### Target Architecture

The new architecture will implement:

1. **Feature-Based Organization**: Each business domain gets its own feature module
2. **Layered Architecture**: Clear separation between presentation, business logic, and data access
3. **Standalone Components**: Leverage Angular v20 standalone component architecture
4. **Lazy Loading Support**: Route-based code splitting for optimal performance
5. **Shared Infrastructure**: Common utilities and components in dedicated shared modules

### Directory Structure Design

```
src/app/routes/hub/
├── core/                           # Core infrastructure and services
│   ├── services/                   # Core business services
│   │   ├── hub-crud.service.ts     # Generic CRUD operations
│   │   └── index.ts                # Barrel export
│   ├── models/                     # Core data models and interfaces
│   │   ├── base.model.ts           # Base model interfaces
│   │   └── index.ts                # Barrel export
│   └── index.ts                    # Core module barrel export
├── shared/                         # Shared components and utilities
│   ├── components/                 # Reusable UI components
│   │   ├── fab/                    # Floating Action Button
│   │   │   ├── fab.component.ts
│   │   │   ├── fab.component.html
│   │   │   ├── fab.component.less
│   │   │   └── index.ts
│   │   └── index.ts                # Components barrel export
│   ├── directives/                 # Shared directives
│   │   └── index.ts
│   ├── pipes/                      # Shared pipes
│   │   └── index.ts
│   └── index.ts                    # Shared module barrel export
├── features/                       # Feature modules
│   ├── contracts/                  # Contract management feature
│   │   ├── components/             # Contract-specific components
│   │   │   ├── contract-list/
│   │   │   │   ├── contract-list.component.ts
│   │   │   │   ├── contract-list.component.html
│   │   │   │   ├── contract-list.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-form/
│   │   │   │   ├── contract-form.component.ts
│   │   │   │   ├── contract-form.component.html
│   │   │   │   ├── contract-form.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-payments/  # Payment sub-feature
│   │   │   │   ├── payment-list/
│   │   │   │   ├── payment-form/
│   │   │   │   └── index.ts
│   │   │   ├── contract-workflow/  # Workflow sub-feature
│   │   │   │   ├── workflow-steps/
│   │   │   │   ├── workflow-designer/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── services/               # Contract business logic
│   │   │   ├── contract.service.ts
│   │   │   ├── contract-payment.service.ts
│   │   │   ├── contract-workflow.service.ts
│   │   │   └── index.ts
│   │   ├── models/                 # Contract data models
│   │   │   ├── contract.model.ts
│   │   │   ├── contract-payment.model.ts
│   │   │   ├── contract-workflow.model.ts
│   │   │   └── index.ts
│   │   ├── routes.ts               # Contract feature routes
│   │   └── index.ts                # Feature barrel export
│   ├── settings/                   # Settings management feature
│   │   ├── components/
│   │   │   ├── settings-list/
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── settings.service.ts
│   │   │   └── index.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── routes.ts
│   │   └── index.ts
│   ├── workspace/                  # Workspace management feature
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes.ts
│   │   └── index.ts
│   └── index.ts                    # Features barrel export
├── routes.ts                       # Main hub routing configuration
└── index.ts                        # Hub module barrel export
```

## Components and Interfaces

### Core Services Layer

#### HubCrudService (Enhanced)
```typescript
@Injectable({ providedIn: 'root' })
export class HubCrudService<T extends BaseModel = BaseModel> {
  private firestore = inject(Firestore);
  
  // Generic CRUD operations with type safety
  useCollection<TModel extends BaseModel>(
    collectionName: string
  ): Observable<TModel[]>;
  
  useDoc<TModel extends BaseModel>(
    collectionName: string, 
    id: string
  ): Observable<TModel | undefined>;
  
  add<TModel extends BaseModel>(
    collectionName: string, 
    data: Omit<TModel, 'key'>
  ): Promise<string>;
  
  update<TModel extends BaseModel>(
    collectionName: string, 
    id: string, 
    data: Partial<TModel>
  ): Promise<void>;
  
  delete(collectionName: string, id: string): Promise<void>;
}
```

#### Repository Pattern Implementation
```typescript
export abstract class BaseRepository<T extends BaseModel> {
  constructor(
    protected crudService: HubCrudService,
    protected collectionName: string
  ) {}
  
  abstract list(): Observable<T[]>;
  abstract getById(id: string): Observable<T | undefined>;
  abstract create(data: Omit<T, 'key'>): Promise<string>;
  abstract update(id: string, data: Partial<T>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
```

### Feature Components Architecture

#### Settings Feature - Flexible Owner and Workflow Management
```typescript
@Component({
  selector: 'hub-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzSwitchModule,
    NzTagModule,
    NzCardModule,
    NzAlertModule,
    NzPopconfirmModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-tabset nzType="card">
      <!-- Owner Management Tab -->
      <nz-tab nzTitle="業主管理">
        <nz-card nzTitle="業主清單管理" [nzLoading]="isLoading()">
          <!-- Dynamic owner addition/removal -->
          <!-- Default owner selection -->
          <!-- Owner list with status -->
        </nz-card>
      </nz-tab>
      
      <!-- Workflow Template Management Tab -->
      <nz-tab nzTitle="流程模板">
        <nz-card nzTitle="工作流程模板管理">
          <!-- Workflow template CRUD -->
          <!-- Per-owner workflow configuration -->
          <!-- Multi-step approval process setup -->
        </nz-card>
      </nz-tab>
    </nz-tabset>
  `
})
export class SettingsComponent {
  private contractService = inject(ContractService);
  private workflowService = inject(ContractWorkflowService);
  
  // Owner management signals
  clients = signal<string[]>([]);
  defaultClient = signal<string>('');
  clientInput = signal<string>('');
  
  // Workflow management signals
  workflows = signal<WorkflowDefinition[]>([]);
  showWorkflowForm = signal(false);
  editingWorkflow = signal<WorkflowDefinition | null>(null);
  
  // Dynamic owner management methods
  async addClient(): Promise<void>;
  async removeClient(client: string): Promise<void>;
  async setDefaultClient(client: string): Promise<void>;
  
  // Flexible workflow configuration methods
  async createWorkflowTemplate(template: WorkflowDefinition): Promise<void>;
  async updateWorkflowTemplate(id: string, template: Partial<WorkflowDefinition>): Promise<void>;
  async deleteWorkflowTemplate(id: string): Promise<void>;
}
```

#### Complete Contract Management - Single Page with Full Functionality
```typescript
@Component({
  selector: 'hub-contract-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTagModule,
    NzDropDownModule,
    NzUploadModule,
    NzStepsModule,
    NzPopconfirmModule,
    NzIconModule,
    FabComponent,
    ContractPaymentFormComponent,
    ContractWorkflowStepsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- FAB for new contract creation -->
    <hub-fab (onAction)="addContract()"></hub-fab>
    
    <!-- Main contract table with inline editing -->
    <nz-table 
      #editRowTable
      nzBordered
      [nzData]="contracts()"
      [nzLoading]="loading()">
      
      <thead>
        <tr>
          <th nzWidth="50px"></th>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>合約案號識別碼</th>
          <th>合約費用識別碼</th>
          <th>合約金額</th>
          <th>操作</th>
        </tr>
      </thead>
      
      <tbody>
        <tr *ngFor="let contract of contracts()" class="editable-row">
          <!-- Expand/Collapse button -->
          <td 
            [nzExpand]="expandSet().has(contract.key!)" 
            (nzExpandChange)="onExpandChange(contract.key!, $event)">
          </td>
          
          <!-- Contract Serial (Auto-generated) -->
          <td>{{ contract.contractSerial }}</td>
          
          <!-- Client with dropdown selection -->
          <td>
            <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="clientMenu" 
                 (nzClick)="currentDropdownRow = contract">
              <a nz-dropdown>
                {{ contract.client }} 
                <span nz-icon nzType="down"></span>
              </a>
            </div>
          </td>
          
          <!-- Inline editable contract name -->
          <td>
            <div class="editable-cell" 
                 [hidden]="editId() === contract.key" 
                 (click)="startEdit(contract.key!)">
              {{ contract.contractName }}
            </div>
            <input [hidden]="editId() !== contract.key" 
                   type="text" 
                   nz-input 
                   [(ngModel)]="contract.contractName" 
                   (blur)="stopEdit(contract)" />
          </td>
          
          <!-- Inline editable contract code -->
          <td>
            <div class="editable-cell" 
                 [hidden]="editId() === contract.key" 
                 (click)="startEdit(contract.key!)">
              {{ contract.contractCode }}
            </div>
            <input [hidden]="editId() !== contract.key" 
                   type="text" 
                   nz-input 
                   [(ngModel)]="contract.contractCode" 
                   (blur)="stopEdit(contract)" />
          </td>
          
          <!-- Inline editable fee code -->
          <td>
            <div class="editable-cell" 
                 [hidden]="editId() === contract.key" 
                 (click)="startEdit(contract.key!)">
              {{ contract.feeCode }}
            </div>
            <input [hidden]="editId() !== contract.key" 
                   type="text" 
                   nz-input 
                   [(ngModel)]="contract.feeCode" 
                   (blur)="stopEdit(contract)" />
          </td>
          
          <!-- Inline editable amount -->
          <td>
            <div class="editable-cell" 
                 [hidden]="editId() === contract.key" 
                 (click)="startEdit(contract.key!)">
              {{ contract.amount | currency:'TWD':'symbol':'1.0-0' }}
            </div>
            <input [hidden]="editId() !== contract.key" 
                   type="number" 
                   nz-input 
                   [(ngModel)]="contract.amount" 
                   (blur)="stopEdit(contract)" />
          </td>
          
          <!-- Actions -->
          <td>
            <nz-popconfirm 
              nzTitle="確定刪除？" 
              (nzOnConfirm)="deleteContract(contract.key!)">
              <a nz-popconfirm>刪除</a>
            </nz-popconfirm>
          </td>
        </tr>
        
        <!-- Expanded payment management section -->
        <tr *ngIf="expandSet().has(contract.key!)">
          <td colspan="8" class="payment-expand-row">
            <div class="payment-sub-table">
              <div class="payment-header">
                <h4>付款請求列表</h4>
                <button 
                  nz-button 
                  nzType="primary" 
                  nzSize="small"
                  (click)="addPayment(contract)"
                  [nzLoading]="paymentLoading().has(contract.key!)">
                  <span nz-icon nzType="plus"></span>
                  新增付款請求
                </button>
              </div>
              
              <!-- Payment requests table -->
              <nz-table 
                [nzData]="getContractPayments(contract.key!)" 
                nzSize="small"
                [nzShowPagination]="false"
                [nzLoading]="paymentLoading().has(contract.key!)">
                
                <thead>
                  <tr>
                    <th>付款金額</th>
                    <th>狀態</th>
                    <th>工作流程</th>
                    <th>創建時間</th>
                    <th>操作</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr *ngFor="let payment of getContractPayments(contract.key!)">
                    <td>{{ payment.amount | currency:'TWD':'symbol':'1.0-0' }}</td>
                    
                    <!-- Payment status -->
                    <td>
                      <nz-tag [nzColor]="getPaymentStatusColor(payment.status)">
                        {{ getPaymentStatusText(payment.status) }}
                      </nz-tag>
                    </td>
                    
                    <!-- Workflow steps inline display -->
                    <td>
                      <div class="workflow-steps">
                        <nz-tag 
                          *ngFor="let step of payment.steps" 
                          [nzColor]="getStepStatusColor(step.status)"
                          nzSize="small">
                          {{ step.name }}
                        </nz-tag>
                      </div>
                    </td>
                    
                    <!-- Creation date and attachments -->
                    <td>
                      <div>{{ formatPaymentDate(payment.createdAt) }}</div>
                      <div *ngIf="payment.attachments?.length" class="attachment-info">
                        <span nz-icon nzType="paper-clip"></span>
                        {{ payment.attachments.length }} 個附件
                      </div>
                    </td>
                    
                    <!-- Payment actions -->
                    <td>
                      <button 
                        nz-button 
                        nzType="link" 
                        nzSize="small"
                        (click)="editPayment(payment)"
                        [disabled]="payment.status === 'approved' || payment.status === 'rejected'">
                        編輯
                      </button>
                      
                      <button 
                        *ngIf="payment.status === 'draft'"
                        nz-button 
                        nzType="primary" 
                        nzSize="small"
                        (click)="submitPayment(payment.key!)"
                        [nzLoading]="paymentSubmitting().has(payment.key!)">
                        提交審批
                      </button>
                      
                      <button 
                        nz-button 
                        nzType="link" 
                        nzSize="small"
                        (click)="toggleWorkflowSteps(payment.key!)">
                        <span nz-icon [nzType]="workflowStepsExpanded().has(payment.key!) ? 'up' : 'down'"></span>
                        流程
                      </button>
                      
                      <nz-popconfirm
                        nzTitle="確定要刪除此付款請求嗎？"
                        (nzOnConfirm)="deletePayment(payment.key!)">
                        <button 
                          nz-button 
                          nzType="link" 
                          nzSize="small" 
                          nzDanger
                          nz-popconfirm
                          [disabled]="payment.status === 'approved'">
                          刪除
                        </button>
                      </nz-popconfirm>
                    </td>
                  </tr>
                  
                  <!-- Expandable workflow steps -->
                  <tr *ngIf="workflowStepsExpanded().has(payment.key!)">
                    <td colspan="5" class="workflow-steps-row">
                      <hub-contract-workflow-steps
                        [payment]="payment"
                        (workflowUpdated)="onWorkflowUpdated(contract.key!)">
                      </hub-contract-workflow-steps>
                    </td>
                  </tr>
                </tbody>
              </nz-table>
            </div>
          </td>
        </tr>
      </tbody>
    </nz-table>
    
    <!-- Client dropdown menu -->
    <nz-dropdown-menu #clientMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item 
            *ngFor="let client of clients()" 
            (click)="changeClient(currentDropdownRow, client)">
          {{ client }}
        </li>
      </ul>
    </nz-dropdown-menu>

    <!-- Payment Form Modal -->
    <nz-modal
      [nzVisible]="showPaymentModal()"
      [nzTitle]="editingPayment() ? '編輯付款請求' : '新增付款請求'"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="onPaymentModalCancel()">
      
      <div *nzModalContent>
        <hub-contract-payment-form
          [payment]="editingPayment()"
          [contractId]="currentContract()?.key || ''"
          (formSubmit)="onPaymentFormSubmit($event)"
          (formCancel)="onPaymentModalCancel()">
        </hub-contract-payment-form>
      </div>
    </nz-modal>
  `
})
export class ContractListComponent implements OnInit {
  private contractService = inject(ContractService);
  private paymentService = inject(ContractPaymentService);
  private hubCrud = inject(HubCrudService);
  
  // Core state management
  contracts = signal<Contract[]>([]);
  loading = signal(false);
  editId = signal<string | null>(null);
  clients = signal<string[]>([]);
  currentDropdownRow: Contract | null = null;
  
  // Payment management state
  expandSet = signal<Set<string>>(new Set());
  contractPayments = signal<Map<string, ContractPayment[]>>(new Map());
  paymentLoading = signal<Set<string>>(new Set());
  paymentSubmitting = signal<Set<string>>(new Set());
  workflowStepsExpanded = signal<Set<string>>(new Set());
  
  // Modal state
  showPaymentModal = signal(false);
  currentContract = signal<Contract | null>(null);
  editingPayment = signal<ContractPayment | null>(null);
  
  // Contract management methods
  async addContract(): Promise<void>;
  startEdit(id: string): void;
  async stopEdit(contract: Contract): Promise<void>;
  async deleteContract(id: string): Promise<void>;
  async changeClient(contract: Contract | null, client: string): Promise<void>;
  
  // Payment management methods
  async onExpandChange(contractId: string, expand: boolean): Promise<void>;
  async loadContractPayments(contractId: string): Promise<void>;
  getContractPayments(contractId: string): ContractPayment[];
  addPayment(contract: Contract): void;
  editPayment(payment: ContractPayment): void;
  async submitPayment(paymentId: string): Promise<void>;
  async deletePayment(paymentId: string): Promise<void>;
  
  // Workflow management methods
  toggleWorkflowSteps(paymentId: string): void;
  async onWorkflowUpdated(contractId: string): Promise<void>;
  
  // Utility methods
  getPaymentStatusColor(status: string): string;
  getPaymentStatusText(status: string): string;
  getStepStatusColor(status: string): string;
  formatPaymentDate(timestamp: any): string;
}
```

#### Payment Form Component with File Upload
```typescript
@Component({
  selector: 'hub-contract-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzUploadModule,
    NzIconModule
  ],
  template: `
    <form nz-form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
      <!-- Amount input -->
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>付款金額</nz-form-label>
        <nz-form-control [nzSpan]="18" nzErrorTip="請輸入有效的付款金額">
          <nz-input-number
            formControlName="amount"
            [nzMin]="0.01"
            [nzStep]="0.01"
            nzPlaceHolder="請輸入付款金額"
            style="width: 100%">
          </nz-input-number>
        </nz-form-control>
      </nz-form-item>

      <!-- Remark textarea -->
      <nz-form-item>
        <nz-form-label [nzSpan]="6">備註</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <textarea
            nz-input
            formControlName="remark"
            rows="3"
            placeholder="請輸入備註說明">
          </textarea>
        </nz-form-control>
      </nz-form-item>

      <!-- File upload with restrictions -->
      <nz-form-item>
        <nz-form-label [nzSpan]="6">附件</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <nz-upload
            nzMultiple
            [nzFileList]="fileList()"
            [nzBeforeUpload]="beforeUpload"
            [nzCustomRequest]="customUpload"
            (nzChange)="handleFileChange($event)"
            [nzShowUploadList]="{
              showPreviewIcon: true,
              showRemoveIcon: true,
              showDownloadIcon: true
            }">
            <button nz-button [nzLoading]="uploading()">
              <span nz-icon nzType="upload"></span>
              <span>上傳附件</span>
            </button>
          </nz-upload>
          <div class="upload-hint">
            支援圖片、PDF、Word、Excel文件，單個文件不超過10MB，最多5個文件
          </div>
        </nz-form-control>
      </nz-form-item>

      <!-- Form actions -->
      <nz-form-item>
        <nz-form-control [nzOffset]="6" [nzSpan]="18">
          <button
            nz-button
            nzType="primary"
            [nzLoading]="isSubmitting()"
            [disabled]="!paymentForm.valid || isSubmitting()"
            type="submit">
            {{ editMode() ? '更新' : '創建' }}付款請求
          </button>
          <button
            nz-button
            type="button"
            (click)="onCancel()">
            取消
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class ContractPaymentFormComponent implements OnInit {
  @Input() payment: ContractPayment | null = null;
  @Input() contractId: string = '';
  @Output() formSubmit = new EventEmitter<PaymentFormData>();
  @Output() formCancel = new EventEmitter<void>();

  // Form state management
  paymentForm: FormGroup;
  isSubmitting = signal(false);
  editMode = computed(() => !!this.payment);
  fileList = signal<NzUploadFile[]>([]);
  uploading = signal(false);

  // File upload methods with validation
  beforeUpload = (file: NzUploadFile): boolean;
  customUpload = (item: any): any;
  handleFileChange(info: NzUploadChangeParam): void;
}
```

#### Workflow Steps Component with Interactive Approval
```typescript
@Component({
  selector: 'hub-contract-workflow-steps',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzStepsModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzIconModule,
    NzPopconfirmModule
  ],
  template: `
    <div class="workflow-steps-container">
      <h4>審批流程</h4>
      
      <!-- Visual workflow progress -->
      <nz-steps 
        [nzCurrent]="currentStepIndex()" 
        [nzStatus]="getStepsStatus()"
        nzSize="small">
        <nz-step 
          *ngFor="let step of payment.steps; let i = index"
          [nzTitle]="step.name"
          [nzDescription]="getStepDescription(step)"
          [nzIcon]="getStepIcon(step.status)">
        </nz-step>
      </nz-steps>

      <!-- Interactive approval actions -->
      <div class="workflow-actions">
        <div *ngIf="canCurrentUserApprove()" class="approval-actions">
          <button 
            nz-button 
            nzType="primary"
            nzSize="small"
            (click)="showApprovalModal(true)"
            [nzLoading]="isProcessing()">
            <span nz-icon nzType="check"></span>
            核准
          </button>
          <button 
            nz-button 
            nzDanger
            nzSize="small"
            (click)="showApprovalModal(false)"
            [nzLoading]="isProcessing()">
            <span nz-icon nzType="close"></span>
            拒絕
          </button>
        </div>
        
        <div *ngIf="!canCurrentUserApprove() && getCurrentStep()" class="step-info">
          <span class="waiting-info">
            <span nz-icon nzType="clock-circle"></span>
            等待 {{ getCurrentStep()?.approver }} 審批
          </span>
        </div>
      </div>

      <!-- Approval modal with comment input -->
      <nz-modal
        [nzVisible]="showModal()"
        [nzTitle]="modalTitle()"
        [nzOkText]="isApproving() ? '確認核准' : '確認拒絕'"
        [nzOkType]="isApproving() ? 'primary' : 'default'"
        [nzOkLoading]="isProcessing()"
        (nzOnOk)="handleApproval()"
        (nzOnCancel)="closeModal()">
        
        <div>
          <p>{{ modalMessage() }}</p>
          <textarea
            nz-input
            [ngModel]="approvalComment()"
            (ngModelChange)="approvalComment.set($event)"
            rows="3"
            placeholder="請輸入審批意見（選填）">
          </textarea>
        </div>
      </nz-modal>
    </div>
  `
})
export class ContractWorkflowStepsComponent {
  @Input() payment!: ContractPayment;
  @Input() currentUser: string = 'current-user';
  @Output() workflowUpdated = new EventEmitter<void>();

  // Workflow state management
  isProcessing = signal(false);
  showModal = signal(false);
  isApproving = signal(false);
  approvalComment = signal('');
  
  // Workflow processing methods
  canCurrentUserApprove(): boolean;
  getCurrentStep(): ContractPaymentStep | null;
  showApprovalModal(approve: boolean): void;
  async handleApproval(): Promise<void>;
  
  // UI helper methods
  currentStepIndex(): number;
  getStepsStatus(): string;
  getStepDescription(step: ContractPaymentStep): string;
  getStepIcon(status: StepStatus): string;
}
```

### Lazy Loading Implementation

#### Feature Route Configuration
```typescript
// features/contracts/routes.ts
import { Routes } from '@angular/router';

export const contractRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/contract-list').then(m => m.ContractListComponent)
  },
  {
    path: 'new',
    loadComponent: () => 
      import('./components/contract-form').then(m => m.ContractFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./components/contract-form').then(m => m.ContractFormComponent)
  },
  {
    path: ':id/payments',
    loadComponent: () => 
      import('./components/contract-payments/payment-list')
        .then(m => m.PaymentListComponent)
  }
];
```

#### Main Hub Routes
```typescript
// routes.ts
import { Routes } from '@angular/router';

export const hubRoutes: Routes = [
  {
    path: 'contracts',
    loadChildren: () => 
      import('./features/contracts/routes').then(m => m.contractRoutes)
  },
  {
    path: 'settings',
    loadChildren: () => 
      import('./features/settings/routes').then(m => m.settingsRoutes)
  },
  {
    path: 'workspace',
    loadChildren: () => 
      import('./features/workspace/routes').then(m => m.workspaceRoutes)
  }
];
```

## Data Models

### Base Model Interface
```typescript
export interface BaseModel {
  key?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuditableModel extends BaseModel {
  createdBy?: string;
  updatedBy?: string;
}
```

### Contract Domain Models
```typescript
export interface Contract extends AuditableModel {
  contractSerial: string;
  client: string;
  contractName: string;
  amount: number;
  status: ContractStatus;
  payments?: ContractPayment[];
  workflow?: ContractWorkflow;
}

export interface ContractPayment extends AuditableModel {
  contractId: string;
  amount: number;
  dueDate: Date;
  status: PaymentStatus;
  approvalWorkflow?: WorkflowInstance;
}

export interface ContractWorkflow extends BaseModel {
  name: string;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
}
```

## Error Handling

### Centralized Error Handling Service
```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private notification = inject(NzNotificationService);
  
  handleError(error: any, context?: string): void {
    console.error(`Error in ${context}:`, error);
    
    const message = this.getErrorMessage(error);
    this.notification.error('Error', message);
  }
  
  private getErrorMessage(error: any): string {
    if (error?.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
  }
}
```

### Error Boundary Implementation
```typescript
@Component({
  selector: 'hub-error-boundary',
  standalone: true,
  template: `
    @if (hasError()) {
      <nz-result 
        nzStatus="error" 
        nzTitle="Something went wrong"
        [nzSubTitle]="errorMessage()">
        <div nz-result-extra>
          <button nz-button nzType="primary" (click)="retry()">
            Try Again
          </button>
        </div>
      </nz-result>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class ErrorBoundaryComponent {
  hasError = signal(false);
  errorMessage = signal('');
  
  handleError(error: any) {
    this.hasError.set(true);
    this.errorMessage.set(error.message || 'An error occurred');
  }
  
  retry() {
    this.hasError.set(false);
    this.errorMessage.set('');
  }
}
```

## Testing Strategy

### Unit Testing Approach

#### Service Testing
```typescript
describe('ContractService', () => {
  let service: ContractService;
  let mockCrudService: jasmine.SpyObj<HubCrudService>;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HubCrudService', [
      'useCollection', 'add', 'update', 'delete'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        ContractService,
        { provide: HubCrudService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(ContractService);
    mockCrudService = TestBed.inject(HubCrudService) as jasmine.SpyObj<HubCrudService>;
  });
  
  it('should list contracts', () => {
    const mockContracts: Contract[] = [
      { key: '1', contractSerial: 'C00001', client: 'Test Client' }
    ];
    
    mockCrudService.useCollection.and.returnValue(of(mockContracts));
    
    service.list().subscribe(contracts => {
      expect(contracts).toEqual(mockContracts);
    });
    
    expect(mockCrudService.useCollection).toHaveBeenCalledWith('hub_contract');
  });
});
```

#### Component Testing
```typescript
describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;
  let mockContractService: jasmine.SpyObj<ContractService>;
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContractService', ['list']);
    
    await TestBed.configureTestingModule({
      imports: [ContractListComponent],
      providers: [
        { provide: ContractService, useValue: spy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
    mockContractService = TestBed.inject(ContractService) as jasmine.SpyObj<ContractService>;
  });
  
  it('should load contracts on init', () => {
    const mockContracts: Contract[] = [
      { key: '1', contractSerial: 'C00001', client: 'Test Client' }
    ];
    
    mockContractService.list.and.returnValue(of(mockContracts));
    
    component.ngOnInit();
    
    expect(component.contracts()).toEqual(mockContracts);
    expect(component.loading()).toBeFalse();
  });
});
```

### Integration Testing

#### Feature Module Testing
```typescript
describe('Contract Feature Integration', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<any>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(contractRoutes),
        // Other necessary imports
      ],
      providers: [
        // Mock services
      ]
    }).compileComponents();
    
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TestHostComponent);
  });
  
  it('should navigate to contract list', fakeAsync(() => {
    router.navigate(['/contracts']);
    tick();
    
    expect(location.path()).toBe('/contracts');
    // Additional assertions for component loading
  }));
});
```

### Performance Testing

#### Lazy Loading Verification
```typescript
describe('Lazy Loading Performance', () => {
  it('should lazy load contract feature', async () => {
    const router = TestBed.inject(Router);
    
    // Spy on dynamic imports
    spyOn(window, 'import').and.callThrough();
    
    await router.navigate(['/contracts']);
    
    expect(window.import).toHaveBeenCalledWith(
      jasmine.stringMatching(/contract.*routes/)
    );
  });
});
```

## Migration Strategy

### Phase 1: Core Infrastructure
1. Create new directory structure
2. Implement base services and models
3. Set up barrel exports
4. Create shared components

### Phase 2: Feature Migration
1. Migrate contract feature first (highest priority)
2. Update routing configuration
3. Implement lazy loading
4. Update existing components to standalone

### Phase 3: Enhancement and Optimization
1. Implement error boundaries
2. Add comprehensive testing
3. Performance optimization
4. Documentation updates

### Migration Checklist

#### Pre-Migration
- [ ] Backup current codebase
- [ ] Create feature branch
- [ ] Set up new directory structure
- [ ] Implement core services

#### During Migration
- [ ] Move components to new structure
- [ ] Update imports and dependencies
- [ ] Convert to standalone components
- [ ] Implement lazy loading
- [ ] Update routing configuration

#### Post-Migration
- [ ] Run comprehensive tests
- [ ] Performance benchmarking
- [ ] Code review and cleanup
- [ ] Documentation updates
- [ ] Team training on new structure

## Performance Considerations

### Bundle Size Optimization
- Lazy loading for feature modules
- Tree-shaking with proper barrel exports
- OnPush change detection strategy
- Standalone components for better tree-shaking

### Runtime Performance
- Signal-based reactivity for better performance
- Efficient change detection with OnPush
- Proper subscription management
- Optimized data structures

### Memory Management
- Proper cleanup in component destruction
- Efficient observable patterns
- Avoid memory leaks in services
- Optimize large data sets with virtual scrolling

This design provides a solid foundation for the hub structure optimization, ensuring scalability, maintainability, and alignment with Angular v20 best practices.