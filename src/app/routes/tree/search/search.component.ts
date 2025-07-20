import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-tree-search',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTreeModule, NzInputModule, NzButtonModule, NzSpaceModule, NzIconModule, NzTagModule, FormsModule],
  template: `
    <nz-card title="樹狀搜索功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input nz-input placeholder="搜尋節點..." [(ngModel)]="searchText" (ngModelChange)="onSearch($event)" />
          </nz-input-group>
          <button nz-button nzType="primary" (click)="clearSearch()">清除搜尋</button>
          <button nz-button nzType="default" (click)="expandAll()">展開全部</button>
          <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
        </nz-space>
        <ng-template #suffixIconSearch>
          <span nz-icon nzType="search"></span>
        </ng-template>
      </div>

      <div style="margin-bottom: 16px;" *ngIf="searchResults.length > 0">
        <nz-tag [nzColor]="'blue'">搜尋結果: {{ searchResults.length }} 個節點</nz-tag>
        <div style="margin-top: 8px;">
          <nz-tag
            *ngFor="let result of searchResults"
            [nzColor]="'green'"
            style="margin-right: 8px; margin-bottom: 4px;"
            (click)="highlightNode(result.key)"
          >
            {{ result.title }}
          </nz-tag>
        </div>
      </div>

      <nz-tree
        #tree
        [nzData]="filteredTreeData"
        [nzBlockNode]="true"
        [nzShowLine]="true"
        [nzShowIcon]="true"
        [nzExpandedKeys]="expandedKeys"
        [nzSelectedKeys]="selectedKeys"
        (nzExpandChange)="onExpandChange($event)"
        (nzClick)="onNodeClick($event)"
      >
      </nz-tree>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>搜索功能說明：</h4>
        <ul>
          <li>輸入關鍵字進行即時搜尋</li>
          <li>支援模糊搜尋和精確匹配</li>
          <li>搜尋結果會高亮顯示</li>
          <li>點擊搜尋結果標籤可定位到對應節點</li>
          <li>支援展開/收合操作</li>
        </ul>
      </div>
    </nz-card>
  `
})
export class TreeSearchComponent {
  treeData: TreeNode[] = [
    {
      title: '專案管理',
      key: '0-0',
      icon: 'anticon-cluster',
      children: [
        {
          title: '前端開發',
          key: '0-0-0',
          icon: 'anticon-node-index',
          children: [
            { title: 'Angular 專案', key: '0-0-0-0', isLeaf: true, icon: 'anticon-html5' },
            { title: 'React 專案', key: '0-0-0-1', isLeaf: true, icon: 'anticon-code' },
            { title: 'Vue 專案', key: '0-0-0-2', isLeaf: true, icon: 'anticon-code' }
          ]
        },
        {
          title: '後端開發',
          key: '0-0-1',
          icon: 'anticon-tree',
          children: [
            { title: 'Node.js API', key: '0-0-1-0', isLeaf: true, icon: 'anticon-api' },
            { title: 'Python 服務', key: '0-0-1-1', isLeaf: true, icon: 'anticon-code' }
          ]
        },
        {
          title: '設計資源',
          key: '0-0-2',
          icon: 'anticon-branches',
          children: [
            { title: 'UI 設計稿', key: '0-0-2-0', isLeaf: true, icon: 'anticon-file-image' },
            { title: '圖標資源', key: '0-0-2-1', isLeaf: true, icon: 'anticon-picture' }
          ]
        }
      ]
    },
    {
      title: '文檔管理',
      key: '0-1',
      icon: 'anticon-branches',
      children: [
        {
          title: '技術文檔',
          key: '0-1-0',
          icon: 'anticon-node-index',
          children: [
            { title: 'API 文檔', key: '0-1-0-0', isLeaf: true, icon: 'anticon-file-text' },
            { title: '使用手冊', key: '0-1-0-1', isLeaf: true, icon: 'anticon-file-text' }
          ]
        },
        {
          title: '會議記錄',
          key: '0-1-1',
          icon: 'anticon-tree',
          children: [
            { title: '週會記錄', key: '0-1-1-0', isLeaf: true, icon: 'anticon-calendar' },
            { title: '專案會議', key: '0-1-1-1', isLeaf: true, icon: 'anticon-calendar' }
          ]
        }
      ]
    }
  ];

  filteredTreeData: TreeNode[] = [];
  searchText = '';
  searchResults: TreeNode[] = [];
  expandedKeys: string[] = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
  selectedKeys: string[] = [];

  constructor(private message: NzMessageService) {
    this.filteredTreeData = [...this.treeData];
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    if (!searchText.trim()) {
      this.filteredTreeData = [...this.treeData];
      this.searchResults = [];
      return;
    }

    this.searchResults = this.searchNodes(this.treeData, searchText.toLowerCase());
    this.filteredTreeData = this.filterTreeData(this.treeData, searchText.toLowerCase());

    // 自動展開包含搜尋結果的節點
    this.expandedKeys = this.getExpandedKeysForSearch(this.treeData, searchText.toLowerCase());
  }

  private searchNodes(nodes: TreeNode[], searchText: string): TreeNode[] {
    const results: TreeNode[] = [];

    nodes.forEach(node => {
      if (node.title.toLowerCase().includes(searchText)) {
        results.push(node);
      }
      if (node.children) {
        results.push(...this.searchNodes(node.children, searchText));
      }
    });

    return results;
  }

  private filterTreeData(nodes: TreeNode[], searchText: string): TreeNode[] {
    return nodes
      .map(node => {
        const filteredNode = { ...node };

        if (node.children) {
          const filteredChildren = this.filterTreeData(node.children, searchText);
          if (filteredChildren.length > 0 || node.title.toLowerCase().includes(searchText)) {
            filteredNode.children = filteredChildren;
            return filteredNode;
          }
        }

        if (node.title.toLowerCase().includes(searchText)) {
          return filteredNode;
        }

        return null;
      })
      .filter(node => node !== null) as TreeNode[];
  }

  private getExpandedKeysForSearch(nodes: TreeNode[], searchText: string): string[] {
    const keys: string[] = [];

    nodes.forEach(node => {
      if (node.title.toLowerCase().includes(searchText) || (node.children && this.hasMatchingChildren(node.children, searchText))) {
        keys.push(node.key);
      }
      if (node.children) {
        keys.push(...this.getExpandedKeysForSearch(node.children, searchText));
      }
    });

    return keys;
  }

  private hasMatchingChildren(children: TreeNode[], searchText: string): boolean {
    return children.some(
      child => child.title.toLowerCase().includes(searchText) || (child.children && this.hasMatchingChildren(child.children, searchText))
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredTreeData = [...this.treeData];
    this.searchResults = [];
    this.expandedKeys = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
    this.message.info('搜尋已清除');
  }

  highlightNode(key: string): void {
    this.selectedKeys = [key];
    this.expandedKeys = [...this.expandedKeys, key];
    this.message.success(`已定位到節點: ${key}`);
  }

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
    this.selectedKeys = [event.node.key];
  }

  expandAll(): void {
    this.expandedKeys = this.getAllKeys(this.filteredTreeData);
    this.message.info('已展開全部節點');
  }

  collapseAll(): void {
    this.expandedKeys = [];
    this.message.info('已收合全部節點');
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
