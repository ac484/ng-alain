import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  icon?: string;
}

interface CheckListItem {
  key: string;
  description: string;
  onClick: () => void;
}

@Component({
  selector: 'app-tree-panel',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTreeModule,
    NzButtonModule,
    NzSpaceModule,
    NzIconModule,
    NzLayoutModule,
    NzCollapseModule,
    NzCheckListModule
  ],
  template: `
    <nz-card title="樹狀面板功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="expandAll()">展開全部</button>
          <button nz-button nzType="default" (click)="collapseAll()">收合全部</button>
          <button nz-button nzType="default" (click)="resetTree()">重置</button>
          <button nz-button nzType="dashed" (click)="togglePanel()">切換面板</button>
          <button nz-button nzType="default" (click)="toggleCheckList()">顯示任務清單</button>
        </nz-space>
      </div>

      <nz-layout>
        <nz-sider
          [nzCollapsed]="isCollapsed"
          [nzCollapsible]="true"
          [nzWidth]="300"
          [nzCollapsedWidth]="80"
          (nzCollapsedChange)="onCollapsedChange($event)"
          style="background: #fff; border-right: 1px solid #f0f0f0;"
        >
          <div class="tree-panel" [class.collapsed]="isCollapsed">
            <div class="panel-header">
              <h4 *ngIf="!isCollapsed">樹狀結構</h4>
              <span nz-icon nzType="cluster" *ngIf="isCollapsed"></span>
            </div>

            <div class="panel-content" *ngIf="!isCollapsed">
              <nz-tree
                [nzData]="treeData"
                [nzBlockNode]="true"
                [nzShowLine]="true"
                [nzShowIcon]="true"
                [nzExpandedKeys]="expandedKeys"
                [nzSelectedKeys]="selectedKeys"
                (nzExpandChange)="onExpandChange($event)"
                (nzClick)="onNodeClick($event)"
              >
              </nz-tree>
            </div>
          </div>
        </nz-sider>

        <nz-content style="padding: 24px; background: #fff;">
          <div class="content-area">
            <div *ngIf="currentNode" class="node-info">
              <h3>當前選中節點</h3>
              <nz-card>
                <div class="info-item"> <strong>標題：</strong>{{ currentNode.title }} </div>
                <div class="info-item"> <strong>Key：</strong>{{ currentNode.key }} </div>
                <div class="info-item"> <strong>類型：</strong>{{ currentNode.isLeaf ? '葉子節點' : '父節點' }} </div>
                <div class="info-item" *ngIf="currentNode.children"> <strong>子節點數量：</strong>{{ currentNode.children.length }} </div>
              </nz-card>
            </div>

            <div *ngIf="!currentNode" class="welcome-info">
              <h3>歡迎使用樹狀面板</h3>
              <p>請從左側面板選擇一個節點來查看詳細信息</p>
              <div class="feature-list">
                <h4>功能特色：</h4>
                <ul>
                  <li>可折疊的側邊面板</li>
                  <li>樹狀結構導航</li>
                  <li>節點詳細信息顯示</li>
                  <li>響應式佈局設計</li>
                  <li>支持展開/收合操作</li>
                  <li>任務清單功能</li>
                </ul>
              </div>
            </div>
          </div>
        </nz-content>
      </nz-layout>

      <!-- CheckList 任務清單 -->
      <nz-check-list
        [nzItems]="checkListItems"
        [nzVisible]="showCheckList"
        [nzIndex]="1"
        [nzProgress]="true"
        [nzTitle]="'樹狀面板操作指南'"
        [nzFooter]="'完成所有步驟以熟悉面板功能'"
        (nzHide)="onCheckListHide($event)"
      >
        <ng-template #trigger>
          <button nz-button nzType="primary" nzSize="small">
            <span nz-icon nzType="check-circle"></span>
            操作指南
          </button>
        </ng-template>
      </nz-check-list>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>面板功能說明：</h4>
        <ul>
          <li>左側面板可以折疊/展開</li>
          <li>點擊樹狀節點查看詳細信息</li>
          <li>支持展開全部/收合全部操作</li>
          <li>響應式設計，適配不同螢幕尺寸</li>
          <li>任務清單功能幫助用戶熟悉操作流程</li>
        </ul>
      </div>
    </nz-card>
  `,
  styles: [
    `
      .tree-panel {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .tree-panel.collapsed {
        align-items: center;
        justify-content: center;
      }

      .panel-header {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        background: #fafafa;
      }

      .panel-header h4 {
        margin: 0;
        color: #1890ff;
      }

      .panel-content {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
      }

      .content-area {
        min-height: 400px;
      }

      .node-info {
        max-width: 600px;
      }

      .info-item {
        margin-bottom: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .info-item:last-child {
        border-bottom: none;
      }

      .welcome-info {
        text-align: center;
        padding: 40px 20px;
      }

      .feature-list {
        text-align: left;
        max-width: 400px;
        margin: 20px auto;
      }

      .feature-list ul {
        padding-left: 20px;
      }

      .feature-list li {
        margin-bottom: 8px;
        color: #666;
      }
    `
  ]
})
export class TreePanelComponent {
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

  expandedKeys: string[] = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
  selectedKeys: string[] = [];
  currentNode: any = null;
  isCollapsed = false;
  showCheckList = false;

  // CheckList 任務項目
  checkListItems: CheckListItem[] = [
    {
      key: 'step1',
      description: '點擊左側樹狀節點查看詳細信息',
      onClick: () => {
        this.message.info('請點擊左側樹狀結構中的任意節點');
      }
    },
    {
      key: 'step2',
      description: '嘗試展開和收合樹狀節點',
      onClick: () => {
        this.message.info('點擊節點前的箭頭圖標來展開或收合');
      }
    },
    {
      key: 'step3',
      description: '使用「展開全部」按鈕展開所有節點',
      onClick: () => {
        this.expandAll();
        this.message.success('已展開全部節點');
      }
    },
    {
      key: 'step4',
      description: '使用「收合全部」按鈕收合所有節點',
      onClick: () => {
        this.collapseAll();
        this.message.success('已收合全部節點');
      }
    },
    {
      key: 'step5',
      description: '嘗試折疊左側面板',
      onClick: () => {
        this.togglePanel();
        this.message.info('點擊面板右上角的折疊按鈕');
      }
    }
  ];

  constructor(private message: NzMessageService) {}

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
    this.selectedKeys = [event.node.key];
    this.currentNode = event.node;
  }

  onCollapsedChange(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    console.log('面板折疊狀態:', collapsed);
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
    this.expandedKeys = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
    this.currentNode = null;
    this.selectedKeys = [];
    this.message.success('樹狀結構已重置');
  }

  togglePanel(): void {
    this.isCollapsed = !this.isCollapsed;
    this.message.info(this.isCollapsed ? '面板已收合' : '面板已展開');
  }

  toggleCheckList(): void {
    this.showCheckList = !this.showCheckList;
    this.message.info(this.showCheckList ? '已顯示任務清單' : '已隱藏任務清單');
  }

  onCheckListHide(hide: boolean): void {
    this.showCheckList = false;
    if (hide) {
      this.message.success('任務清單已隱藏，您可以在 LocalStorage 中保存此設置');
      // 可以在此處保存到 LocalStorage
      localStorage.setItem('tree-panel-checklist-hidden', 'true');
    }
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
