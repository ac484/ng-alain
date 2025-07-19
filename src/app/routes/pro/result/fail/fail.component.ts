/**
 * 失敗結果頁面元件
 *
 * 此元件負責：
 * - 顯示操作失敗的結果頁面
 * - 提供失敗狀態的視覺回饋
 * - 支援錯誤資訊展示
 * - 用於表單提交失敗後的結果展示
 *
 * 基於 ng-alain 20.0.0 框架的結果頁面元件
 */

import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-result-fail',
  templateUrl: './fail.component.html',
  imports: [...SHARED_IMPORTS, NzResultModule]
})
// Component for displaying failed operation result
export class ProResultFailComponent {}
