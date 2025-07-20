/**
 * 工作區行事曆元件 - 極簡版本
 * 使用 ng-zorro-antd calendar 原生功能
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'task' | 'reminder';
}

@Component({
  selector: 'app-workspace-calendar',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzCardModule, NzBadgeModule],
  template: `
    <nz-card nzTitle="工作區日曆">
      <nz-calendar [nzFullscreen]="false">
        <ul *nzDateCell="let date" class="events">
          <ng-container *ngFor="let event of getEventsForDate(date)">
            <li [class]="'event-' + event.type">
              <nz-badge [nzStatus]="getEventStatus(event.type)" [nzText]="event.title"></nz-badge>
            </li>
          </ng-container>
        </ul>
      </nz-calendar>
    </nz-card>
  `,
  styles: [
    `
      .events {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
      }
      .event-meeting .ant-badge-status-dot {
        background-color: #1890ff;
      }
      .event-task .ant-badge-status-dot {
        background-color: #52c41a;
      }
      .event-reminder .ant-badge-status-dot {
        background-color: #faad14;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceCalendarComponent {
  events: CalendarEvent[] = [
    {
      id: '1',
      title: '團隊會議',
      date: new Date(2024, 0, 15, 10, 0),
      type: 'meeting'
    },
    {
      id: '2',
      title: '完成報告',
      date: new Date(2024, 0, 20, 14, 30),
      type: 'task'
    },
    {
      id: '3',
      title: '客戶回訪',
      date: new Date(2024, 0, 25, 9, 0),
      type: 'reminder'
    }
  ];

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(
      event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  }

  getEventStatus(type: string): 'success' | 'processing' | 'warning' {
    const status: Record<string, 'success' | 'processing' | 'warning'> = {
      meeting: 'processing',
      task: 'success',
      reminder: 'warning'
    };
    return status[type] || 'warning';
  }
}
