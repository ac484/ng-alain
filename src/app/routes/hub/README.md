# Hub 模組架構文件

## 概述

Hub 模組採用 Angular v20 最佳實踐，使用功能導向的目錄結構和獨立元件架構。

## 目錄結構

```
src/app/routes/hub/
├── core/                    # 核心基礎設施
│   ├── services/           # 核心服務 (HubCrudService)
│   └── models/             # 基礎資料模型
├── shared/                 # 共享元件
│   └── components/         # 可重用 UI 元件 (FAB)
├── features/               # 功能模組
│   ├── contracts/          # 合約管理功能
│   ├── settings/           # 設定管理功能
│   └── workspace/          # 工作區功能
└── routes.ts               # 主路由配置 (懶載入)
```

## 核心原則

### 1. 功能導向組織
- 每個功能都有獨立的目錄
- 包含 components、services、models 子目錄
- 使用 barrel exports (index.ts) 統一匯出

### 2. 獨立元件架構
- 所有元件都是 Angular v20 standalone 元件
- 使用 OnPush 變更檢測策略
- 採用 Angular Signals 進行狀態管理

### 3. 懶載入
- 功能模組透過路由懶載入
- 提升初始載入效能
- 支援程式碼分割

## 使用指南

### 新增功能模組

1. 在 `features/` 下建立新目錄
2. 建立 components、services、models 子目錄
3. 建立 routes.ts 檔案
4. 在主路由中加入懶載入配置

### 新增元件

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hub-my-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `<!-- template -->`
})
export class MyComponent {}
```

### 使用核心服務

```typescript
import { HubCrudService } from '../../core/services';
import { BaseModel } from '../../core/models';

interface MyModel extends BaseModel {
  name: string;
}

@Injectable()
export class MyService {
  constructor(private crudService: HubCrudService) {}
  
  list(): Observable<MyModel[]> {
    return this.crudService.useCollection<MyModel>('my_collection');
  }
}
```

## 路由配置

主路由使用懶載入：

```typescript
{
  path: 'my-feature',
  loadChildren: () => import('./features/my-feature/routes').then(m => m.myFeatureRoutes)
}
```

功能路由：

```typescript
export const myFeatureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/my-list').then(m => m.MyListComponent)
  }
];
```

## 最佳實踐

1. **保持極簡** - 避免過度設計，只實作必要功能
2. **類型安全** - 使用 TypeScript 泛型和介面
3. **一致性** - 遵循命名慣例和檔案結構
4. **效能優化** - 使用 OnPush 和 Signals
5. **可測試性** - 服務和元件分離，便於單元測試