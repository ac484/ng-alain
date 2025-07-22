/**
 * 樹狀匯入匯出元件（極簡主義）
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-tree-import-export',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTreeModule,
    NzButtonModule,
    NzSpaceModule,
    NzIconModule,
    NzUploadModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzDividerModule,
    NzAlertModule,
    FormsModule
  ],
  template: `
    <nz-card title="樹狀匯入匯出功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="exportToJSON()">
            <span nz-icon nzType="download"></span>
            匯出 JSON
          </button>
          <button nz-button nzType="primary" (click)="exportToCSV()">
            <span nz-icon nzType="file-excel"></span>
            匯出 CSV
          </button>
          <button nz-button nzType="default" (click)="showImportModal()">
            <span nz-icon nzType="upload"></span>
            匯入資料
          </button>
          <button nz-button nzType="default" (click)="resetTree()">
            <span nz-icon nzType="reload"></span>
            重置
          </button>
        </nz-space>
      </div>

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
      >
      </nz-tree>

      <nz-modal [(nzVisible)]="isImportModalVisible" nzTitle="匯入樹狀資料" (nzOnCancel)="cancelImport()" (nzOnOk)="confirmImport()">
        <div *nzModalContent>
          <nz-alert nzType="info" nzMessage="支援 JSON 和 CSV 格式的樹狀資料匯入" style="margin-bottom: 16px;"></nz-alert>

          <nz-form-item>
            <nz-form-label>匯入格式</nz-form-label>
            <nz-form-control>
              <nz-select [(ngModel)]="importFormat" placeholder="選擇匯入格式">
                <nz-option nzValue="json" nzLabel="JSON 格式"></nz-option>
                <nz-option nzValue="csv" nzLabel="CSV 格式"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label>匯入資料</nz-form-label>
            <nz-form-control>
              <textarea
                nz-input
                [(ngModel)]="importData"
                [nzAutosize]="{ minRows: 8, maxRows: 12 }"
                placeholder="請貼上要匯入的資料..."
              ></textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-divider></nz-divider>

          <div *ngIf="importPreview.length > 0">
            <h4>預覽 (前 5 個節點):</h4>
            <ul>
              <li *ngFor="let node of importPreview.slice(0, 5)"> {{ node.title }} ({{ node.key }}) </li>
            </ul>
          </div>
        </div>
      </nz-modal>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>匯入匯出功能說明：</h4>
        <ul>
          <li>支援 JSON 格式的完整樹狀結構匯出</li>
          <li>支援 CSV 格式的扁平化節點匯出</li>
          <li>匯入時會驗證資料格式並提供預覽</li>
          <li>匯入會覆蓋現有的樹狀結構</li>
          <li>建議在匯入前先匯出備份</li>
        </ul>
      </div>
    </nz-card>
  `
})
export class TreeImportExportComponent {
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
        }
      ]
    }
  ];

  expandedKeys: string[] = ['0-0', '0-0-0', '0-0-1', '0-1', '0-1-0'];
  selectedKeys: string[] = [];
  isImportModalVisible = false;
  importFormat = 'json';
  importData = '';
  importPreview: TreeNode[] = [];

  constructor(private message: NzMessageService) {}

  exportToJSON(): void {
    try {
      const jsonData = JSON.stringify(this.treeData, null, 2);
      this.downloadFile(jsonData, 'tree-data.json', 'application/json');
      this.message.success('JSON 檔案匯出成功');
    } catch (error) {
      this.message.error(`匯出失敗: ${error}`);
    }
  }

  exportToCSV(): void {
    try {
      const csvData = this.convertTreeToCSV(this.treeData);
      this.downloadFile(csvData, 'tree-data.csv', 'text/csv');
      this.message.success('CSV 檔案匯出成功');
    } catch (error) {
      this.message.error(`匯出失敗: ${error}`);
    }
  }

  private convertTreeToCSV(nodes: TreeNode[], level = 0, parentKey = ''): string {
    let csv = 'Title,Key,Level,ParentKey,IsLeaf\n';

    nodes.forEach(node => {
      csv += `"${node.title}","${node.key}",${level},"${parentKey}",${node.isLeaf ? 'true' : 'false'}\n`;

      if (node.children) {
        csv += this.convertTreeToCSV(node.children, level + 1, node.key);
      }
    });

    return csv;
  }

  private downloadFile(content: string, filename: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  showImportModal(): void {
    this.isImportModalVisible = true;
    this.importData = '';
    this.importPreview = [];
  }

  cancelImport(): void {
    this.isImportModalVisible = false;
    this.importData = '';
    this.importPreview = [];
  }

  confirmImport(): void {
    if (!this.importData.trim()) {
      this.message.warning('請輸入要匯入的資料');
      return;
    }

    try {
      let importedData: TreeNode[] = [];

      if (this.importFormat === 'json') {
        importedData = this.parseJSONData(this.importData);
      } else if (this.importFormat === 'csv') {
        importedData = this.parseCSVData(this.importData);
      }

      if (importedData.length > 0) {
        this.treeData = importedData;
        this.expandedKeys = this.getAllKeys(importedData);
        this.message.success('資料匯入成功');
        this.isImportModalVisible = false;
      } else {
        this.message.error('匯入的資料格式不正確');
      }
    } catch (error) {
      this.message.error(`匯入失敗: ${error}`);
    }
  }

  private parseJSONData(jsonString: string): TreeNode[] {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (parsed.data && Array.isArray(parsed.data)) {
        return parsed.data;
      } else {
        throw new Error('JSON 格式不正確');
      }
    } catch (error) {
      throw new Error(`JSON 解析失敗: ${error}`);
    }
  }

  private parseCSVData(csvString: string): TreeNode[] {
    try {
      const lines = csvString.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));

      if (headers.length < 3) {
        throw new Error('CSV 格式不正確');
      }

      const nodes: TreeNode[] = [];
      const nodeMap = new Map<string, TreeNode>();

      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i]);
        if (values.length >= 3) {
          const node: TreeNode = {
            title: values[0].replace(/"/g, ''),
            key: values[1].replace(/"/g, ''),
            isLeaf: values[4] === 'true'
          };
          nodeMap.set(node.key, node);
        }
      }

      nodeMap.forEach(node => {
        const parentKey = this.getParentKeyFromCSV(node.key);
        if (parentKey && nodeMap.has(parentKey)) {
          const parent = nodeMap.get(parentKey)!;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        } else {
          nodes.push(node);
        }
      });

      return nodes;
    } catch (error) {
      throw new Error(`CSV 解析失敗: ${error}`);
    }
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  private getParentKeyFromCSV(key: string): string {
    const parts = key.split('-');
    if (parts.length > 1) {
      parts.pop();
      return parts.join('-');
    }
    return '';
  }

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
    this.selectedKeys = [event.node.key];
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
