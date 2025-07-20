/**
 * 工作區任務管理元件 - 極簡版本
 * 使用 ng-zorro-antd table 原生功能
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: Date;
}

@Component({
  selector: 'app-workspace-task',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzCardModule, NzTagModule],
  template: `
    <nz-card nzTitle="任務管理">
      <nz-table #basicTable [nzData]="tasks" [nzPageSize]="10">
        <thead>
          <tr>
            <th>任務</th>
            <th>負責人</th>
            <th>優先級</th>
            <th>狀態</th>
            <th>截止日期</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of basicTable.data">
            <td>
              <div class="task-title">{{ task.title }}</div>
              <div class="task-desc">{{ task.description }}</div>
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
            <td>{{ task.dueDate | date: 'MM-dd' }}</td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>
  `,
  styles: [
    `
      .task-title {
        font-weight: 500;
        margin-bottom: 4px;
      }
      .task-desc {
        color: #666;
        font-size: 12px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceTaskComponent {
  tasks: Task[] = [
    {
      id: '1',
      title: '完成季度報告',
      description: '撰寫本季度業務分析報告',
      priority: 'high',
      status: 'in-progress',
      assignee: '張三',
      dueDate: new Date(2024, 0, 25)
    },
    {
      id: '2',
      title: '客戶會議準備',
      description: '準備下週客戶會議的資料',
      priority: 'medium',
      status: 'pending',
      assignee: '李四',
      dueDate: new Date(2024, 0, 22)
    },
    {
      id: '3',
      title: '系統維護',
      description: '進行系統例行維護和更新',
      priority: 'low',
      status: 'completed',
      assignee: '王五',
      dueDate: new Date(2024, 0, 20)
    }
  ];

  constructor(private message: NzMessageService) {}

  getPriorityColor(priority: string): string {
    const colors: Record<string, string> = { high: 'red', medium: 'orange', low: 'green' };
    return colors[priority] || 'default';
  }

  getPriorityText(priority: string): string {
    const texts: Record<string, string> = { high: '高', medium: '中', low: '低' };
    return texts[priority] || '未知';
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = { pending: 'blue', 'in-progress': 'orange', completed: 'green' };
    return colors[status] || 'default';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = { pending: '待處理', 'in-progress': '進行中', completed: '已完成' };
    return texts[status] || '未知';
  }
}
