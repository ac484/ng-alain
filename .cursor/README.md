# .cursor/rules 主檔案（README）

## 專案規則總覽

本檔案為 ng-alain 專案的核心規則彙總，所有細節規則請參考對應的 .mdc 子檔案。

### 1. Memory Bank 規範
- 啟動時必須完整讀取 memory-bank/ 目錄下所有核心文件。
- 文件結構與內容需與專案現況同步，並依據 QA 結果持續優化。

### 2. 分層規則載入
- 採用 isolation_rules/main-optimized，所有模式（VAN/PLAN/CREATIVE/IMPLEMENT/REFLECT/ARCHIVE）皆有專屬分層規則。
- 詳細規則請參考：
  - core.mdc
  - memory-bank.mdc
  - isolation_rules/main.mdc
  - isolation_rules/main-optimized.mdc
  - isolation_rules/mcp-memory-flow.mdc
  - isolation_rules/mcp-redis.mdc
  - isolation_rules/mcp-context7-flow.mdc
  - isolation_rules/mcp-filesystem-flow.mdc
  - 其他 isolation_rules/*

### 3. 專案最佳實踐
- 嚴格型別安全（TypeScript strict=true）
- 分層結構（app/core/shared/routes）清晰，UI/Service/事件分離
- 自動化腳本、CI/CD、Lint/Stylelint、Husky 等工具整合
- 依賴管理以 Yarn 4 為主，鎖定 yarn.lock
- 持續同步 Memory Bank 與 Redis/Context7 知識庫

### 4. 自動化與品質控管
- scripts/_ci/ 目錄下有自動化部署與測試腳本
- package.json scripts 覆蓋 build、test、lint、e2e、prepare 等
- Lint/Stylelint 問題需分批修正，優先 any、prefer-inject、import/order、no-empty

### 5. 文件與規則維護
- Memory Bank 文件需定期檢查、補充與優化
- .cursor/rules 及 mdc 子檔案需隨專案演進同步更新
- 新成員請先閱讀本檔案與所有 mdc 子規則

---

> 詳細規則與流程請參考各 isolation_rules/*.mdc 子檔案與 memory-bank/ 文件。
> 本檔案為規則入口，細節以分層檔案為準。 
