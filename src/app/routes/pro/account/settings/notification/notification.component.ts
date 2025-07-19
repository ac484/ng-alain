/**
 * 通知設定元件
 *
 * 此元件負責：
 * - 管理用戶通知偏好設定
 * - 控制各類通知的開關狀態
 * - 提供通知方式的選擇
 * - 支援與記憶體狀態整合的通知設定管理
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-account-settings-notification',
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class ProAccountSettingsNotificationComponent {
  i: {
    password: boolean;
    messages: boolean;
    todo: boolean;
  } = {
    password: true,
    messages: true,
    todo: true
  };
}
