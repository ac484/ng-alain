/**
 * 郵箱登入/註冊彈窗元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供郵箱登入、註冊和密碼重置功能的整合彈窗
 */

import { Component, inject } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EmailLoginFormComponent } from './email-login-form.component';
import { EmailRegisterFormComponent } from './email-register-form.component';
import { EmailResetFormComponent } from './email-reset-form.component';

@Component({
  selector: 'app-email-login-modal',
  standalone: true,
  imports: [NzModalModule, NzTabsModule, EmailLoginFormComponent, EmailRegisterFormComponent, EmailResetFormComponent],
  template: `
    <div class="email-auth-modal">
      <nz-tabs [nzAnimated]="false">
        <nz-tab [nzTitle]="'登入'">
          <app-email-login-form (loginSuccess)="onLoginSuccess()"></app-email-login-form>
        </nz-tab>

        <nz-tab [nzTitle]="'註冊'">
          <app-email-register-form (registerSuccess)="onRegisterSuccess()"></app-email-register-form>
        </nz-tab>

        <nz-tab [nzTitle]="'重置密碼'">
          <app-email-reset-form (resetSuccess)="onResetSuccess()"></app-email-reset-form>
        </nz-tab>
      </nz-tabs>
    </div>
  `,
  styles: [
    `
      .email-auth-modal {
        padding: 20px 0;
      }

      .ant-tabs-content-holder {
        padding-top: 16px;
      }
    `
  ]
})
export class EmailLoginModalComponent {
  private readonly modalRef = inject(NzModalRef);

  onLoginSuccess(): void {
    this.modalRef.close({ type: 'login', success: true });
  }

  onRegisterSuccess(): void {
    this.modalRef.close({ type: 'register', success: true });
  }

  onResetSuccess(): void {
    this.modalRef.close({ type: 'reset', success: true });
  }
}
