/**
 * 顏色服務
 *
 * 此服務負責：
 * - 管理應用程式的顏色系統
 * - 提供品牌色和主題色的定義
 * - 支援顏色名稱和值的映射
 * - 整合與記憶體狀態的顏色配置管理
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {
  APP_COLORS = {
    primary: '#1890ff',
    success: '#52c41a',
    error: '#f5222d',
    warning: '#fadb14',
    red: '#f5222d',
    volcano: '#fa541c',
    orange: '#fa8c16',
    gold: '#faad14',
    yellow: '#fadb14',
    lime: '#a0d911',
    green: '#52c41a',
    cyan: '#13c2c2',
    blue: '#1890ff',
    geekblue: '#2f54eb',
    purple: '#722ed1',
    magenta: '#eb2f96'
  };

  get names(): string[] {
    return Object.keys(this.APP_COLORS).filter((_, index) => index > 3);
  }

  get brands(): string[] {
    return ['primary', 'success', 'error', 'warning'];
  }
}
