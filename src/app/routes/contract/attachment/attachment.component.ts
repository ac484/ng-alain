/**
 * 合約附件管理元件 - 極簡版本
 * 使用 ng-zorro-antd 原生功能和 Google Docs Viewer
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Attachment {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadTime: Date;
}

@Component({
  selector: 'app-contract-attachment',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzListModule, NzTagModule, NzButtonModule, NzIconModule],
  template: `
    <nz-card title="合約附件">
      <nz-list [nzDataSource]="attachments" [nzSize]="'small'">
        <ng-template #item let-attachment>
          <nz-list-item>
            <div class="attachment-item">
              <div class="attachment-info">
                <div class="attachment-name">{{ attachment.name }}</div>
                <div class="attachment-meta">
                  <nz-tag [nzColor]="getFileTypeColor(attachment.type)">
                    {{ getFileTypeDisplay(attachment.type) }}
                  </nz-tag>
                  <span>{{ formatFileSize(attachment.size) }}</span>
                  <span>{{ attachment.uploadTime | date: 'MM-dd HH:mm' }}</span>
                </div>
              </div>
              <div class="attachment-actions">
                <button nz-button nzType="link" nzSize="small" (click)="viewFile(attachment)">
                  <span nz-icon nzType="eye"></span>
                </button>
                <button nz-button nzType="link" nzSize="small" (click)="downloadFile(attachment)">
                  <span nz-icon nzType="download"></span>
                </button>
              </div>
            </div>
          </nz-list-item>
        </ng-template>
      </nz-list>
    </nz-card>
  `,
  styles: [
    `
      .attachment-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .attachment-info {
        flex: 1;
      }
      .attachment-name {
        font-weight: 500;
        margin-bottom: 4px;
      }
      .attachment-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #666;
      }
      .attachment-actions {
        display: flex;
        gap: 4px;
      }
    `
  ]
})
export class ContractAttachmentComponent {
  @Input() contractId!: string;

  attachments: Attachment[] = [
    {
      name: '合約文件.pdf',
      url: 'https://example.com/contract.pdf',
      size: 1024000,
      type: 'application/pdf',
      uploadTime: new Date(2024, 0, 15)
    },
    {
      name: '附件清單.xlsx',
      url: 'https://example.com/attachments.xlsx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadTime: new Date(2024, 0, 16)
    },
    {
      name: '簽名圖片.jpg',
      url: 'https://example.com/signature.jpg',
      size: 256000,
      type: 'image/jpeg',
      uploadTime: new Date(2024, 0, 17)
    }
  ];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  viewFile(attachment: Attachment): void {
    if (attachment.type === 'application/pdf' || attachment.type.includes('document') || attachment.type.includes('spreadsheet')) {
      // 使用 Google Docs Viewer
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
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.message.success('檔案下載成功');
  }

  getFileTypeColor(type: string): string {
    const colors: Record<string, string> = {
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
    return colors[type] || 'default';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  getFileTypeDisplay(type: string): string {
    const types: Record<string, string> = {
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
    return types[type] || 'FILE';
  }
}
