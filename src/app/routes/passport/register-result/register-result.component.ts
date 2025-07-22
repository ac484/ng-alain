/**
 * NG-ALAIN 註冊結果頁面元件
 *
 * 功能：顯示用戶註冊完成結果
 * 位置：Passport 模組
 * 輸入：email 參數
 */

import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nPipe } from '@delon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'passport-register-result',
  templateUrl: './register-result.component.html',
  imports: [RouterLink, I18nPipe, NzButtonModule, NzResultModule]
})
export class UserRegisterResultComponent {
  readonly msg = inject(NzMessageService);
  @Input() email = '';
}
