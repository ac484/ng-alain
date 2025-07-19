/**
 * Tree 模組路由配置
 *
 * 此檔案定義樹狀結構管理模組的路由配置
 * 包含樹狀列表、創建樹狀結構、樹狀設定等功能
 */

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(m => m.TreeListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./create/create.component').then(m => m.TreeCreateComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(m => m.TreeSettingsComponent)
      },
      {
        path: 'drag',
        loadComponent: () => import('./drag/drag.component').then(m => m.TreeDragComponent)
      },
      {
        path: 'context',
        loadComponent: () => import('./context/context.component').then(m => m.TreeContextComponent)
      },
      {
        path: 'panel',
        loadComponent: () => import('./panel/panel.component').then(m => m.TreePanelComponent)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
] as Routes;
