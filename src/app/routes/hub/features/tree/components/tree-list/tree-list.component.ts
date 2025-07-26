/**
 * 樹狀結構列表元件
 *
 * 功能：
 * - 展示所有樹狀結構的列表
 * - 提供樹狀結構的基本資訊檢視
 * - 支援編輯和查看操作
 * - 整合 hub 架構的 FAB 元件
 *
 * 表格欄位：
 * - 名稱：樹狀結構的顯示名稱
 * - 類型：組織/分類/權限（不同顏色標籤）
 * - 層級：樹狀結構的最大深度
 * - 狀態：啟用/停用狀態
 * - 創建日期：樹狀結構的建立時間
 * - 操作：編輯、查看按鈕
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FabComponent } from '../../../../shared/components/fab/fab.component';
import { TreeService } from '../../services/tree.service';
import { TreeNode } from '../../models/tree.model';

@Component({
  selector: 'hub-tree-list',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzSpaceModule,
    NzIconModule,
    FabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- FAB for creating new tree -->
    <hub-fab (onAction)="createTree()"></hub-fab>
    
    <nz-card title="樹狀結構管理" [nzExtra]="extraTemplate">
      <nz-table 
        #treeTable 
        [nzData]="trees()" 
        [nzPageSize]="10"
        [nzLoading]="loading()">
        <thead>
          <tr>
            <th>名稱</th>
            <th>類型</th>
            <th>層級</th>
            <th>節點數量</th>
            <th>狀態</th>
            <th>創建日期</th>
            <th nzWidth="150px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tree of treeTable.data">
            <td>
              <strong>{{ tree.name }}</strong>
              <div *ngIf="tree.description" class="tree-description">
                {{ tree.description }}
              </div>
            </td>
            <td>
              <nz-tag [nzColor]="getTypeColor(tree.type)">{{ tree.type }}</nz-tag>
            </td>
            <td>{{ tree.maxLevel }}</td>
            <td>{{ tree.nodeCount }}</td>
            <td>
              <nz-tag [nzColor]="tree.status === 'active' ? 'success' : 'default'">
                {{ tree.status === 'active' ? '啟用' : '停用' }}
              </nz-tag>
            </td>
            <td>{{ tree.createdAt | date: 'yyyy-MM-dd HH:mm' }}</td>
            <td>
              <nz-space nzSize="small">
                <button 
                  nz-button 
                  nzType="primary" 
                  nzSize="small" 
                  (click)="editTree(tree)"
                  title="編輯樹狀結構">
                  <span nz-icon nzType="edit"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  (click)="viewTree(tree)"
                  title="查看樹狀結構">
                  <span nz-icon nzType="eye"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  (click)="manageNodes(tree)"
                  title="管理節點">
                  <span nz-icon nzType="apartment"></span>
                </button>
              </nz-space>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>

    <ng-template #extraTemplate>
      <nz-space>
        <button 
          nz-button 
          nzType="default" 
          (click)="refreshTrees()"
          [nzLoading]="loading()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
      </nz-space>
    </ng-template>
  `,
  styles: [`
    .tree-description {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
  `]
})
export class TreeListComponent implements OnInit {
  private treeService = inject(TreeService);
  private router = inject(Router);

  // State management with signals
  trees = signal<TreeNode[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadTrees();
  }

  private async loadTrees() {
    this.loading.set(true);
    try {
      this.treeService.getAllTrees().subscribe(trees => {
        this.trees.set(trees);
        this.loading.set(false);
      });
    } catch (error) {
      console.error('載入樹狀結構失敗:', error);
      this.loading.set(false);
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case '組織':
        return 'blue';
      case '分類':
        return 'green';
      case '權限':
        return 'orange';
      case '流程':
        return 'purple';
      default:
        return 'default';
    }
  }

  createTree(): void {
    this.router.navigate(['/hub/tree/create']);
  }

  editTree(tree: TreeNode): void {
    this.router.navigate(['/hub/tree/edit', tree.key]);
  }

  viewTree(tree: TreeNode): void {
    this.router.navigate(['/hub/tree/view', tree.key]);
  }

  manageNodes(tree: TreeNode): void {
    this.router.navigate(['/hub/tree/nodes', tree.key]);
  }

  async refreshTrees(): Promise<void> {
    await this.loadTrees();
  }
}