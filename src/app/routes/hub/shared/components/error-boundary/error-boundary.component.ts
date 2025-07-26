import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'hub-error-boundary',
    standalone: true,
    imports: [CommonModule, NzResultModule, NzButtonModule],
    template: `
    @if (hasError()) {
      <nz-result 
        nzStatus="error" 
        nzTitle="發生錯誤"
        [nzSubTitle]="errorMessage()">
        <div nz-result-extra>
          <button nz-button nzType="primary" (click)="retry()">
            重試
          </button>
        </div>
      </nz-result>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class ErrorBoundaryComponent {
    hasError = signal(false);
    errorMessage = signal('');

    handleError(error: any) {
        this.hasError.set(true);
        this.errorMessage.set(error.message || '發生未預期的錯誤');
    }

    retry() {
        this.hasError.set(false);
        this.errorMessage.set('');
    }
}