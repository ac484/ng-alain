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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FormsModule } from '@angular/forms';
import { PDFService, CustomerPOItem } from '../../../core/pdf/pdf.service';
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

        <div *ngIf="showCustomerPOView && customerPOItems.length > 0" style="margin-top: 8px;">
          <nz-alert nzType="success" [nzMessage]="'成功提取 ' + customerPOItems.length + ' 個 Customer PO 項目'" nzShowIcon> </nz-alert>
          <div style="margin-top: 8px;">
            <button nz-button nzType="default" (click)="exportToJson()">
              <span nz-icon nzType="download"></span>
              匯出 JSON
            </button>
          </div>
        </div>
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
  customerPOItems: CustomerPOItem[] = [];
  showCustomerPOView = false;

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
        // 檢查是否有Customer PO項目
        if (result.customerPOItems && result.customerPOItems.length > 0) {
          this.customerPOItems = result.customerPOItems;
          this.treeData = this.treeConverter.convertCustomerPOToTree(result.customerPOItems);
          this.showCustomerPOView = true;

          // 顯示更詳細的提取結果信息
          const contentCount = result.customerPOItems.filter(item => item.content).length;
          this.message.success(
            `PDF 解析成功，共 ${result.pageCount} 頁，找到 ${result.customerPOItems.length} 個 Customer PO 項目，` +
              `其中 ${contentCount} 個有內容`
          );

          // 如果有些項目沒有內容，顯示警告
          if (contentCount < result.customerPOItems.length) {
            this.message.warning(`有 ${result.customerPOItems.length - contentCount} 個 Customer PO 項目沒有提取到內容`);
          }
        } else {
          // 如果沒有Customer PO，使用原有的文字行轉換
          this.treeData = this.treeConverter.convertToTree(result.data);
          this.showCustomerPOView = false;
          this.message.success(`PDF 解析成功，共 ${result.pageCount} 頁，生成 ${this.treeData.length} 個節點`);
        }

        this.expandedKeys = this.treeConverter.getAllKeys(this.treeData);
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
    if (event.node && event.node.origin && event.node.origin.data) {
      console.log('節點數據:', event.node.origin.data);
    }
  }

  resetData(): void {
    this.treeData = [];
    this.expandedKeys = [];
    this.customerPOItems = [];
    this.showCustomerPOView = false;
  }

  /**
   * 匯出Customer PO項目為JSON檔案
   */
  exportToJson(): void {
    if (!this.customerPOItems || this.customerPOItems.length === 0) {
      this.message.warning('沒有可匯出的Customer PO項目');
      return;
    }

    try {
      // 格式化數據以便更好地顯示
      const exportData = this.customerPOItems.map((item, index) => {
        // 提取識別碼（如果存在）
        let identifier = '';
        const identifierMatch = item.customerPO.match(/^([A-Z0-9]+)\(/);
        if (identifierMatch) {
          identifier = identifierMatch[1];
        }

        return {
          id: index + 1,
          identifier: identifier || undefined,
          customerPO: item.customerPO,
          content: item.content || '',
          costRef: item.costRef || undefined
        };
      });

      // 創建Blob並下載
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // 創建下載連結
      const a = document.createElement('a');
      a.href = url;
      a.download = `customer_po_items_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();

      // 清理
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.message.success('成功匯出Customer PO項目');
    } catch (error) {
      this.message.error('匯出失敗: ' + error);
    }
  }
}
