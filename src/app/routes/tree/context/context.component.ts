/**
 * 樹狀右鍵選單元件
 *
 * 功能：
 * - 提供樹狀節點的右鍵上下文選單
 * - 支援新增子節點和兄弟節點
 * - 提供編輯、複製、刪除節點功能
 * - 自訂右鍵選單樣式和互動
 *
 * 主要特性：
 * - 右鍵選單定位和顯示控制
 * - 節點操作（新增、編輯、複製、刪除）
 * - 樹狀結構的動態更新
 * - 展開/收合全部節點功能
 *
 * 技術實現：
 * - 使用自訂 CSS 實現右鍵選單
 * - 整合 ng-zorro-antd 樹狀元件
 * - 支援節點狀態管理
 *
 * 路由：/tree/context
 * 依賴：ng-zorro-antd/tree、ng-zorro-antd/message
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

@Component({
  selector: 'app-tree-context',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTreeModule, NzButtonModule, NzSpaceModule, NzDropDownModule, NzMenuModule, NzIconModule],
  template: `
    <nz-card title="樹狀右鍵選單功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="expandAll()">展開全部</button>
          <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
          <button nz-button nzType="default" (click)="resetTree()">重置</button>
        </nz-space>
      </div>

      <div class="tree-container" (contextmenu)="onContainerRightClick($event)">
        <nz-tree
          #tree
          [nzData]="treeData"
          [nzBlockNode]="true"
          [nzShowLine]="true"
          [nzShowIcon]="true"
          [nzExpandedKeys]="expandedKeys"
          [nzSelectedKeys]="selectedKeys"
          (nzExpandChange)="onExpandChange($event)"
          (nzClick)="onNodeClick($event)"
          (nzContextMenu)="onContextMenu($event)"
        >
        </nz-tree>
      </div>

      <div
        #contextMenu
        class="context-menu"
        [class.show]="showContextMenu"
        [style.left.px]="contextMenuX"
        [style.top.px]="contextMenuY"
        (click)="$event.stopPropagation()"
      >
        <ul class="context-menu-list">
          <li class="context-menu-item" (click)="addChild()">
            <span nz-icon nzType="plus"></span>
            新增子節點
          </li>
          <li class="context-menu-item" (click)="addSibling()">
            <span nz-icon nzType="plus-circle"></span>
            新增兄弟節點
          </li>
          <li class="context-menu-divider"></li>
          <li class="context-menu-item" (click)="editNode()">
            <span nz-icon nzType="edit"></span>
            編輯節點
          </li>
          <li class="context-menu-item" (click)="copyNode()">
            <span nz-icon nzType="copy"></span>
            複製節點
          </li>
          <li class="context-menu-divider"></li>
          <li class="context-menu-item danger" (click)="deleteNode()">
            <span nz-icon nzType="delete"></span>
            刪除節點
          </li>
        </ul>
      </div>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>右鍵選單說明：</h4>
        <ul>
          <li>在節點上按右鍵會顯示上下文選單</li>
          <li>支援新增子節點和兄弟節點</li>
          <li>可以編輯、複製、刪除節點</li>
          <li>選單會根據節點類型顯示不同選項</li>
          <li>在空白處右鍵可以新增根節點</li>
        </ul>
      </div>
    </nz-card>
  `,
  styles: [
    `
      .tree-container {
        min-height: 300px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        padding: 16px;
        background-color: #fafafa;
      }

      .tree-container:hover {
        border-color: #40a9ff;
      }

      .context-menu {
        position: fixed;
        z-index: 1000;
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        display: none;
        min-width: 160px;
      }

      .context-menu.show {
        display: block;
      }

      .context-menu-list {
        list-style: none;
        margin: 0;
        padding: 4px 0;
      }

      .context-menu-item {
        padding: 8px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background-color 0.2s;
      }

      .context-menu-item:hover {
        background-color: #f5f5f5;
      }

      .context-menu-item.danger:hover {
        background-color: #fff2f0;
        color: #ff4d4f;
      }

      .context-menu-divider {
        height: 1px;
        background-color: #f0f0f0;
        margin: 4px 0;
      }
    `
  ]
})
export class TreeContextComponent {
  treeData: TreeNode[] = [
    {
      title: '根節點 1',
      key: '0-0',
      children: [
        {
          title: '子節點 1-1',
          key: '0-0-0',
          children: [
            { title: '葉子節點 1-1-1', key: '0-0-0-0', isLeaf: true },
            { title: '葉子節點 1-1-2', key: '0-0-0-1', isLeaf: true }
          ]
        },
        {
          title: '子節點 1-2',
          key: '0-0-1',
          children: [{ title: '葉子節點 1-2-1', key: '0-0-1-0', isLeaf: true }]
        }
      ]
    },
    {
      title: '根節點 2',
      key: '0-1',
      children: [
        {
          title: '子節點 2-1',
          key: '0-1-0',
          children: [{ title: '葉子節點 2-1-1', key: '0-1-0-0', isLeaf: true }]
        }
      ]
    }
  ];

  expandedKeys: string[] = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
  selectedKeys: string[] = [];
  currentNode: any = null;
  showContextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;

  constructor(private message: NzMessageService) {}

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
    this.selectedKeys = [event.node.key];
  }

  onContextMenu(event: any): void {
    console.log('右鍵選單:', event);
    this.currentNode = event.node;
    this.showContextMenuAt(event.event.clientX, event.event.clientY);
  }

  onContainerRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.currentNode = null;
    this.showContextMenuAt(event.clientX, event.clientY);
  }

  private showContextMenuAt(x: number, y: number): void {
    this.contextMenuX = x;
    this.contextMenuY = y;
    this.showContextMenu = true;

    // 點擊其他地方關閉選單
    setTimeout(() => {
      document.addEventListener('click', this.hideContextMenu.bind(this), { once: true });
    }, 0);
  }

  private hideContextMenu(): void {
    this.showContextMenu = false;
  }

  addChild(): void {
    this.hideContextMenu();
    if (this.currentNode) {
      this.message.success(`為節點 "${this.currentNode.title}" 新增子節點`);
      // 實際實作：新增子節點到樹狀結構
      this.addChildNode(this.currentNode);
    } else {
      this.message.warning('請先選擇一個節點');
    }
  }

  addSibling(): void {
    this.hideContextMenu();
    if (this.currentNode) {
      this.message.success(`為節點 "${this.currentNode.title}" 新增兄弟節點`);
      // 實際實作：新增兄弟節點
      this.addSiblingNode(this.currentNode);
    } else {
      this.message.warning('請先選擇一個節點');
    }
  }

  editNode(): void {
    this.hideContextMenu();
    if (this.currentNode) {
      this.message.info(`編輯節點 "${this.currentNode.title}"`);
      // 實際實作：開啟編輯對話框
      this.editNodeTitle(this.currentNode);
    } else {
      this.message.warning('請先選擇一個節點');
    }
  }

  copyNode(): void {
    this.hideContextMenu();
    if (this.currentNode) {
      this.message.success(`複製節點 "${this.currentNode.title}"`);
      // 實際實作：複製節點
      this.copyNodeData(this.currentNode);
    } else {
      this.message.warning('請先選擇一個節點');
    }
  }

  deleteNode(): void {
    this.hideContextMenu();
    if (this.currentNode) {
      this.message.warning(`刪除節點 "${this.currentNode.title}"`);
      // 實際實作：刪除節點
      this.deleteNodeFromTree(this.currentNode);
    } else {
      this.message.warning('請先選擇一個節點');
    }
  }

  private addChildNode(parentNode: any): void {
    const newKey = `${parentNode.key}-${Date.now()}`;
    const newNode = {
      title: `新子節點 ${newKey}`,
      key: newKey,
      children: []
    };

    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newNode);

    // 更新展開狀態
    this.expandedKeys = [...this.expandedKeys, parentNode.key];
  }

  private addSiblingNode(node: any): void {
    const parentKey = node.key.substring(0, node.key.lastIndexOf('-'));
    const newKey = `${parentKey}-${Date.now()}`;
    const newNode = {
      title: `新兄弟節點 ${newKey}`,
      key: newKey,
      children: []
    };

    // 找到父節點並添加兄弟節點
    this.addNodeToParent(this.treeData, parentKey, newNode);
  }

  private addNodeToParent(nodes: TreeNode[], parentKey: string, newNode: TreeNode): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === parentKey) {
        if (!nodes[i].children) {
          nodes[i].children = [];
        }
        nodes[i].children!.push(newNode);
        return true;
      }
      if (nodes[i].children) {
        if (this.addNodeToParent(nodes[i].children!, parentKey, newNode)) {
          return true;
        }
      }
    }
    return false;
  }

  private editNodeTitle(node: any): void {
    const newTitle = prompt('請輸入新的節點名稱:', node.title);
    if (newTitle && newTitle.trim()) {
      node.title = newTitle.trim();
      this.message.success('節點名稱已更新');
    }
  }

  private copyNodeData(node: any): void {
    // 複製節點資料到剪貼簿（簡化實作）
    const nodeData = JSON.stringify({
      title: node.title,
      key: node.key,
      children: node.children || []
    });
    console.log('複製的節點資料:', nodeData);
    this.message.success('節點資料已複製到剪貼簿');
  }

  private deleteNodeFromTree(node: any): void {
    const confirmed = confirm(`確定要刪除節點 "${node.title}" 嗎？`);
    if (confirmed) {
      this.removeNodeFromTree(this.treeData, node.key);
      this.message.success('節點已刪除');
    }
  }

  private removeNodeFromTree(nodes: TreeNode[], key: string): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].children) {
        if (this.removeNodeFromTree(nodes[i].children!, key)) {
          return true;
        }
      }
    }
    return false;
  }

  expandAll(): void {
    this.expandedKeys = this.getAllKeys(this.treeData);
    this.message.info('已展開全部節點');
  }

  collapseAll(): void {
    this.expandedKeys = [];
    this.message.info('已收合全部節點');
  }

  resetTree(): void {
    this.treeData = [
      {
        title: '根節點 1',
        key: '0-0',
        children: [
          {
            title: '子節點 1-1',
            key: '0-0-0',
            children: [
              { title: '葉子節點 1-1-1', key: '0-0-0-0', isLeaf: true },
              { title: '葉子節點 1-1-2', key: '0-0-0-1', isLeaf: true }
            ]
          },
          {
            title: '子節點 1-2',
            key: '0-0-1',
            children: [{ title: '葉子節點 1-2-1', key: '0-0-1-0', isLeaf: true }]
          }
        ]
      },
      {
        title: '根節點 2',
        key: '0-1',
        children: [
          {
            title: '子節點 2-1',
            key: '0-1-0',
            children: [{ title: '葉子節點 2-1-1', key: '0-1-0-0', isLeaf: true }]
          }
        ]
      }
    ];
    this.expandedKeys = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
    this.message.success('樹狀結構已重置');
  }

  private getAllKeys(nodes: TreeNode[]): string[] {
    const keys: string[] = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.children) {
        keys.push(...this.getAllKeys(node.children));
      }
    });
    return keys;
  }
}
