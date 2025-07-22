# Angular CLI Server Rules for ng-alain Project

## Core Principles
- 嚴格遵循 ng-alain 20.0.0 架構規範
- 使用 Angular 20.0.0 最新特性
- 保持極簡主義代碼風格

## CLI Commands for ng-alain

### 1. 生成元件 (Components)
```bash
# 基本元件生成
ng generate component routes/feature-name/component-name

# 使用 ng-alain 特定配置
ng generate ng-alain:component component-name --path=routes/feature-name
```

### 2. 生成服務 (Services)
```bash
# 核心服務放在 core/services
ng generate service core/services/service-name

# 功能服務放在對應模組
ng generate service routes/feature-name/services/service-name
```

### 3. 生成模組 (Modules)
```bash
# 路由模組
ng generate module routes/feature-name --routing

# 共享模組
ng generate module shared/modules/module-name
```

### 4. 生成守衛 (Guards)
```bash
# 路由守衛
ng generate guard core/guards/guard-name
```

### 5. 生成攔截器 (Interceptors)
```bash
# HTTP 攔截器
ng generate interceptor core/interceptors/interceptor-name
```

## ng-alain Specific Commands

### 1. 生成 ng-alain 元件
```bash
# 生成 ST 表格元件
ng generate ng-alain:st component-name

# 生成 SF 表單元件
ng generate ng-alain:sf component-name

# 生成 SE 搜尋元件
ng generate ng-alain:se component-name
```

### 2. 生成頁面模板
```bash
# 生成列表頁面
ng generate ng-alain:list list-name

# 生成編輯頁面
ng generate ng-alain:edit edit-name

# 生成查看頁面
ng generate ng-alain:view view-name
```

## 檔案結構規範

### 元件結構
```
routes/feature-name/
├── component-name/
│   ├── component-name.component.ts
│   ├── component-name.component.html
│   ├── component-name.component.less
│   └── component-name.component.spec.ts
├── services/
│   └── feature.service.ts
└── routes.ts
```

### 核心服務結構
```
core/
├── services/
│   ├── firebase.service.ts
│   ├── auth.service.ts
│   └── api.service.ts
├── guards/
│   └── auth.guard.ts
└── interceptors/
    └── auth.interceptor.ts
```

## 命名規範

### 檔案命名
- 元件：`kebab-case.component.ts`
- 服務：`kebab-case.service.ts`
- 模組：`kebab-case.module.ts`
- 守衛：`kebab-case.guard.ts`

### 類別命名
- 元件：`PascalCaseComponent`
- 服務：`PascalCaseService`
- 模組：`PascalCaseModule`

## 配置規範

### angular.json 配置
```json
{
  "schematics": {
    "@schematics/angular:component": {
      "style": "less",
      "skipTests": false,
      "changeDetection": "OnPush"
    },
    "@schematics/angular:service": {
      "skipTests": false
    }
  }
}
```

### tsconfig.json 配置
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

## 最佳實踐

### 1. 元件生成
- 優先使用 ng-alain 內建元件
- 避免生成單次使用的元件
- 保持元件職責單一

### 2. 服務生成
- 核心服務放在 core/services
- 功能服務放在對應模組
- 使用 inject() 函數注入依賴

### 3. 模組生成
- 路由模組使用懶載入
- 共享模組避免循環依賴
- 保持模組職責明確

### 4. 測試生成
- 所有元件和服務都要生成測試
- 使用 ng-alain 測試工具
- 保持測試覆蓋率

## 禁止事項

### ❌ 不要做
- 生成不必要的 Wrapper 元件
- 在 shared 模組中提供 providers
- 生成單次使用的抽象層
- 使用 any 型別
- 生成過度複雜的模組結構

### ✅ 應該做
- 使用 ng-alain 內建功能
- 保持代碼簡潔
- 遵循 TypeScript 嚴格模式
- 使用 RxJS 進行響應式程式設計
- 實現適當的錯誤處理
