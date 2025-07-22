/**
 * 工地重設備搬運日誌元件
 *
 * 功能：
 * - 提供工地重設備搬運的日誌記錄功能
 * - 支援工地施工進度和設備操作記錄
 * - 整合安全檢查和重要事件記錄
 *
 * 主要特性：
 * - 工地日誌條目的列表展示
 * - 日誌內容的詳細檢視
 * - 日誌分類和標籤管理
 * - 日誌搜尋和篩選功能
 *
 * 日誌內容：
 * - 施工進度和重要里程碑
 * - 設備操作和維護記錄
 * - 安全檢查和事故記錄
 * - 人員調度和重要通知
 *
 * 互動功能：
 * - 日誌條目點擊查看詳情
 * - 日誌分類篩選
 * - 日誌搜尋功能
 * - 日誌匯出功能
 *
 * 路由：/workspace/daily-log
 * 依賴：ng-zorro-antd/list、ng-zorro-antd/tag
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

interface ConstructionLog {
  time: string;
  content: string;
  type: 'construction' | 'equipment' | 'safety' | 'management';
  operator: string;
  status: 'normal' | 'warning' | 'error';
}

@Component({
  selector: 'app-workspace-daily-log',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTimelineModule, NzButtonModule, NzInputModule, NzTagModule],
  template: `
    <nz-card nzTitle="工地施工日誌" [nzExtra]="extraTemplate">
      <nz-timeline>
        <nz-timeline-item *ngFor="let log of dailyLogs" [nzColor]="getStatusColor(log.status)">
          <div class="log-item">
            <div class="log-header">
              <span class="log-time">{{ log.time }}</span>
              <nz-tag [nzColor]="getTypeColor(log.type)">
                {{ getTypeText(log.type) }}
              </nz-tag>
            </div>
            <div class="log-content">{{ log.content }}</div>
            <div class="log-operator">操作員：{{ log.operator }}</div>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" nzSize="small">新增日誌</button>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
      }

      .log-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .log-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .log-time {
        font-size: 12px;
        color: #999;
        font-weight: 500;
      }

      .log-content {
        font-size: 14px;
        color: #333;
        line-height: 1.5;
      }

      .log-operator {
        font-size: 12px;
        color: #666;
      }
    `
  ]
})
export class WorkspaceDailyLogComponent {
  dailyLogs: ConstructionLog[] = [
    {
      time: '08:00',
      content: '工地開工，進行安全晨會，確認今日施工計劃和安全注意事項',
      type: 'management',
      operator: '張負責人',
      status: 'normal'
    },
    {
      time: '08:30',
      content: '200噸履帶式起重機開機檢查，制動系統、鋼絲繩、安全裝置正常',
      type: 'equipment',
      operator: '王師傅',
      status: 'normal'
    },
    {
      time: '09:00',
      content: '開始主體結構鋼筋籠吊裝作業，重量約15噸，使用100噸汽車吊配合',
      type: 'construction',
      operator: '李師傅',
      status: 'normal'
    },
    {
      time: '10:30',
      content: '高空作業平台安全檢查，20米平台防護網和安全帶配置完成',
      type: 'safety',
      operator: '陳公安',
      status: 'normal'
    },
    {
      time: '12:00',
      content: '午休時間，設備停機檢查，確認下午施工準備',
      type: 'management',
      operator: '張負責人',
      status: 'normal'
    },
    {
      time: '13:30',
      content: '60米混凝土泵車進場，準備進行主體澆築作業',
      type: 'equipment',
      operator: '劉師傅',
      status: 'normal'
    },
    {
      time: '14:00',
      content: '發現鋼筋籠吊裝時重心偏移，立即停止作業進行調整',
      type: 'safety',
      operator: '李師傅',
      status: 'warning'
    },
    {
      time: '15:30',
      content: '混凝土澆築開始，預計澆築量200立方公尺，預計完成時間18:00',
      type: 'construction',
      operator: '陳師傅',
      status: 'normal'
    },
    {
      time: '16:00',
      content: '環境噪音檢測，施工噪音控制在65分貝以下，符合環保要求',
      type: 'safety',
      operator: '林環保',
      status: 'normal'
    },
    {
      time: '18:00',
      content: '今日施工完成，設備停機維護，明日繼續主體結構施工',
      type: 'management',
      operator: '張負責人',
      status: 'normal'
    }
  ];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      normal: 'green',
      warning: 'orange',
      error: 'red'
    };
    return colors[status] || 'blue';
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      construction: 'blue',
      equipment: 'purple',
      safety: 'red',
      management: 'green'
    };
    return colors[type] || 'default';
  }

  getTypeText(type: string): string {
    const texts: Record<string, string> = {
      construction: '施工',
      equipment: '設備',
      safety: '安全',
      management: '管理'
    };
    return texts[type] || '未知';
  }
}
