/**
 * 成功結果頁面元件
 *
 * 此元件負責：
 * - 顯示操作成功的結果頁面
 * - 提供成功狀態的視覺回饋
 * - 支援步驟指示器顯示
 * - 用於表單提交成功後的結果展示
 *
 * 基於 ng-alain 20.0.0 框架的結果頁面元件
 */

import { Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'app-result-success',
  templateUrl: './success.component.html',
  imports: [...SHARED_IMPORTS, NzResultModule, NzStepsModule]
})
// Component for displaying successful operation result
export class ProResultSuccessComponent {
  readonly msg = inject(NzMessageService);
}
