# 檔案系統服務

> **檔案系統服務** 為原始碼檔案、專案資源和目錄管理提供安全的檔案系統操作。

## 核心功能

### 1. 檔案讀取

```typescript
// 讀取單一檔案
mcp_filesystem_read_file({
  path: "ng-alain-lin-bv/src/app/core/services/auth.service.ts"
});

// 讀取多個檔案
mcp_filesystem_read_multiple_files({
  paths: [
    "ng-alain-lin-bv/src/app/shared/models/user.model.ts",
    "ng-alain-lin-bv/src/app/routes/user/user.component.ts"
  ]
});

// 讀取檔案前 20 行
mcp_filesystem_read_file({
  path: "ng-alain-lin-bv/src/app/app.component.ts",
  head: 20
});
```

### 2. 檔案寫入與編輯

```typescript
// 建立新檔案
mcp_filesystem_write_file({
  path: "ng-alain-lin-bv/src/app/shared/models/product.model.ts",
  content: `export interface Product {
  id: string;
  name: string;
  price: number;
}`
});

// 編輯現有檔案
mcp_filesystem_edit_file({
  path: "ng-alain-lin-bv/src/app/shared/models/user.model.ts",
  edits: [
    {
      oldText: "export interface User {\n  id: string;\n  name: string;\n}",
      newText: "export interface User {\n  id: string;\n  name: string;\n  email: string;\n}"
    }
  ]
});
```

### 3. 目錄管理

```typescript
// 建立目錄
mcp_filesystem_create_directory({
  path: "ng-alain-lin-bv/src/app/routes/reports"
});

// 列出目錄內容
mcp_filesystem_list_directory({
  path: "ng-alain-lin-bv/src/app/routes"
});

// 取得目錄樹結構
mcp_filesystem_directory_tree({
  path: "ng-alain-lin-bv/src/app/shared"
});
```

### 4. 檔案搜尋與資訊

```typescript
// 搜尋檔案
mcp_filesystem_search_files({
  path: "ng-alain-lin-bv/src/app",
  pattern: "*.component.ts",
  excludePatterns: ["*.spec.ts"]
});

// 取得檔案資訊
mcp_filesystem_get_file_info({
  path: "ng-alain-lin-bv/src/app/app.component.ts"
});
```

## 專案結構

### ng-alain 專案結構
```
ng-alain-lin-bv/src/app/
├── core/           # 服務、守衛、攔截器
├── shared/         # 共享元件、指令、管道
├── routes/         # 路由模組
├── layout/         # 佈局模組
└── app.component.ts # 根元件
```

### 檔案命名慣例
```
user-profile.component.ts
user.service.ts
user.model.ts
user-role.enum.ts
```

## 使用範例

### 元件生成
```typescript
// 生成新的 ng-alain 元件
const generateComponent = async () => {
  // 1. 建立目錄
  await mcp_filesystem_create_directory({
    path: "ng-alain-lin-bv/src/app/routes/user-profile"
  });

  // 2. 建立元件檔案
  await mcp_filesystem_write_file({
    path: "ng-alain-lin-bv/src/app/routes/user-profile/user-profile.component.ts",
    content: componentTemplate
  });

  // 3. 建立模板和樣式
  await mcp_filesystem_write_file({
    path: "ng-alain-lin-bv/src/app/routes/user-profile/user-profile.component.html",
    content: htmlTemplate
  });
};
```

## 使用檢查清單

- 確保路徑在允許的目錄內
- 在操作前驗證檔案/目錄存在
- 修改前備份重要檔案
- 遵循專案結構慣例
- 使用標準命名慣例

> **核心原則**：確保檔案操作安全、受控，並維持專案結構一致性。
description:
globs:
alwaysApply: false
---
