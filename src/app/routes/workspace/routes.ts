/**
 * Workspace 模組路由配置
 *
 * 此檔案定義工作區管理模組的路由配置
 * 包含工作區列表、創建工作區、工作區設定等功能
 */

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(m => m.WorkspaceListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./create/create.component').then(m => m.WorkspaceCreateComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(m => m.WorkspaceSettingsComponent)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
] as Routes;
