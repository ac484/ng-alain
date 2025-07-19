/**
 * 工作區總覽元件
 *
 * 本檔案依據 ng-alain 20 架構，使用 ng-zorro-antd 統計和卡片元件
 * 提供工作區的整體概況、統計數據和快速操作入口
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

interface WorkspaceStats {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  pendingTasks: number;
  teamMembers: number;
  totalBudget: number;
  usedBudget: number;
}

interface RecentActivity {
  id: string;
  type: 'task' | 'project' | 'meeting' | 'milestone';
  title: string;
  description: string;
  time: string;
  user: string;
  status: 'completed' | 'in-progress' | 'pending';
}

@Component({
  selector: 'app-workspace-overview',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzProgressModule,
    NzListModule,
    NzTagModule,
    NzAvatarModule,
    NzBadgeModule
  ],
  template: `
    <div class="workspace-overview">
      <!-- 統計卡片 -->
      <nz-row [nzGutter]="16" class="stats-row">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="總專案數" [nzValue]="stats.totalProjects" nzPrefix="📊"> </nz-statistic>
            <div class="stat-detail">
              <span class="active">{{ stats.activeProjects }}</span> 進行中
            </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="任務完成率" [nzValue]="getTaskCompletionRate()" nzSuffix="%" nzPrefix="✅"> </nz-statistic>
            <div class="stat-detail">
              <span class="completed">{{ stats.completedTasks }}</span> / {{ stats.completedTasks + stats.pendingTasks }}
            </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="團隊成員" [nzValue]="stats.teamMembers" nzPrefix="👥"> </nz-statistic>
            <div class="stat-detail"> <span class="online">12</span> 在線 </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="預算使用" [nzValue]="getBudgetUsageRate()" nzSuffix="%" nzPrefix="💰"> </nz-statistic>
            <div class="stat-detail">
              <span class="used">{{ stats.usedBudget | number: '1.0-0' }}</span> / {{ stats.totalBudget | number: '1.0-0' }} 萬
            </div>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 進度概覽 -->
      <nz-row [nzGutter]="16" class="progress-row">
        <nz-col [nzSpan]="12">
          <nz-card nzTitle="專案進度" [nzExtra]="projectExtraTemplate">
            <ng-template #projectExtraTemplate>
              <a nz-button nzType="link">查看全部</a>
            </ng-template>

            <div class="progress-item">
              <div class="progress-header">
                <span>網站重構專案</span>
                <span class="progress-percent">75%</span>
              </div>
              <nz-progress [nzPercent]="75" nzStatus="active"></nz-progress>
              <div class="progress-info">預計完成時間：2024-02-15</div>
            </div>

            <div class="progress-item">
              <div class="progress-header">
                <span>移動端開發</span>
                <span class="progress-percent">45%</span>
              </div>
              <nz-progress [nzPercent]="45"></nz-progress>
              <div class="progress-info">預計完成時間：2024-03-01</div>
            </div>

            <div class="progress-item">
              <div class="progress-header">
                <span>資料庫優化</span>
                <span class="progress-percent">90%</span>
              </div>
              <nz-progress [nzPercent]="90" nzStatus="success"></nz-progress>
              <div class="progress-info">預計完成時間：2024-01-30</div>
            </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="12">
          <nz-card nzTitle="最近活動" [nzExtra]="activityExtraTemplate">
            <ng-template #activityExtraTemplate>
              <a nz-button nzType="link">查看全部</a>
            </ng-template>

            <nz-list [nzDataSource]="recentActivities" [nzRenderItem]="activityItem" [nzItemLayout]="'horizontal'" [nzSize]="'small'">
              <ng-template #activityItem let-item>
                <nz-list-item>
                  <nz-list-item-meta>
                    <nz-list-item-meta-avatar>
                      <nz-avatar [nzSize]="32">
                        <span nz-icon [nzType]="getActivityIcon(item.type)"></span>
                      </nz-avatar>
                    </nz-list-item-meta-avatar>
                    <nz-list-item-meta-title>
                      <a>{{ item.title }}</a>
                      <nz-tag [nzColor]="getStatusColor(item.status)" class="status-tag">
                        {{ getStatusText(item.status) }}
                      </nz-tag>
                    </nz-list-item-meta-title>
                    <nz-list-item-meta-description>
                      {{ item.description }}
                      <div class="activity-meta">
                        <span class="user">{{ item.user }}</span>
                        <span class="time">{{ item.time }}</span>
                      </div>
                    </nz-list-item-meta-description>
                  </nz-list-item-meta>
                </nz-list-item>
              </ng-template>
            </nz-list>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 快速操作 -->
      <nz-row [nzGutter]="16" class="actions-row">
        <nz-col [nzSpan]="24">
          <nz-card nzTitle="快速操作">
            <nz-row [nzGutter]="16">
              <nz-col [nzSpan]="6">
                <button nz-button nzType="primary" nzSize="large" class="action-btn">
                  <span nz-icon nzType="plus"></span>
                  新增專案
                </button>
              </nz-col>
              <nz-col [nzSpan]="6">
                <button nz-button nzSize="large" class="action-btn">
                  <span nz-icon nzType="calendar"></span>
                  查看日曆
                </button>
              </nz-col>
              <nz-col [nzSpan]="6">
                <button nz-button nzSize="large" class="action-btn">
                  <span nz-icon nzType="team"></span>
                  團隊管理
                </button>
              </nz-col>
              <nz-col [nzSpan]="6">
                <button nz-button nzSize="large" class="action-btn">
                  <span nz-icon nzType="file-text"></span>
                  生成報告
                </button>
              </nz-col>
            </nz-row>
          </nz-card>
        </nz-col>
      </nz-row>
    </div>
  `,
  styles: [
    `
      .workspace-overview {
        padding: 16px;
      }

      .stats-row {
        margin-bottom: 16px;
      }

      .progress-row {
        margin-bottom: 16px;
      }

      .actions-row {
        margin-bottom: 16px;
      }

      .stat-detail {
        margin-top: 8px;
        font-size: 12px;
        color: #666;
      }

      .stat-detail .active,
      .stat-detail .completed,
      .stat-detail .online,
      .stat-detail .used {
        color: #1890ff;
        font-weight: 500;
      }

      .progress-item {
        margin-bottom: 16px;
      }

      .progress-item:last-child {
        margin-bottom: 0;
      }

      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .progress-percent {
        font-weight: 500;
        color: #1890ff;
      }

      .progress-info {
        margin-top: 4px;
        font-size: 12px;
        color: #666;
      }

      .status-tag {
        margin-left: 8px;
      }

      .activity-meta {
        margin-top: 4px;
        font-size: 12px;
      }

      .activity-meta .user {
        color: #1890ff;
        margin-right: 8px;
      }

      .activity-meta .time {
        color: #999;
      }

      .action-btn {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .action-btn span[nz-icon] {
        font-size: 20px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceOverviewComponent {
  stats: WorkspaceStats = {
    totalProjects: 12,
    activeProjects: 8,
    completedTasks: 156,
    pendingTasks: 23,
    teamMembers: 15,
    totalBudget: 500,
    usedBudget: 320
  };

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'task',
      title: '完成用戶介面設計',
      description: '完成了新版本用戶介面的設計稿',
      time: '2小時前',
      user: '張三',
      status: 'completed'
    },
    {
      id: '2',
      type: 'project',
      title: '啟動新專案',
      description: '開始了電商平台的開發專案',
      time: '4小時前',
      user: '李四',
      status: 'in-progress'
    },
    {
      id: '3',
      type: 'meeting',
      title: '週會討論',
      description: '討論本週工作進度和下週計劃',
      time: '1天前',
      user: '王五',
      status: 'completed'
    },
    {
      id: '4',
      type: 'milestone',
      title: '第一階段完成',
      description: '完成了專案第一階段的所有任務',
      time: '2天前',
      user: '趙六',
      status: 'completed'
    }
  ];

  getTaskCompletionRate(): number {
    const total = this.stats.completedTasks + this.stats.pendingTasks;
    return total > 0 ? Math.round((this.stats.completedTasks / total) * 100) : 0;
  }

  getBudgetUsageRate(): number {
    return this.stats.totalBudget > 0 ? Math.round((this.stats.usedBudget / this.stats.totalBudget) * 100) : 0;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'task':
        return 'check-circle';
      case 'project':
        return 'rocket';
      case 'meeting':
        return 'team';
      case 'milestone':
        return 'flag';
      default:
        return 'info-circle';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '進行中';
      case 'pending':
        return '待處理';
      default:
        return '未知';
    }
  }
}
