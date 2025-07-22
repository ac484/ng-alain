/**
 * 工地重設備搬運任務管理元件 - 極簡版本
 * 使用 ng-zorro-antd table 原生功能
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ConstructionTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  dueDate: Date;
  type: 'equipment' | 'safety' | 'construction' | 'transport';
  equipment?: string;
}

@Component({
  selector: 'app-workspace-task',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzCardModule, NzTagModule],
  template: `
    <nz-card nzTitle="工地任務管理">
      <nz-table #basicTable [nzData]="tasks" [nzPageSize]="10">
        <thead>
          <tr>
            <th>任務</th>
            <th>負責人</th>
            <th>類型</th>
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
              <div class="task-equipment" *ngIf="task.equipment">設備：{{ task.equipment }}</div>
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
        margin-bottom: 4px;
      }
      .task-equipment {
        color: #1890ff;
        font-size: 12px;
        font-weight: 500;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceTaskComponent {
  tasks: ConstructionTask[] = [
    {
      id: '1',
      title: '起重機安全檢查',
      description: '200噸履帶式起重機每日安全檢查，確認制動系統和鋼絲繩狀態',
      priority: 'high',
      status: 'in-progress',
      assignee: '王師傅',
      dueDate: new Date(2024, 0, 25),
      type: 'safety',
      equipment: '200噸履帶式起重機'
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
      equipment: '100噸汽車吊'
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
      equipment: '60米混凝土泵車'
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
      equipment: '高空作業平台'
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
      equipment: '挖掘機、推土機'
    }
  ];

  constructor(private message: NzMessageService) {}

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
}
