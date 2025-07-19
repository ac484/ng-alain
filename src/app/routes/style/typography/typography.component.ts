/**
 * 排版元件
 *
 * 此元件負責：
 * - 展示應用程式的文字排版系統
 * - 顯示不同標題級別和文字樣式
 * - 提供文字顏色和格式示例
 * - 支援與 Redis 快取整合的排版配置
 */

import { Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';

import { ColorService } from '../color.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  imports: SHARED_IMPORTS
})
export class TypographyComponent {
  private readonly colorSrv = inject(ColorService);
  get names(): string[] {
    return this.colorSrv.names;
  }
}
