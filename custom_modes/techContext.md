# 技術環境與開發配置

## 開發環境

### 核心技術棧
- **Angular**: v19.x (最新版本)
- **ng-alain**: v20.0.0 (企業級管理框架)
- **TypeScript**: v5.x (嚴格模式)
- **Node.js**: v18+ (推薦 v20 LTS)
- **包管理**: Yarn (v3.x)

### UI 與設計系統
- **ng-zorro-antd**: Angular Ant Design 組件庫
- **@delon/abc**: ng-alain 業務組件
- **@delon/form**: 動態表單組件
- **@delon/chart**: 圖表組件 (基於 G2)
- **@delon/acl**: 權限控制模組
- **@delon/auth**: 認證管理模組

### Firebase 技術棧
- **@angular/fire**: v18+ (Angular Firebase SDK)
- **Firebase Authentication**: 用戶認證服務
- **Cloud Firestore**: NoSQL 資料庫
- **Firebase Hosting**: 靜態網站託管
- **Firebase Functions**: 雲端函數 (TypeScript)
- **Firebase Storage**: 檔案存儲服務

## 專案結構

### 主要目錄配置
```
ng-alain/
├── src/
│   ├── app/
│   │   ├── core/                 # 核心服務與配置
│   │   │   ├── firebase/         # Firebase 整合服務
│   │   │   ├── services/         # 通用服務
│   │   │   └── startup/          # 應用啟動配置
│   │   ├── routes/               # 路由模組
│   │   │   ├── delon/           # 🚫 待移除的分散 ACL 頁面
│   │   │   ├── system/          # 🆕 統一系統管理模組 (待建立)
│   │   │   ├── dashboard/       # 儀表板
│   │   │   ├── contract/        # 合約管理
│   │   │   └── workspace/       # 工作區管理
│   │   ├── shared/              # 共用組件與工具
│   │   └── layout/              # 佈局組件
│   ├── assets/                  # 靜態資源
│   └── environments/            # 環境配置
├── functions/                   # Firebase Functions
├── memory-bank/                 # Memory Bank 文檔
└── tasks.md                     # 任務追蹤
```

### 核心配置檔案
- **angular.json**: Angular CLI 配置
- **tsconfig.json**: TypeScript 編譯配置
- **package.json**: 依賴與腳本配置
- **firebase.json**: Firebase 專案配置
- **eslint.config.mjs**: 程式碼檢查配置
- **.cursorrules**: Cursor AI 專案規則

## 建構工具與工作流

### 開發工具
- **Angular CLI**: 專案腳手架與建構工具
- **ESLint**: 程式碼品質檢查
- **Prettier**: 程式碼格式化
- **Husky**: Git Hooks 管理
- **Firebase CLI**: Firebase 部署工具

### 建構腳本
```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:ssr": "node dist/server.js",
    "build:ssr": "ng build --configuration production && ng run ng-alain:server:production",
    "firebase:emulator": "firebase emulators:start",
    "firebase:deploy": "ng build --configuration production && firebase deploy"
  }
}
```

### 開發工作流
1. **本地開發**: `yarn start` (支援熱重載)
2. **Firebase 模擬器**: `yarn firebase:emulator`
3. **程式碼檢查**: `yarn lint`
4. **測試執行**: `yarn test`
5. **生產建構**: `yarn build`
6. **Firebase 部署**: `yarn firebase:deploy`

## 依賴管理

### 核心依賴
```json
{
  "@angular/core": "^19.0.0",
  "@angular/fire": "^18.0.0",
  "@delon/abc": "^20.0.0",
  "@delon/acl": "^20.0.0",
  "@delon/auth": "^20.0.0",
  "@delon/form": "^20.0.0",
  "ng-zorro-antd": "^19.0.0",
  "rxjs": "^7.8.0",
  "firebase": "^10.0.0"
}
```

### 開發依賴
```json
{
  "@angular/cli": "^19.0.0",
  "@types/node": "^20.0.0",
  "eslint": "^9.0.0",
  "prettier": "^3.0.0",
  "typescript": "^5.6.0"
}
```

## 環境配置

### 開發環境 (development)
```typescript
export const environment = {
  production: false,
  useHash: false,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
```

### 生產環境 (production)
```typescript
export const environment = {
  production: true,
  useHash: false,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  firebase: {
    // 生產環境 Firebase 配置
  }
};
```

## TypeScript 配置

### 嚴格模式設定
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

### 路徑別名
```json
{
  "paths": {
    "@core": ["src/app/core"],
    "@core/*": ["src/app/core/*"],
    "@shared": ["src/app/shared"],
    "@shared/*": ["src/app/shared/*"],
    "@env/*": ["src/environments/*"]
  }
}
```

## 程式碼品質

### ESLint 配置
```javascript
export default [
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  }
];
```

### Prettier 配置
```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false
}
```

## Firebase 配置

### Firebase 專案設定
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

### Firestore 安全規則
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ACL 集合權限
    match /acl_users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /acl_roles/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/acl_users/$(request.auth.uid)).data.roles.hasAny(['admin']);
    }
  }
}
```

## 效能優化配置

### OnPush 變更檢測策略
```typescript
@Component({
  selector: 'app-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 懶載入模組
```typescript
{
  path: 'system',
  loadChildren: () => import('./system/routes').then(m => m.routes)
}
```

### Tree Shaking 優化
```json
{
  "optimization": {
    "usedExports": true,
    "sideEffects": false
  }
}
```

## 測試配置

### Karma 配置
```javascript
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-headless'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    browsers: ['ChromeHeadless']
  });
};
```

### 測試覆蓋率目標
- **函數覆蓋率**: > 80%
- **分支覆蓋率**: > 70%
- **行覆蓋率**: > 85%

## 部署配置

### GitHub Actions CI/CD
```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn build
      - run: yarn test
      - run: firebase deploy
```

### 效能監控
- **Lighthouse**: 自動化效能檢測
- **Firebase Performance**: 運行時效能監控
- **Bundle Analyzer**: 打包大小分析

---

**技術決策**: 基於現代 Angular 生態系統與 Firebase 雲端服務  
**升級策略**: 跟隨 Angular LTS 版本，定期更新依賴  
**維護方針**: 自動化測試、持續整合、程式碼品質保證 
