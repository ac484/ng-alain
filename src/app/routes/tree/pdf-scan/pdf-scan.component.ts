import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { OcrService, OcrResult } from '../../../core/services/ocr.service';

@Component({
  selector: 'app-tree-pdf-scan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzDividerModule,
    NzTypographyModule,
    NzTagModule,
    NzStatisticModule,
    NzGridModule,
    NzSwitchModule,
    NzAlertModule,
    NzCheckboxModule
  ],
  template: `
    <div class="pdf-scan-container">
      <nz-card nzTitle="PDF OCR 文字掃描" [nzExtra]="extraTemplate">
        <div nz-row [nzGutter]="24">
          <!-- 上傳區域 -->
          <div nz-col nzSpan="12">
            <nz-card nzSize="small" nzTitle="文件上傳">
              <nz-upload
                nzType="drag"
                [nzMultiple]="false"
                [nzAccept]="'.pdf,.tiff,.tif,.jpg,.jpeg,.png,.gif'"
                [nzBeforeUpload]="beforeUpload"
                [nzFileList]="fileList"
                (nzChange)="handleChange($event)"
              >
                <p class="ant-upload-drag-icon">
                  <i nz-icon nzType="inbox"></i>
                </p>
                <p class="ant-upload-text">點擊或拖拽文件到此區域上傳</p>
                <p class="ant-upload-hint">
                  支援 PDF、TIFF、JPG、PNG 等格式<br />
                  單個文件大小不超過 20MB
                </p>
              </nz-upload>

              <nz-divider></nz-divider>

              <!-- 處理選項 -->
              <form nz-form [formGroup]="optionsForm">
                <nz-form-item>
                  <nz-form-label>處理模式</nz-form-label>
                  <nz-form-control>
                    <label nz-checkbox formControlName="saveResult">保存結果到 Storage</label>
                  </nz-form-control>
                </nz-form-item>

                <nz-form-item>
                  <nz-form-label>PDF 處理</nz-form-label>
                  <nz-form-control>
                    <nz-switch formControlName="pdfFirstPageOnly" nzCheckedChildren="僅第一頁" nzUnCheckedChildren="完整文檔"> </nz-switch>
                  </nz-form-control>
                </nz-form-item>
              </form>

              <nz-divider></nz-divider>

              <button
                nz-button
                nzType="primary"
                nzSize="large"
                [nzLoading]="loading"
                [disabled]="!selectedFile"
                (click)="startOcr()"
                nzBlock
              >
                <i nz-icon nzType="scan"></i>
                開始 OCR 掃描
              </button>
            </nz-card>
          </div>

          <!-- 結果區域 -->
          <div nz-col nzSpan="12">
            <nz-card nzSize="small" nzTitle="掃描結果">
              <div *ngIf="loading" class="loading-container">
                <nz-spin nzSize="large">
                  <div class="loading-text">正在處理文件，請稍候...</div>
                </nz-spin>
              </div>

              <div *ngIf="!loading && ocrResult">
                <!-- 統計信息 -->
                <div nz-row [nzGutter]="16" class="stats-row">
                  <div nz-col nzSpan="8">
                    <nz-statistic nzTitle="文字長度" [nzValue]="ocrResult.text.length" nzSuffix="字符"> </nz-statistic>
                  </div>
                  <div nz-col nzSpan="8" *ngIf="ocrResult.pages">
                    <nz-statistic nzTitle="頁數" [nzValue]="ocrResult.pages" nzSuffix="頁"> </nz-statistic>
                  </div>
                  <div nz-col nzSpan="8" *ngIf="ocrResult.confidence">
                    <nz-statistic nzTitle="信心度" [nzValue]="(ocrResult.confidence * 100).toFixed(1)" nzSuffix="%"> </nz-statistic>
                  </div>
                </div>

                <nz-divider></nz-divider>

                <!-- 結果標籤 -->
                <div class="result-tags">
                  <nz-tag nzColor="success" *ngIf="ocrResult.resultPath">
                    <i nz-icon nzType="save"></i>
                    已保存到 Storage
                  </nz-tag>
                  <nz-tag nzColor="processing" *ngIf="ocrResult.pages && ocrResult.pages > 1">
                    <i nz-icon nzType="file-pdf"></i>
                    多頁文檔
                  </nz-tag>
                </div>

                <nz-divider></nz-divider>

                <!-- 文字內容 -->
                <div class="text-result">
                  <h4>提取的文字內容：</h4>
                  <div class="text-content" [innerHTML]="formatText(ocrResult.text)"></div>
                </div>

                <!-- 操作按鈕 -->
                <div class="action-buttons">
                  <button nz-button nzType="default" (click)="copyText()">
                    <i nz-icon nzType="copy"></i>
                    複製文字
                  </button>
                  <button nz-button nzType="default" (click)="downloadText()">
                    <i nz-icon nzType="download"></i>
                    下載文字
                  </button>
                  <button nz-button nzType="default" (click)="clearResult()">
                    <i nz-icon nzType="clear"></i>
                    清除結果
                  </button>
                </div>
              </div>

              <nz-alert *ngIf="!loading && !ocrResult" nzType="info" nzMessage="請上傳文件並開始 OCR 掃描" nzShowIcon> </nz-alert>
            </nz-card>
          </div>
        </div>
      </nz-card>
    </div>

    <ng-template #extraTemplate>
      <nz-tag nzColor="blue">
        <i nz-icon nzType="cloud"></i>
        Firebase Functions
      </nz-tag>
    </ng-template>
  `,
  styles: [
    `
      .pdf-scan-container {
        padding: 24px;
      }

      .loading-container {
        text-align: center;
        padding: 50px 0;
      }

      .loading-text {
        margin-top: 16px;
        color: #666;
      }

      .stats-row {
        margin-bottom: 16px;
      }

      .result-tags {
        margin-bottom: 16px;
      }

      .result-tags nz-tag {
        margin-right: 8px;
      }

      .text-result {
        margin-bottom: 24px;
      }

      .text-content {
        background: #f5f5f5;
        padding: 16px;
        border-radius: 6px;
        max-height: 300px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
      }

      .action-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .action-buttons button {
        flex: 1;
        min-width: 120px;
      }

      :host ::ng-deep .ant-upload.ant-upload-drag {
        background: #fafafa;
      }

      :host ::ng-deep .ant-upload-drag-icon i {
        font-size: 48px;
        color: #1890ff;
      }
    `
  ]
})
export class TreePdfScanComponent implements OnInit {
  private readonly ocrService = inject(OcrService);
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);

  // 表單和狀態
  optionsForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  selectedFile: File | null = null;
  loading = false;
  ocrResult: OcrResult | null = null;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.optionsForm = this.fb.group({
      saveResult: [false],
      pdfFirstPageOnly: [false]
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const fileObj = file as any as File;

    // 檢查文件類型
    if (!this.ocrService.isSupportedFileType(fileObj)) {
      this.message.error('請上傳 PDF、TIFF 或圖片文件！');
      return false;
    }

    // 檢查文件大小 (20MB)
    if (!this.ocrService.isValidFileSize(fileObj, 20)) {
      this.message.error('文件大小不能超過 20MB！');
      return false;
    }

    this.selectedFile = fileObj;
    this.fileList = [file];

    return false; // 阻止自動上傳
  };

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'removed') {
      this.selectedFile = null;
      this.fileList = [];
      this.clearResult();
    }
  }

  async startOcr(): Promise<void> {
    if (!this.selectedFile) {
      this.message.warning('請先選擇文件！');
      return;
    }

    this.loading = true;
    this.ocrResult = null;

    try {
      // 將文件轉換為 ArrayBuffer 並處理
      const arrayBuffer = await this.ocrService.fileToArrayBuffer(this.selectedFile);

      // 使用 OCR 服務處理
      this.ocrService.extractFromBuffer(arrayBuffer).subscribe({
        next: result => {
          this.ocrResult = result;
          this.message.success('OCR 處理完成！');
          this.loading = false;
        },
        error: error => {
          console.error('OCR Error:', error);
          this.message.error(`OCR 處理失敗: ${error.message}`);
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('File processing error:', error);
      this.message.error('文件處理失敗！');
      this.loading = false;
    }
  }

  formatText(text: string): string {
    return this.ocrService.formatText(text);
  }

  async copyText(): Promise<void> {
    if (!this.ocrResult?.text) return;

    const success = await this.ocrService.copyToClipboard(this.ocrResult.text);
    if (success) {
      this.message.success('文字已複製到剪貼板！');
    } else {
      this.message.error('複製失敗！');
    }
  }

  downloadText(): void {
    if (!this.ocrResult?.text) return;

    this.ocrService.downloadTextFile(this.ocrResult.text);
    this.message.success('文字文件已下載！');
  }

  clearResult(): void {
    this.ocrResult = null;
    this.message.info('結果已清除');
  }
}
