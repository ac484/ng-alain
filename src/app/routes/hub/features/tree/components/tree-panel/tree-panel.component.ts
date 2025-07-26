/**
 * 樹狀面板元件
 * 
 * 功能：
 * - 樹狀結構的可視化展示
 * - 支援拖拽排序
 * - 右鍵選單操作
 * - 搜尋和篩選
 * - 分割面板佈局
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDropDownModule, NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTreeModule, NzTreeNode, NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TreeService } from '../../services/tree.service';
import { TreeNode } from '../../models/tree.model';

@Component({
  selector: 'hub-tree-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTreeModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzSplitterModule,
    NzDescriptionsModule,
    NzTagModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tree-panel-container">
      <nz-splitter nzDirection="horizontal">
        <!-- 左側樹狀結構面板 -->
        <div nz-splitter-pane nzSize="70" nzMin="30" nzMax="80">
          <nz-card title="樹狀結構" [nzSize]="'small'" [nzExtra]="searchTemplate">
            <div class="tree-container" (contextmenu)="onPanelContextMenu($event)">
              <nz-tree
                #nzTreeComponent
                [nzData]="treeData()"
                [nzSearchValue]="searchValue"
                [nzDraggable]="true"
                [nzExpandAll]="false"
                [nzShowIcon]="true"
                [nzAsyncData]="false"
                (nzClick)="activeNode($event)"
                (nzDblClick)="editNode($event)"
                (nzDrop)="onDrop($any($event))"
                (nzContextMenu)="contextMenu($event.event!, contextMenuTemplate, $event.node!)">
                
                <ng-template #nzTreeTemplate let-node let-origin="origin">
                  <span class="tree-node-content">
                    <span nz-icon [nzType]="getNodeIcon(origin)" class="tree-node-icon"></span>
                    <span class="tree-node-title">{{ node.title }}</span>
                    <nz-tag 
                      *ngIf="origin.type" 
                      [nzColor]="getTypeColor(origin.type)" 
                      nzSize="small" 
                      class="tree-node-tag">
                      {{ getTypeLabel(origin.type) }}
                    </nz-tag>
                  </span>
                </ng-template>
              </nz-tree>
              
              <nz-empty 
                *ngIf="treeData().length === 0" 
                nzNotFoundImage="simple"
                nzNotFoundContent="暫無樹狀結構資料">
                <div nz-empty-footer>
                  <button nz-button nzType="primary" (click)="createRootNode()">
                    建立根節點
                  </button>
                </div>
              </nz-empty>
            </div>
          </nz-card>
        </div>

        <!-- 右側詳情面板 -->
        <div nz-splitter-pane>
          <nz-card title="節點詳情" [nzSize]="'small'">
            <div *ngIf="selectedNode(); else noSelection">
              <nz-descriptions nzBordered [nzColumn]="1">
                <nz-descriptions-item nzTitle="名稱">
                  {{ selectedNode()?.name }}
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="類型">
                  <nz-tag [nzColor]="getTypeColor(selectedNode()?.type!)">
                    {{ getTypeLabel(selectedNode()?.type!) }}
                  </nz-tag>
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="狀態">
                  <nz-tag [nzColor]="selectedNode()?.status === 'active' ? 'success' : 'default'">
                    {{ selectedNode()?.status === 'active' ? '啟用' : '停用' }}
                  </nz-tag>
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="層級">
                  {{ selectedNode()?.level }}
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="描述" *ngIf="selectedNode()?.description">
                  {{ selectedNode()?.description }}
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="創建時間">
                  {{ selectedNode()?.createdAt | date: 'yyyy-MM-dd HH:mm:ss' }}
                </nz-descriptions-item>
                <nz-descriptions-item nzTitle="更新時間">
                  {{ selectedNode()?.updatedAt | date: 'yyyy-MM-dd HH:mm:ss' }}
                </nz-descriptions-item>
              </nz-descriptions>

              <div class="node-actions" style="margin-top: 16px;">
                <button nz-button nzType="primary" (click)="editSelectedNode()">
                  <span nz-icon nzType="edit"></span>
                  編輯
                </button>
                <button nz-button nzType="default" (click)="addChildNode()">
                  <span nz-icon nzType="plus"></span>
                  新增子節點
                </button>
                <button nz-button nzType="default" nzDanger (click)="deleteSelectedNode()">
                  <span nz-icon nzType="delete"></span>
                  刪除
                </button>
              </div>
            </div>

            <ng-template #noSelection>
              <nz-empty 
                nzNotFoundImage="simple"
                nzNotFoundContent="請選擇一個節點查看詳情">
              </nz-empty>
            </ng-template>
          </nz-card>
        </div>
      </nz-splitter>

      <!-- 搜尋模板 -->
      <ng-template #searchTemplate>
        <nz-input-group nzCompact>
          <input 
            nz-input 
            placeholder="搜尋節點..." 
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange($event)"
            style="width: 200px;">
          <button nz-button nzType="primary" (click)="clearSearch()" *ngIf="searchValue">
            <span nz-icon nzType="close"></span>
          </button>
        </nz-input-group>
      </ng-template>

      <!-- 右鍵選單 -->
      <nz-dropdown-menu #contextMenuTemplate="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item (click)="editContextNode()">
            <span nz-icon nzType="edit"></span>
            編輯節點
          </li>
          <li nz-menu-item (click)="addChildToContext()">
            <span nz-icon nzType="plus"></span>
            新增子節點
          </li>
          <li nz-menu-divider></li>
          <li nz-menu-item (click)="copyContextNode()">
            <span nz-icon nzType="copy"></span>
            複製節點
          </li>
          <li nz-menu-item (click)="cutContextNode()">
            <span nz-icon nzType="scissor"></span>
            剪下節點
          </li>
          <li nz-menu-item (click)="pasteNode()" [nzDisabled]="!clipboardNode()">
            <span nz-icon nzType="snippets"></span>
            貼上節點
          </li>
          <li nz-menu-divider></li>
          <li nz-menu-item (click)="deleteContextNode()" nzDanger>
            <span nz-icon nzType="delete"></span>
            刪除節點
          </li>
        </ul>
      </nz-dropdown-menu>

      <!-- 根節點右鍵選單 -->
      <nz-dropdown-menu #rootMenuTemplate="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item (click)="createRootNode()">
            <span nz-icon nzType="plus"></span>
            新增根節點
          </li>
          <li nz-menu-item (click)="pasteNode()" [nzDisabled]="!clipboardNode()">
            <span nz-icon nzType="snippets"></span>
            貼上節點
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
  styles: [`
    .tree-panel-container {
      height: calc(100vh - 200px);
    }
    
    .tree-container {
      height: 400px;
      overflow: auto;
    }
    
    .tree-node-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .tree-node-icon {
      color: #1890ff;
    }
    
    .tree-node-title {
      flex: 1;
    }
    
    .tree-node-tag {
      margin-left: auto;
    }
    
    .node-actions {
      display: flex;
      gap: 8px;
    }
  `]
})
export class TreePanelComponent implements OnInit {
  private treeService = inject(TreeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private message = inject(NzMessageService);
  private contextMenuService = inject(NzContextMenuService);

  @ViewChild('contextMenuTemplate') contextMenuTemplate!: NzDropdownMenuComponent;
  @ViewChild('rootMenuTemplate') rootMenuTemplate!: NzDropdownMenuComponent;

  // State management
  treeData = signal<NzTreeNodeOptions[]>([]);
  selectedNode = signal<TreeNode | null>(null);
  contextNode = signal<NzTreeNode | null>(null);
  clipboardNode = signal<TreeNode | null>(null);
  searchValue = '';
  loading = signal(false);

  ngOnInit() {
    this.loadTreeData();
  }

  private async loadTreeData() {
    this.loading.set(true);
    try {
      this.treeService.getAllTrees().subscribe(trees => {
        const treeOptions = this.convertToTreeOptions(trees);
        this.treeData.set(treeOptions);
        this.loading.set(false);
      });
    } catch (error) {
      console.error('載入樹狀資料失敗:', error);
      this.message.error('載入樹狀資料失敗');
      this.loading.set(false);
    }
  }

  private convertToTreeOptions(trees: TreeNode[]): NzTreeNodeOptions[] {
    return trees.map(tree => ({
      title: tree.name,
      key: tree.key!,
      icon: this.getNodeIcon(tree),
      isLeaf: tree.children?.length === 0,
      expanded: false,
      children: tree.children ? this.convertToTreeOptions(tree.children) : [],
      origin: tree
    }));
  }

  // 事件處理
  activeNode(event: NzFormatEmitEvent): void {
    if (event.node && event.node.origin) {
      const nodeData = event.node.origin as unknown as TreeNode;
      this.selectedNode.set(nodeData);
    }
  }

  editNode(event: NzFormatEmitEvent): void {
    if (event.node && event.node.origin) {
      const nodeData = event.node.origin as unknown as TreeNode;
      this.router.navigate(['/hub/tree/edit', nodeData.key]);
    }
  }

  onDrop(event: NzFormatEmitEvent): void {
    const dragNode = event.dragNode;
    const targetNode = event.node;

    if (!dragNode || !targetNode) return;

    // 實現拖拽邏輯
    this.treeService.moveNode(dragNode.key, targetNode.key).then(() => {
      this.message.success('節點移動成功');
      this.loadTreeData();
    }).catch(error => {
      console.error('節點移動失敗:', error);
      this.message.error('節點移動失敗');
    });
  }

  contextMenu(event: MouseEvent, menu: NzDropdownMenuComponent, node: NzTreeNode): void {
    this.contextNode.set(node);
    this.contextMenuService.create(event, menu);
  }

  onPanelContextMenu(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('.ant-tree-node')) return;
    event.preventDefault();
    this.contextNode.set(null);
    this.contextMenuService.create(event, this.rootMenuTemplate);
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
    // 實現搜尋邏輯
  }

  clearSearch(): void {
    this.searchValue = '';
  }

  // 節點操作
  editSelectedNode(): void {
    const node = this.selectedNode();
    if (node) {
      this.router.navigate(['/hub/tree/edit', node.key]);
    }
  }

  addChildNode(): void {
    const node = this.selectedNode();
    if (node) {
      this.router.navigate(['/hub/tree/create'], {
        queryParams: { parentId: node.key }
      });
    }
  }

  deleteSelectedNode(): void {
    const node = this.selectedNode();
    if (node) {
      this.deleteNode(node);
    }
  }

  editContextNode(): void {
    const node = this.contextNode();
    if (node && node.origin) {
      const nodeData = node.origin as unknown as TreeNode;
      this.router.navigate(['/hub/tree/edit', nodeData.key]);
    }
  }

  addChildToContext(): void {
    const node = this.contextNode();
    if (node && node.origin) {
      const nodeData = node.origin as unknown as TreeNode;
      this.router.navigate(['/hub/tree/create'], {
        queryParams: { parentId: nodeData.key }
      });
    }
  }

  copyContextNode(): void {
    const node = this.contextNode();
    if (node && node.origin) {
      const nodeData = node.origin as unknown as TreeNode;
      this.clipboardNode.set(nodeData);
      this.message.success('節點已複製到剪貼簿');
    }
  }

  cutContextNode(): void {
    const node = this.contextNode();
    if (node && node.origin) {
      const nodeData = node.origin as unknown as TreeNode;
      this.clipboardNode.set(nodeData);
      this.message.success('節點已剪下到剪貼簿');
    }
  }

  pasteNode(): void {
    const clipNode = this.clipboardNode();
    const targetNode = this.contextNode();

    if (clipNode && targetNode && targetNode.origin) {
      const targetData = targetNode.origin as unknown as TreeNode;
      this.treeService.copyNode(clipNode.key!, targetData.key!).then(() => {
        this.message.success('節點貼上成功');
        this.clipboardNode.set(null);
        this.loadTreeData();
      }).catch(error => {
        console.error('節點貼上失敗:', error);
        this.message.error('節點貼上失敗');
      });
    }
  }

  deleteContextNode(): void {
    const node = this.contextNode();
    if (node && node.origin) {
      const nodeData = node.origin as unknown as TreeNode;
      this.deleteNode(nodeData);
    }
  }

  createRootNode(): void {
    this.router.navigate(['/hub/tree/create']);
  }

  private async deleteNode(node: TreeNode): Promise<void> {
    try {
      await this.treeService.deleteTree(node.key!);
      this.message.success('節點刪除成功');
      this.loadTreeData();
      if (this.selectedNode()?.key === node.key) {
        this.selectedNode.set(null);
      }
    } catch (error) {
      console.error('節點刪除失敗:', error);
      this.message.error('節點刪除失敗');
    }
  }

  // 工具方法
  getNodeIcon(node: TreeNode): string {
    switch (node.type) {
      case '組織': return 'team';
      case '分類': return 'tags';
      case '權限': return 'safety';
      case '流程': return 'flow-chart';
      default: return 'folder';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case '組織': return 'blue';
      case '分類': return 'green';
      case '權限': return 'orange';
      case '流程': return 'purple';
      default: return 'default';
    }
  }

  getTypeLabel(type: string): string {
    return type;
  }
}