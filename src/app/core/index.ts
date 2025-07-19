/**
 * NG-ALAIN 核心模組匯出檔案
 *
 * 此檔案匯出：
 * - i18n 國際化服務
 * - 網路相關服務和攔截器
 * - 啟動服務
 * - 路由守衛
 * - Redis 快取服務
 * - 記憶體狀態管理服務
 * - Redis 和記憶體配置
 *
 * 核心模組提供全域服務，不包含業務邏輯
 * 基於 ng-alain 20.0.0 框架的核心架構
 */

export * from './i18n/i18n.service';
export * from './net/index';
export * from './startup/startup.service';
export * from './start-page.guard';
export * from './auth/firebase-auth.service';
export * from './acl/firebase-acl-loader.service';
export * from './acl/firebase-acl.guard';
