# Feature: Settings Architecture（設定頁面架構）

## 目標
- 設定頁可管理業主清單、審批流程模板，支援 CRUD、拖拉排序、條件分支。
- 與 Firestore 資料庫即時同步。

## 架構設計
- settings.component.ts：主設定頁，分頁籤切換
- owner-settings.component.ts：業主清單 CRUD、排序、與流程模板綁定
- workflow-settings.component.ts：流程模板 CRUD、拖拉排序、條件分支設計
- workflow-settings.service.ts：資料存取、驗證、同步

## 資料同步策略
- 任何設定異動即時寫入 Firestore，並推播至相關元件
- 設計型別安全、分層清晰，UI 只依賴對應 service 
