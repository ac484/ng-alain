# Deployment Rules for ng-alain Project

## Core Deployment Principles

### 1. Firebase 優先部署
- **Firebase Hosting**：主要部署平台
- **Firebase Functions**：後端 API 服務
- **Firebase Firestore**：資料庫服務
- **Firebase Auth**：認證服務

### 2. 環境分離
- **開發環境**：使用 Mock 資料
- **測試環境**：使用測試 Firebase 專案
- **生產環境**：使用正式 Firebase 專案

## Firebase 配置

### 1. firebase.json 配置
```json
{
  "firestore": {
    "database": "(default)",
    "location": "asia-east1",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint",
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ]
    }
  ],
  "apphosting": {
    "backendId": "ng-app",
    "rootDir": "dist",
    "ignore": [
      "node_modules",
      ".git",
      "firebase-debug.log",
      "firebase-debug.*.log"
    ]
  }
}
```

### 2. 環境變數配置
```typescript
// environment.ts (開發環境)
export const environment = {
  production: false,
  useHash: true,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  firebase: {
    apiKey: 'dev-api-key',
    authDomain: 'dev-project.firebaseapp.com',
    projectId: 'dev-project-id',
    storageBucket: 'dev-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'dev-app-id'
  },
  providers: [provideMockConfig({ data: MOCKDATA })],
  interceptorFns: [mockInterceptor]
};

// environment.prod.ts (生產環境)
export const environment = {
  production: true,
  useHash: false,
  api: {
    baseUrl: 'https://api.production.com',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  firebase: {
    apiKey: 'prod-api-key',
    authDomain: 'prod-project.firebaseapp.com',
    projectId: 'prod-project-id',
    storageBucket: 'prod-project.appspot.com',
    messagingSenderId: '987654321',
    appId: 'prod-app-id'
  }
};
```

## 建置配置

### 1. angular.json 建置配置
```json
{
  "build": {
    "builder": "@angular/build:application",
    "options": {
      "browser": "src/main.ts",
      "polyfills": ["zone.js"],
      "tsConfig": "tsconfig.app.json",
      "assets": [
        {
          "glob": "**/*",
          "input": "public"
        },
        "src/assets",
        "src/favicon.ico"
      ],
      "styles": ["src/styles.less"],
      "inlineStyleLanguage": "less",
      "stylePreprocessorOptions": {
        "includePaths": ["node_modules/"]
      }
    },
    "configurations": {
      "production": {
        "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.prod.ts"
          }
        ],
        "outputHashing": "all",
        "optimization": true,
        "sourceMap": false,
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "2mb",
            "maximumError": "6mb"
          },
          {
            "type": "anyComponentStyle",
            "maximumWarning": "6kb",
            "maximumError": "10kb"
          }
        ]
      },
      "development": {
        "optimization": false,
        "extractLicenses": false,
        "sourceMap": true
      }
    },
    "defaultConfiguration": "production"
  }
}
```

### 2. package.json 腳本配置
```json
{
  "scripts": {
    "ng-high-memory": "node --max_old_space_size=8000 ./node_modules/@angular/cli/bin/ng",
    "ng": "ng",
    "start": "ng s -o",
    "hmr": "ng s -o --hmr",
    "build": "npm run ng-high-memory build",
    "build:dev": "npm run ng-high-memory build --configuration=development",
    "build:prod": "npm run ng-high-memory build --configuration=production",
    "analyze": "npm run ng-high-memory build -- --source-map",
    "analyze:view": "source-map-explorer dist/**/*.js",
    "lint": "npm run lint:ts && npm run lint:style",
    "lint:ts": "npx eslint --cache --fix",
    "lint:style": "npx stylelint 'src/**/*.less'",
    "test": "ng test --watch",
    "test:coverage": "ng test --code-coverage --watch=false",
    "e2e": "ng e2e",
    "deploy:dev": "npm run build:dev && firebase deploy --project=dev-project",
    "deploy:prod": "npm run build:prod && firebase deploy --project=prod-project",
    "firebase:dev": "firebase use dev-project",
    "firebase:prod": "firebase use prod-project"
  }
}
```

## 部署流程

### 1. 開發環境部署
```bash
# 切換到開發環境
npm run firebase:dev

# 建置開發版本
npm run build:dev

# 部署到開發環境
npm run deploy:dev
```

### 2. 生產環境部署
```bash
# 切換到生產環境
npm run firebase:prod

# 建置生產版本
npm run build:prod

# 部署到生產環境
npm run deploy:prod
```

### 3. 自動化部署腳本
```bash
#!/bin/bash
# deploy.sh

set -e

# 檢查環境變數
if [ -z "$FIREBASE_PROJECT" ]; then
  echo "Error: FIREBASE_PROJECT environment variable is not set"
  exit 1
fi

# 安裝依賴
echo "Installing dependencies..."
npm ci

# 執行測試
echo "Running tests..."
npm run test:coverage

# 執行程式碼檢查
echo "Running linting..."
npm run lint

# 建置應用程式
echo "Building application..."
if [ "$FIREBASE_PROJECT" = "prod-project" ]; then
  npm run build:prod
else
  npm run build:dev
fi

# 部署到 Firebase
echo "Deploying to Firebase..."
firebase deploy --project=$FIREBASE_PROJECT

echo "Deployment completed successfully!"
```

## Firebase 服務配置

### 1. Firestore 安全規則
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用戶只能存取自己的資料
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 管理員可以存取所有資料
    match /{document=**} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 2. Firestore 索引配置
```json
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "posts",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "authorId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
```

### 3. Firebase Functions 配置
```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// API 端點
export const api = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // API 邏輯
  res.json({ message: 'API is working' });
});

// 觸發器函數
export const onUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const userData = snap.data();
    console.log('New user created:', userData);
  });
```

## 效能優化

### 1. 建置優化
```typescript
// 程式碼分割
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];

// 預載入策略
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
export class AppRoutingModule {}
```

### 2. 快取策略
```typescript
// Service Worker 配置
// ngsw-config.json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(svg|cur|jpg|jpeg|png|apng|webp|avif|gif|otf|ttf|woff|woff2)"
        ]
      }
    }
  ]
}
```

## 監控與日誌

### 1. 錯誤監控
```typescript
// 全域錯誤處理
@Injectable()
export class ErrorService {
  constructor(private http: HttpClient) {}

  logError(error: Error, context?: any): void {
    const errorLog = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // 發送到錯誤監控服務
    this.http.post('/api/errors', errorLog).subscribe();
  }
}

// 全域錯誤攔截器
@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        this.errorService.logError(error, { url: req.url, method: req.method });
        return throwError(() => error);
      })
    );
  }
}
```

### 2. 效能監控
```typescript
// 效能監控服務
@Injectable()
export class PerformanceService {
  constructor(private http: HttpClient) {}

  logPageLoad(pageName: string, loadTime: number): void {
    const performanceLog = {
      pageName,
      loadTime,
      timestamp: new Date().toISOString()
    };

    this.http.post('/api/performance', performanceLog).subscribe();
  }

  logApiCall(endpoint: string, duration: number): void {
    const apiLog = {
      endpoint,
      duration,
      timestamp: new Date().toISOString()
    };

    this.http.post('/api/performance/api', apiLog).subscribe();
  }
}
```

## 安全配置

### 1. CSP 配置
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com/ https://www.googleapis.com/;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/;
               font-src 'self' https://fonts.gstatic.com/;
               img-src 'self' data: https:;
               connect-src 'self' https://firestore.googleapis.com/ https://identitytoolkit.googleapis.com/;">
```

### 2. HTTPS 強制
```typescript
// 強制 HTTPS
if (environment.production && location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## 部署檢查清單

### ✅ 部署前檢查
- [ ] 所有測試通過
- [ ] 程式碼檢查通過
- [ ] 建置成功
- [ ] 環境變數配置正確
- [ ] Firebase 專案配置正確
- [ ] 安全規則配置正確
- [ ] 索引配置正確

### ✅ 部署後檢查
- [ ] 應用程式正常載入
- [ ] 認證功能正常
- [ ] 資料庫連接正常
- [ ] API 端點正常
- [ ] 效能指標正常
- [ ] 錯誤監控正常

### ❌ 禁止事項
- [ ] 直接部署到生產環境
- [ ] 跳過測試步驟
- [ ] 使用開發環境配置部署生產
- [ ] 忽略安全規則配置
- [ ] 跳過程式碼檢查

## 回滾策略

### 1. 自動回滾
```bash
#!/bin/bash
# rollback.sh

# 回滾到上一個版本
firebase hosting:clone ng-app:live ng-app:live --version=$(firebase hosting:versions --limit=2 | tail -n 1 | awk '{print $1}')

echo "Rollback completed successfully!"
```

### 2. 手動回滾
```bash
# 查看版本歷史
firebase hosting:versions

# 回滾到指定版本
firebase hosting:clone ng-app:live ng-app:live --version=VERSION_ID
```

> **核心原則**：確保部署流程安全、可靠、可重複，優先使用 Firebase 服務。
