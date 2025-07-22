/**
 * 工地工作區概覽元件 - 極簡版本
 * 使用 ng-zorro-antd 原生功能
 */

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ConstructionProject {
  name: string;
  progress: number;
  dueDate: string;
  safetyLevel: 'high' | 'medium' | 'low';
}

interface SafetyRecord {
  title: string;
  inspector: string;
  time: string;
  status: 'passed' | 'failed' | 'pending';
  type: 'safety' | 'quality' | 'environment';
}

interface SitePersonnel {
  role: 'safety' | 'supervisor' | 'manager' | 'worker';
  name: string;
  phone: string;
  status: 'on-site' | 'off-site';
}

@Component({
  selector: 'app-workspace-overview',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzStatisticModule, NzGridModule, NzProgressModule, NzListModule, NzTagModule, NzAvatarModule],
  template: `
    <div class="overview">
      <!-- 工地統計卡片 -->
      <nz-row [nzGutter]="16" class="stats">
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="施工進度" [nzValue]="68" nzSuffix="%" nzPrefix="🏗️"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="安全檢查" [nzValue]="95" nzSuffix="%" nzPrefix="🛡️"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="現場人員" [nzValue]="42" nzPrefix="👷"></nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="6">
          <nz-card>
            <nz-statistic nzTitle="工安事故" [nzValue]="0" nzPrefix="⚠️"></nz-statistic>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 工地內容 -->
      <nz-row [nzGutter]="16" class="content">
        <nz-col [nzSpan]="12">
          <nz-card nzTitle="施工進度">
            <div *ngFor="let project of constructionProjects" class="project-item">
              <div class="project-header">
                <span>{{ project.name }}</span>
                <div class="project-info">
                  <span>{{ project.progress }}%</span>
                  <nz-tag [nzColor]="getSafetyColor(project.safetyLevel)">
                    {{ getSafetyText(project.safetyLevel) }}
                  </nz-tag>
                </div>
              </div>
              <nz-progress [nzPercent]="project.progress"></nz-progress>
              <div class="project-due">完工期限：{{ project.dueDate }}</div>
            </div>
          </nz-card>
        </nz-col>

        <nz-col [nzSpan]="12">
          <nz-card nzTitle="安全檢查記錄">
            <nz-list [nzDataSource]="safetyRecords" [nzSize]="'small'">
              <ng-template #item let-item>
                <nz-list-item>
                  <div class="safety-item">
                    <div class="safety-title">
                      {{ item.title }}
                      <nz-tag [nzColor]="getTypeColor(item.type)">
                        {{ getTypeText(item.type) }}
                      </nz-tag>
                    </div>
                    <div class="safety-meta">
                      <span>檢查員：{{ item.inspector }}</span>
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

      <!-- 工地人員 -->
      <nz-row [nzGutter]="16" class="personnel">
        <nz-col [nzSpan]="24">
          <nz-card nzTitle="工地人員">
            <nz-row [nzGutter]="16">
              <nz-col [nzSpan]="6" *ngFor="let person of sitePersonnel">
                <div class="personnel-card">
                  <div class="personnel-avatar">
                    <nz-avatar [nzSize]="48" [nzText]="person.name.charAt(0)"></nz-avatar>
                    <nz-tag [nzColor]="person.status === 'on-site' ? 'green' : 'red'">
                      {{ person.status === 'on-site' ? '在場' : '離場' }}
                    </nz-tag>
                  </div>
                  <div class="personnel-info">
                    <div class="personnel-name">{{ person.name }}</div>
                    <div class="personnel-role">{{ getRoleText(person.role) }}</div>
                    <div class="personnel-phone">{{ person.phone }}</div>
                  </div>
                </div>
              </nz-col>
            </nz-row>
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
      .personnel {
        margin-bottom: 16px;
      }
      .project-item {
        margin-bottom: 16px;
      }
      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .project-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .project-due {
        margin-top: 4px;
        font-size: 12px;
        color: #666;
      }
      .safety-item {
        width: 100%;
      }
      .safety-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }
      .safety-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #666;
      }
      .personnel-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border: 1px solid #f0f0f0;
        border-radius: 6px;
        margin-bottom: 8px;
      }
      .personnel-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .personnel-info {
        flex: 1;
      }
      .personnel-name {
        font-weight: 500;
        margin-bottom: 2px;
      }
      .personnel-role {
        font-size: 12px;
        color: #1890ff;
        margin-bottom: 2px;
      }
      .personnel-phone {
        font-size: 12px;
        color: #666;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceOverviewComponent {
  constructionProjects: ConstructionProject[] = [
    { name: '主體結構施工', progress: 75, dueDate: '2024-03-15', safetyLevel: 'high' },
    { name: '機電設備安裝', progress: 45, dueDate: '2024-04-01', safetyLevel: 'medium' },
    { name: '外牆裝修', progress: 90, dueDate: '2024-02-28', safetyLevel: 'high' },
    { name: '室內裝修', progress: 30, dueDate: '2024-05-15', safetyLevel: 'low' }
  ];

  safetyRecords: SafetyRecord[] = [
    { title: '高空作業安全檢查', inspector: '王公安', time: '2小時前', status: 'passed', type: 'safety' },
    { title: '鋼筋綁紮品質檢查', inspector: '李監工', time: '4小時前', status: 'passed', type: 'quality' },
    { title: '環境噪音檢測', inspector: '張環保', time: '1天前', status: 'pending', type: 'environment' },
    { title: '起重機安全檢查', inspector: '陳公安', time: '2天前', status: 'failed', type: 'safety' }
  ];

  sitePersonnel: SitePersonnel[] = [
    { role: 'safety', name: '王公安', phone: '0912-345-678', status: 'on-site' },
    { role: 'supervisor', name: '李監工', phone: '0923-456-789', status: 'on-site' },
    { role: 'manager', name: '張負責人', phone: '0934-567-890', status: 'on-site' },
    { role: 'safety', name: '陳公安', phone: '0945-678-901', status: 'off-site' },
    { role: 'supervisor', name: '劉監工', phone: '0956-789-012', status: 'on-site' },
    { role: 'worker', name: '黃師傅', phone: '0967-890-123', status: 'on-site' }
  ];

  getSafetyColor(level: string): string {
    const colors: Record<string, string> = { high: 'green', medium: 'orange', low: 'red' };
    return colors[level] || 'default';
  }

  getSafetyText(level: string): string {
    const texts: Record<string, string> = { high: '安全', medium: '注意', low: '危險' };
    return texts[level] || '未知';
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = { passed: 'green', failed: 'red', pending: 'orange' };
    return colors[status] || 'default';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = { passed: '通過', failed: '不合格', pending: '待檢查' };
    return texts[status] || '未知';
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = { safety: 'red', quality: 'blue', environment: 'green' };
    return colors[type] || 'default';
  }

  getTypeText(type: string): string {
    const texts: Record<string, string> = { safety: '安全', quality: '品質', environment: '環保' };
    return texts[type] || '未知';
  }

  getRoleText(role: string): string {
    const texts: Record<string, string> = {
      safety: '公安',
      supervisor: '監工',
      manager: '負責人',
      worker: '工人'
    };
    return texts[role] || '未知';
  }
}
