/**
 * NG-ALAIN Extras 模組路由配置
 *
 * 功能：定義額外功能頁面路由
 * 包含：幫助中心、設定、POI 管理
 */

import { Routes } from '@angular/router';

import { HelpCenterComponent } from './helpcenter/helpcenter.component';
import { ExtrasPoiComponent } from './poi/poi.component';
import { ExtrasSettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: 'helpcenter', component: HelpCenterComponent },
  { path: 'settings', component: ExtrasSettingsComponent },
  { path: 'poi', component: ExtrasPoiComponent }
];
