/**
 * 工作區檢查元件
 *
 * 功能：
 * - 提供工作區的檢查項目管理
 * - 支援檢查清單的展示和更新
 * - 整合品質控制和進度追蹤
 *
 * 主要特性：
 * - 檢查項目的列表展示
 * - 檢查狀態的視覺化顯示
 * - 檢查結果的記錄和追蹤
 * - 檢查報告的生成和匯出
 *
 * 檢查內容：
 * - 檢查項目名稱和描述
 * - 檢查狀態（待檢查、進行中、已完成、失敗）
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

@Component({
  selector: 'app-workspace-inspection',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTableModule, NzTagModule, NzButtonModule],
  template: `
    <nz-card nzTitle="檢查清單" [nzExtra]="extraTemplate">
      <nz-table #inspectionTable [nzData]="inspections" [nzPageSize]="10">
        <thead>
          <tr>
            <th>項目</th>
            <th>狀態</th>
            <th>檢查日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of inspectionTable.data">
            <td>{{ item.name }}</td>
            <td>
              <nz-tag [nzColor]="item.status === 'completed' ? 'green' : 'orange'">
                {{ item.status === 'completed' ? '已完成' : '進行中' }}
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
  inspections = [
    { name: '系統安全檢查', status: 'completed', date: '2024-01-15' },
    { name: '資料備份檢查', status: 'completed', date: '2024-01-14' },
    { name: '效能監控檢查', status: 'pending', date: '2024-01-16' },
    { name: '用戶權限檢查', status: 'pending', date: '2024-01-17' }
  ];
}
