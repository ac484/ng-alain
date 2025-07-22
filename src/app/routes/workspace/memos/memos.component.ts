/**
 * 工地重設備搬運備忘錄元件
 *
 * 功能：
 * - 提供工地重設備搬運的備忘錄管理
 * - 支援工地安全提醒和設備操作記錄
 * - 整合施工注意事項和緊急聯絡資訊
 *
 * 主要特性：
 * - 工地備忘錄的列表展示
 * - 安全提醒和操作記錄
 * - 備忘錄分類和標籤管理
 * - 備忘錄搜尋和篩選
 *
 * 備忘錄內容：
 * - 安全提醒和注意事項
 * - 設備操作記錄和維護提醒
 * - 施工進度和重要日期
 * - 緊急聯絡和應急程序
 *
 * 互動功能：
 * - 備忘錄新增和編輯
 * - 備忘錄刪除和歸檔
 * - 備忘錄搜尋功能
 * - 備忘錄匯出功能
 *
 * 路由：/workspace/memos
 * 依賴：ng-zorro-antd/list、ng-zorro-antd/tag、ng-zorro-antd/button
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ConstructionMemo {
  title: string;
  content: string;
  type: 'safety' | 'equipment' | 'construction' | 'emergency';
  priority: 'low' | 'medium' | 'high';
  date: string;
}

@Component({
  selector: 'app-workspace-memos',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzInputModule, NzListModule, NzTagModule],
  template: `
    <nz-card nzTitle="工地備忘錄" [nzExtra]="extraTemplate">
      <nz-list [nzDataSource]="memos" [nzRenderItem]="item">
        <ng-template #item let-memo>
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title>
                {{ memo.title }}
                <nz-tag [nzColor]="getTypeColor(memo.type)" style="margin-left: 8px;">
                  {{ getTypeText(memo.type) }}
                </nz-tag>
                <nz-tag [nzColor]="getPriorityColor(memo.priority)">
                  {{ getPriorityText(memo.priority) }}
                </nz-tag>
              </nz-list-item-meta-title>
              <nz-list-item-meta-description>
                {{ memo.content }}
                <div style="margin-top: 4px; color: #999; font-size: 12px;">
                  {{ memo.date }}
                </div>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
          </nz-list-item>
        </ng-template>
      </nz-list>
    </nz-card>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" nzSize="small">新增備忘錄</button>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
      }
    `
  ]
})
export class WorkspaceMemosComponent {
  memos: ConstructionMemo[] = [
    {
      title: '起重機安全檢查提醒',
      content: '每日開工前必須檢查起重機制動系統、鋼絲繩磨損情況和安全裝置',
      type: 'safety',
      priority: 'high',
      date: '2024-01-25'
    },
    {
      title: '高空作業防護要求',
      content: '20米以上高空作業必須配戴安全帶、安全帽，設置防護網',
      type: 'safety',
      priority: 'high',
      date: '2024-01-24'
    },
    {
      title: '混凝土泵車維護記錄',
      content: '60米泵車液壓系統檢查完成，下次維護日期：2024-02-15',
      type: 'equipment',
      priority: 'medium',
      date: '2024-01-23'
    },
    {
      title: '鋼筋籠吊裝注意事項',
      content: '15噸鋼筋籠吊裝時注意重心平衡，使用4點吊裝確保安全',
      type: 'construction',
      priority: 'high',
      date: '2024-01-22'
    },
    {
      title: '緊急聯絡電話',
      content: '工地負責人：張師傅 0912-345-678，安全主管：李公安 0923-456-789',
      type: 'emergency',
      priority: 'high',
      date: '2024-01-21'
    },
    {
      title: '噪音控制要求',
      content: '夜間施工需控制噪音在60分貝以下，避免影響周邊居民',
      type: 'construction',
      priority: 'medium',
      date: '2024-01-20'
    }
  ];

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      safety: 'red',
      equipment: 'purple',
      construction: 'blue',
      emergency: 'orange'
    };
    return colors[type] || 'default';
  }

  getTypeText(type: string): string {
    const texts: Record<string, string> = {
      safety: '安全',
      equipment: '設備',
      construction: '施工',
      emergency: '緊急'
    };
    return texts[type] || '未知';
  }

  getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
      low: 'green',
      medium: 'orange',
      high: 'red'
    };
    return colors[priority] || 'default';
  }

  getPriorityText(priority: string): string {
    const texts: Record<string, string> = {
      low: '低',
      medium: '中',
      high: '高'
    };
    return texts[priority] || '未知';
  }
}
