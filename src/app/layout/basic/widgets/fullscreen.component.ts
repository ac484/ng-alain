/**
 * NG-ALAIN 全螢幕切換元件
 *
 * 功能：切換瀏覽器全螢幕模式
 * 位置：Header 工具列
 * 狀態：顯示當前全螢幕狀態
 */

import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { I18nPipe } from '@delon/theme';
import { NzIconModule } from 'ng-zorro-antd/icon';
import screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'menu.fullscreen.exit' : 'menu.fullscreen') | i18n }}
  `,
  host: {
    '[class.flex-1]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, I18nPipe]
})
export class HeaderFullScreenComponent {
  status = false;

  @HostListener('window:resize')
  _resize(): void {
    this.status = screenfull.isFullscreen;
  }

  @HostListener('click')
  _click(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
