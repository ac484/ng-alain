/**
 * NG-ALAIN 生產環境配置檔案
 *
 * 此檔案包含：
 * - 生產環境的 API 配置
 * - 路由 Hash 模式設定
 * - Token 重新整理配置
 * - 生產環境優化設定
 *
 * 在建置時會替換 environment.ts
 * 移除開發工具和 Mock 服務
 * 基於 ng-alain 20.0.0 框架的環境配置系統
 */

import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
