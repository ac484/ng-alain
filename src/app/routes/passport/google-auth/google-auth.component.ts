/**
 * Google 登入元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供 Google 登入功能，整合 ng-alain 認證系統
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzSize="large" (click)="loginWithGoogle()" [nzLoading]="loading" class="google-login-btn">
      <nz-icon nzType="google" nzTheme="outline"></nz-icon>
      使用 Google 登入
    </button>
  `,
  styles: [
    `
      .google-login-btn {
        width: 100%;
        height: 40px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    `
  ]
})
export class GoogleAuthComponent {
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);

  loading = false;

  async loginWithGoogle(): Promise<void> {
    this.loading = true;

    try {
      const user = (await this.firebaseAuth.loginWithGoogle().toPromise()) || null;

      if (user) {
        this.message.success('登入成功！');

        // 重新載入啟動服務
        this.startupService.load().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    } catch (error) {
      console.error('Google 登入失敗:', error);
      this.message.error('登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
