import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'hub-loading-spinner',
    standalone: true,
    imports: [CommonModule, NzSpinModule],
    template: `
    <div class="loading-container">
      <nz-spin [nzSpinning]="true" [nzSize]="size">
        <div class="loading-content">
          @if (message) {
            <p>{{ message }}</p>
          }
        </div>
      </nz-spin>
    </div>
  `,
    styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }
    .loading-content {
      text-align: center;
    }
  `]
})
export class LoadingSpinnerComponent {
    @Input() size: 'small' | 'default' | 'large' = 'default';
    @Input() message?: string;
}