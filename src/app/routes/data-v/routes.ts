/**
 * NG-ALAIN Data-V 模組路由配置
 *
 * 功能：定義資料視覺化頁面路由
 * 包含：關係圖表展示
 */

import { Routes } from '@angular/router';

import { RelationComponent } from './relation/relation.component';

export const routes: Routes = [{ path: 'relation', component: RelationComponent }];
