/**
 * NG-ALAIN 用戶權限頁面
 *
 * 功能：user1 角色專用頁面
 * 權限：需要 user1 權限才能訪問
 * 展示：權限控制效果
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-guard-auth',
  template: `<p>这是一个user1页面</p>`
})
export class GuardAuthComponent {}
