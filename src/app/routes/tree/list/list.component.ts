/**
 * 樹狀結構列表元件
 *
 * 功能：
 * - 展示所有樹狀結構的列表
 * - 提供樹狀結構的基本資訊檢視
 * - 支援編輯和查看操作
 *
 * 表格欄位：
 * - 名稱：樹狀結構的顯示名稱
 * - 類型：組織/分類/權限（不同顏色標籤）
 * - 層級：樹狀結構的最大深度
 * - 狀態：啟用/停用狀態
 * - 創建日期：樹狀結構的建立時間
 * - 操作：編輯、查看按鈕
 *
 * 狀態顯示：
 * - 啟用狀態：綠色標籤
 * - 停用狀態：灰色標籤
 * - 類型顏色：藍色（組織）、綠色（分類）、橙色（權限）
 *
 * 路由：/tree/list
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
  selector: 'app-tree-list',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTableModule, NzButtonModule, NzTagModule, NzSpaceModule],
  template: `
    <nz-card title="樹狀列表">
      <nz-table #treeTable [nzData]="treeData" [nzPageSize]="10">
        <thead>
          <tr>
            <th>名稱</th>
            <th>類型</th>
            <th>層級</th>
            <th>狀態</th>
            <th>創建日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tree of treeTable.data">
            <td>{{ tree.name }}</td>
            <td>
              <nz-tag [nzColor]="getTypeColor(tree.type)">{{ tree.type }}</nz-tag>
            </td>
            <td>{{ tree.level }}</td>
            <td>
              <nz-tag [nzColor]="tree.status === 'active' ? 'success' : 'default'">
                {{ tree.status === 'active' ? '啟用' : '停用' }}
              </nz-tag>
            </td>
            <td>{{ tree.createDate | date: 'yyyy-MM-dd' }}</td>
            <td>
              <nz-space>
                <button nz-button nzType="primary" nzSize="small" (click)="editTree(tree)">編輯</button>
                <button nz-button nzType="default" nzSize="small" (click)="viewTree(tree)">查看</button>
              </nz-space>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>
  `
})
export class TreeListComponent {
  treeData = [
    {
      id: 1,
      name: '組織架構樹',
      type: '組織',
      level: 3,
      status: 'active',
      createDate: new Date('2024-01-15')
    },
    {
      id: 2,
      name: '產品分類樹',
      type: '分類',
      level: 4,
      status: 'active',
      createDate: new Date('2024-01-20')
    },
    {
      id: 3,
      name: '權限樹',
      type: '權限',
      level: 2,
      status: 'active',
      createDate: new Date('2024-02-01')
    }
  ];

  constructor(private router: Router) {}

  getTypeColor(type: string): string {
    switch (type) {
      case '組織':
        return 'blue';
      case '分類':
        return 'green';
      case '權限':
        return 'orange';
      default:
        return 'default';
    }
  }

  editTree(tree: any): void {
    // 編輯樹狀結構
    console.log('編輯樹狀結構:', tree);
  }

  viewTree(tree: any): void {
    // 查看樹狀結構
    console.log('查看樹狀結構:', tree);
  }
}
