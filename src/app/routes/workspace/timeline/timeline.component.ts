/**
 * 工地重設備搬運時間軸元件 - 極簡版本
 * 使用 ng-zorro-antd timeline 原生功能
 */

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

interface ConstructionEvent {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  date: Date;
  operator: string;
  type: 'equipment' | 'safety' | 'construction' | 'transport';
}

@Component({
  selector: 'app-workspace-timeline',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTimelineModule, NzButtonModule, NzIconModule, NzTagModule],
  template: `
    <nz-card nzTitle="工地施工時間線">
      <nz-timeline>
        <nz-timeline-item *ngFor="let event of events" [nzColor]="getStatusColor(event.status)">
          <div class="timeline-item">
            <div class="timeline-header">
              <h4>{{ event.title }}</h4>
              <div class="timeline-tags">
                <nz-tag [nzColor]="getTypeColor(event.type)">
                  {{ getTypeText(event.type) }}
                </nz-tag>
                <nz-tag [nzColor]="getStatusColor(event.status)">
                  {{ getStatusText(event.status) }}
                </nz-tag>
              </div>
            </div>
            <p>{{ event.description }}</p>
            <div class="timeline-footer">
              <span>操作員：{{ event.operator }}</span>
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
      .timeline-tags {
        display: flex;
        gap: 8px;
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
  events: ConstructionEvent[] = [
    {
      id: '1',
      title: '起重機進場安裝',
      description: '200噸履帶式起重機進場，完成基礎安裝和安全檢查',
      status: 'completed',
      date: new Date(2024, 0, 15, 8, 0),
      operator: '王師傅',
      type: 'equipment'
    },
    {
      id: '2',
      title: '鋼筋籠吊裝作業',
      description: '主體結構鋼筋籠吊裝，重量約15噸，使用100噸汽車吊',
      status: 'in-progress',
      date: new Date(2024, 0, 20, 14, 30),
      operator: '李師傅',
      type: 'construction'
    },
    {
      id: '3',
      title: '高空作業安全檢查',
      description: '20米高空作業平台安全檢查，確認防護措施到位',
      status: 'pending',
      date: new Date(2024, 0, 25, 9, 0),
      operator: '張公安',
      type: 'safety'
    },
    {
      id: '4',
      title: '混凝土泵車進場',
      description: '60米臂長混凝土泵車進場，準備進行主體澆築',
      status: 'delayed',
      date: new Date(2024, 0, 28, 7, 0),
      operator: '陳師傅',
      type: 'transport'
    }
  ];

  constructor(private message: NzMessageService) {}

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      completed: 'green',
      'in-progress': 'blue',
      pending: 'orange',
      delayed: 'red'
    };
    return colors[status] || 'gray';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = {
      completed: '已完成',
      'in-progress': '進行中',
      pending: '待處理',
      delayed: '延遲'
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
