import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject, listAll, getMetadata } from '@angular/fire/storage';
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
    NzSpaceModule
  ],
  template: `
    <nz-card title="合約附件">
      <!-- 上傳區域 -->
      <div style="margin-bottom: 16px;">
        <nz-upload
          #upload
          [nzBeforeUpload]="beforeUpload"
          [nzShowUploadList]="false"
          [nzMultiple]="true"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
        >
          <button nz-button>
            <span nz-icon nzType="upload"></span>
            選擇檔案
          </button>
        </nz-upload>
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
          <a nz-popconfirm nzPopconfirmTitle="確定要刪除這個附件嗎？" (nzOnConfirm)="deleteFile(attachment)"> 刪除 </a>
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
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadAttachments();
  }

  beforeUpload = (file: any): boolean => {
    const isValidType = this.isValidFileType(file);
    const isValidSize = file.size / 1024 / 1024 < 10; // 10MB 限制

    if (!isValidType) {
      this.message.error('不支援的檔案類型');
      return false;
    }

    if (!isValidSize) {
      this.message.error('檔案大小不能超過 10MB');
      return false;
    }

    this.uploadFile(file);
    return false; // 阻止預設上傳行為
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

  async uploadFile(file: File): Promise<void> {
    const uploadingFile = { name: file.name, progress: 0 };
    this.uploadingFiles.push(uploadingFile);

    try {
      const path = `contracts/${this.contractId}/attachments/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, path);

      // 模擬上傳進度
      const progressInterval = setInterval(() => {
        uploadingFile.progress += Math.random() * 20;
        if (uploadingFile.progress >= 90) {
          clearInterval(progressInterval);
        }
      }, 200);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      clearInterval(progressInterval);
      uploadingFile.progress = 100;

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

      // 移除上傳進度
      setTimeout(() => {
        this.uploadingFiles = this.uploadingFiles.filter(f => f.name !== file.name);
      }, 1000);
    } catch (error) {
      this.message.error(`${file.name} 上傳失敗`);
      this.uploadingFiles = this.uploadingFiles.filter(f => f.name !== file.name);
    }
  }

  async loadAttachments(): Promise<void> {
    this.loading = true;
    try {
      const path = `contracts/${this.contractId}/attachments`;
      const storageRef = ref(this.storage, path);
      const result = await listAll(storageRef);

      this.attachments = [];
      for (const item of result.items) {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);

        this.attachments.push({
          name: item.name.replace(/^\d+_/, ''), // 移除時間戳前綴
          url: url,
          size: metadata.size,
          type: metadata.contentType || 'application/octet-stream',
          uploadTime: new Date(metadata.timeCreated),
          path: item.fullPath
        });
      }
    } catch (error) {
      this.message.error('載入附件失敗');
    } finally {
      this.loading = false;
    }
  }

  viewFile(attachment: Attachment): void {
    window.open(attachment.url, '_blank');
  }

  downloadFile(attachment: Attachment): void {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    link.click();
  }

  async deleteFile(attachment: Attachment): Promise<void> {
    try {
      const storageRef = ref(this.storage, attachment.path);
      await deleteObject(storageRef);

      this.attachments = this.attachments.filter(a => a.path !== attachment.path);
      this.message.success('附件刪除成功');
    } catch (error) {
      this.message.error('附件刪除失敗');
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
