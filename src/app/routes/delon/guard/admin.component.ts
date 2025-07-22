/**
 * NG-ALAIN 管理員權限頁面
 *
 * 功能：admin 角色專用頁面
 * 權限：需要 admin 權限才能訪問
 * 展示：管理員權限控制
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-guard-admin',
  template: `<p>这是一个admin页面</p>`
})
export class GuardAdminComponent {}
