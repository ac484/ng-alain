import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule],
  template: `
    <nz-card [nzTitle]="fileName() || '文件檢視'" [nzExtra]="extraTemplate">
      <div class="viewer-container">
        <iframe [src]="safeUrl()" width="100%" height="600px" frameborder="0"></iframe>
      </div>
    </nz-card>
    <ng-template #extraTemplate>
      <button nz-button nzType="primary" (click)="goBack()">
        <span nz-icon nzType="arrow-left"></span>
        返回列表
      </button>
    </ng-template>
  `,
  styles: [
    `
      .viewer-container {
        width: 100%;
        height: 600px;
        overflow: hidden;
      }
    `
  ]
})
export class DocumentViewerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly url = signal<string>('');
  protected readonly fileName = signal<string>('');

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

  public goBack(): void {
    window.history.back();
  }
}
