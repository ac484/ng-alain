/**
 * NG-ALAIN 空白佈局元件
 *
 * 此元件提供：
 * - 簡潔的空白佈局
 * - 僅包含路由出口
 * - 適用於登入、註冊、錯誤頁面
 * - 無導航欄和側邊欄
 * - 最小化的頁面結構
 *
 * 使用場景：
 * - 認證頁面
 * - 錯誤頁面
 * - 簡潔的展示頁面
 * - 彈出視窗內容
 *
 * 基於 ng-alain 20.0.0 框架的簡潔佈局系統
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout-blank',
  template: `<router-outlet />`,
  host: {
    '[class.alain-blank]': 'true'
  },
  imports: [RouterOutlet]
})
export class LayoutBlankComponent {}
