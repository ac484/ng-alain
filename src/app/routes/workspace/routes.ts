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
        path: 'calendar',
        loadComponent: () => import('./calendar/calendar.component').then(m => m.WorkspaceCalendarComponent)
      },
      {
        path: 'task',
        loadComponent: () => import('./task/task.component').then(m => m.WorkspaceTaskComponent)
      },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(m => m.WorkspaceOverviewComponent)
      },
      {
        path: 'timeline',
        loadComponent: () => import('./timeline/timeline.component').then(m => m.WorkspaceTimelineComponent)
      },
      {
        path: 'memos',
        loadComponent: () => import('./memos/memos.component').then(m => m.WorkspaceMemosComponent)
      },
      {
        path: 'inspection',
        loadComponent: () => import('./inspection/inspection.component').then(m => m.WorkspaceInspectionComponent)
      },
      {
        path: 'daily-log',
        loadComponent: () => import('./daily-log/daily-log.component').then(m => m.WorkspaceDailyLogComponent)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
] as Routes;
