/**
 * PDF 文字提取共用組件
 * 功能：調用 Firebase Functions 提取 PDF 文字
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PDFDocument } from 'pdf-lib';

interface PdfScanResponse {
    status: 'DONE' | 'ERROR';
    extractedText?: string;
    error?: string;
}

export interface TextExtractionRequest {
    file: File;
    pdfDocument: PDFDocument;
    startPage: number;
    endPage: number;
}

export interface TextExtractionResult {
    extractedText: string;
    fileName: string;
    pageRange: string;
}

@Component({
    selector: 'hub-pdf-text-extractor',
    standalone: true,
    imports: [
        CommonModule,
        NzCardModule,
        NzSpinModule,
        NzResultModule,
        NzButtonModule,
        NzIconModule
    ],
    template: `
    <nz-card nzSize="small" [nzTitle]="title">
      <!-- Processing State -->
      <div *ngIf="isProcessing" class="processing-container">
        <div class="text-center">
          <nz-spin nzSize="large" [nzTip]="processingTip">
            <div class="processing-content">
              <span nz-icon nzType="file-text" nzTheme="outline" class="processing-icon"></span>
              <p>正在處理您的 PDF 文件...</p>
              <p class="processing-detail">{{ processingTip }}</p>
            </div>
          </nz-spin>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage && !isProcessing" class="error-container">
        <nz-result nzStatus="error" nzTitle="處理失敗" [nzSubTitle]="errorMessage">
          <div nz-result-extra>
            <button nz-button nzType="primary" (click)="retry()">
              <span nz-icon nzType="reload"></span>
              重試
            </button>
          </div>
        </nz-result>
      </div>

      <!-- Ready State -->
      <div *ngIf="!isProcessing && !errorMessage && !extractedText" class="ready-container">
        <div class="text-center">
          <p>準備提取 PDF 文字內容</p>
          <button 
            nz-button 
            nzType="primary" 
            [disabled]="!canExtract"
            (click)="startExtraction()">
            <span nz-icon nzType="play-circle"></span>
            開始提取
          </button>
        </div>
      </div>
    </nz-card>
  `,
    styles: [`
    .processing-container,
    .error-container,
    .ready-container {
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .text-center {
      text-align: center;
    }
  `]
})
export class PdfTextExtractorComponent {
    private functions = inject(Functions);
    private storage = inject(Storage);
    private message = inject(NzMessageService);

    @Input() title = 'PDF 文字提取';
    @Input() canExtract = false;

    @Output() extractionStarted = new EventEmitter<void>();
    @Output() extractionCompleted = new EventEmitter<TextExtractionResult>();
    @Output() extractionError = new EventEmitter<string>();

    isProcessing = false;
    processingTip = '準備開始...';
    errorMessage = '';
    extractedText = '';

    private currentRequest: TextExtractionRequest | null = null;

    public setExtractionRequest(request: TextExtractionRequest): void {
        this.currentRequest = request;
        this.canExtract = true;
        this.errorMessage = '';
        this.extractedText = '';
    }

    public startExtraction(): void {
        if (!this.currentRequest) {
            this.errorMessage = '沒有可處理的文件';
            return;
        }

        this.isProcessing = true;
        this.errorMessage = '';
        this.extractionStarted.emit();
        this.performExtraction();
    }

    private async performExtraction(): Promise<void> {
        if (!this.currentRequest) return;

        const { file, pdfDocument, startPage, endPage } = this.currentRequest;

        try {
            // 1. 裁切PDF頁面
            this.processingTip = '正在裁切PDF頁面...';
            const croppedPdfBytes = await this.cropPdfPages(pdfDocument, startPage, endPage);

            // 2. 上傳裁切後的PDF
            this.processingTip = '正在上傳裁切後的PDF...';
            const timestamp = Date.now();
            const pdfFileName = `pdf-uploads/${timestamp}_pages-${startPage}-${endPage}.pdf`;
            const storageRef = ref(this.storage, pdfFileName);
            const blob = new Blob([croppedPdfBytes], { type: 'application/pdf' });

            await uploadBytes(storageRef, blob);

            // 3. 調用Cloud Function
            this.processingTip = '正在提取文字內容...';
            const gcsUri = `gs://${storageRef.bucket}/${storageRef.fullPath}`;
            const extractPdfText = httpsCallable<{ gcsUri: string }, PdfScanResponse>(this.functions, 'extractPdfText');

            const result = await extractPdfText({ gcsUri });

            if (result.data.status === 'DONE' && result.data.extractedText) {
                this.extractedText = result.data.extractedText;

                // 4. 保存提取的文字到Storage
                this.processingTip = '正在保存文字內容...';
                const textFileName = `pdf-uploads/${timestamp}_pages-${startPage}-${endPage}.txt`;
                const textStorageRef = ref(this.storage, textFileName);
                const textBlob = new Blob([this.extractedText], { type: 'text/plain;charset=utf-8' });

                await uploadBytes(textStorageRef, textBlob);

                this.message.success(`成功提取並保存第 ${startPage} 至 ${endPage} 頁文字內容！`);

                this.extractionCompleted.emit({
                    extractedText: this.extractedText,
                    fileName: file.name,
                    pageRange: `${startPage}-${endPage}`
                });
            } else if (result.data.status === 'ERROR') {
                throw new Error(result.data.error || '提取過程中發生錯誤');
            } else {
                throw new Error('未知的處理狀態');
            }
        } catch (error: any) {
            console.error('PDF text extraction error:', error);
            this.errorMessage = error.message || '處理 PDF 時發生錯誤，請重試。';
            this.message.error(this.errorMessage);
            this.extractionError.emit(this.errorMessage);
        } finally {
            this.isProcessing = false;
        }
    }

    private async cropPdfPages(pdfDocument: PDFDocument, startPage: number, endPage: number): Promise<Uint8Array> {
        const newPdfDoc = await PDFDocument.create();
        const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i - 1);

        const copiedPages = await newPdfDoc.copyPages(pdfDocument, pageIndices);
        copiedPages.forEach((page: any) => newPdfDoc.addPage(page));

        return await newPdfDoc.save();
    }

    public retry(): void {
        this.errorMessage = '';
        this.startExtraction();
    }

    public reset(): void {
        this.isProcessing = false;
        this.processingTip = '準備開始...';
        this.errorMessage = '';
        this.extractedText = '';
        this.currentRequest = null;
        this.canExtract = false;
    }
}