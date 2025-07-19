/**
 * NG-ALAIN 離開確認元件
 *
 * 功能：測試路由離開守衛
 * 觸發：點擊離開按鈕
 * 確認：離開前確認對話框
 */

import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-guard-leave',
  template: `
    <p>离开时需要确认</p>
    <button nz-button [nzType]="'primary'" [routerLink]="['/delon/guard']">
      <span>我要离开</span>
    </button>
  `,
  imports: SHARED_IMPORTS
})
export class GuardLeaveComponent {}
