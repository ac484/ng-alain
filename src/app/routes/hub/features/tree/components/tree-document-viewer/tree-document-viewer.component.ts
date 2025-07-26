/**
 * 樹狀結構文檔檢視器元件
 * 
 * 功能：
 * - 內嵌顯示 PDF 文件
 * - 支援 Google Docs Viewer
 * - 文件預覽和導航
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'hub-tree-document-viewer',
    standalone: true,
    imports: [
        CommonModule,
        NzCardModule,
        NzButtonModule,
        NzIconModule,
        NzSpinModule
    ],
    template: `
    <nz-card 
      [nzTitle]="fileName() || '文件檢視'" 
      [nzExtra]="extraTemplate">
      
      <div class="viewer-container">
        <div *ngIf="isLoading()" class="loading-container">
          <nz-spin nzTip="載入文件中..."></nz-spin>
        </div>
        
        <iframe 
          *ngIf="!isLoading()"
          [src]="safeUrl()" 
          width="100%" 
          height="600px" 
          frameborder="0"
          (load)="onIframeLoad()">
        </iframe>
      </div>
    </nz-card>
    
    <ng-template #extraTemplate>
      <div class="extra-actions">
        <button nz-button (click)="goBack()">
          <span nz-icon nzType="arrow-left"></span>
          返回列表
        </button>
        <button nz-button nzType="primary" (click)="openInNewTab()">
          <span nz-icon nzType="external-link"></span>
          新視窗開啟
        </button>
      </div>
    </ng-template>
  `,
    styles: [`
    .viewer-container {
      width: 100%;
      height: 600px;
      overflow: hidden;
      position: relative;
    }
    
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    
    .extra-actions {
      display: flex;
      gap: 8px;
    }
    
    iframe {
      border: 1px solid #f0f0f0;
      border-radius: 6px;
    }
  `]
})
export class TreeDocumentViewerComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly sanitizer = inject(DomSanitizer);

    protected readonly url = signal<string>('');
    protected readonly fileName = signal<string>('');
    protected readonly isLoading = signal<boolean>(true);

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['url']) {
                this.url.set(params['url']);
            }
            if (params['fileName']) {
                this.fileName.set(params['fileName']);
            }
        });
    }

    protected safeUrl(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.url());
    }

    public onIframeLoad(): void {
        this.isLoading.set(false);
    }

    public goBack(): void {
        this.router.navigate(['/hub/tree/scan-result']);
    }

    public openInNewTab(): void {
        if (this.url()) {
            window.open(this.url(), '_blank');
        }
    }
}