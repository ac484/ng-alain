/**
 * NG-ALAIN 網路輔助工具函數
 *
 * 此檔案提供：
 * - HTTP 狀態碼錯誤訊息對應
 * - 路由導航輔助函數
 * - 認證相關工具函數
 * - 請求頭處理工具
 * - 狀態檢查工具
 *
 * 主要功能：
 * - CODEMESSAGE: HTTP 狀態碼對應的中文錯誤訊息
 * - goTo: 路由導航函數
 * - toLogin: 跳轉到登入頁面
 * - getAdditionalHeaders: 獲取額外的請求頭
 * - checkStatus: 檢查回應狀態並顯示錯誤
 *
 * 支援的狀態碼：
 * - 200-299: 成功狀態
 * - 400-499: 客戶端錯誤
 * - 500-599: 伺服器錯誤
 * - 特殊處理: 401 認證錯誤
 *
 * 使用場景：
 * - HTTP 攔截器錯誤處理
 * - 認證失敗處理
 * - 國際化請求頭設定
 * - 錯誤訊息本地化
 *
 * 基於 ng-alain 20.0.0 框架的網路工具系統
 */

import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface ReThrowHttpError {
  body: any;
  _throw: true;
}

export const CODEMESSAGE: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

export function goTo(injector: Injector, url: string): void {
  setTimeout(() => injector.get(Router).navigateByUrl(url));
}

export function toLogin(injector: Injector): void {
  injector.get(NzNotificationService).error(`未登录或登录已过期，请重新登录。`, ``);
  goTo(injector, injector.get(DA_SERVICE_TOKEN).login_url!);
}

export function getAdditionalHeaders(headers?: HttpHeaders): Record<string, string> {
  const res: Record<string, string> = {};
  const lang = inject(ALAIN_I18N_TOKEN).currentLang;
  if (!headers?.has('Accept-Language') && lang) {
    res['Accept-Language'] = lang;
  }

  return res;
}

export function checkStatus(injector: Injector, ev: HttpResponseBase): void {
  if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
    return;
  }

  const errortext = CODEMESSAGE[ev.status] || ev.statusText;
  injector.get(NzNotificationService).error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
}
