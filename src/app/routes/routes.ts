/**
 * NG-ALAIN 應用程式路由配置檔案
 *
 * 此檔案定義：
 * - 主要路由結構和導航
 * - 佈局元件配置（基本佈局和空白佈局）
 * - 路由守衛和權限控制
 * - 懶載入模組配置
 * - 子路由和重定向規則
 * - 異常頁面路由
 *
 * 支援的路由模組：
 * - dashboard: 儀表板
 * - widgets: 小工具
 * - style: 樣式展示
 * - delon: ng-alain 元件
 * - extras: 額外功能
 * - pro: 專業版功能
 * - data-v: 數據視覺化
 * - passport: 認證頁面
 * - exception: 異常頁面
 *
 * 基於 ng-alain 20.0.0 框架，採用 Angular 20 路由系統
 */

import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { LayoutBasicComponent, LayoutBlankComponent } from '../layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/routes').then(m => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./widgets/routes').then(m => m.routes)
      },
      { path: 'style', loadChildren: () => import('./style/routes').then(m => m.routes) },
      { path: 'delon', loadChildren: () => import('./delon/routes').then(m => m.routes) },
      { path: 'extras', loadChildren: () => import('./extras/routes').then(m => m.routes) },
      { path: 'pro', loadChildren: () => import('./pro/routes').then(m => m.routes) }
    ]
  },
  // Blak Layout 空白布局
  {
    path: 'data-v',
    component: LayoutBlankComponent,
    children: [{ path: '', loadChildren: () => import('./data-v/routes').then(m => m.routes) }]
  },
  // passport
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
