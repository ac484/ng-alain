/**
 * PDF 文件上傳共用組件
 * 功能：上傳 PDF 文件並載入基本信息
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PDFDocument } from 'pdf-lib';
import { Observable } from 'rxjs';

export interface PdfUploadResult {
    file: File;
    pdfDocument: PDFDocument;
    totalPages: number;
}

@Component({
    selector: 'hub-pdf-upload',
    standalone: true,
    imports: [
        CommonModule,
        NzUploadModule,
        NzCardModule,
        NzIconModule
    ],
    template: `
    <nz-card nzSize="small" [nzTitle]="title">
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
        <p class="ant-upload-hint">{{ hint }}</p>
      </nz-upload>
    </nz-card>
  `,
    styles: [`
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
export class PdfUploadComponent {
    private message = inject(NzMessageService);

    @Input() title = '上傳 PDF 文件';
    @Input() hint = '支援單個 PDF 文件上傳，文件大小限制 10MB';
    @Input() maxSize = 10 * 1024 * 1024; // 10MB

    @Output() pdfLoaded = new EventEmitter<PdfUploadResult>();
    @Output() uploadError = new EventEmitter<string>();

    fileList: NzUploadFile[] = [];

    beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean | Observable<boolean> => {
        console.log('PDF Upload - beforeUpload called with file:', file);

        if (file.type !== 'application/pdf') {
            const error = '只能上傳 PDF 文件！';
            this.message.error(error);
            this.uploadError.emit(error);
            return false;
        }

        if (file.size! > this.maxSize) {
            const error = `文件大小不能超過 ${this.formatFileSize(this.maxSize)}！`;
            this.message.error(error);
            this.uploadError.emit(error);
            return false;
        }

        this.fileList = [file];
        this.loadPdfDocument(file as any);

        return false; // Prevent default upload
    };

    handleUploadChange(info: NzUploadChangeParam): void {
        console.log('PDF Upload - handleUploadChange called with info:', info);
    }

    private async loadPdfDocument(file: File): Promise<void> {
        console.log('PDF Upload - loadPdfDocument called with file:', file);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDocument = await PDFDocument.load(arrayBuffer);
            const totalPages = pdfDocument.getPageCount();

            console.log('PDF Upload - PDF loaded successfully, pages:', totalPages);
            this.message.success(`PDF 載入成功，共 ${totalPages} 頁`);

            this.pdfLoaded.emit({
                file,
                pdfDocument,
                totalPages
            });
        } catch (error) {
            console.error('PDF Upload - PDF 載入失敗:', error);
            const errorMsg = 'PDF 檔案載入失敗';
            this.message.error(errorMsg);
            this.uploadError.emit(errorMsg);
        }
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    }

    public reset(): void {
        this.fileList = [];
    }
}