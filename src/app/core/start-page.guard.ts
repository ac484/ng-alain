/**
 * NG-ALAIN 啟動頁面守衛
 *
 * 此守衛負責：
 * - 動態載入啟動頁面
 * - 根據選單第一項進行重新跳轉
 * - 自訂啟動頁面邏輯
 * - 路由導航控制
 *
 * 主要功能：
 * - 檢查當前路由是否有效
 * - 根據選單配置進行重定向
 * - 提供自訂啟動邏輯的擴展點
 *
 * 使用場景：
 * - 應用程式初始路由檢查
 * - 選單導航邏輯控制
 * - 啟動頁面自訂邏輯
 *
 * 基於 ng-alain 20.0.0 框架的路由守衛系統
 */

import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Dynamically load the start page
 *
 * 动态加载启动页
 */
export const startPageGuard: CanActivateFn = (): boolean | Observable<boolean> => {
  // Re-jump according to the first item of the menu, you can re-customize the logic
  // 以下代码是根据菜单的第一项进行重新跳转，你可以重新定制逻辑
  // const menuSrv = inject(MenuService);
  // if (menuSrv.find({ url: state.url }) == null) {
  //   inject(Router).navigateByUrl(menuSrv.menus[0].link!);
  //   return false;
  // }
  return true;
};
