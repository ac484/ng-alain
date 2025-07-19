/**
 * NG-ALAIN 快取服務演示元件
 *
 * 功能：展示快取服務使用
 * 操作：設定、取得快取值
 * 用途：本地資料快取管理
 */

import { Component, inject } from '@angular/core';
import { CacheService } from '@delon/cache';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  imports: SHARED_IMPORTS
})
export class CacheComponent {
  private readonly cache = inject(CacheService);
  private readonly msg = inject(NzMessageService);

  KEY = 'user';

  set(): void {
    this.cache.set(this.KEY, +new Date());
  }

  get(): void {
    this.msg.success(this.cache.getNone(this.KEY));
  }
}
