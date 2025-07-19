# Memory Server 智能狀態管理

> **Memory Server** 管理代碼生成的運行時狀態、上下文快取和即時協作，支援智能代碼生成流程。

## 核心功能

### 1. 智能實體管理
```typescript
// 創建代碼生成實體
mcp_memory_create_entities({
  entities: [
    {
      name: "UserProfileComponent",
      entityType: "Angular Component",
      observations: [
        "使用 Angular signals 進行狀態管理",
        "實作 OnPush 變更檢測策略",
        "整合響應式表單驗證",
        "遵循極簡主義原則，單檔 <100 行"
      ]
    }
  ]
});

// 建立實體關係圖譜
mcp_memory_create_relations({
  relations: [
    {
      from: "UserProfileComponent",
      to: "AuthService",
      relationType: "depends on"
    },
    {
      from: "UserProfileComponent",
      to: "ng-alain Standards",
      relationType: "follows"
    }
  ]
});
```

### 2. 智能知識圖譜查詢
```typescript
// 語義搜尋相關知識
mcp_memory_search_nodes({
  query: "Angular signals 狀態管理最佳實踐"
});

// 開啟特定節點
mcp_memory_open_nodes({
  names: ["UserProfileComponent", "AuthService", "ng-alain Standards"]
});

// 讀取完整知識圖譜
mcp_memory_read_graph();
```

### 3. 動態觀察管理
```typescript
// 添加代碼生成觀察
mcp_memory_add_observations({
  observations: [
    {
      entityName: "UserProfileComponent",
      contents: [
        "新增表單驗證邏輯",
        "整合 Angular Material 元件",
        "實作 Firebase 認證整合",
        "通過 TypeScript 嚴格模式檢查"
      ]
    }
  ]
});
```

## 代碼生成實體類型

```typescript
// 代碼生成相關實體類型
const codeGenerationEntityTypes = {
  // Angular 元件
  "Angular Component": "Component",
  "Angular Service": "Service",
  "Angular Pipe": "Pipe",
  "Angular Directive": "Directive",

  // 架構模式
  "Architecture Pattern": "Pattern",
  "Design Pattern": "Pattern",
  "Best Practice": "Best Practice",
  "Anti Pattern": "Anti Pattern",

  // 專案結構
  "Feature Module": "Module",
  "Shared Module": "Module",
  "Core Module": "Module",

  // 技術概念
  "State Management": "Concept",
  "Data Flow": "Concept",
  "Performance": "Concept",

  // 代碼生成
  "Code Generation": "Generation",
  "Code Review": "Review",
  "Code Analysis": "Analysis"
};
```

## 智能關係類型

```typescript
// 代碼生成關係類型
const codeGenerationRelationTypes = {
  // 依賴關係
  "depends on": "Dependency",
  "uses": "Usage",
  "imports": "Import",

  // 實作關係
  "implements": "Implementation",
  "extends": "Extension",
  "inherits from": "Inheritance",

  // 組合關係
  "contains": "Composition",
  "composes": "Composition",
  "aggregates": "Aggregation",

  // 遵循關係
  "follows": "Compliance",
  "adheres to": "Compliance",
  "violates": "Violation",

  // 生成關係
  "generates": "Generation",
  "creates": "Creation",
  "produces": "Production"
};
```

## 智能代碼生成工作流程

### 代碼生成狀態追蹤
```typescript
const codeGenerationWorkflow = async () => {
  // 1. 創建代碼生成實體
  await mcp_memory_create_entities({
    entities: [
      {
        name: "UserListComponent_Generation",
        entityType: "Code Generation",
        observations: [
          "開始生成用戶列表元件",
          "需求：顯示用戶列表，支援分頁",
          "技術棧：ng-alain + ng-zorro-antd"
        ]
      }
    ]
  });

  // 2. 建立依賴關係
  await mcp_memory_create_relations({
    relations: [
      {
        from: "UserListComponent_Generation",
        to: "UserService",
        relationType: "depends on"
      },
      {
        from: "UserListComponent_Generation",
        to: "ng-alain Standards",
        relationType: "follows"
      }
    ]
  });

  // 3. 查詢相關知識
  const relatedKnowledge = await mcp_memory_search_nodes({
    query: "ng-alain 表格元件最佳實踐"
  });

  // 4. 更新生成進度
  await mcp_memory_add_observations({
    observations: [
      {
        entityName: "UserListComponent_Generation",
        contents: [
          "完成元件結構設計",
          "實作響應式資料綁定",
          "整合分頁功能"
        ]
      }
    ]
  });
};
```

## 與其他 MCP 服務整合

### 與 Context7 整合
```typescript
// 記錄 Context7 查詢結果
const recordContext7Query = async (query: string, result: string) => {
  await mcp_memory_create_entities({
    entities: [
      {
        name: `Context7_${Date.now()}`,
        entityType: "Documentation Query",
        observations: [
          `查詢：${query}`,
          `結果：${result}`,
          `時間戳：${new Date().toISOString()}`
        ]
      }
    ]
  });
};
```

### 與 Redis 整合
```typescript
// 同步 Redis 專案標準到記憶體
const syncProjectStandards = async () => {
  // 1. 從 Redis 讀取專案標準
  const standards = await mcp_redis_mcp_json_get({
    name: "project:standards",
    path: "$"
  });

  // 2. 創建標準實體
  await mcp_memory_create_entities({
    entities: [
      {
        name: "Project Standards",
        entityType: "Best Practice",
        observations: [
          `架構標準：${standards.architecture}`,
          `代碼風格：${standards.codingStyle}`,
          `命名規範：${standards.naming}`
        ]
      }
    ]
  });
};
```

### 與 Filesystem 整合
```typescript
// 記錄檔案系統變更
const recordFileSystemChanges = async (filePath: string, operation: string) => {
  await mcp_memory_create_entities({
    entities: [
      {
        name: `FileSystem_${Date.now()}`,
        entityType: "File Operation",
        observations: [
          `檔案路徑：${filePath}`,
          `操作類型：${operation}`,
          `時間戳：${new Date().toISOString()}`
        ]
      }
    ]
  });
};
```

## 智能上下文分析

### 專案上下文分析
```typescript
const analyzeProjectContext = async () => {
  // 1. 掃描現有元件
  const existingComponents = await mcp_memory_search_nodes({
    query: "Angular Component"
  });

  // 2. 分析架構模式
  const architecturePatterns = await mcp_memory_search_nodes({
    query: "Architecture Pattern"
  });

  // 3. 創建上下文實體
  await mcp_memory_create_entities({
    entities: [
      {
        name: "Project Context Analysis",
        entityType: "Analysis",
        observations: [
          `現有元件數量：${existingComponents.length}`,
          `架構模式：${architecturePatterns.join(', ')}`,
          `分析時間：${new Date().toISOString()}`
        ]
      }
    ]
  });
};
```

### 代碼生成上下文
```typescript
const createGenerationContext = async (requirements: string) => {
  // 1. 分析需求
  const requirementsAnalysis = analyzeRequirements(requirements);

  // 2. 查詢相關知識
  const relatedKnowledge = await mcp_memory_search_nodes({
    query: requirementsAnalysis.technology
  });

  // 3. 創建生成上下文
  await mcp_memory_create_entities({
    entities: [
      {
        name: `Generation_${Date.now()}`,
        entityType: "Code Generation",
        observations: [
          `需求：${requirements}`,
          `技術棧：${requirementsAnalysis.technology}`,
          `相關知識：${relatedKnowledge.length} 項`,
          `生成策略：${requirementsAnalysis.strategy}`
        ]
      }
    ]
  });
};
```

## 品質保證追蹤

### 代碼品質檢查
```typescript
const trackCodeQuality = async (componentName: string, qualityMetrics: any) => {
  await mcp_memory_create_entities({
    entities: [
      {
        name: `${componentName}_Quality`,
        entityType: "Code Review",
        observations: [
          `行數：${qualityMetrics.lines}`,
          `複雜度：${qualityMetrics.complexity}`,
          `測試覆蓋率：${qualityMetrics.testCoverage}`,
          `TypeScript 嚴格模式：${qualityMetrics.strictMode}`
        ]
      }
    ]
  });
};
```

### 反模式檢測
```typescript
const detectAntiPatterns = async (codeAnalysis: any) => {
  if (codeAnalysis.antiPatterns.length > 0) {
    await mcp_memory_create_entities({
      entities: [
        {
          name: `AntiPattern_${Date.now()}`,
          entityType: "Anti Pattern",
          observations: [
            `檢測到的反模式：${codeAnalysis.antiPatterns.join(', ')}`,
            `建議修正：${codeAnalysis.suggestions.join(', ')}`,
            `嚴重程度：${codeAnalysis.severity}`
          ]
        }
      ]
    });
  }
};
```

## 使用檢查清單

- [ ] 使用清晰的實體名稱
- [ ] 選擇適當的實體類型
- [ ] 提供詳細的觀察內容
- [ ] 建立正確的關係
- [ ] 使用特定的查詢關鍵字
- [ ] 定期清理未使用的知識
- [ ] 追蹤代碼生成進度
- [ ] 記錄品質檢查結果

> **核心原則**: 提供即時、準確的知識快取，支援高效的 AI 協作和智能代碼生成。
description: |
  Memory Server 智能狀態管理，支援代碼生成的運行時狀態、上下文快取和即時協作。
  提供智能實體管理、知識圖譜查詢和動態觀察追蹤。
  深度整合其他 MCP 服務，支援智能代碼生成流程。
globs:
  - "src/app/**/*.ts"
  - "src/app/**/*.html"
  - "src/app/**/*.less"
  - "**/*.json"
alwaysApply: false
---
