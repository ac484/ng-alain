import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

@Component({
  selector: 'app-tree-drag',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTreeModule, NzButtonModule, NzSpaceModule],
  template: `
    <nz-card title="樹狀拖曳功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="expandAll()">展開全部</button>
          <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
          <button nz-button nzType="default" (click)="resetTree()">重置</button>
        </nz-space>
      </div>

      <nz-tree
        [nzData]="treeData"
        [nzDraggable]="true"
        [nzBlockNode]="true"
        [nzShowLine]="true"
        [nzShowIcon]="true"
        [nzExpandedKeys]="expandedKeys"
        [nzSelectedKeys]="selectedKeys"
        (nzExpandChange)="onExpandChange($event)"
        (nzDragStart)="onDragStart($event)"
        (nzDragEnter)="onDragEnter($event)"
        (nzDragLeave)="onDragLeave($event)"
        (nzDrop)="onDrop($event)"
        (nzDragEnd)="onDragEnd($event)"
      >
      </nz-tree>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>拖曳說明：</h4>
        <ul>
          <li>可以拖曳節點到其他位置</li>
          <li>拖曳時會顯示放置位置指示</li>
          <li>支援拖曳到子節點或兄弟節點</li>
          <li>拖曳完成後會自動更新樹狀結構</li>
        </ul>
      </div>
    </nz-card>
  `
})
export class TreeDragComponent {
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

  constructor(private message: NzMessageService) {}

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onDragStart(event: any): void {
    console.log('拖曳開始:', event);
  }

  onDragEnter(event: any): void {
    console.log('拖曳進入:', event);
  }

  onDragLeave(event: any): void {
    console.log('拖曳離開:', event);
  }

  onDrop(event: any): void {
    console.log('拖曳放置:', event);
    this.message.success('節點拖曳完成');
  }

  onDragEnd(event: any): void {
    console.log('拖曳結束:', event);
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
