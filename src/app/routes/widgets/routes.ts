/**
 * 小部件模組路由配置
 *
 * 此檔案負責：
 * - 定義小部件展示頁面的路由
 * - 配置小部件元件的路由映射
 * - 提供小部件功能的入口點
 * - 支援與記憶體狀態整合的小部件配置
 */

import { Routes } from '@angular/router';

import { WidgetsComponent } from './widgets/widgets.component';

export const routes: Routes = [{ path: '', component: WidgetsComponent }];
