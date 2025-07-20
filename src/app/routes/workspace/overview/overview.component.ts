/**
 * 工作區概覽元件 - 極簡版本
 * 使用 ng-zorro-antd 原生功能
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Project {
  name: string;
  progress: number;
  dueDate: string;
}

interface Activity {
  title: string;
  user: string;
  time: string;
  status: 'completed' | 'in-progress';
}

@Component({
  selector: 'app-workspace-overview',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzStatisticModule, NzGridModule, NzProgressModule, NzListModule, NzTagModule],
  template: `
    <div class="overview">
      <!-- 統計卡片 -->
      <nz-row [nzGutter]="16" class="stats">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="專案數" [nzValue]="12" nzPrefix="📊"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="任務完成率" [nzValue]="87" nzSuffix="%" nzPrefix="✅"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="團隊成員" [nzValue]="15" nzPrefix="👥"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="預算使用" [nzValue]="64" nzSuffix="%" nzPrefix="💰"></nz-statistic>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 專案進度 -->
      <nz-row [nzGutter]="16" class="content">
        <nz-col [nzSpan]="12">
          <nz-card nzTitle="專案進度">
            <div *ngFor="let project of projects" class="project-item">
              <div class="project-header">
                <span>{{ project.name }}</span>
                <span>{{ project.progress }}%</span>
              </div>
              <nz-progress [nzPercent]="project.progress"></nz-progress>
              <div class="project-due">截止：{{ project.dueDate }}</div>
            </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="12">
          <nz-card nzTitle="最近活動">
            <nz-list [nzDataSource]="activities" [nzSize]="'small'">
              <ng-template #item let-item>
                <nz-list-item>
                  <div class="activity-item">
                    <div class="activity-title">{{ item.title }}</div>
                    <div class="activity-meta">
                      <span>{{ item.user }}</span>
                      <nz-tag [nzColor]="getStatusColor(item.status)">
                        {{ getStatusText(item.status) }}
                      </nz-tag>
                      <span>{{ item.time }}</span>
                    </div>
                  </div>
                </nz-list-item>
              </ng-template>
            </nz-list>
          </nz-card>
        </nz-col>
      </nz-row>
    </div>
  `,
  styles: [
    `
      .overview {
        padding: 16px;
      }
      .stats {
        margin-bottom: 16px;
      }
      .content {
        margin-bottom: 16px;
      }
      .project-item {
        margin-bottom: 16px;
      }
      .project-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .project-due {
        margin-top: 4px;
        font-size: 12px;
        color: #666;
      }
      .activity-item {
        width: 100%;
      }
      .activity-title {
        margin-bottom: 4px;
      }
      .activity-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #666;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceOverviewComponent {
  projects: Project[] = [
    { name: '網站重構', progress: 75, dueDate: '2024-02-15' },
    { name: '移動端開發', progress: 45, dueDate: '2024-03-01' },
    { name: '資料庫優化', progress: 90, dueDate: '2024-01-30' }
  ];

  activities: Activity[] = [
    { title: '完成用戶介面設計', user: '張三', time: '2小時前', status: 'completed' },
    { title: '啟動新專案', user: '李四', time: '4小時前', status: 'in-progress' },
    { title: '週會討論', user: '王五', time: '1天前', status: 'completed' }
  ];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = { completed: 'green', 'in-progress': 'blue' };
    return colors[status] || 'default';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = { completed: '已完成', 'in-progress': '進行中' };
    return texts[status] || '未知';
  }
}
