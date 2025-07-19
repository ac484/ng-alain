/**
 * 帳戶安全設定元件
 *
 * 此元件負責：
 * - 顯示用戶安全相關設定
 * - 處理密碼修改和安全驗證
 * - 管理安全問題和登入設定
 * - 支援與 Redis 快取整合的安全設定儲存
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-security',
  templateUrl: './security.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class ProAccountSettingsSecurityComponent {
  readonly msg = inject(NzMessageService);
}
