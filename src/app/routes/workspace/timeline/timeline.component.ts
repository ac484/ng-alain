/**
 * 工作區時間軸元件 - 極簡版本
 * 使用 ng-zorro-antd timeline 原生功能
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: Date;
  user: string;
}

@Component({
  selector: 'app-workspace-timeline',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTimelineModule, NzButtonModule, NzIconModule, NzTagModule],
  template: `
    <nz-card nzTitle="工作區時間線">
      <nz-timeline>
        <nz-timeline-item *ngFor="let event of events" [nzColor]="getStatusColor(event.status)">
          <div class="timeline-item">
            <div class="timeline-header">
              <h4>{{ event.title }}</h4>
              <nz-tag [nzColor]="getStatusColor(event.status)">
                {{ getStatusText(event.status) }}
              </nz-tag>
            </div>
            <p>{{ event.description }}</p>
            <div class="timeline-footer">
              <span>{{ event.user }}</span>
              <span>{{ event.date | date: 'MM-dd HH:mm' }}</span>
            </div>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>
  `,
  styles: [
    `
      .timeline-item {
        margin-left: 16px;
      }
      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .timeline-header h4 {
        margin: 0;
      }
      .timeline-footer {
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 12px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceTimelineComponent {
  events: TimelineEvent[] = [
    {
      id: '1',
      title: '專案啟動',
      description: '新專案正式啟動',
      status: 'completed',
      date: new Date(2024, 0, 15),
      user: '張三'
    },
    {
      id: '2',
      title: '需求分析',
      description: '完成用戶需求分析',
      status: 'in-progress',
      date: new Date(2024, 0, 20),
      user: '李四'
    },
    {
      id: '3',
      title: 'UI設計',
      description: '開始介面設計',
      status: 'pending',
      date: new Date(2024, 0, 25),
      user: '王五'
    }
  ];

  constructor(private message: NzMessageService) {}

  getStatusColor(status: string): string {
    const colors: Record<string, string> = { completed: 'green', 'in-progress': 'blue', pending: 'orange' };
    return colors[status] || 'gray';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = { completed: '已完成', 'in-progress': '進行中', pending: '待處理' };
    return texts[status] || '未知';
  }
}
