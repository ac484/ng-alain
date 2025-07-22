/**
 * NG-ALAIN Delon 模組路由配置
 *
 * 功能：定義 Delon 框架功能頁面路由
 * 包含：表格、工具、權限、表單等
 */

import { Routes } from '@angular/router';
import { aclCanActivate } from '@delon/acl';

import { ACLComponent } from './acl/acl.component';
import { ACLAdminComponent } from './acl-admin/acl-admin.component';
import { ACLPermissionsComponent } from './acl-permissions/acl-permissions.component';
import { ACLRolesComponent } from './acl-roles/acl-roles.component';
import { ACLUsersComponent } from './acl-users/acl-users.component';
import { CacheComponent } from './cache/cache.component';
import { DownFileComponent } from './downfile/downfile.component';
import { DelonFormComponent } from './form/form.component';
import { GuardAdminComponent } from './guard/admin.component';
import { GuardAuthComponent } from './guard/auth.component';
import { canLeave } from './guard/can-leave';
import { GuardComponent } from './guard/guard.component';
import { GuardLeaveComponent } from './guard/leave.component';
import { PrintComponent } from './print/print.component';
import { QRComponent } from './qr/qr.component';
import { STDemoComponent } from './st/st.component';
import { UtilComponent } from './util/util.component';
import { XlsxComponent } from './xlsx/xlsx.component';
import { ZipComponent } from './zip/zip.component';

export const routes: Routes = [
  {
    path: 'acl',
    component: ACLComponent,
    data: { title: 'ACL' }
  },
  {
    path: 'acl-admin',
    component: ACLAdminComponent,
    data: { title: 'ACL Admin' }
  },
  {
    path: 'acl-users',
    component: ACLUsersComponent,
    canActivate: [aclCanActivate],
    data: { title: '用戶管理', guard: 'admin' }
  },
  {
    path: 'acl-roles',
    component: ACLRolesComponent,
    canActivate: [aclCanActivate],
    data: { title: '角色管理', guard: 'admin' }
  },
  {
    path: 'acl-permissions',
    component: ACLPermissionsComponent,
    canActivate: [aclCanActivate],
    data: { title: '權限管理', guard: 'admin' }
  },
  {
    path: 'cache',
    component: CacheComponent,
    data: { title: 'Cache' }
  },
  {
    path: 'downfile',
    component: DownFileComponent,
    data: { title: 'Down File' }
  },
  {
    path: 'form',
    component: DelonFormComponent,
    data: { title: 'Form' }
  },
  {
    path: 'guard',
    component: GuardComponent,
    data: { title: 'Route Guard' }
  },
  {
    path: 'guard/auth',
    component: GuardAuthComponent,
    data: { title: 'Guard Auth' }
  },
  {
    path: 'guard/admin',
    component: GuardAdminComponent,
    canActivate: [aclCanActivate],
    data: { title: 'Guard Admin', guard: 'admin' }
  },
  {
    path: 'guard/leave',
    component: GuardLeaveComponent,
    canDeactivate: [canLeave],
    data: { title: 'Guard Leave' }
  },
  {
    path: 'print',
    component: PrintComponent,
    data: { title: 'Print' }
  },
  {
    path: 'qr',
    component: QRComponent,
    data: { title: 'QR' }
  },
  {
    path: 'st',
    component: STDemoComponent,
    data: { title: 'ST' }
  },
  {
    path: 'util',
    component: UtilComponent,
    data: { title: 'Util' }
  },
  {
    path: 'xlsx',
    component: XlsxComponent,
    data: { title: 'Xlsx' }
  },
  {
    path: 'zip',
    component: ZipComponent,
    data: { title: 'Zip' }
  }
];
