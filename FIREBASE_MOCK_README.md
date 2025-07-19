# Firebase Mock 系統使用說明

## 概述

本專案整合了 `@angular/fire` 和 `@delon/mock`，提供了一個統一的 Firebase 服務介面，支援開發環境使用 Mock 資料，生產環境使用真實 Firebase 服務。

## 架構設計

### 1. Mock 資料結構 (`_mock/_firebase.ts`)

```typescript
// Firestore 模擬資料
const firestoreData = {
  users: [...],      // 用戶資料
  posts: [...],      // 文章資料
  categories: [...]  // 分類資料
};

// Auth 模擬資料
const authData = {
  currentUser: {...},
  authState: {...}
};

// Storage 模擬資料
const storageData = {
  files: [...]
};
```

### 2. API 端點

#### Firestore API
- `GET /api/firestore/:collection` - 取得集合資料
- `GET /api/firestore/:collection/:id` - 取得單一文件
- `POST /api/firestore/:collection` - 新增文件
- `PUT /api/firestore/:collection/:id` - 更新文件
- `DELETE /api/firestore/:collection/:id` - 刪除文件

#### Auth API
- `GET /api/auth/currentUser` - 取得當前用戶
- `GET /api/auth/authState` - 取得認證狀態
- `POST /api/auth/signIn` - 登入
- `POST /api/auth/signUp` - 註冊
- `POST /api/auth/signOut` - 登出

#### Storage API
- `GET /api/storage/files` - 取得檔案列表
- `POST /api/storage/upload` - 上傳檔案
- `DELETE /api/storage/:path` - 刪除檔案

### 3. Firebase 服務 (`src/app/core/firebase/firebase.service.ts`)

提供統一的服務介面，自動根據環境切換 Mock 和真實 Firebase：

```typescript
@Injectable()
export class FirebaseService {
  // Firestore 操作
  collection(collectionName: string) {
    return {
      get: (params?: any) => Observable<any[]>,
      doc: (id: string) => DocumentReference,
      add: (data: any) => Observable<any>
    };
  }

  // Auth 操作
  auth() {
    return {
      currentUser: () => Observable<any>,
      authState: () => Observable<any>,
      signIn: (credentials) => Observable<any>,
      signUp: (userData) => Observable<any>,
      signOut: () => Observable<any>
    };
  }

  // Storage 操作
  storage() {
    return {
      files: () => Observable<any[]>,
      upload: (file, path) => Observable<any>,
      delete: (path) => Observable<any>
    };
  }
}
```

## 使用方式

### 1. 基本使用

```typescript
import { FirebaseService } from '@core';

@Component({...})
export class MyComponent {
  constructor(private firebaseService: FirebaseService) {}

  // 取得用戶列表
  loadUsers() {
    this.firebaseService.collection('users').get().subscribe({
      next: (users) => console.log('用戶列表:', users),
      error: (err) => console.error('錯誤:', err)
    });
  }

  // 新增用戶
  addUser(userData: any) {
    this.firebaseService.collection('users').add(userData).subscribe({
      next: (result) => console.log('新增成功:', result),
      error: (err) => console.error('錯誤:', err)
    });
  }

  // 登入
  signIn(email: string, password: string) {
    this.firebaseService.auth().signIn({ email, password }).subscribe({
      next: (result) => console.log('登入成功:', result),
      error: (err) => console.error('錯誤:', err)
    });
  }
}
```

### 2. 環境切換

系統會根據 `environment.production` 自動切換：

- **開發環境** (`environment.ts`): 使用 Mock 資料
- **生產環境** (`environment.prod.ts`): 使用真實 Firebase

```typescript
// environment.ts
export const environment = {
  production: false,  // 使用 Mock
  // ... 其他配置
};

// environment.prod.ts
export const environment = {
  production: true,   // 使用真實 Firebase
  // ... 其他配置
};
```

### 3. 查詢參數支援

Firestore 查詢支援以下參數：

```typescript
// 分頁
this.firebaseService.collection('posts').get({ limit: 10 })

// 排序
this.firebaseService.collection('posts').get({ orderBy: 'createdAt desc' })

// 過濾
this.firebaseService.collection('posts').get({ 
  where: [['status', '==', 'published']] 
})
```

## 示範元件

參考 `src/app/routes/delon/firebase/` 目錄下的示範元件，展示了：

- 用戶管理 (CRUD 操作)
- 文章管理 (CRUD 操作)
- 認證功能 (登入/登出)
- 資料載入和錯誤處理

## 擴展指南

### 1. 新增 Mock 資料

在 `_mock/_firebase.ts` 中新增資料：

```typescript
const firestoreData = {
  // 現有資料...
  newCollection: [
    { id: '1', name: '測試資料', ... }
  ]
};
```

### 2. 新增 API 端點

在 `FIREBASE` 物件中新增端點：

```typescript
export const FIREBASE = {
  // 現有端點...
  '/api/new-endpoint': (req: MockRequest) => {
    // 處理邏輯
    return { success: true, data: [...] };
  }
};
```

### 3. 擴展服務方法

在 `FirebaseService` 中新增方法：

```typescript
export class FirebaseService {
  // 現有方法...
  
  customMethod() {
    return {
      execute: (params: any) => {
        if (this.isMock) {
          return this.http.get('/api/custom-endpoint', params);
        }
        // 真實 Firebase 實作
        return this.http.get('/api/custom-endpoint', params);
      }
    };
  }
}
```

## 注意事項

1. **Mock 資料持久性**: Mock 資料存在於記憶體中，頁面重新載入後會重置
2. **型別安全**: 建議為資料結構定義 TypeScript 介面
3. **錯誤處理**: 所有 API 呼叫都應該包含適當的錯誤處理
4. **環境配置**: 確保 `environment.ts` 和 `environment.prod.ts` 配置正確

## 未來改進

1. 新增更多 Firebase 服務支援 (Functions, Analytics 等)
2. 實作 Mock 資料持久化
3. 新增更多查詢操作支援
4. 提供更完整的型別定義
5. 新增單元測試覆蓋 
