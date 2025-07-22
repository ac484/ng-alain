/**
 * NG-ALAIN 應用程式根元件
 *
 * 此元件負責：
 * - 應用程式的根級別配置
 * - 路由事件監聽和處理
 * - 預載入器控制
 * - 標題服務管理
 * - 模態框管理
 * - 版本資訊顯示
 *
 * 基於 ng-alain 20.0.0 框架，採用 Angular 20 獨立 API 模式
 *
 * 架構說明：
 * - 使用 Angular 20 獨立元件模式
 * - 整合 ng-alain 的預載入器和標題服務
 * - 提供全域路由事件監聽
 * - 支援版本資訊顯示和模態框管理
 *
 * 主要功能：
 * - 路由事件處理：監聽路由載入、導航結束、錯誤等事件
 * - 預載入器控制：在路由載入時顯示預載入器，導航結束時隱藏
 * - 標題管理：自動設定頁面標題
 * - 模態框管理：導航結束時關閉所有模態框
 * - 錯誤處理：路由載入失敗時顯示確認對話框
 *
 * 版本資訊：
 * - 顯示 ng-alain 和 ng-zorro 的版本資訊
 * - 透過 host 屬性綁定到 DOM 元素
 *
 * 路由事件處理：
 * - RouteConfigLoadStart: 路由配置開始載入
 * - NavigationError: 路由導航錯誤
 * - NavigationEnd: 路由導航結束
 *
 * 依賴服務：
 * - Router: 路由服務，監聽路由事件
 * - TitleService: 標題服務，管理頁面標題
 * - NzModalService: 模態框服務，管理模態框
 * - stepPreloader: 預載入器控制函數
 */

import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN, stepPreloader } from '@delon/theme';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
  host: {
    '[attr.ng-alain-version]': 'ngAlainVersion',
    '[attr.ng-zorro-version]': 'ngZorroVersion'
  }
})
export class AppComponent implements OnInit {
  // 注入核心服務
  private readonly router = inject(Router); // 路由服務
  private readonly titleSrv = inject(TitleService); // 標題服務
  private readonly modalSrv = inject(NzModalService); // 模態框服務

  // 版本資訊
  ngAlainVersion = VERSION_ALAIN.full; // ng-alain 版本
  ngZorroVersion = VERSION_ZORRO.full; // ng-zorro 版本

  // 預載入器控制
  private donePreloader = stepPreloader();

  /**
   * 元件初始化
   *
   * 功能：
   * - 設定路由事件監聽器
   * - 處理路由載入、導航、錯誤等事件
   * - 控制預載入器顯示和隱藏
   * - 管理頁面標題和模態框
   *
   * 路由事件處理：
   * - RouteConfigLoadStart: 標記路由配置開始載入
   * - NavigationError: 處理路由導航錯誤，顯示確認對話框
   * - NavigationEnd: 完成預載入器、設定標題、關閉模態框
   *
   * 錯誤處理：
   * - 生產環境：提示用戶刷新頁面
   * - 開發環境：顯示具體的路由載入錯誤
   * - 提供刷新和忽略選項
   */
  ngOnInit(): void {
    let configLoad = false; // 標記是否正在載入路由配置

    // 監聽路由事件
    this.router.events.subscribe(ev => {
      // 路由配置開始載入
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }

      // 路由導航錯誤處理
      if (configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: `提醒`,
          nzContent: environment.production ? `应用可能已发布新版本，请点击刷新才能生效。` : `无法加载路由：${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: '刷新',
          nzCancelText: '忽略',
          nzOnOk: () => location.reload() // 刷新頁面
        });
      }

      // 路由導航結束
      if (ev instanceof NavigationEnd) {
        this.donePreloader(); // 完成預載入器
        this.titleSrv.setTitle(); // 設定頁面標題
        this.modalSrv.closeAll(); // 關閉所有模態框
      }
    });
  }
}
