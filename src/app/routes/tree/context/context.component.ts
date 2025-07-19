import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

@Component({
  selector: 'app-tree-context',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTreeModule, NzButtonModule, NzSpaceModule, NzDropDownModule, NzMenuModule],
  template: `
    <nz-card title="樹狀右鍵選單功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="expandAll()">展開全部</button>
          <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
          <button nz-button nzType="default" (click)="resetTree()">重置</button>
        </nz-space>
      </div>

      <nz-tree
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
        <ng-template #nzTreeTemplate let-node>
          <span
            [nzDropdownMenu]="contextMenu"
            nz-dropdown
            (contextmenu)="onRightClick($event, node)"
            style="display: inline-block; width: 100%;"
          >
            {{ node.title }}
          </span>
        </ng-template>
      </nz-tree>

      <nz-dropdown-menu #contextMenu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item (click)="addChild()">
            <span nz-icon nzType="plus"></span>
            新增子節點
          </li>
          <li nz-menu-item (click)="addSibling()">
            <span nz-icon nzType="plus-circle"></span>
            新增兄弟節點
          </li>
          <li nz-menu-divider></li>
          <li nz-menu-item (click)="editNode()">
            <span nz-icon nzType="edit"></span>
            編輯節點
          </li>
          <li nz-menu-item (click)="copyNode()">
            <span nz-icon nzType="copy"></span>
            複製節點
          </li>
          <li nz-menu-divider></li>
          <li nz-menu-item nzDanger (click)="deleteNode()">
            <span nz-icon nzType="delete"></span>
            刪除節點
          </li>
        </ul>
      </nz-dropdown-menu>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>右鍵選單說明：</h4>
        <ul>
          <li>在節點上按右鍵會顯示上下文選單</li>
          <li>支援新增子節點和兄弟節點</li>
          <li>可以編輯、複製、刪除節點</li>
          <li>選單會根據節點類型顯示不同選項</li>
        </ul>
      </div>
    </nz-card>
  `
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
  }

  onRightClick(event: MouseEvent, node: any): void {
    event.preventDefault();
    this.currentNode = node;
    console.log('右鍵點擊節點:', node);
  }

  addChild(): void {
    if (this.currentNode) {
      this.message.success(`為節點 "${this.currentNode.title}" 新增子節點`);
    }
  }

  addSibling(): void {
    if (this.currentNode) {
      this.message.success(`為節點 "${this.currentNode.title}" 新增兄弟節點`);
    }
  }

  editNode(): void {
    if (this.currentNode) {
      this.message.info(`編輯節點 "${this.currentNode.title}"`);
    }
  }

  copyNode(): void {
    if (this.currentNode) {
      this.message.success(`複製節點 "${this.currentNode.title}"`);
    }
  }

  deleteNode(): void {
    if (this.currentNode) {
      this.message.warning(`刪除節點 "${this.currentNode.title}"`);
    }
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
