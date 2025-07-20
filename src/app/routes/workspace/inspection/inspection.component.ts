/**
 * 工地重設備搬運檢查元件
 *
 * 功能：
 * - 提供工地重設備搬運的檢查項目管理
 * - 支援工地安全檢查和設備檢查清單
 * - 整合品質控制和進度追蹤
 *
 * 主要特性：
 * - 工地檢查項目的列表展示
 * - 檢查狀態的視覺化顯示
 * - 檢查結果的記錄和追蹤
 * - 檢查報告的生成和匯出
 *
 * 檢查內容：
 * - 安全檢查項目名稱和描述
 * - 檢查狀態（待檢查、進行中、已完成、不合格）
 * - 檢查人員和時間記錄
 * - 檢查結果和備註說明
 *
 * 互動功能：
 * - 檢查項目狀態更新
 * - 檢查結果記錄
 * - 檢查報告生成
 * - 檢查歷史追蹤
 *
 * 路由：/workspace/inspection
 * 依賴：ng-zorro-antd/list、ng-zorro-antd/tag、ng-zorro-antd/progress
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface ConstructionInspection {
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  date: string;
  inspector: string;
  type: 'safety' | 'equipment' | 'quality' | 'environment';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-workspace-inspection',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTableModule, NzTagModule, NzButtonModule],
  template: `
    <nz-card nzTitle="工地檢查清單" [nzExtra]="extraTemplate">
      <nz-table #inspectionTable [nzData]="inspections" [nzPageSize]="10">
        <thead>
          <tr>
            <th>檢查項目</th>
            <th>類型</th>
            <th>檢查員</th>
            <th>狀態</th>
            <th>檢查日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of inspectionTable.data">
            <td>{{ item.name }}</td>
            <td>
              <nz-tag [nzColor]="getTypeColor(item.type)">
                {{ getTypeText(item.type) }}
              </nz-tag>
            </td>
            <td>{{ item.inspector }}</td>
            <td>
              <nz-tag [nzColor]="getStatusColor(item.status)">
                {{ getStatusText(item.status) }}
              </nz-tag>
            </td>
            <td>{{ item.date }}</td>
            <td>
              <button nz-button nzType="link" nzSize="small">查看</button>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" nzSize="small">新增檢查</button>
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
export class WorkspaceInspectionComponent {
  inspections: ConstructionInspection[] = [
    {
      name: '起重機安全檢查',
      status: 'completed',
      date: '2024-01-25',
      inspector: '王公安',
      type: 'safety',
      priority: 'high'
    },
    {
      name: '高空作業平台檢查',
      status: 'completed',
      date: '2024-01-24',
      inspector: '李公安',
      type: 'safety',
      priority: 'high'
    },
    {
      name: '混凝土泵車設備檢查',
      status: 'in-progress',
      date: '2024-01-26',
      inspector: '陳師傅',
      type: 'equipment',
      priority: 'medium'
    },
    {
      name: '鋼筋綁紮品質檢查',
      status: 'pending',
      date: '2024-01-27',
      inspector: '張監工',
      type: 'quality',
      priority: 'medium'
    },
    {
      name: '環境噪音檢測',
      status: 'pending',
      date: '2024-01-28',
      inspector: '劉環保',
      type: 'environment',
      priority: 'low'
    },
    {
      name: '電氣設備安全檢查',
      status: 'failed',
      date: '2024-01-23',
      inspector: '黃師傅',
      type: 'safety',
      priority: 'high'
    },
    {
      name: '模板支撐檢查',
      status: 'completed',
      date: '2024-01-22',
      inspector: '吳監工',
      type: 'quality',
      priority: 'high'
    },
    {
      name: '廢棄物處理檢查',
      status: 'pending',
      date: '2024-01-29',
      inspector: '林環保',
      type: 'environment',
      priority: 'medium'
    }
  ];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: 'blue',
      'in-progress': 'orange',
      completed: 'green',
      failed: 'red'
    };
    return colors[status] || 'default';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = {
      pending: '待檢查',
      'in-progress': '檢查中',
      completed: '已完成',
      failed: '不合格'
    };
    return texts[status] || '未知';
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      safety: 'red',
      equipment: 'purple',
      quality: 'blue',
      environment: 'green'
    };
    return colors[type] || 'default';
  }

  getTypeText(type: string): string {
    const texts: Record<string, string> = {
      safety: '安全',
      equipment: '設備',
      quality: '品質',
      environment: '環保'
    };
    return texts[type] || '未知';
  }
}
