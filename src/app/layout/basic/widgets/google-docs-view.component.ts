/**
 * NG-ALAIN Google Docs 檢視元件
 *
 * 功能：在 Header 工具列中提供 Google Docs 快速檢視入口
 * 位置：Header 工具列
 * 狀態：顯示最近檢視的文件列表
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';

interface GoogleDoc {
  id: string;
  title: string;
  lastModified: string;
  url: string;
}

@Component({
  selector: 'header-google-docs',
  template: `
    <div nz-dropdown [nzDropdownMenu]="menu" nzTrigger="click" (nzVisibleChange)="onVisibleChange()">
      <div class="alain-default__nav-item">
        <i nz-icon nzType="file-text" class="alain-default__nav-item-icon"></i>
        <span>Google Docs</span>
      </div>
    </div>

    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        @for (doc of recentDocs; track doc.id) {
          <li nz-menu-item (click)="openDoc(doc)">
            <i nz-icon nzType="file-text"></i>
            <span>{{ doc.title }}</span>
            <small>{{ doc.lastModified }}</small>
          </li>
        }
        <li nz-divider></li>
        <li nz-menu-item (click)="openNewDoc()">
          <i nz-icon nzType="plus"></i>
          <span>新建文件</span>
        </li>
        <li nz-menu-item (click)="openDocsHome()">
          <i nz-icon nzType="folder-open"></i>
          <span>開啟 Google Docs</span>
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .alain-default__nav-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 0 12px;
        height: 100%;
      }

      .alain-default__nav-item-icon {
        font-size: 16px;
      }

      ul[nz-menu] li {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ul[nz-menu] li small {
        margin-left: auto;
        color: #999;
        font-size: 12px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDropDownModule, NzIconModule, NzMenuModule]
})
export class HeaderGoogleDocsComponent {
  private readonly msg = inject(NzMessageService);

  recentDocs: GoogleDoc[] = [
    {
      id: '1',
      title: '專案企劃書',
      lastModified: '2 小時前',
      url: 'https://docs.google.com/document/d/1'
    },
    {
      id: '2',
      title: '會議記錄',
      lastModified: '昨天',
      url: 'https://docs.google.com/document/d/2'
    },
    {
      id: '3',
      title: '技術規格文件',
      lastModified: '3 天前',
      url: 'https://docs.google.com/document/d/3'
    }
  ];

  onVisibleChange(): void {
    this.loadRecentDocs();
  }

  loadRecentDocs(): void {
    // 這裡可以整合 Google Docs API 來獲取真實的最近文件
    // 目前使用靜態資料作為示範
  }

  openDoc(doc: GoogleDoc): void {
    window.open(doc.url, '_blank');
    this.msg.success(`開啟文件：${doc.title}`);
  }

  openNewDoc(): void {
    window.open('https://docs.google.com/document/create', '_blank');
    this.msg.success('開啟新文件');
  }

  openDocsHome(): void {
    window.open('https://docs.google.com', '_blank');
    this.msg.success('開啟 Google Docs');
  }
}
