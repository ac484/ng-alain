/**
 * 工地重設備搬運行事曆元件 - 極簡版本
 * 使用 ng-zorro-antd calendar 原生功能
 */

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';

interface ConstructionEvent {
  id: string;
  title: string;
  date: Date;
  type: 'construction' | 'equipment' | 'safety' | 'maintenance';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-workspace-calendar',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzCardModule, NzBadgeModule],
  template: `
    <nz-card nzTitle="工地施工行事曆">
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
      .event-construction .ant-badge-status-dot {
        background-color: #1890ff;
      }
      .event-equipment .ant-badge-status-dot {
        background-color: #722ed1;
      }
      .event-safety .ant-badge-status-dot {
        background-color: #f5222d;
      }
      .event-maintenance .ant-badge-status-dot {
        background-color: #fa8c16;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceCalendarComponent {
  events: ConstructionEvent[] = [
    {
      id: '1',
      title: '主體結構施工開始',
      date: new Date(2024, 0, 15, 8, 0),
      type: 'construction',
      priority: 'high'
    },
    {
      id: '2',
      title: '起重機安全檢查',
      date: new Date(2024, 0, 20, 7, 30),
      type: 'safety',
      priority: 'high'
    },
    {
      id: '3',
      title: '混凝土泵車維護',
      date: new Date(2024, 0, 25, 9, 0),
      type: 'maintenance',
      priority: 'medium'
    },
    {
      id: '4',
      title: '鋼筋籠吊裝作業',
      date: new Date(2024, 0, 28, 14, 0),
      type: 'construction',
      priority: 'high'
    },
    {
      id: '5',
      title: '高空作業平台檢查',
      date: new Date(2024, 1, 2, 8, 0),
      type: 'safety',
      priority: 'high'
    },
    {
      id: '6',
      title: '設備運輸任務',
      date: new Date(2024, 1, 5, 6, 0),
      type: 'equipment',
      priority: 'medium'
    },
    {
      id: '7',
      title: '環境噪音檢測',
      date: new Date(2024, 1, 8, 10, 0),
      type: 'safety',
      priority: 'low'
    },
    {
      id: '8',
      title: '主體澆築作業',
      date: new Date(2024, 1, 12, 7, 0),
      type: 'construction',
      priority: 'high'
    }
  ];

  getEventsForDate(date: Date): ConstructionEvent[] {
    return this.events.filter(
      event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  }

  getEventStatus(type: string): 'success' | 'processing' | 'warning' | 'error' {
    const status: Record<string, 'success' | 'processing' | 'warning' | 'error'> = {
      construction: 'processing',
      equipment: 'success',
      safety: 'error',
      maintenance: 'warning'
    };
    return status[type] || 'warning';
  }
}
