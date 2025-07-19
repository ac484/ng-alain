/**
 * NG-ALAIN Token 重新整理服務
 *
 * 此服務負責：
 * - 認證 Token 的自動重新整理
 * - 處理 401 認證失敗情況
 * - 重新附加新的 Token 到請求
 * - 防止重複的重新整理請求
 * - 提供兩種重新整理方式
 *
 * 重新整理方式：
 * - 方式一：使用 401 狀態碼觸發重新整理
 * - 方式二：使用 @delon/auth 的 refresh 介面
 *
 * 主要功能：
 * - 自動檢測 Token 過期
 * - 防止並發重新整理請求
 * - 重新發起失敗的請求
 * - 處理重新整理失敗的情況
 * - 提供應用程式初始化器
 *
 * 使用場景：
 * - 用戶會話過期處理
 * - 自動重新整理認證
 * - 無縫的用戶體驗
 *
 * 基於 ng-alain 20.0.0 框架的認證管理系統
 */

import { HttpClient, HttpHandlerFn, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { EnvironmentProviders, Injector, inject, provideAppInitializer } from '@angular/core';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';

import { toLogin } from './helper';

let refreshToking = false;
let refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

/**
 * 重新附加新 Token 信息
 *
 * > 由于已经发起的请求，不会再走一遍 `@delon/auth` 因此需要结合业务情况重新附加新的 Token
 */
function reAttachToken(injector: Injector, req: HttpRequest<any>): HttpRequest<any> {
  const token = injector.get(DA_SERVICE_TOKEN).get()?.token;
  return req.clone({
    setHeaders: {
      token: `Bearer ${token}`
    }
  });
}

function refreshTokenRequest(injector: Injector): Observable<any> {
  const model = injector.get(DA_SERVICE_TOKEN).get();
  return injector.get(HttpClient).post(`/api/auth/refresh`, { headers: { refresh_token: model?.['refresh_token'] || '' } });
}

/**
 * 刷新Token方式一：使用 401 重新刷新 Token
 */
export function tryRefreshToken(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  // 1、若请求为刷新Token请求，表示来自刷新Token可以直接跳转登录页
  if ([`/api/auth/refresh`].some(url => req.url.includes(url))) {
    toLogin(injector);
    return throwError(() => ev);
  }
  // 2、如果 `refreshToking` 为 `true` 表示已经在请求刷新 Token 中，后续所有请求转入等待状态，直至结果返回后再重新发起请求
  if (refreshToking) {
    return refreshToken$.pipe(
      filter(v => !!v),
      take(1),
      switchMap(() => next(reAttachToken(injector, req)))
    );
  }
  // 3、尝试调用刷新 Token
  refreshToking = true;
  refreshToken$.next(null);

  return refreshTokenRequest(injector).pipe(
    switchMap(res => {
      // 通知后续请求继续执行
      refreshToking = false;
      refreshToken$.next(res);
      // 重新保存新 token
      injector.get(DA_SERVICE_TOKEN).set(res);
      // 重新发起请求
      return next(reAttachToken(injector, req));
    }),
    catchError(err => {
      refreshToking = false;
      toLogin(injector);
      return throwError(() => err);
    })
  );
}

function buildAuthRefresh(injector: Injector): void {
  const tokenSrv = injector.get(DA_SERVICE_TOKEN);
  tokenSrv.refresh
    .pipe(
      filter(() => !refreshToking),
      switchMap(res => {
        console.log(res);
        refreshToking = true;
        return refreshTokenRequest(injector);
      })
    )
    .subscribe({
      next: res => {
        // TODO: Mock expired value
        res.expired = +new Date() + 1000 * 60 * 5;
        refreshToking = false;
        tokenSrv.set(res);
      },
      error: () => toLogin(injector)
    });
}

/**
 * 刷新Token方式二：使用 `@delon/auth` 的 `refresh` 接口，需要在 `app.config.ts` 中注册 `provideBindAuthRefresh`
 */
export function provideBindAuthRefresh(): EnvironmentProviders[] {
  return [
    provideAppInitializer(() => {
      const initializerFn = (
        (injector: Injector) => () =>
          buildAuthRefresh(injector)
      )(inject(Injector));
      return initializerFn();
    })
  ];
}
