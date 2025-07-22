/**
 * 網格瀑布流元件
 *
 * 此元件負責：
 * - 展示瀑布流佈局效果
 * - 提供響應式網格系統示例
 * - 展示不同尺寸的卡片佈局
 * - 支援與 Redis 快取整合的佈局配置
 */

import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-gridmasonry',
  templateUrl: './gridmasonry.component.html',
  styleUrls: ['./gridmasonry.component.less'],
  imports: SHARED_IMPORTS
})
export class GridMasonryComponent {}
