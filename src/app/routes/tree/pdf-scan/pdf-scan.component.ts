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
  selector: 'app-pdf-scan',
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
  templateUrl: './pdf-scan.component.html',
  styleUrls: ['./pdf-scan.component.less']
})
export class PdfScanComponent implements OnInit {
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

  handleUploadChange(_info: NzUploadChangeParam): void {
    // Handle upload change events if needed
  }

  async loadPdfDocument(): Promise<void> {
    if (!this.currentFile) return;

    try {
      const arrayBuffer = await this.currentFile.arrayBuffer();
      this.pdfDocument = await PDFDocument.load(arrayBuffer);
      this.totalPages = this.pdfDocument.getPageCount();
      this.endPage = this.totalPages;
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

  showHelp(): void {
    this.message.info('上傳 PDF 文件後，選擇要提取的頁數範圍，系統將裁切PDF並使用 Google Cloud Vision API 提取文字內容。', {
      nzDuration: 5000
    });
  }
}
