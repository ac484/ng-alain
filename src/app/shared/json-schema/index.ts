/**
 * JSON Schema 表單小部件配置
 *
 * 此檔案負責：
 * - 註冊自訂表單小部件
 * - 配置 @delon/form 表單小部件
 * - 提供表單控制項的擴展功能
 * - 支援與記憶體狀態和 Redis 快取整合的表單元件
 */

import type { SFWidgetProvideConfig } from '@delon/form';
// import { withCascaderWidget } from '@delon/form/widgets/cascader';

import { TestWidget } from './test/test.widget';

export const SF_WIDGETS: SFWidgetProvideConfig[] = [
  { KEY: TestWidget.KEY, type: TestWidget }
  // Non-built-in widget registration method
  // withCascaderWidget()
];
