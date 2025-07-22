/**
 * NG-ALAIN 應用程式配置檔案
 *
 * 此檔案負責：
 * - Angular 應用程式的全域配置
 * - 路由配置和功能設定
 * - HTTP 客戶端和攔截器配置
 * - 國際化 (i18n) 設定
 * - ng-alain 框架配置
 * - ng-zorro-antd 元件庫配置
 * - 認證和權限配置
 * - 主題和圖示配置
 * - Firebase 整合配置
 *
 * 基於 ng-alain 20.0.0 框架，採用 Angular 20 獨立 API 模式
 *
 * 架構說明：
 * - 使用 Angular 20 的 ApplicationConfig 進行全域配置
 * - 整合 ng-alain 框架的所有核心功能
 * - 配置 Firebase 服務和功能
 * - 設定路由、HTTP、國際化等基礎設施
 *
 * 主要配置模組：
 * - HTTP 配置：客戶端、攔截器、認證
 * - 路由配置：路由功能、導航、轉場動畫
 * - ng-alain 配置：框架設定、語言、圖示
 * - ng-zorro 配置：元件庫設定
 * - Firebase 配置：認證、Firestore、分析等服務
 *
 * 配置特點：
 * - 模組化配置：每個功能模組獨立配置
 * - 環境感知：根據環境變數調整配置
 * - 懶載入支援：路由模組支援懶載入
 * - 錯誤處理：完整的錯誤處理機制
 *
 * Firebase 整合：
 * - Authentication: 用戶認證
 * - Firestore: 資料庫
 * - Analytics: 分析追蹤
 * - App Check: 應用程式檢查
 * - Functions: 雲端函數
 * - Messaging: 推播通知
 * - Performance: 效能監控
 * - Storage: 檔案儲存
 * - Remote Config: 遠端配置
 * - Vertex AI: AI 服務
 */

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { default as ngLang } from '@angular/common/locales/zh';
import { ApplicationConfig, EnvironmentProviders, Provider } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getAuth, provideAuth as provideAuth_alias } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withHashLocation,
  RouterFeatures,
  withViewTransitions
} from '@angular/router';
import { I18NService, defaultInterceptor, provideBindAuthRefresh, provideStartup } from '@core';
import { provideCellWidgets } from '@delon/abc/cell';
import { provideSTWidgets } from '@delon/abc/st';
import { authSimpleInterceptor, provideAuth } from '@delon/auth';
import { provideSFConfig } from '@delon/form';
import { AlainProvideLang, provideAlain, zh_CN as delonLang } from '@delon/theme';
import { AlainConfig } from '@delon/util/config';
import { environment } from '@env/environment';
import { CELL_WIDGETS, SF_WIDGETS, ST_WIDGETS } from '@shared';
import { zhCN as dateLang } from 'date-fns/locale';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN as zorroLang } from 'ng-zorro-antd/i18n';

import { ICONS } from '../style-icons';
import { ICONS_AUTO } from '../style-icons-auto';
import { routes } from './routes/routes';

/**
 * 預設語言配置
 *
 * 功能：
 * - 設定應用程式的預設語言為中文
 * - 整合 Angular、ng-zorro、date-fns、ng-alain 的語言包
 * - 提供完整的國際化支援
 *
 * 語言包組成：
 * - abbr: 語言代碼 (zh-CN)
 * - ng: Angular 核心語言包
 * - zorro: ng-zorro-antd 元件庫語言包
 * - date: date-fns 日期處理語言包
 * - delon: ng-alain 框架語言包
 */
const defaultLang: AlainProvideLang = {
  abbr: 'zh-CN', // 中文簡體
  ng: ngLang, // Angular 語言包
  zorro: zorroLang, // ng-zorro 語言包
  date: dateLang, // date-fns 語言包
  delon: delonLang // ng-alain 語言包
};

/**
 * ng-alain 框架配置
 *
 * 功能：
 * - 設定 ng-alain 框架的全域配置
 * - 配置表格、頁面標題、列印、認證等功能
 * - 提供企業級應用程式的基礎設定
 *
 * 配置項目：
 * - st: 表格元件配置 (模態框大小為 lg)
 * - pageHeader: 頁面標題配置 (首頁 i18n 鍵)
 * - lodop: 列印功能授權配置
 * - auth: 認證配置 (登入頁面路徑)
 */
const alainConfig: AlainConfig = {
  st: { modal: { size: 'lg' } }, // 表格模態框大小
  pageHeader: { homeI18n: 'home' }, // 頁面標題首頁鍵
  lodop: {
    license: `A59B099A586B3851E0F0D7FDBF37B603`, // 列印授權碼
    licenseA: `C94CEE276DB2187AE6B65D56B3FC2848` // 列印授權碼 A
  },
  auth: { login_url: '/passport/login' } // 認證登入頁面路徑
};

/**
 * ng-zorro-antd 元件庫配置
 *
 * 功能：
 * - 設定 ng-zorro-antd 元件庫的全域配置
 * - 配置元件的預設行為和樣式
 * - 提供統一的元件使用體驗
 *
 * 目前配置：
 * - 使用預設配置，可根據需要添加自訂配置
 * - 支援主題、元件大小、語言等配置
 */
const ngZorroConfig: NzConfig = {};

/**
 * 路由功能配置
 *
 * 功能：
 * - 設定 Angular 路由的進階功能
 * - 配置路由的導航行為和用戶體驗
 * - 支援不同的路由模式
 *
 * 路由功能：
 * - withComponentInputBinding: 支援元件輸入綁定
 * - withViewTransitions: 支援視圖轉場動畫
 * - withInMemoryScrolling: 支援記憶體滾動位置恢復
 * - withHashLocation: 支援 Hash 路由模式 (可選)
 *
 * 環境配置：
 * - 根據 environment.useHash 決定是否使用 Hash 路由
 * - 提供靈活的路由模式選擇
 */
const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(), // 元件輸入綁定
  withViewTransitions(), // 視圖轉場動畫
  withInMemoryScrolling({ scrollPositionRestoration: 'top' }) // 滾動位置恢復
];

// 根據環境配置決定是否使用 Hash 路由
if (environment.useHash) routerFeatures.push(withHashLocation());

/**
 * 核心服務提供者配置
 *
 * 功能：
 * - 配置應用程式的所有核心服務
 * - 提供 HTTP、路由、認證、國際化等基礎設施
 * - 整合 ng-alain 和 ng-zorro 框架服務
 *
 * 服務組成：
 * - HTTP 服務：客戶端、攔截器、認證
 * - 動畫服務：Angular 動畫支援
 * - 路由服務：路由配置和功能
 * - ng-alain 服務：框架核心功能
 * - ng-zorro 服務：元件庫配置
 * - 認證服務：用戶認證和權限
 * - 小工具服務：表格和表單小工具
 * - 啟動服務：應用程式初始化
 * - 環境服務：環境特定的提供者
 */
const providers: Array<Provider | EnvironmentProviders> = [
  // HTTP 客戶端配置
  provideHttpClient(
    withInterceptors([
      ...(environment.interceptorFns ?? []), // 環境特定的攔截器
      authSimpleInterceptor, // 認證攔截器
      defaultInterceptor // 預設攔截器
    ])
  ),

  // 動畫支援
  provideAnimations(),

  // 路由配置
  provideRouter(routes, ...routerFeatures),

  // ng-alain 框架配置
  provideAlain({
    config: alainConfig,
    defaultLang,
    i18nClass: I18NService,
    icons: [...ICONS_AUTO, ...ICONS]
  }),

  // ng-zorro 元件庫配置
  provideNzConfig(ngZorroConfig),

  // 認證服務
  provideAuth(),

  // 小工具配置
  provideCellWidgets(...CELL_WIDGETS), // Cell 小工具
  provideSTWidgets(...ST_WIDGETS), // ST 表格小工具
  provideSFConfig({ widgets: SF_WIDGETS }), // SF 表單小工具

  // 啟動服務
  provideStartup(),

  // 環境特定的提供者
  ...(environment.providers || [])
];

/**
 * 認證 Token 刷新配置
 *
 * 功能：
 * - 配置 @delon/auth 的 Token 自動刷新功能
 * - 在 Token 過期時自動刷新，提升用戶體驗
 * - 支援不同的 Token 刷新策略
 *
 * 配置條件：
 * - environment.api.refreshTokenEnabled: 啟用 Token 刷新
 * - environment.api.refreshTokenType === 'auth-refresh': 使用 auth-refresh 策略
 *
 * 注意事項：
 * - 只有在啟用 Token 刷新時才會註冊此服務
 * - 需要配合後端 API 支援 Token 刷新機制
 */
// 如果使用 @delon/auth 進行 Token 刷新，需要額外註冊 provideBindAuthRefresh
if (environment.api?.refreshTokenEnabled && environment.api.refreshTokenType === 'auth-refresh') {
  providers.push(provideBindAuthRefresh());
}

/**
 * 應用程式配置
 *
 * 功能：
 * - 整合所有核心服務和 Firebase 服務
 * - 提供完整的應用程式運行環境
 * - 配置企業級應用程式的所有必要服務
 *
 * 配置組成：
 * - 核心服務：HTTP、路由、認證、國際化等
 * - Firebase 服務：認證、資料庫、分析、雲端函數等
 * - 企業級功能：效能監控、推播通知、遠端配置等
 *
 * Firebase 專案配置：
 * - 專案 ID: lin-in
 * - 應用程式 ID: 1:387803341154:web:ff4088f6444c0c27a78c3b
 * - 儲存桶: lin-in.firebasestorage.app
 * - 認證網域: lin-in.firebaseapp.com
 * - 分析 ID: G-XJV1NM348D
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // 核心服務提供者
    ...providers,

    // Firebase 應用程式初始化
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'lin-in', // Firebase 專案 ID
        appId: '1:387803341154:web:ff4088f6444c0c27a78c3b', // 應用程式 ID
        storageBucket: 'lin-in.firebasestorage.app', // 儲存桶
        apiKey: 'AIzaSyCX4rENtBHJAxypxNpx5YrFU-gHZl3L2-s', // API 金鑰
        authDomain: 'lin-in.firebaseapp.com', // 認證網域
        messagingSenderId: '387803341154', // 訊息發送者 ID
        measurementId: 'G-XJV1NM348D' // 分析 ID
      })
    ),

    // Firebase 核心服務
    provideAuth_alias(() => getAuth()), // 認證服務
    provideAnalytics(() => getAnalytics()), // 分析服務
    ScreenTrackingService, // 螢幕追蹤服務
    UserTrackingService, // 用戶追蹤服務

    // Firebase 安全服務
    provideAppCheck(() => {
      // TODO: 獲取 reCAPTCHA Enterprise 金鑰 https://console.cloud.google.com/security/recaptcha?project=_
      const provider = new ReCaptchaEnterpriseProvider('6Ld5gYgrAAAAAKVLmZSwqvTKsPAdOShDp6hNiBad');
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }),

    // Firebase 資料和功能服務
    provideFirestore(() => getFirestore()), // Firestore 資料庫
    provideFunctions(() => getFunctions()), // 雲端函數
    provideMessaging(() => getMessaging()), // 推播通知
    providePerformance(() => getPerformance()), // 效能監控
    provideStorage(() => getStorage()), // 檔案儲存
    provideRemoteConfig(() => getRemoteConfig()), // 遠端配置
    provideVertexAI(() => getVertexAI()) // Vertex AI 服務
  ]
};
