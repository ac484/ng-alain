# Progress: ng-alain

## What Works
- 完成專案初始化與主題切換
- 國際化與權限管理
- Firebase 雲端整合
- 梳理分層結構、技術選型、型別安全、自動化腳本、CI/CD、文件規範
- 完成 VAN/PLAN/CREATIVE QA，知識已同步至 Redis 向量庫

## What's Left to Build
- 進階權限與 API 整合
- 測試覆蓋與 CI/CD 完善
- 分批修正 Lint 問題（any、prefer-inject、import/order、no-empty）
- 持續補充與優化 Memory Bank 文件
- 處理 bundle 超過預算與 CommonJS 依賴

## Known Issues and Limitations
- 第三方套件相容性（如 ng-zorro/Delon 命名變更）
- build 錯誤與相依性問題
- Lint 問題需分階段重構
- bundle 超過預算、CommonJS 依賴需持續追蹤

## Evolution of Project Decisions
- 持續追蹤 Angular/Delon 生態變化，優先相容與升級
- 依實際需求調整技術選型與架構
- QA 結果納入開發流程基礎，作為品質與架構依據 
