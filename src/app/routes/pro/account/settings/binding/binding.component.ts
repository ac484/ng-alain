/**
 * 帳號綁定元件
 *
 * 此元件負責：
 * - 管理用戶第三方帳號綁定
 * - 處理綁定和解綁操作
 * - 顯示綁定狀態和資訊
 * - 支援與 Redis 快取整合的綁定資訊儲存
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-binding',
  templateUrl: './binding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class ProAccountSettingsBindingComponent {
  readonly msg = inject(NzMessageService);
}
