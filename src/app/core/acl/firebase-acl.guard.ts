/**
 * Firebase ACL 路由守衛
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Cloud Firestore
 * 整合 Firebase 認證與 ng-alain ACL 權限控制
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FirebaseAclLoaderService } from './firebase-acl-loader.service';

export interface AclGuardData {
  guard_url?: string;
  role?: string | string[];
  permission?: string | string[];
}

export const firebaseAclGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const aclService = inject(ACLService);
  const tokenService = inject(DA_SERVICE_TOKEN);
  const aclLoader = inject(FirebaseAclLoaderService);

  const data: AclGuardData = route.data as AclGuardData;

  return new Observable<boolean>(observer => {
    // 檢查用戶是否已登入
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (!user) {
        // 未登入，重定向到登入頁面
        router.navigate(['/passport/login']);
        observer.next(false);
        observer.complete();
        return;
      }

      try {
        // 載入用戶權限
        const permissions = await aclLoader.loadUserPermissions(user.uid).toPromise();

        if (!permissions) {
          router.navigate(['/passport/login']);
          observer.next(false);
          observer.complete();
          return;
        }

        // 檢查角色權限
        if (data.role) {
          const roles = Array.isArray(data.role) ? data.role : [data.role];
          const hasRole = roles.includes(permissions.role);

          if (!hasRole) {
            router.navigate([data.guard_url || '/exception/403']);
            observer.next(false);
            observer.complete();
            return;
          }
        }

        // 檢查功能權限
        if (data.permission) {
          const permissionsList = Array.isArray(data.permission) ? data.permission : [data.permission];
          const hasPermission = permissionsList.some(permission => permissions.permissions.includes(permission));

          if (!hasPermission) {
            router.navigate([data.guard_url || '/exception/403']);
            observer.next(false);
            observer.complete();
            return;
          }
        }

        observer.next(true);
        observer.complete();
      } catch (error) {
        console.error('ACL Guard Error:', error);
        router.navigate(['/passport/login']);
        observer.next(false);
        observer.complete();
      }
    });

    return () => unsubscribe();
  });
};
