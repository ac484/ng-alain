/**
 * NG-ALAIN 異常頁面元件
 *
 * 功能：顯示各種錯誤狀態頁面
 * 類型：403、404、500 錯誤
 * 樣式：統一的錯誤頁面樣式
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExceptionModule, ExceptionType } from '@delon/abc/exception';

@Component({
  selector: 'app-exception',
  template: ` <exception [type]="type" style="min-height: 500px; height: 80%;" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExceptionModule]
})
export class ExceptionComponent {
  private readonly route = inject(ActivatedRoute);
  get type(): ExceptionType {
    return this.route.snapshot.data['type'];
  }
}
