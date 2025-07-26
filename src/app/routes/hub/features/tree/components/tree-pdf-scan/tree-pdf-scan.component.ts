/**
 * 樹狀結構 PDF 掃描元件
 * 基於原始 routes/tree/pdf-scan 實現，先求能上傳
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { PDFDocument } from 'pdf-lib';
import { Observable } from 'rxjs';

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
    FormsModule,
    NzUploadModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzResultModule,
    NzDividerModule,
    NzTypographyModule,
    NzIconModule,
    NzFormModule,
    NzInputNumberModule,
    NzInputModule
  ],
  template: `
    <nz-card nzTitle="PDF 文字提取">
      <div class="pdf-scan-container">
        <!-- Upload Section -->
        <nz-card nzSize="small" nzTitle="上傳 PDF 文件">
          <nz-upload
            nzType="drag"
            [nzMultiple]="false"
            [nzAccept]="'.pdf'"
            [nzBeforeUpload]="beforeUpload"
            (nzChange)="handleUploadChange($event)"
            [nzFileList]="fileList"
          >
            <p class="ant-upload-drag-icon">
              <span nz-icon nzType="inbox"></span>
            </p>
            <p class="ant-upload-text">點擊或拖拽 PDF 文件到此區域上傳</p>
            <p class="ant-upload-hint">支援單個 PDF 文件上傳，文件將使用 Google Cloud Vision API 進行文字提取</p>
          </nz-upload>
        </nz-card>

        <!-- Page Range Selection -->
        <div *ngIf="pdfDocument && !isProcessing" class="page-range-section">
          <nz-card nzSize="small" nzTitle="頁數範圍設定">
            <div class="pdf-info">
              <p>總頁數：{{ totalPages }} 頁</p>
            </div>

            <nz-form-item>
              <nz-form-label>選擇頁數範圍</nz-form-label>
              <nz-form-control>
                <div class="page-range-inputs">
                  <nz-input-number
                    [(ngModel)]="startPage"
                    [nzMin]="1"
                    [nzMax]="totalPages"
                    placeholder="起始頁"
                    style="width: 120px;">
                  </nz-input-number>
                  <span class="page-range-separator">至</span>
                  <nz-input-number
                    [(ngModel)]="endPage"
                    [nzMin]="1"
                    [nzMax]="totalPages"
                    placeholder="結束頁"
                    style="width: 120px;">
                  </nz-input-number>
                </div>
              </nz-form-control>
            </nz-form-item>

            <div class="page-range-info">
              <span *ngIf="startPage && endPage">
                將提取第 {{ startPage }} 至 {{ endPage }} 頁 (共 {{ endPage - startPage + 1 }} 頁)
              </span>
            </div>

            <div class="extract-actions">
              <button nz-button nzType="primary" (click)="extractSelectedPages()"
                      [disabled]="!isValidPageRange()">
                <span nz-icon nzType="file-text"></span>
                提取選中頁面文字
              </button>
              <button nz-button (click)="selectAllPages()">
                <span nz-icon nzType="check-square"></span>
                全選
              </button>
            </div>
          </nz-card>
        </div>

        <!-- Processing Section -->
        <div *ngIf="isProcessing" class="processing-section">
          <nz-card nzSize="small">
            <div class="text-center">
              <nz-spin nzSize="large" [nzTip]="processingTip">
                <div class="processing-content">
                  <span nz-icon nzType="file-text" nzTheme="outline" class="processing-icon"></span>
                  <p>正在處理您的 PDF 文件...</p>
                  <p class="processing-detail">{{ processingTip }}</p>
                </div>
              </nz-spin>
            </div>
          </nz-card>
        </div>

        <!-- Results Section -->
        <div *ngIf="extractedText && !isProcessing" class="results-section">
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

        <!-- Error Section -->
        <div *ngIf="errorMessage && !isProcessing" class="error-section">
          <nz-result nzStatus="error" nzTitle="處理失敗" [nzSubTitle]="errorMessage">
            <div nz-result-extra>
              <button nz-button nzType="primary" (click)="reset()">重試</button>
            </div>
          </nz-result>
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
  private functions = inject(Functions);
  private storage = inject(Storage);
  private message = inject(NzMessageService);

  fileList: NzUploadFile[] = [];
  isProcessing = false;
  processingTip = '正在上傳文件...';
  extractedText = '';
  errorMessage = '';
  currentFile: File | null = null;
  pdfDocument: PDFDocument | null = null;
  totalPages = 0;
  startPage = 1;
  endPage = 1;

  ngOnInit(): void {
    // Component initialization
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean | Observable<boolean> => {
    console.log('beforeUpload called with file:', file);

    if (file.type !== 'application/pdf') {
      this.message.error('只能上傳 PDF 文件！');
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size! > maxSize) {
      this.message.error('文件大小不能超過 10MB！');
      return false;
    }

    this.currentFile = file as any;
    this.fileList = [file];
    this.loadPdfDocument();

    return false; // Prevent default upload
  };

  handleUploadChange(info: NzUploadChangeParam): void {
    console.log('handleUploadChange called with info:', info);
    // Handle upload change events if needed
  }

  async loadPdfDocument(): Promise<void> {
    console.log('loadPdfDocument called with currentFile:', this.currentFile);
    if (!this.currentFile) return;

    try {
      const arrayBuffer = await this.currentFile.arrayBuffer();
      this.pdfDocument = await PDFDocument.load(arrayBuffer);
      this.totalPages = this.pdfDocument.getPageCount();
      this.endPage = this.totalPages;

      console.log('PDF loaded successfully, pages:', this.totalPages);
      this.message.success(`PDF 載入成功，共 ${this.totalPages} 頁`);
    } catch (error) {
      console.error('PDF 載入失敗:', error);
      this.message.error('PDF 檔案載入失敗');
    }
  }

  isValidPageRange(): boolean {
    return this.startPage > 0 && this.endPage > 0 && this.startPage <= this.endPage && this.endPage <= this.totalPages;
  }

  selectAllPages(): void {
    this.startPage = 1;
    this.endPage = this.totalPages;
  }

  async extractSelectedPages(): Promise<void> {
    if (!this.isValidPageRange()) {
      this.message.error('請選擇有效的頁數範圍');
      return;
    }

    if (!this.currentFile || !this.pdfDocument) {
      this.message.error('沒有可處理的PDF檔案');
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.extractedText = '';
    this.processingTip = '正在裁切PDF頁面...';

    try {
      // 1. 裁切PDF頁面
      const croppedPdfBytes = await this.cropPdfPages(this.startPage, this.endPage);

      // 2. 上傳裁切後的PDF
      const timestamp = Date.now();
      const pdfFileName = `pdf-uploads/${timestamp}_pages-${this.startPage}-${this.endPage}.pdf`;
      const storageRef = ref(this.storage, pdfFileName);
      const blob = new Blob([croppedPdfBytes], { type: 'application/pdf' });

      this.processingTip = '正在上傳裁切後的PDF...';
      await uploadBytes(storageRef, blob);

      // 3. 調用Cloud Function
      const gcsUri = `gs://${storageRef.bucket}/${storageRef.fullPath}`;
      const extractPdfText = httpsCallable<{ gcsUri: string }, PdfScanResponse>(this.functions, 'extractPdfText');

      this.processingTip = '正在提取文字內容...';
      const result = await extractPdfText({ gcsUri });

      if (result.data.status === 'DONE' && result.data.extractedText) {
        this.extractedText = result.data.extractedText;

        // 4. 保存提取的文字到Storage
        const textFileName = `pdf-uploads/${timestamp}_pages-${this.startPage}-${this.endPage}.txt`;
        const textStorageRef = ref(this.storage, textFileName);
        const textBlob = new Blob([this.extractedText], { type: 'text/plain;charset=utf-8' });

        this.processingTip = '正在保存文字內容...';
        await uploadBytes(textStorageRef, textBlob);

        this.message.success(`成功提取並保存第 ${this.startPage} 至 ${this.endPage} 頁文字內容！`);
      } else if (result.data.status === 'ERROR') {
        throw new Error(result.data.error || '提取過程中發生錯誤');
      } else {
        throw new Error('未知的處理狀態');
      }
    } catch (error: any) {
      console.error('PDF processing error:', error);
      this.errorMessage = error.message || '處理 PDF 時發生錯誤，請重試。';
      this.message.error(this.errorMessage);
    } finally {
      this.isProcessing = false;
    }
  }

  async cropPdfPages(startPage: number, endPage: number): Promise<Uint8Array> {
    if (!this.pdfDocument) {
      throw new Error('PDF 文件未載入');
    }

    const newPdfDoc = await PDFDocument.create();
    const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i - 1);

    const copiedPages = await newPdfDoc.copyPages(this.pdfDocument, pageIndices);
    copiedPages.forEach((page: any) => newPdfDoc.addPage(page));

    return await newPdfDoc.save();
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