/**
 * 樹狀結構 PDF 掃描結果元件
 * 
 * 功能：
 * - 顯示已掃描的 PDF 文件列表
 * - 文件預覽和下載
 * - 文件管理（刪除）
 * - 跳轉到掃描功能
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage, ref, listAll, getMetadata, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

interface ScanResult {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'txt';
  createdAt: Date;
  fileSize: number;
  url: string;
  status: 'completed' | 'processing' | 'failed';
}

@Component({
  selector: 'hub-tree-scan-result',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzResultModule,
    NzTagModule,
    NzListModule,
    NzEmptyModule,
    NzSpinModule,
    NzPopconfirmModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-card title="PDF 掃描結果" subtitle="管理已掃描的 PDF 文件">
      <div class="actions-bar">
        <button nz-button nzType="primary" (click)="goToScan()">
          <span nz-icon nzType="plus"></span>
          新增掃描
        </button>
        <button nz-button (click)="refresh()" [nzLoading]="isLoading()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
      </div>

      <div *ngIf="isLoading()" class="loading-container">
        <nz-spin nzTip="載入掃描結果中..."></nz-spin>
      </div>

      <div *ngIf="hasError()" class="error-container">
        <nz-result
          nzStatus="error"
          nzTitle="載入失敗"
          [nzSubTitle]="error()">
          <div nz-result-extra>
            <button nz-button nzType="primary" (click)="refresh()">重試</button>
          </div>
        </nz-result>
      </div>

      <div *ngIf="!isLoading() && !hasError()">
        <nz-empty 
          *ngIf="scanResults().length === 0"
          nzNotFoundImage="simple"
          nzNotFoundContent="尚無掃描結果">
          <div nz-empty-footer>
            <button nz-button nzType="primary" (click)="goToScan()">
              開始掃描 PDF
            </button>
          </div>
        </nz-empty>

        <nz-list 
          *ngIf="scanResults().length > 0"
          [nzDataSource]="scanResults()"
          [nzRenderItem]="item"
          [nzItemLayout]="'horizontal'">
          
          <ng-template #item let-result>
            <nz-list-item [nzActions]="[actionPreview, actionDownload, actionDelete]">
              <nz-list-item-meta>
                <nz-list-item-meta-avatar>
                  <span nz-icon 
                        [nzType]="result.fileType === 'pdf' ? 'file-pdf' : 'file-text'"
                        [nzTheme]="'twotone'">
                  </span>
                </nz-list-item-meta-avatar>
                
                <nz-list-item-meta-title>
                  <span class="file-name">{{ result.fileName }}</span>
                  <nz-tag 
                    [nzColor]="getStatusColor(result.status)"
                    style="margin-left: 8px;">
                    {{ getStatusText(result.status) }}
                  </nz-tag>
                </nz-list-item-meta-title>
                
                <nz-list-item-meta-description>
                  <div class="file-info">
                    <span>大小：{{ formatFileSize(result.fileSize) }}</span>
                    <span class="separator">•</span>
                    <span>類型：{{ result.fileType.toUpperCase() }}</span>
                    <span class="separator">•</span>
                    <span>時間：{{ formatDate(result.createdAt) }}</span>
                  </div>
                </nz-list-item-meta-description>
              </nz-list-item-meta>

              <ng-template #actionPreview>
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  [disabled]="result.status !== 'completed'"
                  (click)="previewFile(result)">
                  <span nz-icon nzType="eye"></span>
                  預覽
                </button>
              </ng-template>

              <ng-template #actionDownload>
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  [disabled]="result.status !== 'completed'"
                  (click)="downloadFile(result)">
                  <span nz-icon nzType="download"></span>
                  下載
                </button>
              </ng-template>

              <ng-template #actionDelete>
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  nzDanger
                  nz-popconfirm
                  nzPopconfirmTitle="確定要刪除這個文件嗎？"
                  nzPopconfirmPlacement="topRight"
                  (nzOnConfirm)="deleteFile(result)">
                  <span nz-icon nzType="delete"></span>
                  刪除
                </button>
              </ng-template>
            </nz-list-item>
          </ng-template>
        </nz-list>
      </div>
    </nz-card>
  `,
  styles: [`
    .actions-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .error-container {
      margin: 32px 0;
    }

    .file-name {
      font-weight: 500;
      color: #262626;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #8c8c8c;
      font-size: 12px;
    }

    .separator {
      color: #d9d9d9;
    }

    :host ::ng-deep .ant-list-item-meta-avatar {
      font-size: 24px;
    }

    :host ::ng-deep .ant-list-item-action {
      margin-left: 8px;
    }
  `]
})
export class TreeScanResultComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly storage = inject(Storage);

  protected readonly isLoading = signal(true);
  protected readonly error = signal('');
  protected readonly scanResults = signal<ScanResult[]>([]);
  protected readonly hasError = computed(() => this.error() !== '');

  ngOnInit(): void {
    this.loadScanResults();
  }

  private async loadScanResults(): Promise<void> {
    this.isLoading.set(true);
    this.error.set('');

    try {
      const storageRef = ref(this.storage, 'pdf-uploads');
      const result = await listAll(storageRef);
      const results: ScanResult[] = [];

      for (const itemRef of result.items) {
        const metadata = await getMetadata(itemRef);
        const downloadUrl = await getDownloadURL(itemRef);
        const fileName = metadata.name;
        const fileType: 'pdf' | 'txt' = fileName.endsWith('.pdf') ? 'pdf' : 'txt';
        const match = fileName.match(/(\d+)_pages-(\d+)-(\d+)\.(pdf|txt)$/);
        const createdAt = match ? new Date(parseInt(match[1])) : new Date();

        results.push({
          id: fileName,
          fileName,
          fileType,
          createdAt,
          fileSize: metadata.size,
          url: downloadUrl,
          status: 'completed'
        });
      }

      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.scanResults.set(results);
    } catch (error: any) {
      console.error('Error loading scan results:', error);
      this.error.set('載入掃描結果失敗');
      this.scanResults.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  public formatDate(date: Date): string {
    return new Date(date).toLocaleString('zh-TW');
  }

  public getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'green';
      case 'processing': return 'blue';
      case 'failed': return 'red';
      default: return 'default';
    }
  }

  public getStatusText(status: string): string {
    switch (status) {
      case 'completed': return '已完成';
      case 'processing': return '處理中';
      case 'failed': return '失敗';
      default: return '未知';
    }
  }

  public downloadFile(result: ScanResult): void {
    const link = document.createElement('a');
    link.href = result.url;
    link.download = result.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.message.success(`${result.fileType.toUpperCase()} 文件已下載`);
  }

  public deleteFile(result: ScanResult): void {
    const fileRef = ref(this.storage, `pdf-uploads/${result.fileName}`);
    deleteObject(fileRef)
      .then(() => {
        this.message.success('檔案已刪除');
        this.loadScanResults();
      })
      .catch(error => {
        console.error('刪除檔案失敗:', error);
        this.message.error('刪除檔案失敗');
      });
  }

  public previewFile(result: ScanResult): void {
    if (result.fileType === 'pdf') {
      const encodedUrl = encodeURIComponent(result.url);
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;

      // 使用路由導航到內嵌檢視器
      this.router.navigate(['/hub/tree/document-viewer'], {
        queryParams: {
          url: googleDocsUrl,
          fileName: result.fileName
        }
      });
    } else {
      window.open(result.url, '_blank');
    }
  }

  public goToScan(): void {
    this.router.navigate(['/hub/tree/pdf-scan']);
  }

  public refresh(): void {
    this.loadScanResults();
  }
}