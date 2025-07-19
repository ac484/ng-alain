import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-list',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTableModule, NzButtonModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card title="工作區列表">
      <nz-table #workspaceTable [nzData]="workspaceData" [nzPageSize]="10">
        <thead>
          <tr>
            <th>工作區名稱</th>
            <th>類型</th>
            <th>成員數</th>
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
            <td>{{ workspace.memberCount }}</td>
            <td>
              <nz-tag [nzColor]="workspace.status === 'active' ? 'success' : 'default'">
                {{ workspace.status === 'active' ? '啟用' : '停用' }}
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
      name: '開發團隊工作區',
      type: '開發',
      memberCount: 8,
      status: 'active',
      createDate: new Date('2024-01-15')
    },
    {
      id: 2,
      name: '設計團隊工作區',
      type: '設計',
      memberCount: 5,
      status: 'active',
      createDate: new Date('2024-01-20')
    },
    {
      id: 3,
      name: '測試團隊工作區',
      type: '測試',
      memberCount: 3,
      status: 'active',
      createDate: new Date('2024-02-01')
    }
  ];

  constructor(private router: Router) {}

  getTypeColor(type: string): string {
    switch (type) {
      case '開發':
        return 'blue';
      case '設計':
        return 'green';
      case '測試':
        return 'orange';
      default:
        return 'default';
    }
  }

  editWorkspace(workspace: any): void {
    // 編輯工作區
    console.log('編輯工作區:', workspace);
  }

  viewWorkspace(workspace: any): void {
    // 查看工作區
    console.log('查看工作區:', workspace);
  }
}
