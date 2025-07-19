/**
 * NG-ALAIN 網路模組匯出檔案
 *
 * 此檔案匯出：
 * - provideBindAuthRefresh: 認證重新整理綁定提供者
 * - default.interceptor: 預設 HTTP 攔截器
 * - cache.interceptor: Redis 快取 HTTP 攔截器
 *
 * 網路模組提供：
 * - HTTP 請求攔截和處理
 * - 認證 Token 管理
 * - 錯誤處理和重試機制
 * - 請求/回應轉換
 * - Redis 快取整合
 *
 * 基於 ng-alain 20.0.0 框架的網路處理系統
 */

export { provideBindAuthRefresh } from './refresh-token';
export * from './default.interceptor';
