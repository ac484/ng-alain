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
 *
 * 架構說明：
 * - 使用 Angular 20 的路由系統
 * - 整合 ng-alain 的認證和權限控制
 * - 支援懶載入提升應用程式效能
 * - 提供多種佈局模式
 *
 * 路由守衛：
 * - startPageGuard: 起始頁面守衛
 * - authSimpleCanActivate: 簡單認證守衛
 * - authSimpleCanActivateChild: 子路由認證守衛
 *
 * 佈局模式：
 * - LayoutBasicComponent: 基本佈局（包含側邊欄、頂部導航）
 * - LayoutBlankComponent: 空白佈局（全螢幕模式）
 *
 * 懶載入策略：
 * - 所有功能模組都使用懶載入
 * - 提升初始載入效能
 * - 減少主包大小
 *
 * 路由結構：
 * - 根路由重定向到 dashboard
 * - 主要功能模組在基本佈局下
 * - 數據視覺化使用空白佈局
 * - 認證和異常頁面獨立配置
 */

import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { LayoutBasicComponent, LayoutBlankComponent } from '../layout';

/**
 * 應用程式路由配置
 *
 * 功能：
 * - 定義應用程式的完整路由結構
 * - 配置不同佈局和認證要求
 * - 支援懶載入和路由守衛
 * - 提供錯誤處理和重定向
 *
 * 路由結構說明：
 * - 主要功能使用基本佈局
 * - 數據視覺化使用空白佈局
 * - 認證和異常頁面獨立配置
 * - 所有模組都支援懶載入
 */
export const routes: Routes = [
  // 主要功能路由 - 使用基本佈局
  {
    path: '',
    component: LayoutBasicComponent, // 基本佈局元件
    canActivate: [startPageGuard, authSimpleCanActivate], // 路由守衛：起始頁面 + 認證
    canActivateChild: [authSimpleCanActivateChild], // 子路由認證守衛
    data: {}, // 路由資料
    children: [
      // 根路由重定向到儀表板
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // 儀表板模組 - 懶載入
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/routes').then(m => m.routes)
      },

      // 小工具模組 - 懶載入
      {
        path: 'widgets',
        loadChildren: () => import('./widgets/routes').then(m => m.routes)
      },

      // 樣式展示模組 - 懶載入
      { path: 'style', loadChildren: () => import('./style/routes').then(m => m.routes) },

      // ng-alain 元件模組 - 懶載入
      { path: 'delon', loadChildren: () => import('./delon/routes').then(m => m.routes) },

      // 額外功能模組 - 懶載入
      { path: 'extras', loadChildren: () => import('./extras/routes').then(m => m.routes) },

      // 專業版功能模組 - 懶載入
      { path: 'pro', loadChildren: () => import('./pro/routes').then(m => m.routes) },

      // 工作區模組 - 懶載入
      { path: 'workspace', loadChildren: () => import('./workspace/routes').then(m => m.default) },

      // Hub 模組 - 懶載入
      { path: 'hub', loadChildren: () => import('./hub/routes').then(m => m.default) },

      // 系統管理模組 - 懶載入
      {
        path: 'system',
        loadChildren: () => import('./system/routes').then(m => m.routes),
        data: { title: '系統管理', titleI18n: 'menu.system' }
      }
    ]
  },

  // 認證模組路由 - 獨立配置
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },

  // 異常頁面路由 - 獨立配置
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },

  // 通配符路由 - 重定向到 404 頁面
  { path: '**', redirectTo: 'exception/404' }
];
