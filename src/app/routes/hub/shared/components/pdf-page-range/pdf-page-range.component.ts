/**
 * PDF 頁面範圍選擇共用組件
 * 功能：選擇要處理的 PDF 頁面範圍
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface PageRange {
    startPage: number;
    endPage: number;
    totalPages: number;
}

@Component({
    selector: 'hub-pdf-page-range',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzCardModule,
        NzFormModule,
        NzInputNumberModule,
        NzButtonModule,
        NzIconModule
    ],
    template: `
    <nz-card nzSize="small" [nzTitle]="title">
      <div class="pdf-info">
        <p>總頁數：{{ totalPages }} 頁</p>
      </div>

      <nz-form-item>
        <nz-form-label>選擇頁數範圍</nz-form-label>
        <nz-form-control>
          <div class="page-range-inputs">
            <nz-input-number
              [(ngModel)]="startPage"
              [nzMin]="1"
              [nzMax]="totalPages"
              placeholder="起始頁"
              style="width: 120px;"
              (ngModelChange)="onRangeChange()">
            </nz-input-number>
            <span class="page-range-separator">至</span>
            <nz-input-number
              [(ngModel)]="endPage"
              [nzMin]="1"
              [nzMax]="totalPages"
              placeholder="結束頁"
              style="width: 120px;"
              (ngModelChange)="onRangeChange()">
            </nz-input-number>
          </div>
        </nz-form-control>
      </nz-form-item>

      <div class="page-range-info">
        <span *ngIf="startPage && endPage">
          將處理第 {{ startPage }} 至 {{ endPage }} 頁 (共 {{ getSelectedPageCount() }} 頁)
        </span>
      </div>

      <div class="range-actions">
        <button nz-button (click)="selectAllPages()">
          <span nz-icon nzType="check-square"></span>
          全選
        </button>
        <button 
          nz-button 
          nzType="primary" 
          [disabled]="!isValidPageRange()"
          (click)="onConfirm()">
          <span nz-icon nzType="check"></span>
          確認範圍
        </button>
      </div>
    </nz-card>
  `,
    styles: [`
    .pdf-info {
      margin-bottom: 16px;
      color: #666;
    }

    .page-range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .page-range-separator {
      color: #666;
      font-size: 14px;
    }

    .page-range-info {
      margin: 16px 0;
      color: #666;
      font-size: 14px;
    }

    .range-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 16px;
    }
  `]
})
export class PdfPageRangeComponent {
    @Input() title = '頁數範圍設定';
    @Input() totalPages = 0;
    @Input() startPage = 1;
    @Input() endPage = 1;

    @Output() rangeChanged = new EventEmitter<PageRange>();
    @Output() rangeConfirmed = new EventEmitter<PageRange>();

    ngOnInit(): void {
        // 初始化時設置結束頁為總頁數
        if (this.totalPages > 0) {
            this.endPage = this.totalPages;
            this.onRangeChange();
        }
    }

    onRangeChange(): void {
        if (this.isValidPageRange()) {
            this.rangeChanged.emit({
                startPage: this.startPage,
                endPage: this.endPage,
                totalPages: this.totalPages
            });
        }
    }

    onConfirm(): void {
        if (this.isValidPageRange()) {
            this.rangeConfirmed.emit({
                startPage: this.startPage,
                endPage: this.endPage,
                totalPages: this.totalPages
            });
        }
    }

    isValidPageRange(): boolean {
        return this.startPage > 0 &&
            this.endPage > 0 &&
            this.startPage <= this.endPage &&
            this.endPage <= this.totalPages;
    }

    selectAllPages(): void {
        this.startPage = 1;
        this.endPage = this.totalPages;
        this.onRangeChange();
    }

    getSelectedPageCount(): number {
        if (!this.isValidPageRange()) return 0;
        return this.endPage - this.startPage + 1;
    }
}