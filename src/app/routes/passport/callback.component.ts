/**
 * NG-ALAIN 社交登入回調元件
 *
 * 功能：處理第三方登入回調
 * 支援：Auth0、GitHub、微博等
 * 模式：模擬認證流程
 */

import { Component, Input, OnInit, inject } from '@angular/core';
import { SocialService } from '@delon/auth';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-callback',
  template: ``,
  providers: [SocialService],
  standalone: true
})
export class CallbackComponent implements OnInit {
  private readonly socialService = inject(SocialService);
  private readonly settingsSrv = inject(SettingsService);
  @Input() type = '';

  ngOnInit(): void {
    this.mockModel();
  }

  private mockModel(): void {
    const info = {
      token: '123456789',
      name: 'cipchk',
      email: `${this.type}@${this.type}.com`,
      id: 10000,
      time: +new Date()
    };
    this.settingsSrv.setUser({
      ...this.settingsSrv.user,
      ...info
    });
    this.socialService.callback(info);
  }
}
