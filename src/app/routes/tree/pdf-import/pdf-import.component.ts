import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FormsModule } from '@angular/forms';
import { PDFService } from '../../../core/pdf/pdf.service';
import { TreeConverterService, TreeNode } from '../../../core/tree/tree-converter.service';

@Component({
  selector: 'app-tree-pdf-import',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzAlertModule,
    NzSpinModule,
    NzEmptyModule,
    FormsModule
  ],
  template: `
    <nz-card title="PDF 匯入功能">
      <div style="margin-bottom: 16px;">
        <button nz-button nzType="primary" (click)="showUploadModal()">
          <span nz-icon nzType="upload"></span>
          選擇 PDF 檔案
        </button>
      </div>

      <nz-spin [nzSpinning]="isProcessing">
        <div class="tree-container">
          <div *ngIf="treeData.length === 0" class="empty-state">
            <nz-empty nzNotFoundImage="simple">
              <span>尚未匯入 PDF 檔案</span>
            </nz-empty>
          </div>

          <nz-tree
            *ngIf="treeData.length > 0"
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
          <nz-alert nzType="info" nzMessage="支援中英文 PDF 檔案，自動提取文字並轉換為樹狀結構" style="margin-bottom: 16px;"></nz-alert>

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
                <p><strong>檔名：</strong>{{ getFileInfo(selectedFile).name }}</p>
                <p><strong>大小：</strong>{{ getFileInfo(selectedFile).size }}</p>
              </div>
            </nz-form-control>
          </nz-form-item>
        </div>
      </nz-modal>
    </nz-card>
  `,
  styles: [
    `
      .tree-container {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        min-height: 300px;
        padding: 16px;
      }

      .empty-state {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
    `
  ]
})
export class TreePdfImportComponent {
  treeData: TreeNode[] = [];
  expandedKeys: string[] = [];
  isUploadModalVisible = false;
  isProcessing = false;
  selectedFile: File | null = null;

  constructor(
    private message: NzMessageService,
    private pdfService: PDFService,
    private treeConverter: TreeConverterService
  ) {}

  showUploadModal(): void {
    this.isUploadModalVisible = true;
    this.selectedFile = null;
  }

  cancelUpload(): void {
    this.isUploadModalVisible = false;
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.pdfService.isValidPDF(file)) {
      this.selectedFile = file;
    } else {
      this.message.error('請選擇有效的 PDF 檔案');
    }
  }

  getFileInfo(file: File) {
    return this.pdfService.getFileInfo(file);
  }

  async confirmUpload(): Promise<void> {
    if (!this.selectedFile) {
      this.message.warning('請選擇 PDF 檔案');
      return;
    }

    this.isProcessing = true;
    this.message.info('開始解析 PDF 檔案...');

    try {
      const result = await this.pdfService.parsePDF(this.selectedFile);
      if (result.success && result.data) {
        this.treeData = this.treeConverter.convertToTree(result.data);
        this.expandedKeys = this.treeConverter.getAllKeys(this.treeData);
        this.message.success(`PDF 解析成功，共 ${result.pageCount} 頁，生成 ${this.treeData.length} 個節點`);
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

  onExpandChange(event: any): void {
    this.expandedKeys = event.keys;
  }

  onNodeClick(event: any): void {
    console.log('節點點擊:', event);
  }
}
