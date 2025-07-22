# Active Context: ng-alain

## Current Work Focus
- 專案初始化與最佳化配置
- 建立與補全 Memory Bank 文件
- 處理 build 相容性問題
- **VAN QA 驗證（2024-06-07）**
  - 依賴安裝（yarn install）：完成，有 peer dependency 警告
  - 編譯建置（yarn build）：成功，bundle 超過預算，pako 非 ESM 警告
  - 單元測試（yarn test）：全部通過
  - Lint（yarn lint）：752 問題（288 error, 464 warning），多為型別 any、no-empty、import/order、prefer-inject 等

## Recent Changes
- 升級 Angular 20
- 建立 Memory Bank 文件
- 優化專案配置與依賴
- **執行 VAN QA，記錄主要驗證結果與問題**

## Next Steps
- 補充專案文件內容
- 修正 build 與相容性問題
- 完善 CI/CD 流程
- **針對 Lint 錯誤（型別 any、prefer-inject、import/order 等）進行分批重構**
- 追蹤 bundle 超過預算與 CommonJS 依賴警告

## Active Decisions and Considerations
- 採用最新 Angular/Delon 生態
- 嚴格型別與最佳實踐

## Important Patterns and Preferences
- 模組分層、配置驅動、嚴格 Lint

## Learnings and Project Insights
- Angular 20 獨立 API 實踐
- ng-alain/Delon 生態整合經驗
- **VAN QA 驗證顯示型別嚴謹與 Angular 20 新規範需優先處理** 
