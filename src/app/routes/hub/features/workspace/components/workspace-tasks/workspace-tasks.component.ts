/**
 * 工作區任務管理元件
 * 
 * 功能：
 * - 工地任務管理和追蹤
 * - 支援設備、安全、施工、運輸等任務類型
 * - 使用 ng-zorro-antd table 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FabComponent } from '../../../../shared/components/fab/fab.component';
import { WorkspaceService } from '../../services/workspace.service';

interface WorkspaceTask {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    assignee: string;
    dueDate: Date;
    type: 'equipment' | 'safety' | 'construction' | 'transport';
    equipment?: string;
    progress: number;
}

@Component({
    selector: 'hub-workspace-tasks',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTableModule,
        NzCardModule,
        NzTagModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NzIconModule,
        FabComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- FAB for creating new task -->
    <hub-fab (onAction)="createTask()"></hub-fab>

    <nz-card title="任務管理" [nzExtra]="extraTemplate">
      <!-- 篩選器 -->
      <div class="filter-section">
        <nz-space>
          <nz-select 
            [(ngModel)]="selectedType"
            (ngModelChange)="onTypeFilter()"
            nzPlaceHolder="選擇類型"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
            <nz-option nzValue="safety" nzLabel="安全"></nz-option>
            <nz-option nzValue="construction" nzLabel="施工"></nz-option>
            <nz-option nzValue="transport" nzLabel="運輸"></nz-option>
          </nz-select>
          
          <nz-select 
            [(ngModel)]="selectedStatus"
            (ngModelChange)="onStatusFilter()"
            nzPlaceHolder="選擇狀態"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="pending" nzLabel="待處理"></nz-option>
            <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
            <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
            <nz-option nzValue="cancelled" nzLabel="已取消"></nz-option>
          </nz-select>

          <nz-select 
            [(ngModel)]="selectedPriority"
            (ngModelChange)="onPriorityFilter()"
            nzPlaceHolder="選擇優先級"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="urgent" nzLabel="緊急"></nz-option>
            <nz-option nzValue="high" nzLabel="高"></nz-option>
            <nz-option nzValue="medium" nzLabel="中"></nz-option>
            <nz-option nzValue="low" nzLabel="低"></nz-option>
          </nz-select>
        </nz-space>
      </div>

      <nz-table 
        #taskTable 
        [nzData]="filteredTasks()" 
        [nzPageSize]="10"
        [nzLoading]="loading()">
        <thead>
          <tr>
            <th>任務</th>
            <th>負責人</th>
            <th>類型</th>
            <th>優先級</th>
            <th>狀態</th>
            <th>進度</th>
            <th>截止日期</th>
            <th nzWidth="150px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of taskTable.data">
            <td>
              <div class="task-info">
                <div class="task-title">{{ task.title }}</div>
                <div class="task-desc">{{ task.description }}</div>
                <div class="task-equipment" *ngIf="task.equipment">
                  <span nz-icon nzType="tool"></span>
                  設備：{{ task.equipment }}
                </div>
              </div>
            </td>
            <td>{{ task.assignee }}</td>
            <td>
              <nz-tag [nzColor]="getTypeColor(task.type)">
                {{ getTypeText(task.type) }}
              </nz-tag>
            </td>
            <td>
              <nz-tag [nzColor]="getPriorityColor(task.priority)">
                {{ getPriorityText(task.priority) }}
              </nz-tag>
            </td>
            <td>
              <nz-tag [nzColor]="getStatusColor(task.status)">
                {{ getStatusText(task.status) }}
              </nz-tag>
            </td>
            <td>
              <div class="progress-info">
                {{ task.progress }}%
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    [style.width.%]="task.progress"
                    [style.background-color]="getProgressColor(task.progress)">
                  </div>
                </div>
              </div>
            </td>
            <td>{{ task.dueDate | date: 'MM-dd HH:mm' }}</td>
            <td>
              <nz-space nzSize="small">
                <button 
                  nz-button 
                  nzType="primary" 
                  nzSize="small" 
                  (click)="editTask(task)"
                  title="編輯">
                  <span nz-icon nzType="edit"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  (click)="viewTask(task)"
                  title="查看">
                  <span nz-icon nzType="eye"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  nzDanger
                  (click)="deleteTask(task)"
                  title="刪除">
                  <span nz-icon nzType="delete"></span>
                </button>
              </nz-space>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>

    <!-- 任務表單模態框 -->
    <nz-modal
      [nzVisible]="showTaskModal()"
      [nzTitle]="editingTask() ? '編輯任務' : '新增任務'"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="closeTaskModal()">
      
      <div *nzModalContent>
        <form nz-form [formGroup]="taskForm" (ngSubmit)="saveTask()">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>任務標題</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入任務標題">
              <input nz-input formControlName="title" placeholder="請輸入任務標題">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">任務描述</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <textarea
                nz-input
                formControlName="description"
                rows="3"
                placeholder="請輸入任務描述">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>任務類型</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇任務類型">
              <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
                <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
                <nz-option nzValue="safety" nzLabel="安全"></nz-option>
                <nz-option nzValue="construction" nzLabel="施工"></nz-option>
                <nz-option nzValue="transport" nzLabel="運輸"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>優先級</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇優先級">
              <nz-select formControlName="priority" nzPlaceHolder="請選擇優先級">
                <nz-option nzValue="urgent" nzLabel="緊急"></nz-option>
                <nz-option nzValue="high" nzLabel="高"></nz-option>
                <nz-option nzValue="medium" nzLabel="中"></nz-option>
                <nz-option nzValue="low" nzLabel="低"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>負責人</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入負責人">
              <input nz-input formControlName="assignee" placeholder="請輸入負責人">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">相關設備</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="equipment" placeholder="請輸入相關設備">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>截止日期</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇截止日期">
              <nz-date-picker
                formControlName="dueDate"
                nzShowTime
                nzFormat="yyyy-MM-dd HH:mm"
                nzPlaceHolder="請選擇截止日期"
                style="width: 100%">
              </nz-date-picker>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="6" [nzSpan]="18">
              <button nz-button nzType="primary" type="submit" [disabled]="!taskForm.valid">
                {{ editingTask() ? '更新' : '創建' }}
              </button>
              <button nz-button type="button" (click)="closeTaskModal()" style="margin-left: 8px;">
                取消
              </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </nz-modal>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" (click)="createTask()">
        新增任務
      </button>
    </ng-template>
  `,
    styles: [`
    .filter-section {
      padding: 16px;
      background: #fafafa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    
    .task-info {
      max-width: 250px;
    }
    
    .task-title {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .task-desc {
      color: #666;
      font-size: 12px;
      margin-bottom: 4px;
      line-height: 1.4;
    }
    
    .task-equipment {
      color: #1890ff;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .progress-info {
      min-width: 80px;
    }
    
    .progress-bar {
      width: 60px;
      height: 6px;
      background: #f0f0f0;
      border-radius: 3px;
      margin-top: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
  `]
})
export class WorkspaceTasksComponent implements OnInit {
    private workspaceService = inject(WorkspaceService);
    private message = inject(NzMessageService);
    private fb = inject(FormBuilder);

    // State management
    tasks = signal<WorkspaceTask[]>([]);
    filteredTasks = signal<WorkspaceTask[]>([]);
    loading = signal(false);
    showTaskModal = signal(false);
    editingTask = signal<WorkspaceTask | null>(null);

    // Filter states
    selectedType: string | null = null;
    selectedStatus: string | null = null;
    selectedPriority: string | null = null;

    // Form
    taskForm: FormGroup;

    constructor() {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required]],
            description: [''],
            type: ['equipment', [Validators.required]],
            priority: ['medium', [Validators.required]],
            assignee: ['', [Validators.required]],
            equipment: [''],
            dueDate: [new Date(), [Validators.required]]
        });
    }

    ngOnInit() {
        this.loadTasks();
    }

    private loadTasks() {
        this.loading.set(true);

        // 載入模擬任務數據
        const mockTasks: WorkspaceTask[] = [
            {
                id: '1',
                title: '起重機安全檢查',
                description: '200噸履帶式起重機每日安全檢查，確認制動系統和鋼絲繩狀態',
                priority: 'high',
                status: 'in-progress',
                assignee: '王師傅',
                dueDate: new Date(2024, 0, 25),
                type: 'safety',
                equipment: '200噸履帶式起重機',
                progress: 60
            },
            {
                id: '2',
                title: '鋼筋籠吊裝作業',
                description: '主體結構鋼筋籠吊裝，重量約15噸，需要100噸汽車吊配合',
                priority: 'urgent',
                status: 'pending',
                assignee: '李師傅',
                dueDate: new Date(2024, 0, 22),
                type: 'construction',
                equipment: '100噸汽車吊',
                progress: 0
            },
            {
                id: '3',
                title: '混凝土泵車維護',
                description: '60米臂長混凝土泵車例行維護，檢查液壓系統和臂架結構',
                priority: 'medium',
                status: 'completed',
                assignee: '陳師傅',
                dueDate: new Date(2024, 0, 20),
                type: 'equipment',
                equipment: '60米混凝土泵車',
                progress: 100
            },
            {
                id: '4',
                title: '高空作業平台檢查',
                description: '20米高空作業平台安全檢查，確認防護網和安全帶配置',
                priority: 'high',
                status: 'pending',
                assignee: '張公安',
                dueDate: new Date(2024, 0, 26),
                type: 'safety',
                equipment: '高空作業平台',
                progress: 0
            },
            {
                id: '5',
                title: '設備運輸安排',
                description: '安排挖掘機和推土機從A工地運輸到B工地',
                priority: 'medium',
                status: 'in-progress',
                assignee: '劉師傅',
                dueDate: new Date(2024, 0, 28),
                type: 'transport',
                equipment: '挖掘機、推土機',
                progress: 30
            }
        ];

        this.tasks.set(mockTasks);
        this.applyFilters();
        this.loading.set(false);
    }

    private applyFilters() {
        let filtered = this.tasks();

        if (this.selectedType) {
            filtered = filtered.filter(task => task.type === this.selectedType);
        }

        if (this.selectedStatus) {
            filtered = filtered.filter(task => task.status === this.selectedStatus);
        }

        if (this.selectedPriority) {
            filtered = filtered.filter(task => task.priority === this.selectedPriority);
        }

        this.filteredTasks.set(filtered);
    }

    onTypeFilter() {
        this.applyFilters();
    }

    onStatusFilter() {
        this.applyFilters();
    }

    onPriorityFilter() {
        this.applyFilters();
    }

    createTask() {
        this.editingTask.set(null);
        this.taskForm.reset({
            title: '',
            description: '',
            type: 'equipment',
            priority: 'medium',
            assignee: '',
            equipment: '',
            dueDate: new Date()
        });
        this.showTaskModal.set(true);
    }

    editTask(task: WorkspaceTask) {
        this.editingTask.set(task);
        this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            type: task.type,
            priority: task.priority,
            assignee: task.assignee,
            equipment: task.equipment || '',
            dueDate: task.dueDate
        });
        this.showTaskModal.set(true);
    }

    viewTask(task: WorkspaceTask) {
        // TODO: 實現查看任務詳情
        console.log('查看任務:', task);
    }

    deleteTask(task: WorkspaceTask) {
        const currentTasks = this.tasks();
        const updatedTasks = currentTasks.filter(t => t.id !== task.id);
        this.tasks.set(updatedTasks);
        this.applyFilters();
        this.message.success('任務刪除成功');
    }

    saveTask() {
        if (this.taskForm.valid) {
            const formValue = this.taskForm.value;
            const taskData: WorkspaceTask = {
                id: this.editingTask()?.id || Date.now().toString(),
                title: formValue.title,
                description: formValue.description,
                type: formValue.type,
                priority: formValue.priority,
                assignee: formValue.assignee,
                equipment: formValue.equipment,
                dueDate: formValue.dueDate,
                status: this.editingTask()?.status || 'pending',
                progress: this.editingTask()?.progress || 0
            };

            const currentTasks = this.tasks();
            if (this.editingTask()) {
                // 更新現有任務
                const index = currentTasks.findIndex(t => t.id === this.editingTask()!.id);
                if (index !== -1) {
                    currentTasks[index] = taskData;
                    this.tasks.set([...currentTasks]);
                }
                this.message.success('任務更新成功');
            } else {
                // 新增任務
                this.tasks.set([...currentTasks, taskData]);
                this.message.success('任務創建成功');
            }

            this.applyFilters();
            this.closeTaskModal();
        }
    }

    closeTaskModal() {
        this.showTaskModal.set(false);
        this.editingTask.set(null);
    }

    // 工具方法
    getPriorityColor(priority: string): string {
        const colors: Record<string, string> = {
            urgent: 'red',
            high: 'orange',
            medium: 'blue',
            low: 'green'
        };
        return colors[priority] || 'default';
    }

    getPriorityText(priority: string): string {
        const texts: Record<string, string> = {
            urgent: '緊急',
            high: '高',
            medium: '中',
            low: '低'
        };
        return texts[priority] || '未知';
    }

    getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            pending: 'blue',
            'in-progress': 'orange',
            completed: 'green',
            cancelled: 'red'
        };
        return colors[status] || 'default';
    }

    getStatusText(status: string): string {
        const texts: Record<string, string> = {
            pending: '待處理',
            'in-progress': '進行中',
            completed: '已完成',
            cancelled: '已取消'
        };
        return texts[status] || '未知';
    }

    getTypeColor(type: string): string {
        const colors: Record<string, string> = {
            equipment: 'purple',
            safety: 'red',
            construction: 'blue',
            transport: 'orange'
        };
        return colors[type] || 'default';
    }

    getTypeText(type: string): string {
        const texts: Record<string, string> = {
            equipment: '設備',
            safety: '安全',
            construction: '施工',
            transport: '運輸'
        };
        return texts[type] || '未知';
    }

    getProgressColor(progress: number): string {
        if (progress >= 80) return '#52c41a';
        if (progress >= 60) return '#1890ff';
        if (progress >= 40) return '#faad14';
        return '#f5222d';
    }
}