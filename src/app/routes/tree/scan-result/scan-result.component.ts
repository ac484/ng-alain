import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Storage, ref, listAll, getMetadata, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ScanResult {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'txt';
  createdAt: Date;
  fileSize: number;
  url: string;
}

@Component({
  selector: 'app-scan-result',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, NzResultModule, NzTagModule, NzListModule, NzEmptyModule],
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanResultComponent implements OnInit {
  private readonly storage = inject(Storage);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);

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
          url: downloadUrl
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
    return new Date(date).toLocaleString();
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
      this.router.navigate(['/tree/document-viewer'], {
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
    this.router.navigate(['/tree/pdf-scan']);
  }

  public refresh(): void {
    this.loadScanResults();
  }
}
