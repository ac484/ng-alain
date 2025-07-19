/**
 * NG-ALAIN 開發環境配置檔案
 *
 * 此檔案包含：
 * - 開發環境的 API 配置
 * - Mock 資料服務配置
 * - 路由 Hash 模式設定
 * - Token 重新整理配置
 * - 開發工具和攔截器設定
 *
 * 在生產建置時會被 environment.prod.ts 替換
 * 基於 ng-alain 20.0.0 框架的環境配置系統
 */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as MOCKDATA from '@_mock';
import { mockInterceptor, provideMockConfig } from '@delon/mock';
import { Environment } from '@delon/theme';

export const environment = {
  production: false,
  useHash: true,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  providers: [provideMockConfig({ data: MOCKDATA })],
  interceptorFns: [mockInterceptor]
} as Environment;
