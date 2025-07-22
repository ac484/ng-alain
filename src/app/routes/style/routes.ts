/**
 * 樣式模組路由配置
 *
 * 此檔案負責：
 * - 定義樣式相關頁面的路由
 * - 配置顏色服務提供者
 * - 整合網格、排版和顏色元件
 * - 支援與記憶體狀態整合的樣式配置
 */

import { Routes } from '@angular/router';

import { ColorService } from './color.service';
import { ColorsComponent } from './colors/colors.component';
import { GridMasonryComponent } from './gridmasonry/gridmasonry.component';
import { TypographyComponent } from './typography/typography.component';

export const routes: Routes = [
  {
    path: '',
    providers: [ColorService],
    children: [
      { path: 'gridmasonry', component: GridMasonryComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'colors', component: ColorsComponent }
    ]
  }
];
