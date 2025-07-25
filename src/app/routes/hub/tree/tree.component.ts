import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-hub-tree-contract',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, NzTreeModule, NzCardModule, NzButtonModule, NzIconModule, NzInputModule],
  template: `
    <div class="tree-container">
      <nz-card nzTitle="合約樹狀結構" [nzExtra]="extraTemplate">
        <div class="tree-content">
          <div class="tree-search">
            <nz-input
              nzPlaceHolder="搜尋節點..."
              [(ngModel)]="searchValue"
              (ngModelChange)="onSearchChange($event)">
              <span nz-icon nzType="search" nz-input-group-suffix></span>
            </nz-input>
          </div>
          
          <div class="tree-wrapper">
            <nz-tree
              [nzData]="treeData()"
              [nzSearchValue]="searchValue"
              [nzShowLine]="true"
              [nzShowIcon]="true"
              [nzExpandAll]="expandAll()"
              (nzClick)="onNodeClick($event)"
              (nzExpandChange)="onExpandChange($event)">
            </nz-tree>
          </div>
        </div>
      </nz-card>
    </div>

    <ng-template #extraTemplate>
      <div class="tree-actions">
        <button 
          nz-button 
          nzType="primary" 
          nzSize="small"
          (click)="addRootNode()">
          <span nz-icon nzType="plus"></span>
          新增根節點
        </button>
        <button 
          nz-button 
          nzSize="small"
          (click)="toggleExpandAll()"
          style="margin-left: 8px;">
          <span nz-icon [nzType]="expandAll() ? 'up' : 'down'"></span>
          {{ expandAll() ? '收起全部' : '展開全部' }}
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
    .tree-container {
      padding: 16px;
    }
    
    .tree-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .tree-search {
      max-width: 300px;
    }
    
    .tree-wrapper {
      min-height: 400px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding: 16px;
    }
    
    .tree-actions {
      display: flex;
      gap: 8px;
    }
    
    ::ng-deep .ant-tree-node-content-wrapper {
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    ::ng-deep .ant-tree-node-content-wrapper:hover {
      background-color: #f5f5f5;
    }
    
    ::ng-deep .ant-tree-node-selected {
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
    }
    
    ::ng-deep .ant-tree {
      background: transparent;
    }
    
    ::ng-deep .ant-tree-treenode {
      padding: 2px 0;
    }
  `]
})
export class HubTreeContractComponent implements OnInit {
  private message = inject(NzMessageService);

  // Signals for reactive state management
  treeData = signal<TreeNode[]>([]);
  expandAll = signal(false);
  searchValue = '';

  ngOnInit(): void {
    this.loadTreeData();
  }

  private loadTreeData(): void {
    // 初始化樹狀結構數據
    const initialData: TreeNode[] = [
      {
        title: '合約管理',
        key: 'contracts',
        icon: 'file-text',
        children: [
          {
            title: '進行中合約',
            key: 'active-contracts',
            icon: 'play-circle',
            children: [
              { title: '專案A合約', key: 'project-a', isLeaf: true, icon: 'file-pdf' },
              { title: '專案B合約', key: 'project-b', isLeaf: true, icon: 'file-pdf' }
            ]
          },
          {
            title: '已完成合約',
            key: 'completed-contracts',
            icon: 'check-circle',
            children: [
              { title: '專案C合約', key: 'project-c', isLeaf: true, icon: 'file-pdf' }
            ]
          }
        ]
      },
      {
        title: '付款流程',
        key: 'payments',
        icon: 'credit-card',
        children: [
          {
            title: '待審核付款',
            key: 'pending-payments',
            icon: 'clock-circle',
            isLeaf: true
          },
          {
            title: '已核准付款',
            key: 'approved-payments',
            icon: 'check-circle',
            isLeaf: true
          }
        ]
      },
      {
        title: '文件管理',
        key: 'documents',
        icon: 'folder',
        children: [
          { title: '合約文件', key: 'contract-docs', isLeaf: true, icon: 'file-word' },
          { title: '付款憑證', key: 'payment-docs', isLeaf: true, icon: 'file-excel' },
          { title: '審核記錄', key: 'review-docs', isLeaf: true, icon: 'file-text' }
        ]
      }
    ];

    this.treeData.set(initialData);
  }

  onNodeClick(node: any): void {
    console.log('點擊節點:', node);
    this.message.info(`點擊了: ${node.title}`);
  }

  onExpandChange(node: any): void {
    console.log('展開/收起節點:', node);
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
  }

  toggleExpandAll(): void {
    this.expandAll.set(!this.expandAll());
  }

  addRootNode(): void {
    const newKey = `root-${Date.now()}`;
    const newNode: TreeNode = {
      title: `新節點 ${this.treeData().length + 1}`,
      key: newKey,
      icon: 'plus-circle',
      children: []
    };

    this.treeData.set([...this.treeData(), newNode]);
    this.message.success('新增根節點成功');
  }
}
