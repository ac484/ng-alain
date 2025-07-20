/**
 * 工作區任務管理元件
 *
 * 本檔案依據 ng-alain 20 架構，使用 ng-zorro-antd 表格和表單元件
 * 提供任務管理功能，支援任務的增刪改查和狀態管理
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  dueDate: Date;
  createdAt: Date;
}

@Component({
  selector: 'app-workspace-task',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTagModule,
    NzIconModule,
    NzPopconfirmModule,
    ReactiveFormsModule
  ],
  template: `
    <nz-card nzTitle="任務管理" [nzExtra]="extraTemplate">
      <ng-template #extraTemplate>
        <button nz-button nzType="primary" (click)="showAddTaskModal()">
          <span nz-icon nzType="plus"></span>
          新增任務
        </button>
      </ng-template>

      <nz-table #basicTable [nzData]="tasks" [nzPageSize]="10" [nzShowPagination]="true">
        <thead>
          <tr>
            <th>任務標題</th>
            <th>負責人</th>
            <th>優先級</th>
            <th>狀態</th>
            <th>截止日期</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let task of basicTable.data">
            <td>
              <div class="task-title">{{ task.title }}</div>
              <div class="task-description">{{ task.description }}</div>
            </td>
            <td>{{ task.assignee }}</td>
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
            <td>{{ task.dueDate | date: 'yyyy-MM-dd' }}</td>
            <td>
              <a nz-button nzType="link" (click)="editTask(task)">
                <span nz-icon nzType="edit"></span>
              </a>
              <nz-popconfirm nzTitle="確定要刪除這個任務嗎？" (nzOnConfirm)="deleteTask(task.id)">
                <button nz-button nzType="link" nzDanger>
                  <span nz-icon nzType="delete"></span>
                </button>
              </nz-popconfirm>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>

    <!-- 新增/編輯任務模態框 -->
    <nz-modal
      [(nzVisible)]="isTaskModalVisible"
      [nzTitle]="isEditing ? '編輯任務' : '新增任務'"
      (nzOnCancel)="handleTaskModalCancel()"
      (nzOnOk)="handleTaskModalOk()"
    >
      <form nz-form [formGroup]="taskForm" nz-row [nzGutter]="16">
        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>任務標題</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="title" placeholder="請輸入任務標題" />
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6">任務描述</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <textarea
                nz-input
                formControlName="description"
                [nzAutosize]="{ minRows: 3, maxRows: 5 }"
                placeholder="請輸入任務描述"
              ></textarea>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>負責人</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <input nz-input formControlName="assignee" placeholder="請輸入負責人" />
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>優先級</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-select formControlName="priority" placeholder="請選擇優先級">
                <nz-option nzValue="low" nzLabel="低"></nz-option>
                <nz-option nzValue="medium" nzLabel="中"></nz-option>
                <nz-option nzValue="high" nzLabel="高"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>狀態</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-select formControlName="status" placeholder="請選擇狀態">
                <nz-option nzValue="pending" nzLabel="待處理"></nz-option>
                <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
                <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
                <nz-option nzValue="cancelled" nzLabel="已取消"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>截止日期</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-date-picker formControlName="dueDate" nzFormat="yyyy-MM-dd"></nz-date-picker>
            </nz-form-control>
          </nz-form-item>
        </div>
      </form>
    </nz-modal>
  `,
  styles: [
    `
      .task-title {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .task-description {
        color: #666;
        font-size: 12px;
        line-height: 1.4;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceTaskComponent {
  tasks: Task[] = [];
  isTaskModalVisible = false;
  isEditing = false;
  editingTaskId: string | null = null;
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      assignee: ['', [Validators.required]],
      priority: ['medium', [Validators.required]],
      status: ['pending', [Validators.required]],
      dueDate: [null, [Validators.required]]
    });

    this.initializeSampleTasks();
  }

  private initializeSampleTasks(): void {
    const today = new Date();
    this.tasks = [
      {
        id: '1',
        title: '完成季度報告',
        description: '撰寫本季度業務分析報告',
        priority: 'high',
        status: 'in-progress',
        assignee: '張三',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
        createdAt: new Date()
      },
      {
        id: '2',
        title: '客戶會議準備',
        description: '準備下週客戶會議的資料',
        priority: 'medium',
        status: 'pending',
        assignee: '李四',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        createdAt: new Date()
      },
      {
        id: '3',
        title: '系統維護',
        description: '進行系統例行維護和更新',
        priority: 'low',
        status: 'completed',
        assignee: '王五',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        createdAt: new Date()
      }
    ];
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '未知';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'blue';
      case 'in-progress':
        return 'orange';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return '待處理';
      case 'in-progress':
        return '進行中';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return '未知';
    }
  }

  showAddTaskModal(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.isTaskModalVisible = true;
    this.taskForm.reset({
      priority: 'medium',
      status: 'pending'
    });
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.isTaskModalVisible = true;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate
    });
  }

  handleTaskModalCancel(): void {
    this.isTaskModalVisible = false;
    this.taskForm.reset();
  }

  handleTaskModalOk(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.isEditing && this.editingTaskId) {
        // 編輯現有任務
        const index = this.tasks.findIndex(task => task.id === this.editingTaskId);
        if (index !== -1) {
          this.tasks[index] = {
            ...this.tasks[index],
            ...formValue
          };
          this.message.success('任務更新成功');
        }
      } else {
        // 新增任務
        const newTask: Task = {
          id: Date.now().toString(),
          ...formValue,
          createdAt: new Date()
        };
        this.tasks.push(newTask);
        this.message.success('任務新增成功');
      }

      this.isTaskModalVisible = false;
      this.taskForm.reset();
    } else {
      this.message.error('請填寫完整資訊');
    }
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.message.success('任務刪除成功');
  }
}
