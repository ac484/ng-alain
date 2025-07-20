import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { VisionApiService, ScanResult } from '../../../core/services/vision-api.service';
import { TreeConverterService, TreeNode } from '../../../core/tree/tree-converter.service';

@Component({
  selector: 'app-tree-pdf-scan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzAlertModule,
    NzSpinModule,
    NzEmptyModule,
    NzDividerModule,
    NzUploadModule,
    NzTreeModule
  ],
  template: `
    <nz-card [nzTitle]="'PDF 掃描 (Google Cloud Vision API)'">
      <div style="margin-bottom: 16px;">
        <nz-alert
          nzType="info"
          nzMessage="此功能使用Google Cloud Vision API掃描PDF文件，需要先將PDF上傳到Google Cloud Storage"
          nzShowIcon
        ></nz-alert>
      </div>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">Google Cloud Storage 桶名</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input [(ngModel)]="bucketName" placeholder="輸入GCS桶名" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">PDF文件路徑</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input [(ngModel)]="pdfPath" placeholder="輸入PDF在GCS中的路徑" />
        </nz-form-control>
      </nz-form-item>

      <div style="margin-bottom: 16px; text-align: center;">
        <button nz-button nzType="primary" (click)="scanPdf()" [nzLoading]="isProcessing">
          <span nz-icon nzType="scan"></span>
          掃描PDF
        </button>
      </div>

      <nz-divider></nz-divider>

      <nz-spin [nzSpinning]="isProcessing">
        <div *ngIf="!scanResult" class="empty-state">
          <nz-empty nzNotFoundImage="simple">
            <span>尚未掃描PDF文件</span>
          </nz-empty>
        </div>

        <div *ngIf="scanResult">
          <nz-alert
            nzType="success"
            [nzMessage]="'掃描成功，共 ' + scanResult.pages + ' 頁'"
            nzShowIcon
            style="margin-bottom: 16px;"
          ></nz-alert>

          <div style="margin-bottom: 16px;">
            <button nz-button nzType="default" (click)="convertToTree()">
              <span nz-icon nzType="apartment"></span>
              轉換為樹狀結構
            </button>
            <button nz-button nzType="default" (click)="exportToText()" style="margin-left: 8px;">
              <span nz-icon nzType="download"></span>
              匯出文本
            </button>
          </div>

          <div *ngIf="treeData.length > 0" class="tree-container">
            <nz-tree
              [nzData]="treeData"
              [nzBlockNode]="true"
              [nzShowLine]="true"
              [nzShowIcon]="true"
              [nzExpandedKeys]="expandedKeys"
              (nzExpandChange)="onExpandChange($event)"
              (nzClick)="onNodeClick($event)"
            >
            </nz-tree>
          </div>

          <div *ngIf="!showTreeView" class="text-container">
            <pre>{{ scanResult.text }}</pre>
          </div>
        </div>
      </nz-spin>
    </nz-card>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      }

      .tree-container {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        min-height: 300px;
        padding: 16px;
        margin-top: 16px;
      }

      .text-container {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        min-height: 300px;
        padding: 16px;
        margin-top: 16px;
        max-height: 500px;
        overflow: auto;
      }

      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `
  ]
})
export class TreePdfScanComponent implements OnInit {
  bucketName = '';
  pdfPath = '';
  isProcessing = false;
  scanResult: ScanResult | null = null;
  treeData: TreeNode[] = [];
  expandedKeys: string[] = [];
  showTreeView = false;

  constructor(
    private message: NzMessageService,
    private visionApiService: VisionApiService,
    private treeConverter: TreeConverterService
  ) {}

  ngOnInit(): void {}

  scanPdf(): void {
    if (!this.bucketName || !this.pdfPath) {
      this.message.warning('請輸入GCS桶名和PDF路徑');
      return;
    }

    this.isProcessing = true;
    this.message.info('開始掃描PDF文件...');

    this.visionApiService.scanPdf(this.bucketName, this.pdfPath).subscribe({
      next: response => {
        if (response.success && response.result) {
          this.scanResult = response.result;
          this.message.success(`PDF掃描成功，共 ${this.scanResult.pages} 頁`);
          this.showTreeView = false;
          this.treeData = [];
        } else {
          this.message.error('PDF掃描失敗：' + (response.error || '未知錯誤'));
        }
      },
      error: error => {
        console.error('API調用錯誤', error);
        this.message.error('API調用錯誤：' + (error.message || '未知錯誤'));
      },
      complete: () => {
        this.isProcessing = false;
      }
    });
  }

  convertToTree(): void {
    if (!this.scanResult || !this.scanResult.text) {
      this.message.warning('沒有可轉換的文本');
      return;
    }

    try {
      // 將文本按行分割
      const lines = this.scanResult.text.split('\n').filter(line => line.trim() !== '');

      // 使用TreeConverter服務將文本轉換為樹狀結構
      this.treeData = this.treeConverter.convertToTree(lines);
      this.expandedKeys = this.treeConverter.getAllKeys(this.treeData);
      this.showTreeView = true;

      this.message.success(`成功轉換為樹狀結構，生成 ${this.treeData.length} 個根節點`);
    } catch (error) {
      console.error('轉換錯誤', error);
      this.message.error('轉換為樹狀結構時發生錯誤：' + error);
    }
  }

  exportToText(): void {
    if (!this.scanResult || !this.scanResult.text) {
      this.message.warning('沒有可匯出的文本');
      return;
    }

    try {
      // 創建Blob並下載
      const blob = new Blob([this.scanResult.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      // 創建下載連結
      const a = document.createElement('a');
      a.href = url;
      a.download = `pdf_scan_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();

      // 清理
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.message.success('成功匯出文本');
    } catch (error) {
      this.message.error('匯出失敗: ' + error);
    }
  }

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
    if (event.node && event.node.origin && event.node.origin.data) {
      console.log('節點數據:', event.node.origin.data);
    }
  }

  resetData(): void {
    this.scanResult = null;
    this.treeData = [];
    this.expandedKeys = [];
    this.showTreeView = false;
  }
}
