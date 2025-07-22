/**
 * NG-ALAIN 認證佈局元件
 *
 * 此元件提供：
 * - 認證頁面的專用佈局
 * - 登入、註冊、忘記密碼等頁面
 * - 品牌標識和標題顯示
 * - 國際化語言切換
 * - 全域頁腳連結
 * - 主題切換按鈕
 *
 * 功能特點：
 * - 自動清除認證 Token
 * - 響應式設計
 * - 品牌展示區域
 * - 簡潔的認證流程
 * - 支援多語言
 *
 * 適用頁面：
 * - 登入頁面
 * - 註冊頁面
 * - 忘記密碼頁面
 * - 鎖定頁面
 *
 * 基於 ng-alain 20.0.0 框架的認證佈局系統
 */

import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { ThemeBtnComponent } from '@delon/theme/theme-btn';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { HeaderI18nComponent } from '../basic/widgets/i18n.component';

@Component({
  selector: 'layout-passport',
  template: `
    <div class="container">
      <header-i18n showLangText="false" class="langs" />
      <div class="wrap">
        <div class="top">
          <div class="head">
            <img class="logo" src="./assets/logo-color.svg" />
            <span class="title">NG-ALAIN</span>
          </div>
          <div class="desc">武林中最有影响力的《葵花宝典》；欲练神功，挥刀自宫</div>
        </div>
        <router-outlet />
        <global-footer [links]="links">
          Copyright
          <i nz-icon nzType="copyright"></i> 2023 <a href="//github.com/cipchk" target="_blank">卡色</a>出品
        </global-footer>
      </div>
    </div>
    <theme-btn />
  `,
  styleUrls: ['./passport.component.less'],
  imports: [RouterOutlet, HeaderI18nComponent, GlobalFooterModule, NzIconModule, ThemeBtnComponent]
})
export class LayoutPassportComponent implements OnInit {
  private tokenService = inject(DA_SERVICE_TOKEN);

  links = [
    {
      title: '帮助',
      href: ''
    },
    {
      title: '隐私',
      href: ''
    },
    {
      title: '条款',
      href: ''
    }
  ];

  ngOnInit(): void {
    this.tokenService.clear();
  }
}
