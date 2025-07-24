# Memory Bank: Progress

## 合約模組現有進度（2024-06-22）
- 主合約模組（hub/contract/）分層清楚，CRUD、型別、業主設定、序號管理皆已落地。
- 樹狀元件（hub/tree/contract.component.ts）已存在，功能定位待明確，與主模組資料來源可能重疊。
- 合約面板（contract/contract-panel/）已存在，與主模組關聯待釐清，可能有重複邏輯。
- 多次請款、動態審批等新需求尚未有對應檔案，僅在文件規劃。

## 已完成
- 合約 CRUD、型別、業主設定、序號管理
- 合約清單、表單、主元件

## 進行中/待補
- 樹狀元件、面板元件功能定位與整合
- 多次請款、動態審批等新需求檔案骨架與資料流設計

## 下一步
- [2024-06-23] 完成 service/service 測試
- [2024-06-23] 完成 UI prototype
- [2024-06-23] Memory Bank 文件同步 

## hub/ 目錄下合約相關元件現有進度（2024-06-22）
- contract/：主合約模組分層清楚，CRUD、型別、業主設定、序號管理皆已落地。
- fire-crud/：通用 CRUD UI/服務已落地，部分欄位/邏輯仍與合約耦合，泛型化待加強。
- settings/：業主清單管理、預設值設定已落地，與合約模組高度耦合。
- basic/widget/fab：浮動按鈕已落地，純 UI 工具，與多模組共用。
- tree/contract：樹狀合約元件僅 UI 佔位，功能定位待明確。
- workspace/：工作區中心佔位，暫無合約關聯。
- routes.ts：路由設定分層分明，無明顯耦合。

## 已完成
- 合約主模組 CRUD、型別、業主設定、序號管理
- 通用 CRUD UI/服務（fire-crud/）
- 設定頁（settings/）
- 浮動按鈕（fab）

## 進行中/待補
- fire-crud/ 泛型化、欄位抽象化
- tree/contract 功能定位與資料流設計
- 多次請款、動態審批等新需求檔案骨架與資料流設計 

## 多次請款與動態審批骨架進度（2024-06-22）
- contract-payment-list.component.ts、contract-payment-form.component.ts、contract-payment.model.ts、contract-payment.service.ts、contract-workflow.model.ts、contract-workflow.service.ts 已建立骨架
- 下一步：資料流整合、UI prototype 
