/**
 * 測試表單小部件
 *
 * 此檔案負責：
 * - 提供測試用的表單控制項小部件
 * - 展示自訂表單控制項的基本結構
 * - 作為開發新表單控制項的範例
 * - 支援與記憶體狀態和 Redis 快取整合的表單元件
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlWidget, DelonFormModule } from '@delon/form';

@Component({
  selector: 'test',
  template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
      test widget
    </sf-item-wrap>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DelonFormModule]
})
export class TestWidget extends ControlWidget implements OnInit {
  static readonly KEY = 'test';

  ngOnInit(): void {
    console.warn('init test widget');
  }
}
