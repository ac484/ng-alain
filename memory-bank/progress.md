# Progress: ng-alain

## What Works
- 專案初始化與主題切換
- 國際化與權限管理
- Firebase 雲端整合
- **VAN QA 驗證：依賴安裝、建置、單元測試皆通過**

## What's Left to Build
- 自訂業務模組開發
- 進階權限與 API 整合
- 測試覆蓋與 CI/CD 完善
- **分批修正 Lint 錯誤（型別 any、prefer-inject、import/order、no-empty 等）**
- 處理 bundle 超過預算與 CommonJS 依賴警告

## Known Issues and Limitations
- 第三方套件相容性（如 ng-zorro/Delon 命名變更）
- build 錯誤與相依性問題
- **Lint 問題嚴重，需分階段重構**

## Evolution of Project Decisions
- 持續追蹤 Angular/Delon 生態變化，優先相容與升級
- 依實際需求調整技術選型與架構
- **VAN QA 驗證納入開發流程，作為品質基線** 
