/**
 * 顏色展示元件
 *
 * 此元件負責：
 * - 展示應用程式的顏色系統
 * - 提供顏色複製功能
 * - 顯示品牌色和主題色
 * - 支援與記憶體狀態整合的顏色管理
 */

import { Component, inject } from '@angular/core';
import { copy } from '@delon/util/browser';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ColorService } from '../color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.less'],
  imports: SHARED_IMPORTS
})
export class ColorsComponent {
  private readonly colorSrv = inject(ColorService);
  private readonly msg = inject(NzMessageService);

  nums = Array(10)
    .fill(1)
    .map((v, i) => v + i);

  get names(): string[] {
    return this.colorSrv.names;
  }

  get brands(): string[] {
    return this.colorSrv.brands;
  }

  onCopy(str: string): void {
    copy(str).then(() => this.msg.success(`Copied Success!`));
  }
}
