/**
 * 匿名登入元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供匿名登入功能，整合 ng-alain 認證系統
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { StartupService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ReuseTabService } from '@delon/abc/reuse-tab';

@Component({
  selector: 'app-anonymous-login',
  standalone: true,
  imports: [NzIconModule],
  template: ` <nz-icon nzType="user" nzTheme="outline" class="icon" (click)="loginAnonymously()"></nz-icon> `,
  styles: []
})
export class AnonymousLoginComponent {
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly auth = inject(Auth);
  private readonly startupService = inject(StartupService);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  loading = false;

  async loginAnonymously(): Promise<void> {
    this.loading = true;

    try {
      const credential = await signInAnonymously(this.auth);
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

      console.log('匿名登入成功，設定 token:', tokenData);
      this.tokenService.set(tokenData);

      this.message.success('匿名登入成功！');

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
      console.error('匿名登入失敗:', error);
      this.message.error('登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
