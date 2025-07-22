/**
 * 工地重設備搬運列表元件
 *
 * 功能：
 * - 展示所有工地項目和設備的列表
 * - 提供工地項目和設備的基本資訊檢視
 * - 支援編輯和查看操作
 *
 * 表格欄位：
 * - 名稱：工地項目或設備的顯示名稱
 * - 類型：工地項目/設備管理/施工區域/運輸任務（不同顏色標籤）
 * - 狀態：進行中/已完成/暫停/延遲狀態
 * - 負責人：項目負責人或設備操作員
 * - 創建日期：項目或設備的建立時間
 * - 操作：編輯、查看按鈕
 *
 * 狀態顯示：
 * - 進行中狀態：綠色標籤
 * - 已完成狀態：藍色標籤
 * - 暫停狀態：灰色標籤
 * - 延遲狀態：紅色標籤
 * - 類型顏色：藍色（工地項目）、紫色（設備管理）、橙色（施工區域）、綠色（運輸任務）
 *
 * 互動功能：
 * - 工地項目點擊查看詳情
 * - 編輯工地項目設定
 * - 工地項目狀態管理
 * - 設備管理功能
 *
 * 路由：/workspace/list
 * 依賴：ng-zorro-antd/table、ng-zorro-antd/tag
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-workspace-list',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTableModule, NzButtonModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card title="工地重設備搬運列表">
      <nz-table #workspaceTable [nzData]="workspaceData" [nzPageSize]="10">
        <thead>
          <tr>
            <th>項目/設備名稱</th>
            <th>類型</th>
            <th>負責人</th>
            <th>狀態</th>
            <th>創建日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let workspace of workspaceTable.data">
            <td>{{ workspace.name }}</td>
            <td>
              <nz-tag [nzColor]="getTypeColor(workspace.type)">{{ workspace.type }}</nz-tag>
            </td>
            <td>{{ workspace.manager }}</td>
            <td>
              <nz-tag [nzColor]="getStatusColor(workspace.status)">
                {{ getStatusText(workspace.status) }}
              </nz-tag>
            </td>
            <td>{{ workspace.createDate | date: 'yyyy-MM-dd' }}</td>
            <td>
              <nz-space>
                <button nz-button nzType="primary" nzSize="small" (click)="editWorkspace(workspace)">編輯</button>
                <button nz-button nzType="default" nzSize="small" (click)="viewWorkspace(workspace)">查看</button>
              </nz-space>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>
  `
})
export class WorkspaceListComponent {
  workspaceData = [
    {
      id: 1,
      name: '台北市信義區商業大樓工程',
      type: '工地項目',
      manager: '張負責人',
      status: 'in-progress',
      createDate: new Date('2024-01-15')
    },
    {
      id: 2,
      name: '200噸履帶式起重機',
      type: '設備管理',
      manager: '王師傅',
      status: 'active',
      createDate: new Date('2024-01-20')
    },
    {
      id: 3,
      name: '主體結構施工區域',
      type: '施工區域',
      manager: '李監工',
      status: 'in-progress',
      createDate: new Date('2024-02-01')
    },
    {
      id: 4,
      name: '60米混凝土泵車',
      type: '設備管理',
      manager: '陳師傅',
      status: 'maintenance',
      createDate: new Date('2024-01-25')
    },
    {
      id: 5,
      name: '設備運輸任務A',
      type: '運輸任務',
      manager: '劉師傅',
      status: 'completed',
      createDate: new Date('2024-01-18')
    },
    {
      id: 6,
      name: '新北市板橋區住宅工程',
      type: '工地項目',
      manager: '黃負責人',
      status: 'pending',
      createDate: new Date('2024-02-05')
    }
  ];

  constructor(private router: Router) {}

  getTypeColor(type: string): string {
    switch (type) {
      case '工地項目':
        return 'blue';
      case '設備管理':
        return 'purple';
      case '施工區域':
        return 'orange';
      case '運輸任務':
        return 'green';
      default:
        return 'default';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'green';
      case 'active':
        return 'blue';
      case 'maintenance':
        return 'orange';
      case 'completed':
        return 'cyan';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'in-progress':
        return '進行中';
      case 'active':
        return '使用中';
      case 'maintenance':
        return '維護中';
      case 'completed':
        return '已完成';
      case 'pending':
        return '待開始';
      default:
        return '未知';
    }
  }

  editWorkspace(workspace: any): void {
    // 編輯工地項目或設備
    console.log('編輯工地項目/設備:', workspace);
  }

  viewWorkspace(workspace: any): void {
    // 查看工地項目或設備
    console.log('查看工地項目/設備:', workspace);
  }
}
