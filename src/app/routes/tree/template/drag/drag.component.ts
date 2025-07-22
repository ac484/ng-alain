/**
 * 樹狀拖曳功能元件（極簡主義，官方拖曳）
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TreeNodeOptions } from '../../models';

@Component({
  selector: 'app-tree-drag',
  standalone: true,
  imports: [CommonModule, NzTreeModule, NzButtonModule],
  template: `
    <div style="padding: 12px; border-bottom: 1px solid #eee;">
      <button nz-button nzType="primary" (click)="expandAll()">展開全部</button>
      <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
      <button nz-button nzType="default" (click)="resetTree()">重置</button>
    </div>
    <div style="padding: 16px;">
      <nz-tree
        [nzData]="treeData"
        nzDraggable
        [nzShowLine]="true"
        [nzShowIcon]="true"
        [nzExpandedKeys]="expandedKeys"
        (nzExpandChange)="onExpandChange($event)"
        (nzOnDrop)="onDrop($event)"
      ></nz-tree>
    </div>
  `,
  styles: [':host { display: block; height: 100%; }']
})
export class TreeDragComponent {
  private readonly defaultTreeData: TreeNodeOptions[] = [
    {
      title: '根節點 1',
      key: '0-0',
      children: [
        {
          title: '子節點 1-1',
          key: '0-0-0',
          children: [
            { title: '任務 A', key: '0-0-0-0', isLeaf: true },
            { title: '任務 B', key: '0-0-0-1', isLeaf: true }
          ]
        },
        {
          title: '子節點 1-2',
          key: '0-0-1',
          children: [{ title: '任務 C', key: '0-0-1-0', isLeaf: true }]
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
          children: [{ title: '任務 D', key: '0-1-0-0', isLeaf: true }]
        }
      ]
    }
  ];

  treeData: TreeNodeOptions[] = [...this.defaultTreeData];
  expandedKeys: string[] = this.getAllKeys(this.treeData);

  constructor(private message: NzMessageService) {}

  onExpandChange(event: NzFormatEmitEvent): void {
    this.expandedKeys = event.keys || [];
  }

  onDrop(event: NzFormatEmitEvent): void {
    this.message.success('節點拖曳完成');
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
    this.treeData = [...this.defaultTreeData];
    this.expandedKeys = this.getAllKeys(this.treeData);
    this.message.success('樹狀結構已重置');
  }

  private getAllKeys(nodes: TreeNodeOptions[]): string[] {
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
