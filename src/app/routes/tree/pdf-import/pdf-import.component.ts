import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';
import { initializePDFJS, getPDFJS } from '../../../core/pdf/pdf.config';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  icon?: string;
}

interface PDFParseResult {
  success: boolean;
  data?: TreeNode[];
  error?: string;
  pageCount?: number;
  textContent?: string;
}

@Component({
  selector: 'app-tree-pdf-import',
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
    NzProgressModule,
    NzSpinModule,
    FormsModule
  ],
  template: `
    <nz-card title="PDF 匯入功能">
      <div style="margin-bottom: 16px;">
        <nz-space>
          <button nz-button nzType="primary" (click)="showUploadModal()">
            <span nz-icon nzType="upload"></span>
            選擇 PDF 檔案
          </button>
          <button nz-button nzType="default" (click)="resetTree()">
            <span nz-icon nzType="reload"></span>
            重置
          </button>
        </nz-space>
      </div>

      <nz-spin [nzSpinning]="isProcessing">
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
      </nz-spin>

      <!-- PDF 上傳模態框 -->
      <nz-modal
        [(nzVisible)]="isUploadModalVisible"
        nzTitle="PDF 檔案匯入"
        (nzOnCancel)="cancelUpload()"
        (nzOnOk)="confirmUpload()"
        [nzOkDisabled]="!selectedFile"
      >
        <div *nzModalContent>
          <nz-alert
            nzType="info"
            nzMessage="支援中英文 PDF 檔案，系統會自動識別標題層級並轉換為樹狀結構"
            style="margin-bottom: 16px;"
          ></nz-alert>

          <nz-form-item>
            <nz-form-label>選擇檔案</nz-form-label>
            <nz-form-control>
              <input type="file" accept=".pdf" (change)="onFileSelected($event)" style="width: 100%;" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item *ngIf="selectedFile">
            <nz-form-label>檔案信息</nz-form-label>
            <nz-form-control>
              <div style="padding: 8px; background-color: #f5f5f5; border-radius: 4px;">
                <p><strong>檔名：</strong>{{ selectedFile.name }}</p>
                <p><strong>大小：</strong>{{ formatFileSize(selectedFile.size) }}</p>
                <p><strong>類型：</strong>{{ selectedFile.type }}</p>
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label>解析選項</nz-form-label>
            <nz-form-control>
              <nz-select [(ngModel)]="parseOptions" placeholder="選擇解析模式">
                <nz-option nzValue="auto" nzLabel="自動識別層級"></nz-option>
                <nz-option nzValue="manual" nzLabel="手動設定層級"></nz-option>
                <nz-option nzValue="flat" nzLabel="扁平化結構"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item *ngIf="parseOptions === 'manual'">
            <nz-form-label>標題識別規則</nz-form-label>
            <nz-form-control>
              <nz-input [(ngModel)]="titlePattern" placeholder="例如：^第[一二三四五六七八九十]+章|^[0-9]+\\."></nz-input>
            </nz-form-control>
          </nz-form-item>

          <nz-divider></nz-divider>

          <div *ngIf="parseResult">
            <h4>解析結果：</h4>
            <div *ngIf="parseResult.success" style="color: green;">
              ✅ 成功解析 {{ parseResult.pageCount }} 頁，生成 {{ parseResult.data?.length }} 個根節點
            </div>
            <div *ngIf="!parseResult.success" style="color: red;"> ❌ 解析失敗：{{ parseResult.error }} </div>
            <div *ngIf="parseResult.textContent" style="margin-top: 8px;">
              <details>
                <summary>查看原始文字內容（前 500 字）</summary>
                <pre
                  style="background-color: #f5f5f5; padding: 8px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow-y: auto;"
                  >{{ parseResult.textContent.substring(0, 500) }}...</pre
                >
              </details>
            </div>
          </div>
        </div>
      </nz-modal>

      <div style="margin-top: 16px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>PDF 匯入功能說明：</h4>
        <ul>
          <li>支援中英文 PDF 檔案格式</li>
          <li>自動識別標題層級和結構</li>
          <li>支援手動設定解析規則</li>
          <li>提供解析結果預覽</li>
          <li>支援大檔案處理（進度顯示）</li>
          <li>保留原始文字內容供參考</li>
        </ul>
      </div>
    </nz-card>
  `
})
export class TreePdfImportComponent {
  treeData: TreeNode[] = [
    {
      title: 'PDF 匯入示例',
      key: '0-0',
      icon: 'anticon-file-pdf',
      children: [
        {
          title: '第一章 介紹',
          key: '0-0-0',
          icon: 'anticon-file-text',
          children: [
            { title: '1.1 背景', key: '0-0-0-0', isLeaf: true, icon: 'anticon-file-text' },
            { title: '1.2 目標', key: '0-0-0-1', isLeaf: true, icon: 'anticon-file-text' }
          ]
        },
        {
          title: '第二章 方法',
          key: '0-0-1',
          icon: 'anticon-file-text',
          children: [
            { title: '2.1 研究方法', key: '0-0-1-0', isLeaf: true, icon: 'anticon-file-text' },
            { title: '2.2 實驗設計', key: '0-0-1-1', isLeaf: true, icon: 'anticon-file-text' }
          ]
        }
      ]
    }
  ];

  expandedKeys: string[] = ['0-0', '0-0-0', '0-0-1'];
  selectedKeys: string[] = [];
  isUploadModalVisible = false;
  isProcessing = false;
  selectedFile: File | null = null;
  parseOptions = 'auto';
  titlePattern = '';
  parseResult: PDFParseResult | null = null;

  constructor(private message: NzMessageService) {
    // 初始化 PDF.js
    this.initPDFJS();
  }

  private async initPDFJS(): Promise<void> {
    try {
      await initializePDFJS();
      console.log('PDF.js 初始化成功');
    } catch (error) {
      console.error('PDF.js 初始化失敗:', error);
      this.message.error('PDF 解析庫初始化失敗');
    }
  }

  showUploadModal(): void {
    this.isUploadModalVisible = true;
    this.selectedFile = null;
    this.parseResult = null;
  }

  cancelUpload(): void {
    this.isUploadModalVisible = false;
    this.selectedFile = null;
    this.parseResult = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.parseResult = null;
    } else {
      this.message.error('請選擇有效的 PDF 檔案');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async confirmUpload(): Promise<void> {
    if (!this.selectedFile) {
      this.message.warning('請選擇 PDF 檔案');
      return;
    }

    this.isProcessing = true;
    this.message.info('開始解析 PDF 檔案...');

    try {
      const result = await this.parsePDF(this.selectedFile);
      this.parseResult = result;

      if (result.success && result.data) {
        this.treeData = result.data;
        this.expandedKeys = this.getAllKeys(result.data);
        this.message.success('PDF 解析成功，樹狀結構已更新');
        this.isUploadModalVisible = false;
      } else {
        this.message.error('PDF 解析失敗：' + (result.error || '未知錯誤'));
      }
    } catch (error) {
      this.message.error('處理過程中發生錯誤：' + error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async parsePDF(file: File): Promise<PDFParseResult> {
    try {
      // 檢查是否已初始化 PDF.js
      if (typeof window !== 'undefined' && !(window as any).pdfjsLib) {
        return {
          success: false,
          error: 'PDF 解析庫未初始化，請重新載入頁面'
        };
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = getPDFJS();

      // 載入 PDF 文檔
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';
      const pageCount = pdf.numPages;

      // 逐頁提取文字
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      // 根據解析選項處理文字
      let treeData: TreeNode[] = [];

      if (this.parseOptions === 'auto') {
        treeData = this.autoParseToTree(fullText);
      } else if (this.parseOptions === 'manual') {
        treeData = this.manualParseToTree(fullText, this.titlePattern);
      } else {
        treeData = this.flatParseToTree(fullText);
      }

      return {
        success: true,
        data: treeData,
        pageCount,
        textContent: fullText
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF 解析失敗'
      };
    }
  }

  private autoParseToTree(text: string): TreeNode[] {
    const lines = text.split('\n').filter(line => line.trim());
    const treeData: TreeNode[] = [];
    const stack: { node: TreeNode; level: number }[] = [];
    let keyCounter = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // 自動識別標題層級
      const level = this.detectTitleLevel(trimmedLine);
      const node: TreeNode = {
        title: trimmedLine,
        key: `node-${keyCounter++}`,
        isLeaf: level === 0
      };

      if (level === 0) {
        // 根級節點
        treeData.push(node);
        stack.length = 0;
      } else {
        // 子節點
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          treeData.push(node);
        } else {
          const parent = stack[stack.length - 1].node;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        }
        stack.push({ node, level });
      }
    });

    return treeData;
  }

  private manualParseToTree(text: string, pattern: string): TreeNode[] {
    const lines = text.split('\n').filter(line => line.trim());
    const treeData: TreeNode[] = [];
    let keyCounter = 0;

    try {
      const regex = new RegExp(pattern, 'i');

      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        if (regex.test(trimmedLine)) {
          const node: TreeNode = {
            title: trimmedLine,
            key: `node-${keyCounter++}`,
            isLeaf: false
          };
          treeData.push(node);
        }
      });
    } catch (error) {
      console.error('正則表達式錯誤:', error);
    }

    return treeData;
  }

  private flatParseToTree(text: string): TreeNode[] {
    const lines = text.split('\n').filter(line => line.trim());
    const treeData: TreeNode[] = [];
    let keyCounter = 0;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const node: TreeNode = {
        title: trimmedLine,
        key: `node-${keyCounter++}`,
        isLeaf: true
      };
      treeData.push(node);
    });

    return treeData;
  }

  private detectTitleLevel(text: string): number {
    // 檢測中英文標題層級
    const patterns = [
      /^第[一二三四五六七八九十]+章/, // 中文章節
      /^第[一二三四五六七八九十]+節/, // 中文節
      /^[0-9]+\.[0-9]+/, // 數字編號
      /^[A-Z]\.[0-9]+/, // 字母編號
      /^[一二三四五六七八九十]+\./ // 中文數字編號
    ];

    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].test(text)) {
        return i + 1;
      }
    }

    return 0; // 非標題
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
        title: 'PDF 匯入示例',
        key: '0-0',
        icon: 'anticon-file-pdf',
        children: [
          {
            title: '第一章 介紹',
            key: '0-0-0',
            icon: 'anticon-file-text',
            children: [
              { title: '1.1 背景', key: '0-0-0-0', isLeaf: true, icon: 'anticon-file-text' },
              { title: '1.2 目標', key: '0-0-0-1', isLeaf: true, icon: 'anticon-file-text' }
            ]
          },
          {
            title: '第二章 方法',
            key: '0-0-1',
            icon: 'anticon-file-text',
            children: [
              { title: '2.1 研究方法', key: '0-0-1-0', isLeaf: true, icon: 'anticon-file-text' },
              { title: '2.2 實驗設計', key: '0-0-1-1', isLeaf: true, icon: 'anticon-file-text' }
            ]
          }
        ]
      }
    ];
    this.expandedKeys = ['0-0', '0-0-0', '0-0-1'];
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
