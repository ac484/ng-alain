/**
 * 郵箱登入元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供郵箱登入功能，整合 ng-alain 認證系統
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';
import { EmailLoginModalComponent } from './email-login-modal.component';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [NzIconModule],
  template: ` <nz-icon nzType="mail" nzTheme="outline" class="icon" (click)="loginWithEmail()"></nz-icon> `,
  styles: []
})
export class EmailLoginComponent {
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly modalService = inject(NzModalService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);

  loading = false;

  async loginWithEmail(): Promise<void> {
    this.loading = true;

    try {
      const modalRef = this.modalService.create({
        nzTitle: '郵箱登入/註冊',
        nzContent: EmailLoginModalComponent,
        nzWidth: 400,
        nzFooter: null,
        nzClosable: true,
        nzMaskClosable: false
      });

      modalRef.afterClose.subscribe(result => {
        if (result) {
          // 用戶成功登入或註冊
          this.message.success('操作成功！');
        }
      });
    } catch (error) {
      console.error('郵箱登入失敗:', error);
      this.message.error('登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
