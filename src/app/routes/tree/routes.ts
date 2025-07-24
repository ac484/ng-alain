/**
 * Tree 模組路由配置
 *
 * 此檔案定義樹狀結構管理模組的路由配置
 * 包含樹狀列表、創建樹狀結構、樹狀設定等功能
 *
 * 路由功能：
 * - list: 樹狀結構列表展示
 * - create: 創建新的樹狀結構
 * - search: 樹狀節點搜尋功能
 * - import-export: 樹狀資料匯入匯出
 * - pdf-import: PDF 檔案匯入轉換
 * - pdf-scan: PDF 掃描功能
 * - settings: 樹狀設定管理
 * - drag: 拖曳功能展示
 * - context: 右鍵選單功能
 * - panel: 樹狀面板功能
 *
 * 技術特點：
 * - 使用 Angular 懶載入提升效能
 * - 支援獨立元件載入
 * - 預設重定向到列表頁面
 */

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'firebase-crud',
        loadComponent: () => import('./firebase-crud/firebase-crud.component').then(m => m.FirebaseCrudComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(m => m.TreeListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./template/create/create.component').then(m => m.TreeCreateComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./template/search/search.component').then(m => m.TreeSearchComponent)
      },
      {
        path: 'import-export',
        loadComponent: () => import('./template/import-export/import-export.component').then(m => m.TreeImportExportComponent)
      },
      {
        path: 'pdf-import',
        loadComponent: () => import('./template/pdf-import/pdf-import.component').then(m => m.TreePdfImportComponent)
      },
      {
        path: 'pdf-scan',
        loadComponent: () => import('./pdf-scan/pdf-scan.component').then(m => m.PdfScanComponent)
      },
      {
        path: 'scan-result',
        loadComponent: () => import('./scan-result/scan-result.component').then(m => m.ScanResultComponent)
      },
      {
        path: 'document-viewer',
        loadComponent: () => import('../../layout/basic/widgets/document-viewer.component').then(m => m.DocumentViewerComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./template/settings/settings.component').then(m => m.TreeSettingsComponent)
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
