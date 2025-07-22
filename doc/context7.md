# Context7 智能文檔查詢服務

> **Context7** 是智能代碼生成的核心知識中心，提供權威文檔查詢和語義分析功能。

## 核心功能

### 1. 智能函式庫解析
```typescript
// 自動解析函式庫 ID
mcp_context7_resolve_library_id({
  libraryName: "ng-alain"
});
// 返回：/ng-alain/ng-alain 或 /ng-alain/ng-alain/v20
```

### 2. 智能文檔查詢
```typescript
// 獲取權威文檔並自動快取
mcp_context7_get_library_docs({
  context7CompatibleLibraryID: "/ng-alain/ng-alain/v20",
  topic: "signals",
  tokens: 10000
});
```

### 3. 支援的函式庫生態系統
- **ng-alain**: `/ng-alain/ng-alain` - 企業級管理後台框架
- **ng-zorro-antd**: `/ng-zorro-antd/ng-zorro-antd` - Ant Design 元件庫
- **Angular**: `/angular/angular` - 核心框架
- **RxJS**: `/reactivex/rxjs` - 響應式程式設計
- **TypeScript**: `/microsoft/typescript` - 型別系統
- **Firebase**: `/firebase/firebase` - 後端服務

## 智能查詢策略

### 查詢優先級策略
```typescript
const queryStrategy = {
  // 1. 專案特定查詢
  projectSpecific: {
    priority: "highest",
    examples: [
      "ng-alain signals 狀態管理",
      "ng-alain 控制流程語法",
      "ng-alain Firebase 整合"
    ]
  },

  // 2. 架構模式查詢
  architecturePatterns: {
    priority: "high",
    examples: [
      "Angular 元件架構",
      "ng-alain 模組化設計",
      "Firebase 適配器模式"
    ]
  },

  // 3. 最佳實踐查詢
  bestPractices: {
    priority: "medium",
    examples: [
      "TypeScript 嚴格模式",
      "Angular 效能優化",
      "ng-zorro-antd 響應式設計"
    ]
  }
};
```

### 智能主題聚焦
```typescript
// 根據代碼生成需求自動選擇主題
const getTopicByRequirement = (requirement: string) => {
  const topicMap = {
    "component": "component architecture",
    "service": "service patterns",
    "form": "reactive forms",
    "table": "data table",
    "auth": "authentication",
    "firebase": "firebase integration",
    "signals": "signals state management",
    "routing": "routing and navigation"
  };

  return topicMap[requirement] || "general best practices";
};
```

### Token 優化策略
```typescript
const tokenStrategy = {
  quickReference: 2000,      // 快速參考
  detailedGuide: 10000,      // 詳細指南
  comprehensiveDoc: 20000,   // 完整文檔
  architectureReview: 15000  // 架構審查
};
```

## 與其他 MCP 服務整合

### 與 Redis 整合
```typescript
// 查詢結果自動快取到 Redis
const queryWithCache = async (libraryName: string, topic: string) => {
  // 1. 檢查 Redis 快取
  const cached = await mcp_redis_mcp_json_get({
    name: `context7:cache:${libraryName}:${topic}`,
    path: "$"
  });

  if (cached) return cached;

  // 2. 查詢 Context7
  const libraryId = await mcp_context7_resolve_library_id({
    libraryName: libraryName
  });

  const docs = await mcp_context7_get_library_docs({
    context7CompatibleLibraryID: libraryId,
    topic: topic,
    tokens: 10000
  });

  // 3. 快取結果
  await mcp_redis_mcp_json_set({
    name: `context7:cache:${libraryName}:${topic}`,
    path: "$",
    value: docs,
    expire_seconds: 3600 // 1小時過期
  });

  return docs;
};
```

### 與 Memory 整合
```typescript
// 查詢結果記錄到知識圖譜
const queryWithMemory = async (query: string) => {
  // 1. 執行查詢
  const result = await queryWithCache("ng-alain", query);

  // 2. 記錄到記憶體
  await mcp_memory_create_entities({
    entities: [
      {
        name: `Context7Query_${Date.now()}`,
        entityType: "Documentation Query",
        observations: [
          `Query: ${query}`,
          `Result: ${result}`,
          `Timestamp: ${new Date().toISOString()}`
        ]
      }
    ]
  });

  return result;
};
```

## 專案特定查詢模式

### ng-alain 專案查詢
```typescript
// ng-alain 專案專用查詢
const ngAlainQueries = {
  // 元件生成查詢
  componentGeneration: {
    library: "ng-alain",
    topic: "component best practices",
    tokens: 8000
  },

  // 服務生成查詢
  serviceGeneration: {
    library: "ng-alain",
    topic: "service patterns",
    tokens: 6000
  },

  // Firebase 整合查詢
  firebaseIntegration: {
    library: "firebase",
    topic: "angular integration",
    tokens: 10000
  },

  // 狀態管理查詢
  stateManagement: {
    library: "ng-alain",
    topic: "signals state management",
    tokens: 7000
  }
};
```

### 極簡主義查詢
```typescript
// 遵循極簡主義原則的查詢
const minimalismQueries = {
  // 簡化代碼查詢
  codeSimplification: {
    library: "angular",
    topic: "code simplification patterns",
    tokens: 5000
  },

  // 效能優化查詢
  performanceOptimization: {
    library: "ng-alain",
    topic: "performance best practices",
    tokens: 6000
  },

  // 架構簡化查詢
  architectureSimplification: {
    library: "angular",
    topic: "simple architecture patterns",
    tokens: 8000
  }
};
```

## 智能查詢最佳實踐

### 有效查詢模式
```typescript
// ✅ 良好查詢範例
const goodQueries = [
  "ng-alain signals 狀態管理最佳實踐",
  "ng-zorro-antd 表格優化與效能",
  "ng-alain 控制流程語法範例",
  "Firebase Firestore 與 Angular 整合",
  "TypeScript 嚴格模式配置"
];

// ❌ 避免的查詢
const badQueries = [
  "ng-alain",           // 太籠統
  "如何編程",           // 不具體
  "修復錯誤",           // 缺乏上下文
  "最佳實踐",           // 沒有特定技術
  "怎麼做"              // 過於模糊
];
```

### 查詢優化技巧
```typescript
// 1. 使用具體技術名稱
const specificQuery = "ng-alain signals 狀態管理";

// 2. 包含版本資訊
const versionedQuery = "ng-alain v20 新功能";

// 3. 聚焦特定功能
const focusedQuery = "ng-zorro-antd 表格分頁";

// 4. 結合多個概念
const combinedQuery = "ng-alain Firebase 認證整合";
```

## 自動化查詢流程

### 智能代碼生成查詢
```typescript
const intelligentQuery = async (codeGenerationRequest: string) => {
  // 1. 分析需求
  const requirements = analyzeRequirements(codeGenerationRequest);

  // 2. 選擇適當的查詢策略
  const queryStrategy = selectQueryStrategy(requirements);

  // 3. 執行查詢
  const docs = await queryWithCache(
    queryStrategy.library,
    queryStrategy.topic
  );

  // 4. 記錄查詢結果
  await mcp_memory_create_entities({
    entities: [
      {
        name: `CodeGeneration_${Date.now()}`,
        entityType: "Code Generation",
        observations: [
          `Request: ${codeGenerationRequest}`,
          `Strategy: ${JSON.stringify(queryStrategy)}`,
          `Documentation: ${docs}`
        ]
      }
    ]
  });

  return docs;
};
```

> **核心原則**: 提供權威、準確、即時的技術文檔查詢，支援智能代碼生成流程。
description: |
  Context7 智能文檔查詢服務，提供權威技術文檔和語義分析功能。
  整合 Redis 快取和 Memory 知識圖譜，支援智能代碼生成。
  專為 ng-alain 專案優化，遵循極簡主義原則。
globs:
  - "**/*.ts"
  - "**/*.json"
  - "**/*.md"
alwaysApply: false
---
