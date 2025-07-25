/**
 * NG-ALAIN 工具函數演示元件
 *
 * 功能：展示 Delon 工具函數
 * 工具：format、yuan、copy
 * 用途：開發參考和測試
 */

import { Component, inject } from '@angular/core';
import { copy } from '@delon/util/browser';
import { format } from '@delon/util/format';
import { SHARED_IMPORTS, yuan } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  imports: SHARED_IMPORTS
})
export class UtilComponent {
  readonly messageSrv = inject(NzMessageService);

  format_str = 'this is ${name}';
  format_res = '';
  format_obj = JSON.stringify({ name: 'asdf' });

  // yuan
  yuan_str: any;
  yuan_res!: string;

  content = `time ${+new Date()}

    中文！@#￥%……&*`;
  onFormat(): void {
    let obj = null;
    try {
      obj = JSON.parse(this.format_obj);
    } catch {
      this.messageSrv.error(`无法使用 JSON.parse 转换`);
      return;
    }
    this.format_res = format(this.format_str, obj, true);
  }
  onYuan(value: string): void {
    this.yuan_res = yuan(value);
  }
  onCopy(): void {
    copy(`time ${+new Date()}`).then(() => this.messageSrv.success(`success`));
  }
}
