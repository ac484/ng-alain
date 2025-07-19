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
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';

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
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);

  loading = false;

  async loginAnonymously(): Promise<void> {
    this.loading = true;

    try {
      const user = await this.firebaseAuth.loginAnonymously().toPromise();

      if (user) {
        this.message.success('匿名登入成功！');

        // 重新載入啟動服務
        this.startupService.load().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    } catch (error) {
      console.error('匿名登入失敗:', error);
      this.message.error('登入失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
