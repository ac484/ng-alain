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
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { StartupService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ReuseTabService } from '@delon/abc/reuse-tab';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzSize="large" (click)="loginWithGoogle()" [nzLoading]="loading" class="google-login-btn">
      <nz-icon nzType="google" nzTheme="outline"></nz-icon>
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
  private readonly auth = inject(Auth);
  private readonly startupService = inject(StartupService);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  loading = false;

  async loginWithGoogle(): Promise<void> {
    this.loading = true;

    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      const user = credential.user;

      // 設定 @delon/auth token
      const tokenData = {
        token: user.uid,
        name: user.displayName || user.email || 'Anonymous',
        email: user.email || '',
        id: user.uid,
        time: +new Date(),
        role: 'user',
        permissions: ['dashboard'],
        expired: +new Date() + 1000 * 60 * 60 * 24 * 7 // 7天過期
      };

      console.log('Google 登入成功，設定 token:', tokenData);
      this.tokenService.set(tokenData);

      this.message.success('Google 登入成功！');

      // 清空路由复用信息
      this.reuseTabService?.clear();

      // 重新載入啟動服務
      this.startupService.load().subscribe(() => {
        // 導航到適當頁面
        let url = this.tokenService.referrer?.url || '/';
        if (url.includes('/passport')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
    } catch (error) {
      console.error('Google 登入失敗:', error);
      this.message.error('Google 登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
