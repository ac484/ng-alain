/**
 * 樹狀搜尋元件（極簡主義，官方推薦）
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-tree-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTreeModule, NzInputModule],
  template: `
    <nz-input-group [nzSuffix]="suffixIcon">
      <input nz-input placeholder="搜尋節點" [(ngModel)]="searchValue" (ngModelChange)="onSearch($event)" />
    </nz-input-group>
    <ng-template #suffixIcon><span nz-icon nzType="search"></span></ng-template>
    <nz-tree
      [nzData]="treeData"
      [nzSearchValue]="searchValue"
      [nzExpandedKeys]="expandedKeys"
      [nzSelectedKeys]="selectedKeys"
      nzBlockNode
      (nzExpandChange)="onExpand($event)"
      (nzClick)="onSelect($event)"
    ></nz-tree>
  `
})
export class TreeSearchComponent {
  searchValue = '';
  treeData: NzTreeNodeOptions[] = [
    {
      title: '專案管理',
      key: '0-0',
      children: [
        {
          title: '前端開發',
          key: '0-0-0',
          children: [
            { title: 'Angular 專案', key: '0-0-0-0', isLeaf: true },
            { title: 'React 專案', key: '0-0-0-1', isLeaf: true },
            { title: 'Vue 專案', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '後端開發',
          key: '0-0-1',
          children: [
            { title: 'Node.js API', key: '0-0-1-0', isLeaf: true },
            { title: 'Python 服務', key: '0-0-1-1', isLeaf: true }
          ]
        }
      ]
    },
    {
      title: '文檔管理',
      key: '0-1',
      children: [
        {
          title: '技術文檔',
          key: '0-1-0',
          children: [
            { title: 'API 文檔', key: '0-1-0-0', isLeaf: true },
            { title: '使用手冊', key: '0-1-0-1', isLeaf: true }
          ]
        }
      ]
    }
  ];
  expandedKeys: string[] = ['0-0', '0-1'];
  selectedKeys: string[] = [];

  onSearch(value: string): void {
    this.searchValue = value;
    this.expandedKeys = this.getExpandedKeys(this.treeData, value.toLowerCase());
  }
  onExpand(event: any): void {
    this.expandedKeys = event.keys;
  }
  onSelect(event: any): void {
    this.selectedKeys = [event.node.key];
  }
  private getExpandedKeys(nodes: NzTreeNodeOptions[], search: string): string[] {
    const keys: string[] = [];
    nodes.forEach(node => {
      if (node.title && node.title.toLowerCase().includes(search)) keys.push(node.key as string);
      if (node.children) keys.push(...this.getExpandedKeys(node.children, search));
    });
    return keys;
  }
}
