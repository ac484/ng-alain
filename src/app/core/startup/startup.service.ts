/**
 * NG-ALAIN 啟動服務
 *
 * 此服務負責：
 * - 應用程式啟動時的初始化工作
 * - 載入基本資料（選單、用戶資料等）
 * - 設定國際化語言資料
 * - 配置應用程式資訊和用戶資訊
 * - 初始化權限控制 (ACL)
 * - 設定頁面標題
 *
 * 主要功能：
 * - 載入語言包資料
 * - 載入應用程式配置資料
 * - 設定全域服務配置
 * - 處理啟動錯誤和異常
 * - 提供應用程式初始化器
 *
 * 使用場景：
 * - 應用程式啟動時自動執行
 * - 載入必要的全域配置
 * - 初始化用戶會話資料
 *
 * 基於 ng-alain 20.0.0 框架的啟動系統
 *
 * 架構說明：
 * - 使用 Angular 的 provideAppInitializer 進行應用程式初始化
 * - 整合 ng-alain 的 MenuService、SettingsService、ACLService
 * - 支援國際化 (i18n) 語言切換
 * - 提供錯誤處理和重定向機制
 *
 * 初始化流程：
 * 1. 載入預設語言包資料
 * 2. 載入應用程式配置 (app-data.json)
 * 3. 設定語言資料到 i18n 服務
 * 4. 設定應用程式資訊 (站點名、描述、年份)
 * 5. 設定用戶資訊 (姓名、頭像、郵箱)
 * 6. 設定 ACL 權限為全量 (開發階段)
 * 7. 初始化選單資料
 * 8. 設定頁面標題後綴
 *
 * 錯誤處理：
 * - 網路請求失敗時顯示警告
 * - 自動重定向到 500 錯誤頁面
 * - 提供錯誤日誌記錄
 *
 * 依賴服務：
 * - MenuService: 選單管理
 * - SettingsService: 應用設定管理
 * - ACLService: 權限控制
 * - TitleService: 頁面標題管理
 * - I18NService: 國際化服務
 * - HttpClient: HTTP 請求
 * - Router: 路由導航
 */

import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, Provider, inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, zip, catchError, map } from 'rxjs';

import { I18NService } from '../i18n/i18n.service';

/**
 * 應用程式啟動提供者
 *
 * 功能：
 * - 提供應用程式初始化器
 * - 在應用程式啟動時自動執行 StartupService.load()
 * - 確保所有必要的服務和資料在應用程式運行前載入完成
 *
 * 使用方式：
 * - 在 app.config.ts 中註冊此提供者
 * - 應用程式啟動時會自動執行初始化流程
 * - 支援依賴注入，自動注入 StartupService
 *
 * 返回值：
 * - Array<Provider | EnvironmentProviders>: 包含 StartupService 和應用程式初始化器
 */
export function provideStartup(): Array<Provider | EnvironmentProviders> {
  return [
    StartupService,
    provideAppInitializer(() => {
      const initializerFn = (
        (startupService: StartupService) => () =>
          startupService.load()
      )(inject(StartupService));
      return initializerFn();
    })
  ];
}

@Injectable()
export class StartupService {
  // 注入 ng-alain 核心服務
  private menuService = inject(MenuService); // 選單管理服務
  private settingService = inject(SettingsService); // 應用設定服務
  private aclService = inject(ACLService); // 權限控制服務
  private titleService = inject(TitleService); // 頁面標題服務

  // 注入 Angular 核心服務
  private httpClient = inject(HttpClient); // HTTP 客戶端
  private router = inject(Router); // 路由服務

  // 注入國際化服務
  private i18n = inject<I18NService>(ALAIN_I18N_TOKEN); // 國際化服務

  /**
   * 載入應用程式啟動資料
   *
   * 功能：
   * - 並行載入語言包資料和應用程式配置
   * - 設定國際化語言資料
   * - 配置應用程式基本資訊
   * - 初始化用戶資料和權限
   * - 設定選單和頁面標題
   *
   * 載入流程：
   * 1. 獲取預設語言設定
   * 2. 並行請求語言包和應用配置
   * 3. 設定語言資料到 i18n 服務
   * 4. 設定應用程式資訊 (站點名、描述、年份)
   * 5. 設定用戶資訊 (姓名、頭像、郵箱)
   * 6. 設定 ACL 權限為全量 (開發階段)
   * 7. 初始化選單資料
   * 8. 設定頁面標題後綴
   *
   * 錯誤處理：
   * - 網路請求失敗時記錄警告日誌
   * - 延遲 1 秒後重定向到 500 錯誤頁面
   * - 返回空陣列避免應用程式崩潰
   *
   * 注意事項：
   * - 如果需要匿名訪問，可以添加 ALLOW_ANONYMOUS 標記
   * - 開發階段 ACL 設為全量，生產環境需要根據實際權限設定
   *
   * @returns Observable<void> 初始化完成的 Observable
   */
  load(): Observable<void> {
    // 獲取預設語言設定
    const defaultLang = this.i18n.defaultLang;

    // 如果需要匿名訪問，可以添加 ALLOW_ANONYMOUS 標記
    // this.httpClient.get('/app', { context: new HttpContext().set(ALLOW_ANONYMOUS, this.tokenService.get()?.token ? false : true) })

    // 並行載入語言包資料和應用程式配置
    return zip(
      this.i18n.loadLangData(defaultLang), // 載入語言包資料
      this.httpClient.get('./assets/tmp/app-data.json') // 載入應用程式配置
    ).pipe(
      // 錯誤處理：接收其他攔截器後產生的異常訊息
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        // 延遲 1 秒後重定向到 500 錯誤頁面
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      // 處理載入成功的資料
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        // 1. 設定語言資料到 i18n 服務
        this.i18n.use(defaultLang, langData);

        // 2. 設定應用程式資訊：包括站點名、描述、年份
        this.settingService.setApp(appData.app);

        // 3. 設定用戶資訊：包括姓名、頭像、郵箱地址
        this.settingService.setUser(appData.user);

        // 4. ACL：設定權限為全量 (開發階段，生產環境需要根據實際權限設定)
        this.aclService.setFull(true);

        // 5. 初始化選單資料
        this.menuService.add(appData.menu);

        // 6. 設定頁面標題的後綴
        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }
}
