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
 *
 * 架構說明：
 * - 使用 @delon/theme 的 Environment 介面
 * - 移除所有開發工具和 Mock 服務
 * - 優化生產環境效能
 * - 確保生產環境安全性
 *
 * 生產環境特點：
 * - production: true - 啟用生產模式
 * - 移除 Mock 資料服務 - 使用真實 API
 * - 移除開發攔截器 - 優化效能
 * - 保留 Token 重新整理 - 確保認證安全
 * - 使用 Hash 路由 - 確保路由相容性
 *
 * 安全性考量：
 * - 移除所有開發工具
 * - 不包含 Mock 資料
 * - 不包含除錯資訊
 * - 確保敏感資訊不會洩露
 *
 * 效能優化：
 * - 移除不必要的服務
 * - 減少 JavaScript 包大小
 * - 優化載入速度
 * - 提升運行效能
 *
 * 建置說明：
 * - 生產建置時使用此檔案
 * - 透過 angular.json 的 fileReplacements 替換
 * - 確保生產環境使用正確配置
 */

import { Environment } from '@delon/theme';

/**
 * 生產環境配置物件
 *
 * 功能：
 * - 定義生產環境的所有配置參數
 * - 移除開發工具和 Mock 服務
 * - 配置生產環境的 API 和認證
 * - 確保生產環境的安全性和效能
 *
 * 配置項目：
 * - production: 生產模式標記 (true = 生產模式)
 * - useHash: 路由模式 (true = Hash 路由)
 * - api: API 相關配置
 *
 * 與開發環境的差異：
 * - 移除 providers 配置 (Mock 服務)
 * - 移除 interceptorFns 配置 (開發攔截器)
 * - 保留核心 API 和認證配置
 * - 確保生產環境的穩定性
 *
 * 生產環境優勢：
 * - 更小的 JavaScript 包大小
 * - 更快的載入速度
 * - 更高的安全性
 * - 更好的效能表現
 */
export const environment = {
  // 環境標記
  production: true, // 生產模式

  // 路由配置
  useHash: true, // 使用 Hash 路由模式

  // API 配置
  api: {
    baseUrl: './', // API 基礎 URL
    refreshTokenEnabled: true, // 啟用 Token 重新整理
    refreshTokenType: 'auth-refresh' // Token 重新整理類型
  }

  // 注意：生產環境不包含 providers 和 interceptorFns
  // 以確保安全性和效能
} as Environment;
