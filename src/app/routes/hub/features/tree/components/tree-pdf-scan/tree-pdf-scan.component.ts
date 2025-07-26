/**
 * 樹狀結構 PDF 掃描元件
 * 使用共用組件重構，分為：上傳、頁面選擇、文字提取
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PdfUploadComponent, PdfUploadResult } from '../../../shared/components/pdf-upload';
import { PdfPageRangeComponent, PageRange } from '../../../shared/components/pdf-page-range';
import { PdfTextExtractorComponent, TextExtractionRequest, TextExtractionResult } from '../../../shared/components/pdf-text-extractor';

interface PdfScanResponse {
  status: 'DONE' | 'ERROR';
  extractedText?: string;
  error?: string;
}

@Component({
  selector: 'hub-tree-pdf-scan',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTypographyModule,
    PdfUploadComponent,
    PdfPageRangeComponent,
    PdfTextExtractorComponent
  ],
  template: `
    <nz-card nzTitle="PDF 文字提取">
      <div class="pdf-scan-container">
        <!-- 1. PDF 上傳組件 -->
        <hub-pdf-upload
          #pdfUpload
          title="上傳 PDF 文件"
          hint="支援單個 PDF 文件上傳，文件將使用 Google Cloud Vision API 進行文字提取"
          (pdfLoaded)="onPdfLoaded($event)"
          (uploadError)="onUploadError($event)">
        </hub-pdf-upload>

        <!-- 2. 頁面範圍選擇組件 -->
        <div *ngIf="pdfUploadResult && !isExtracting" class="page-range-section">
          <hub-pdf-page-range
            #pageRange
            [totalPages]="pdfUploadResult.totalPages"
            (rangeConfirmed)="onPageRangeConfirmed($event)">
          </hub-pdf-page-range>
        </div>

        <!-- 3. 文字提取組件 -->
        <div *ngIf="extractionRequest" class="text-extractor-section">
          <hub-pdf-text-extractor
            #textExtractor
            (extractionCompleted)="onExtractionCompleted($event)"
            (extractionError)="onExtractionError($event)">
          </hub-pdf-text-extractor>
        </div>

        <!-- 4. 結果顯示 -->
        <div *ngIf="extractedText" class="results-section">
          <nz-card nzSize="small" nzTitle="提取結果">
            <div class="extracted-text-container">
              <nz-typography>
                <pre nz-typography nzCopyable [nzContent]="extractedText" class="extracted-text">{{ extractedText }}</pre>
              </nz-typography>
            </div>
            <nz-divider></nz-divider>
            <div class="result-actions">
              <button nz-button nzType="primary" (click)="downloadText()">
                <span nz-icon nzType="download"></span>
                下載文字
              </button>
              <button nz-button (click)="reset()" class="ml-2">
                <span nz-icon nzType="reload"></span>
                重新開始
              </button>
            </div>
          </nz-card>
        </div>
      </div>
    </nz-card>
  `,
  styles: [`
    .pdf-scan-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .page-range-section,
    .processing-section,
    .results-section,
    .error-section {
      margin-top: 16px;
    }

    .pdf-info {
      margin-bottom: 16px;
      color: #666;
    }

    .page-range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .page-range-separator {
      color: #666;
      font-size: 14px;
    }

    .page-range-info {
      margin: 16px 0;
      color: #666;
      font-size: 14px;
    }

    .extract-actions {
      text-align: center;
      margin-top: 16px;
    }

    .extract-actions button {
      margin: 0 4px;
    }

    .processing-content {
      padding: 20px;
      text-align: center;
    }

    .processing-icon {
      font-size: 48px;
      color: #1890ff;
      display: block;
      margin-bottom: 16px;
    }

    .processing-detail {
      color: #666;
      font-size: 14px;
      margin-top: 8px;
    }

    .extracted-text-container {
      max-height: 400px;
      overflow-y: auto;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding: 12px;
      background-color: #fafafa;
    }

    .extracted-text {
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
      color: #333;
    }

    .result-actions {
      text-align: center;
    }

    .ml-2 {
      margin-left: 8px;
    }

    .text-center {
      text-align: center;
    }

    :host ::ng-deep .ant-upload.ant-upload-drag {
      background-color: #fafafa;
      border: 2px dashed #d9d9d9;
      transition: all 0.3s;
    }

    :host ::ng-deep .ant-upload.ant-upload-drag:hover {
      border-color: #40a9ff;
      background-color: #f0f8ff;
    }

    :host ::ng-deep .ant-upload.ant-upload-drag .ant-upload-drag-icon {
      color: #1890ff;
    }
  `]
})
export class TreePdfScanComponent implements OnInit {
  @ViewChild('pdfUpload') pdfUpload!: PdfUploadComponent;
  @ViewChild('pageRange') pageRange!: PdfPageRangeComponent;
  @ViewChild('textExtractor') textExtractor!: PdfTextExtractorComponent;

  // 狀態管理
  pdfUploadResult: PdfUploadResult | null = null;
  extractionRequest: TextExtractionRequest | null = null;
  extractedText = '';
  isExtracting = false;

  ngOnInit(): void {
    // Component initialization
  }

  // 處理 PDF 上傳完成事件
  onPdfLoaded(result: PdfUploadResult): void {
    console.log('PDF loaded:', result);
    this.pdfUploadResult = result;
    this.extractionRequest = null;
    this.extractedText = '';
  }

  // 處理 PDF 上傳錯誤事件
  onUploadError(error: string): void {
    console.error('Upload error:', error);
    this.pdfUploadResult = null;
    this.extractionRequest = null;
    this.extractedText = '';
  }

  // 處理頁面範圍確認事件
  onPageRangeConfirmed(range: PageRange): void {
    console.log('Page range confirmed:', range);

    if (!this.pdfUploadResult) {
      console.error('No PDF upload result available');
      return;
    }

    // 創建文字提取請求
    this.extractionRequest = {
      file: this.pdfUploadResult.file,
      pdfDocument: this.pdfUploadResult.pdfDocument,
      startPage: range.startPage,
      endPage: range.endPage
    };

    // 設置提取器並開始提取
    if (this.textExtractor) {
      this.textExtractor.setExtractionRequest(this.extractionRequest);
      this.isExtracting = true;
      // 自動開始提取
      setTimeout(() => {
        this.textExtractor.startExtraction();
      }, 100);
    }
  }

  // 處理文字提取完成事件
  onExtractionCompleted(result: TextExtractionResult): void {
    console.log('Extraction completed:', result);
    this.extractedText = result.extractedText;
    this.isExtracting = false;
  }

  // 處理文字提取錯誤事件
  onExtractionError(error: string): void {
    console.error('Extraction error:', error);
    this.isExtracting = false;
  }

  downloadText(): void {
    if (!this.extractedText) return;

    const blob = new Blob([this.extractedText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted-text-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    this.message.success('文字文件已下載');
  }

  reset(): void {
    this.fileList = [];
    this.currentFile = null;
    this.pdfDocument = null;
    this.isProcessing = false;
    this.extractedText = '';
    this.errorMessage = '';
    this.processingTip = '正在上傳文件...';
    this.totalPages = 0;
    this.startPage = 1;
    this.endPage = 1;
  }
}