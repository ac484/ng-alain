/**
 * 單元格小部件配置
 *
 * 此檔案負責：
 * - 定義 @delon/abc/cell 單元格小部件配置
 * - 提供自訂單元格渲染器註冊
 * - 支援表格單元格的自訂顯示邏輯
 * - 整合 Redis 快取資料的單元格顯示
 */

import type { CellWidgetProvideConfig } from '@delon/abc/cell';

export const CELL_WIDGETS: CellWidgetProvideConfig[] = [];
