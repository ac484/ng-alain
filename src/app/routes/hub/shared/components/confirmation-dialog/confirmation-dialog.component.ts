import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'hub-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, NzModalModule, NzButtonModule],
    template: `
    <nz-modal
      [nzVisible]="visible"
      [nzTitle]="title"
      [nzContent]="content"
      [nzFooter]="footerTemplate"
      (nzOnCancel)="onCancel()">
      
      <ng-template #footerTemplate>
        <button nz-button (click)="onCancel()">取消</button>
        <button nz-button nzType="primary" nzDanger (click)="onConfirm()">
          確認
        </button>
      </ng-template>
    </nz-modal>
  `
})
export class ConfirmationDialogComponent {
    @Input() visible = false;
    @Input() title = '確認';
    @Input() content = '確定要執行此操作嗎？';

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm() {
        this.confirm.emit();
    }

    onCancel() {
        this.cancel.emit();
    }
}