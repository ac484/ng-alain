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
 *
 * 架構說明：
 * - 使用 @delon/theme 的 Environment 介面
 * - 整合 @delon/mock 提供 Mock 資料服務
 * - 支援開發環境的完整功能
 * - 提供開發工具和除錯功能
 *
 * 開發環境特點：
 * - production: false - 啟用開發模式
 * - 使用 Mock 資料服務 - 模擬後端 API
 * - 啟用 Mock 攔截器 - 攔截 HTTP 請求
 * - 支援 Token 重新整理 - 測試認證流程
 * - 使用 Hash 路由 - 避免開發伺服器路由問題
 *
 * Mock 資料服務：
 * - 載入 _mock 目錄下的所有 Mock 資料
 * - 提供完整的 API 模擬
 * - 支援 CRUD 操作和複雜查詢
 * - 便於前端開發和測試
 *
 * 攔截器配置：
 * - mockInterceptor: 攔截 HTTP 請求並返回 Mock 資料
 * - 支援 RESTful API 模式
 * - 提供延遲模擬真實網路環境
 * - 支援錯誤情況模擬
 *
 * 建置說明：
 * - 開發時使用此檔案
 * - 生產建置時會被 environment.prod.ts 替換
 * - 透過 angular.json 的 fileReplacements 配置
 */

/**
 * 建置替換說明
 *
 * 功能：
 * - 此檔案在開發時使用
 * - 生產建置時會被 environment.prod.ts 替換
 * - 透過 angular.json 的 fileReplacements 配置實現
 *
 * 建置流程：
 * - 開發時：使用 environment.ts
 * - 生產建置：ng build --prod 會替換為 environment.prod.ts
 * - 配置位置：angular.json 的 fileReplacements 陣列
 *
 * 替換機制：
 * - Angular CLI 在建置時自動替換
 * - 確保生產環境使用正確的配置
 * - 避免開發配置洩露到生產環境
 */

import * as MOCKDATA from '@_mock';
import { mockInterceptor, provideMockConfig } from '@delon/mock';
import { Environment } from '@delon/theme';

/**
 * 開發環境配置物件
 *
 * 功能：
 * - 定義開發環境的所有配置參數
 * - 啟用開發工具和 Mock 服務
 * - 配置 API 和認證設定
 * - 提供完整的開發體驗
 *
 * 配置項目：
 * - production: 生產模式標記 (false = 開發模式)
 * - useHash: 路由模式 (true = Hash 路由)
 * - api: API 相關配置
 * - providers: 服務提供者配置
 * - interceptorFns: HTTP 攔截器配置
 *
 * 開發環境優勢：
 * - 使用 Mock 資料，不依賴後端服務
 * - 支援完整的開發工具
 * - 提供詳細的除錯資訊
 * - 快速開發和測試
 */
export const environment = {
  // 環境標記
  production: false, // 開發模式

  // 路由配置
  useHash: true, // 使用 Hash 路由模式

  // API 配置
  api: {
    baseUrl: './', // API 基礎 URL
    refreshTokenEnabled: true, // 啟用 Token 重新整理
    refreshTokenType: 'auth-refresh' // Token 重新整理類型
  },

  // 服務提供者配置
  providers: [
    provideMockConfig({ data: MOCKDATA }) // Mock 資料服務配置
  ],

  // HTTP 攔截器配置
  interceptorFns: [mockInterceptor] // Mock 攔截器
} as Environment;
