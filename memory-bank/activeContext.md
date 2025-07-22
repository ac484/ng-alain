# Active Context: ng-alain

## Current Work Focus
- 專案初始化與最佳化配置
- 建立與補全 Memory Bank 文件
- 處理 build 相容性問題
- **VAN QA 驗證（2024-06-07）**
  - 依賴安裝（yarn install）：完成，有 peer dependency 警告
  - 編譯建置（yarn build）：成功，bundle 超過預算，pako 非 ESM 警告
  - 單元測試（yarn test）：全部通過
  - Lint（yarn lint）：731 問題（267 error, 464 warning），多為型別 any、no-empty、import/order、prefer-inject 等
  - 建議：分批修正 Lint 錯誤（型別 any、prefer-inject、import/order、no-empty 等），追蹤 bundle 超過預算與 CommonJS 依賴警告
- **PLAN QA 驗證（2024-06-07）**
  - 架構分層明確，採用模組化 Angular 設計，支援多語系、主題切換、雲端整合
  - 技術選型合理，Angular 20、ng-zorro-antd 20、@delon、Firebase、TypeScript 5.8
  - TypeScript 設定嚴謹，strict=true，路徑 alias 完整
  - package.json 腳本齊全，CI/CD、Lint、Test、主題切換等自動化完善
  - 風險：Lint 問題嚴重，型別 any、prefer-inject、import/order、no-empty 等需分階段重構
  - 風險：bundle 超過預算、CommonJS 依賴警告，需追蹤優化
  - 建議：持續完善 Memory Bank 文件，將 QA 驗證納入開發流程基線

## Recent Changes
- 升級 Angular 20
- 建立 Memory Bank 文件
- 優化專案配置與依賴
- **執行 VAN QA，記錄 2024-06-07 主要驗證結果與問題**
- **執行 PLAN QA，記錄主要規劃層級驗證結果與建議**

## Next Steps
- 補充專案文件內容
- 修正 build 與相容性問題
- 完善 CI/CD 流程
- **針對 Lint 錯誤（型別 any、prefer-inject、import/order 等）進行分批重構**
- 追蹤 bundle 超過預算與 CommonJS 依賴警告
- **依 PLAN QA 建議，分階段重構型別、依賴、CI/CD 流程，並同步更新文件**
- **針對本次 VAN QA 結果，分階段重構型別、依賴、CI/CD 流程，並同步更新文件**

## Active Decisions and Considerations
- 採用最新 Angular/Delon 生態
- 嚴格型別與最佳實踐

## Important Patterns and Preferences
- 模組分層、配置驅動、嚴格 Lint

## Learnings and Project Insights
- Angular 20 獨立 API 實踐
- ng-alain/Delon 生態整合經驗
- **VAN QA 驗證顯示型別嚴謹與 Angular 20 新規範需優先處理，Lint 問題需分階段重構**
- **PLAN QA 驗證顯示架構分層、技術選型合理，但型別與依賴需持續優化** 
