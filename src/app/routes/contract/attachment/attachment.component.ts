/**
 * 合約附件管理元件
 *
 * 功能：
 * - 合約附件的上傳、下載、刪除、預覽
 * - 支援多種檔案格式（PDF、Word、Excel、圖片）
 * - 整合 Firebase Storage 進行檔案儲存
 * - 提供上傳進度顯示和檔案管理介面
 * - 支援檔案預覽（Google Docs Viewer）
 *
 * 技術：
 * - 使用 @angular/fire/storage 進行檔案操作
 * - 整合 ng-zorro-antd 元件庫
 * - 支援檔案大小限制（10MB）
 *
 * 使用方式：<app-contract-attachment [contractId]="contractId"></app-contract-attachment>
 */
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, getMetadata } from '@angular/fire/storage';
import { Auth, authState } from '@angular/fire/auth';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

interface Attachment {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadTime: Date;
  path: string;
}

@Component({
  selector: 'app-contract-attachment',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    NzListModule,
    NzTagModule,
    NzProgressModule,
    NzSpaceModule,
    NzPopconfirmModule
  ],
  template: `
    <nz-card title="合約附件" [nzExtra]="extraTemplate" [nzLoading]="loading">
      <ng-template #extraTemplate>
        <button nz-button nzSize="small" (click)="loadAttachments()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
      </ng-template>

      <!-- 上傳區域 -->
      <div style="margin-bottom: 16px;">
        <nz-upload
          #upload
          [nzBeforeUpload]="beforeUpload"
          [nzShowUploadList]="false"
          [nzMultiple]="true"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
        >
          <button nz-button nzType="primary">
            <span nz-icon nzType="upload"></span>
            選擇檔案
          </button>
        </nz-upload>
        <span style="color: #999; font-size: 12px; margin-left: 8px;"> 支援 PDF、Word、Excel、圖片格式，單檔最大 10MB </span>
      </div>

      <!-- 上傳進度 -->
      <div *ngIf="uploadingFiles.length > 0" style="margin-bottom: 16px;">
        <div *ngFor="let file of uploadingFiles" style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>{{ file.name }}</span>
            <span>{{ file.progress }}%</span>
          </div>
          <nz-progress [nzPercent]="file.progress" [nzSize]="'small'" [nzShowInfo]="false"></nz-progress>
        </div>
      </div>

      <!-- 附件列表 -->
      <nz-list [nzDataSource]="attachments" [nzRenderItem]="item" [nzItemLayout]="'horizontal'" [nzLoading]="loading">
        <ng-template #item let-attachment>
          <nz-list-item [nzActions]="[viewAction, downloadAction, deleteAction]">
            <nz-list-item-meta>
              <nz-list-item-meta-title>
                <a (click)="viewFile(attachment)">{{ attachment.name }}</a>
              </nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <nz-space>
                  <nz-tag [nzColor]="getFileTypeColor(attachment.type)">
                    {{ getFileTypeDisplay(attachment.type) }}
                  </nz-tag>
                  <span>{{ formatFileSize(attachment.size) }}</span>
                  <span>{{ attachment.uploadTime | date: 'yyyy-MM-dd HH:mm' }}</span>
                </nz-space>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
          </nz-list-item>
        </ng-template>

        <ng-template #viewAction let-attachment>
          <a (click)="viewFile(attachment)">查看</a>
        </ng-template>

        <ng-template #downloadAction let-attachment>
          <a (click)="downloadFile(attachment)">下載</a>
        </ng-template>

        <ng-template #deleteAction let-attachment>
          <a nz-popconfirm nzPopconfirmTitle="確定要刪除此附件嗎？" nzPopconfirmPlacement="top" (nzOnConfirm)="deleteFile(attachment)">
            刪除
          </a>
        </ng-template>
      </nz-list>

      <!-- 空狀態 -->
      <div *ngIf="attachments.length === 0 && !loading" style="text-align: center; padding: 40px;">
        <span nz-icon nzType="file" style="font-size: 48px; color: #d9d9d9;"></span>
        <p style="margin-top: 16px; color: #999;">暫無附件</p>
      </div>
    </nz-card>
  `
})
export class ContractAttachmentComponent implements OnInit {
  @Input() contractId!: string;

  attachments: Attachment[] = [];
  uploadingFiles: Array<{ name: string; progress: number }> = [];
  loading = false;

  constructor(
    private storage: Storage,
    private auth: Auth,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadAttachments();
  }

  beforeUpload = (file: any): boolean => {
    const isValidType = this.isValidFileType(file);
    const isValidSize = file.size / 1024 / 1024 < 10;

    if (!isValidType) {
      this.message.error('不支援的檔案類型');
      return false;
    }

    if (!isValidSize) {
      this.message.error('檔案大小不能超過 10MB');
      return false;
    }

    this.uploadFile(file);
    return false;
  };

  isValidFileType(file: File): boolean {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    return allowedTypes.includes(file.type);
  }

  uploadFile(file: File): void {
    const uploadingFile = { name: file.name, progress: 0 };
    this.uploadingFiles.push(uploadingFile);

    const path = `contracts/${this.contractId}/attachments/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadingFile.progress = Math.round(progress);
      },
      error => {
        console.error('上傳失敗:', error);
        this.message.error(`${file.name} 上傳失敗`);
        this.uploadingFiles = this.uploadingFiles.filter(f => f.name !== file.name);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const attachment: Attachment = {
            name: file.name,
            url: downloadURL,
            size: file.size,
            type: file.type,
            uploadTime: new Date(),
            path: path
          };

          this.attachments.push(attachment);
          this.message.success(`${file.name} 上傳成功`);
        } catch (error) {
          this.message.error(`${file.name} 上傳失敗`);
        } finally {
          setTimeout(() => {
            this.uploadingFiles = this.uploadingFiles.filter(f => f.name !== file.name);
          }, 1000);
        }
      }
    );
  }

  async loadAttachments(): Promise<void> {
    this.loading = true;
    try {
      const path = `contracts/${this.contractId}/attachments`;
      const storageRef = ref(this.storage, path);
      const result = await listAll(storageRef);

      this.attachments = [];
      for (const item of result.items) {
        const [url, metadata] = await Promise.all([getDownloadURL(item), getMetadata(item)]);

        this.attachments.push({
          name: item.name.replace(/^\d+_/, ''),
          url: url,
          size: metadata.size,
          type: metadata.contentType || 'application/octet-stream',
          uploadTime: new Date(metadata.timeCreated),
          path: item.fullPath
        });
      }
    } catch (error) {
      console.error('載入附件失敗:', error);
      this.message.error('載入附件失敗');
    } finally {
      this.loading = false;
    }
  }

  viewFile(attachment: Attachment): void {
    if (attachment.type === 'application/pdf' || attachment.type.includes('document') || attachment.type.includes('spreadsheet')) {
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(attachment.url)}&embedded=true`;
      this.modal.create({
        nzTitle: attachment.name,
        nzContent: `<iframe src="${googleDocsUrl}" style="width: 100%; height: 600px; border: none;"></iframe>`,
        nzWidth: '90%',
        nzFooter: [
          {
            label: '在新視窗開啟',
            onClick: () => window.open(attachment.url, '_blank')
          },
          {
            label: '下載',
            onClick: () => this.downloadFile(attachment)
          }
        ]
      });
    } else if (attachment.type.includes('image/')) {
      this.modal.create({
        nzTitle: attachment.name,
        nzContent: `<img src="${attachment.url}" style="max-width: 100%; height: auto;" />`,
        nzWidth: '80%',
        nzFooter: [
          {
            label: '下載',
            onClick: () => this.downloadFile(attachment)
          }
        ]
      });
    } else {
      this.message.info('此檔案類型不支援預覽，將直接下載');
      this.downloadFile(attachment);
    }
  }

  downloadFile(attachment: Attachment): void {
    fetch(attachment.url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = attachment.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.message.success('檔案下載成功');
      })
      .catch(() => this.message.error('檔案下載失敗'));
  }

  async deleteFile(attachment: Attachment): Promise<void> {
    try {
      // 檢查認證狀態
      const user = this.auth.currentUser;
      if (!user) {
        this.message.error('請先登入');
        return;
      }

      console.log('刪除檔案路徑:', attachment.path);
      console.log('當前用戶:', user.uid);

      const storageRef = ref(this.storage, attachment.path);
      await deleteObject(storageRef);
      this.attachments = this.attachments.filter(a => a.path !== attachment.path);
      this.message.success('附件刪除成功');
    } catch (error: any) {
      console.error('刪除失敗:', error);

      // 根據錯誤類型提供更具體的錯誤訊息
      if (error.code === 'storage/unauthorized') {
        this.message.error('沒有權限刪除此檔案');
      } else if (error.code === 'storage/object-not-found') {
        this.message.error('檔案不存在');
      } else if (error.code === 'storage/unauthenticated') {
        this.message.error('請先登入');
      } else {
        this.message.error(`附件刪除失敗: ${error.message || error}`);
      }
    }
  }

  getFileTypeColor(type: string): string {
    const typeMap: { [key: string]: string } = {
      'application/pdf': 'red',
      'application/msword': 'blue',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'blue',
      'application/vnd.ms-excel': 'green',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'green',
      'image/jpeg': 'orange',
      'image/jpg': 'orange',
      'image/png': 'purple',
      'image/gif': 'cyan'
    };
    return typeMap[type] || 'default';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileTypeDisplay(type: string): string {
    const typeMap: { [key: string]: string } = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'application/vnd.ms-excel': 'XLS',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
      'image/jpeg': 'JPG',
      'image/jpg': 'JPG',
      'image/png': 'PNG',
      'image/gif': 'GIF'
    };
    return typeMap[type] || 'FILE';
  }
}
