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
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';

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
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);

  loading = false;

  async loginWithEmail(): Promise<void> {
    this.loading = true;

    try {
      // 這裡可以彈出郵箱輸入框或導航到郵箱登入頁面
      this.message.info('郵箱登入功能開發中...');

      // 示例：導航到郵箱登入頁面
      // this.router.navigateByUrl('/passport/email-login-form');
    } catch (error) {
      console.error('郵箱登入失敗:', error);
      this.message.error('登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
