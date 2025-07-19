/**
 * Angular 應用程式入口點
 *
 * 此檔案負責：
 * - 使用 bootstrapApplication 啟動 Angular 應用程式
 * - 載入 AppComponent 作為根元件
 * - 套用 appConfig 配置
 * - 處理啟動錯誤
 *
 * 基於 ng-alain 20.0.0 框架，採用 Angular 20 獨立 API 模式
 */

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
