/**
 * NG-ALAIN 共享模組匯入配置
 *
 * 此檔案定義：
 * - 共享模組的統一匯入配置
 * - Angular 核心模組匯入
 * - ng-alain 元件庫匯入
 * - ng-zorro-antd 元件庫匯入
 * - 表單和路由模組匯入
 *
 * 包含的模組：
 * - Angular 表單模組 (FormsModule, ReactiveFormsModule)
 * - Angular 路由模組 (RouterLink, RouterOutlet)
 * - Angular 通用模組 (AsyncPipe, JsonPipe, NgTemplateOutlet)
 * - ng-alain 主題模組 (DatePipe, I18nPipe)
 * - 自訂共享模組 (SHARED_DELON_MODULES, SHARED_ZORRO_MODULES)
 *
 * 使用場景：
 * - 各功能模組的統一匯入
 * - 減少重複的模組匯入
 * - 確保模組匯入的一致性
 * - 簡化模組配置
 *
 * 基於 ng-alain 20.0.0 框架的模組管理系統
 */

import { AsyncPipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DatePipe, I18nPipe } from '@delon/theme';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

export const SHARED_IMPORTS = [
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  RouterOutlet,
  NgTemplateOutlet,
  I18nPipe,
  JsonPipe,
  DatePipe,
  AsyncPipe,
  ...SHARED_DELON_MODULES,
  ...SHARED_ZORRO_MODULES
];
