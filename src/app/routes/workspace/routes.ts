/**
 * Workspace 模組路由配置
 *
 * 此檔案定義工作區管理模組的路由配置
 * 包含工作區列表、創建工作區、工作區設定等功能
 *
 * 路由功能：
 * - list: 工作區列表展示
 * - create: 創建新的工作區
 * - settings: 工作區設定管理
 * - calendar: 工作區行事曆
 * - task: 任務管理功能
 * - overview: 工作區概覽
 * - timeline: 時間軸功能
 * - memos: 備忘錄管理
 * - inspection: 檢查項目管理
 * - daily-log: 日誌記錄功能
 *
 * 技術特點：
 * - 使用 Angular 懶載入提升效能
 * - 支援獨立元件載入
 * - 預設重定向到列表頁面
 * - 工作區協作功能整合
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
