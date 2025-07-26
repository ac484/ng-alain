import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { WorkspaceService } from '../../services/workspace.service';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface RecentActivity {
  title: string;
  time: string;
  type: 'task' | 'log' | 'event';
  status: 'success' | 'warning' | 'error' | 'info';
}

@Component({
  selector: 'hub-workspace-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzTagModule
  ],
  template: `
    <div class="workspace-dashboard">
      <div class="dashboard-header">
        <h2>工作區儀表板</h2>
        <p>工地重設備搬運管理中心</p>
      </div>
      
      <!-- 統計卡片 -->
      <nz-row [nzGutter]="16" class="stats-section">
        <nz-col [nzSpan]="6">
          <nz-card class="stat-card">
            <nz-statistic 
              nzTitle="工作區項目" 
              [nzValue]="dashboardStats().totalItems"
              nzSuffix="個"
              nzPrefix="🏗️">
            </nz-statistic>
          </nz-card>
        </nz-col>
        
        <nz-col [nzSpan]="6">
          <nz-card class="stat-card">
            <nz-statistic 
              nzTitle="進行中任務" 
              [nzValue]="dashboardStats().activeTasks"
              nzSuffix="項"
              nzPrefix="📋">
            </nz-statistic>
          </nz-card>
        </nz-col>
        
        <nz-col [nzSpan]="6">
          <nz-card class="stat-card">
            <nz-statistic 
              nzTitle="安全檢查" 
              [nzValue]="dashboardStats().safetyChecks"
              nzSuffix="%"
              nzPrefix="🛡️"
              [nzValueStyle]="{ color: '#3f8600' }">
            </nz-statistic>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="6">
          <nz-card class="stat-card">
            <nz-statistic 
              nzTitle="設備狀態" 
              [nzValue]="dashboardStats().equipmentStatus"
              nzSuffix="%"
              nzPrefix="⚙️"
              [nzValueStyle]="{ color: '#1890ff' }">
            </nz-statistic>
          </nz-card>
        </nz-col>
      </nz-row>
      
      <!-- 快速操作 -->
      <nz-row [nzGutter]="16" class="content-section">
        <nz-col [nzSpan]="16">
          <nz-card nzTitle="快速操作" class="quick-actions-card">
            <nz-row [nzGutter]="16">
              <nz-col [nzSpan]="8" *ngFor="let action of quickActions()">
                <div class="quick-action-item" (click)="navigateTo(action.route)">
                  <div class="action-icon" [style.background-color]="action.color">
                    <span nz-icon [nzType]="action.icon" nzTheme="outline"></span>
                  </div>
                  <div class="action-content">
                    <h4>{{ action.title }}</h4>
                    <p>{{ action.description }}</p>
                  </div>
                </div>
              </nz-col>
            </nz-row>
          </nz-card>
        </nz-col>

        <!-- 最近活動 -->
        <nz-col [nzSpan]="8">
          <nz-card nzTitle="最近活動" class="recent-activity-card">
            <nz-list [nzDataSource]="recentActivities()" [nzSize]="'small'">
              <ng-template #item let-activity>
                <nz-list-item>
                  <div class="activity-item">
                    <div class="activity-content">
                      <div class="activity-title">{{ activity.title }}</div>
                      <div class="activity-time">{{ activity.time }}</div>
                    </div>
                    <nz-tag [nzColor]="getActivityColor(activity.status)">
                      {{ getActivityText(activity.type) }}
                    </nz-tag>
                  </div>
                </nz-list-item>
              </ng-template>
            </nz-list>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 功能導航 -->
      <nz-row [nzGutter]="16" class="navigation-section">
        <nz-col [nzSpan]="24">
          <nz-card nzTitle="功能導航">
            <div class="nav-grid">
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/overview')">
                <span nz-icon nzType="dashboard"></span>
                工作區概覽
              </button>
              
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/list')">
                <span nz-icon nzType="unordered-list"></span>
                項目列表
              </button>
              
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/tasks')">
                <span nz-icon nzType="check-square"></span>
                任務管理
              </button>
              
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/calendar')">
                <span nz-icon nzType="calendar"></span>
                行事曆
              </button>
              
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/daily-log')">
                <span nz-icon nzType="file-text"></span>
                施工日誌
              </button>
              
              <button 
                nz-button 
                nzType="default" 
                nzSize="large"
                class="nav-button"
                (click)="navigateTo('/hub/workspace/memos')">
                <span nz-icon nzType="book"></span>
                工地備忘錄
              </button>
            </div>
          </nz-card>
        </nz-col>
      </nz-row>
    </div>
  `,
  styles: [`
    .workspace-dashboard {
      padding: 24px;
    }
    
    .dashboard-header {
      margin-bottom: 24px;
    }
    
    .dashboard-header h2 {
      margin: 0 0 8px 0;
      color: #1890ff;
    }
    
    .dashboard-header p {
      margin: 0;
      color: #666;
    }
    
    .stats-section {
      margin-bottom: 24px;
    }
    
    .stat-card {
      text-align: center;
      transition: all 0.3s;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .content-section {
      margin-bottom: 24px;
    }
    
    .quick-actions-card {
      height: 300px;
    }
    
    .quick-action-item {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      margin-bottom: 16px;
    }
    
    .quick-action-item:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
    }
    
    .action-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      color: white;
      font-size: 20px;
    }
    
    .action-content h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 500;
    }
    
    .action-content p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }
    
    .recent-activity-card {
      height: 300px;
    }
    
    .activity-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-title {
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    .activity-time {
      font-size: 11px;
      color: #999;
    }
    
    .navigation-section {
      margin-bottom: 24px;
    }
    
    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .nav-button {
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .nav-button span[nz-icon] {
      font-size: 20px;
    }
  `]
})
export class WorkspaceDashboardComponent implements OnInit {
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);

  // State management
  dashboardStats = signal({
    totalItems: 12,
    activeTasks: 8,
    safetyChecks: 95,
    equipmentStatus: 88
  });

  quickActions = signal<QuickAction[]>([
    {
      title: '新增項目',
      description: '創建新的工作區項目',
      icon: 'plus',
      route: '/hub/workspace/create',
      color: '#52c41a'
    },
    {
      title: '任務管理',
      description: '查看和管理任務',
      icon: 'check-square',
      route: '/hub/workspace/tasks',
      color: '#1890ff'
    },
    {
      title: '安全檢查',
      description: '進行安全檢查記錄',
      icon: 'safety',
      route: '/hub/workspace/overview',
      color: '#f5222d'
    },
    {
      title: '設備狀態',
      description: '查看設備運行狀態',
      icon: 'tool',
      route: '/hub/workspace/list',
      color: '#fa8c16'
    },
    {
      title: '施工日誌',
      description: '記錄施工進度',
      icon: 'file-text',
      route: '/hub/workspace/daily-log',
      color: '#722ed1'
    },
    {
      title: '行事曆',
      description: '查看工程排程',
      icon: 'calendar',
      route: '/hub/workspace/calendar',
      color: '#13c2c2'
    },
    {
      title: '工地備忘錄',
      description: '管理重要提醒事項',
      icon: 'book',
      route: '/hub/workspace/memos',
      color: '#eb2f96'
    }
  ]);

  recentActivities = signal<RecentActivity[]>([
    {
      title: '起重機安全檢查完成',
      time: '2小時前',
      type: 'task',
      status: 'success'
    },
    {
      title: '新增施工日誌記錄',
      time: '4小時前',
      type: 'log',
      status: 'info'
    },
    {
      title: '設備維護提醒',
      time: '6小時前',
      type: 'event',
      status: 'warning'
    },
    {
      title: '鋼筋籠吊裝作業',
      time: '1天前',
      type: 'task',
      status: 'success'
    }
  ]);

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // 載入儀表板統計數據
    // 實際應用中會從服務獲取真實數據
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getActivityColor(status: string): string {
    const colors: Record<string, string> = {
      success: 'green',
      warning: 'orange',
      error: 'red',
      info: 'blue'
    };
    return colors[status] || 'default';
  }

  getActivityText(type: string): string {
    const texts: Record<string, string> = {
      task: '任務',
      log: '日誌',
      event: '事件'
    };
    return texts[type] || '未知';
  }
}