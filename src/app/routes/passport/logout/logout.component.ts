/**
 * 登出元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供登出功能，整合 ng-alain 認證系統
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NzIconModule],
  template: ` <nz-icon nzType="logout" nzTheme="outline" class="icon" (click)="logout()" nz-tooltip nzTooltipTitle="登出"></nz-icon> `,
  styles: []
})
export class LogoutComponent {
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);

  loading = false;

  async logout(): Promise<void> {
    this.loading = true;

    try {
      await this.firebaseAuth.logout().toPromise();
      this.message.success('登出成功！');

      // 重新載入啟動服務
      this.startupService.load().subscribe(() => {
        this.router.navigateByUrl('/passport/login');
      });
    } catch (error) {
      console.error('登出失敗:', error);
      this.message.error('登出失敗，請稍後再試');
    } finally {
      this.loading = false;
    }
  }
}
