# MCP 智能代碼生成架構

> 基於極簡主義原則的 MCP 協作架構，實現智能上下文分析與自動化代碼生成。

## 架構概覽

```
智能分析層: context7 (權威文檔查詢)
持久化層: redis-mcp-server (專案標準與配置)
記憶體層: memory-server (運行時狀態管理)
資源層: filesystem-server (檔案系統操作)
構建層: angular-cli-server (Angular 專案構建)
```

## 智能代碼生成流程

### 1. 上下文分析階段
```
context7 查詢最佳實踐 → redis 載入專案標準 →
memory 分析當前狀態 → filesystem 掃描現有代碼
```

### 2. 代碼生成階段
```
memory 管理生成狀態 → 遵循 redis 專案標準 →
filesystem 寫入代碼 → angular-cli 驗證構建
```

### 3. 後處理階段
```
angular-cli 測試驗證 → redis 更新專案狀態 →
memory 清理臨時資料 → context7 記錄最佳實踐
```

## 服務職責與協作

### context7 (權威知識中心)
- **職責**: 查詢官方文檔、API 規範、最佳實踐
- **關鍵功能**:
  - `resolve-library-id`: 解析函式庫 ID
  - `get-library-docs`: 獲取權威文檔
- **協作流程**: context7 → redis (快取結果) → memory (臨時儲存)

### redis-mcp-server (專案標準中心)
- **職責**: 儲存專案配置、代碼標準、團隊規範
- **關鍵功能**:
  - 專案架構標準
  - 代碼風格規範
  - 元件模板庫
  - 反模式記錄
- **協作流程**: redis ↔ filesystem (同步配置) ↔ memory (快取熱資料)

### memory-server (運行時狀態管理)
- **職責**: 管理代碼生成狀態、上下文快取、即時協作
- **關鍵功能**:
  - 代碼生成進度追蹤
  - 元件依賴關係圖
  - 實時上下文狀態
- **協作流程**: 接收所有服務的臨時資料，提供高速讀寫

### filesystem-server (檔案系統權威)
- **職責**: 源代碼檔案操作、目錄結構管理
- **關鍵功能**:
  - 讀取現有代碼結構
  - 寫入生成的新代碼
  - 管理專案檔案組織
- **協作流程**: 所有服務的最終輸出目標

### angular-cli-server (構建驗證中心)
- **職責**: Angular 專案構建、即時反饋、品質驗證
- **關鍵功能**:
  - CLI 命令執行
  - 熱更新支援
  - 構建驗證
  - 測試執行
- **協作流程**: 讀取 filesystem，提供構建結果給 memory/redis

## 智能代碼生成檢查清單

### 生成前準備
- [ ] 透過 context7 查詢最新最佳實踐
- [ ] 從 redis 載入專案特定標準
- [ ] 檢查 filesystem 中的現有代碼結構
- [ ] 在 memory 中初始化生成上下文

### 生成中執行
- [ ] 使用 memory 管理生成狀態
- [ ] 遵循 redis 中的團隊標準
- [ ] 透過 filesystem 執行檔案操作
- [ ] 在 memory 中即時更新進度

### 生成後驗證
- [ ] 使用 angular-cli 驗證生成代碼
- [ ] 執行測試確保代碼品質
- [ ] 在 redis 中更新專案狀態
- [ ] 清理 memory 中的臨時資料

## 專案特定優化

### ng-alain 專案適配
```typescript
// 自動載入 ng-alain 專案標準
const loadNgAlainStandards = async () => {
  // 1. 查詢 ng-alain 官方文檔
  await mcp_context7_resolve_library_id({
    libraryName: "ng-alain"
  });

  // 2. 載入專案配置
  const projectConfig = await mcp_redis_mcp_json_get({
    name: "project:ng-alain:standards",
    path: "$"
  });

  // 3. 分析現有架構
  const currentStructure = await mcp_filesystem_list_directory({
    path: "src/app"
  });
};
```

### 極簡主義代碼生成
```typescript
// 遵循極簡主義原則的代碼生成
const generateMinimalCode = async (componentName: string) => {
  // 1. 查詢最佳實踐
  const bestPractices = await mcp_context7_get_library_docs({
    context7CompatibleLibraryID: "/ng-alain/ng-alain",
    topic: "component best practices",
    tokens: 5000
  });

  // 2. 檢查現有模式
  const existingPatterns = await mcp_memory_search_nodes({
    query: "Angular component patterns"
  });

  // 3. 生成符合標準的代碼
  // 單檔 <100 行，避免過度設計
};
```

## 自動化工作流程

### 智能上下文分析
```typescript
const analyzeContext = async () => {
  // 1. 掃描專案結構
  const projectStructure = await mcp_filesystem_directory_tree({
    path: "src/app"
  });

  // 2. 載入專案標準
  const standards = await mcp_redis_mcp_json_get({
    name: "project:standards",
    path: "$"
  });

  // 3. 查詢相關最佳實踐
  const bestPractices = await mcp_context7_get_library_docs({
    context7CompatibleLibraryID: "/ng-alain/ng-alain",
    topic: "architecture patterns",
    tokens: 3000
  });

  // 4. 建立上下文實體
  await mcp_memory_create_entities({
    entities: [
      {
        name: "ProjectContext",
        entityType: "Analysis",
        observations: [
          `Project structure: ${JSON.stringify(projectStructure)}`,
          `Standards: ${JSON.stringify(standards)}`,
          `Best practices: ${bestPractices}`
        ]
      }
    ]
  });
};
```

### 自動代碼生成
```typescript
const autoGenerateCode = async (requirements: string) => {
  // 1. 分析需求
  const context = await analyzeContext();

  // 2. 查詢相關文檔
  const docs = await mcp_context7_get_library_docs({
    context7CompatibleLibraryID: "/ng-alain/ng-alain",
    topic: requirements,
    tokens: 5000
  });

  // 3. 生成代碼
  const generatedCode = generateCodeFromContext(context, docs);

  // 4. 驗證並寫入
  await mcp_filesystem_write_file({
    path: "src/app/generated/component.ts",
    content: generatedCode
  });

  // 5. 構建驗證
  await mcp_angular_cli_ng_build({
    project: "ng-alain",
    configuration: "development"
  });
};
```

## 品質保證機制

### 代碼品質檢查
- **極簡主義檢查**: 確保單檔 <100 行
- **架構一致性**: 遵循 ng-alain 標準結構
- **TypeScript 嚴格模式**: 避免使用 `any` 型別
- **效能優化**: 使用 OnPush 變更檢測策略

### 自動化測試
- **構建驗證**: 每次生成後執行 `ng build`
- **語法檢查**: 使用 TypeScript 編譯器檢查
- **風格檢查**: 遵循專案 ESLint 規則
- **功能測試**: 確保生成代碼可正常運行

> **核心哲學**: 智能分析、自動生成、品質保證，實現極簡而高效的代碼生成流程。
description: |
  MCP 智能代碼生成架構，整合 context7、memory、redis、filesystem 和 angular-cli 服務。
  實現智能上下文分析與自動化代碼生成，遵循極簡主義原則。
  支援 ng-alain 專案的標準化代碼生成流程。
globs:
  - "**/*.ts"
  - "**/*.json"
  - "**/*.md"
  - "**/*.html"
  - "**/*.less"
alwaysApply: true
---
description:
globs:
alwaysApply: false
---
