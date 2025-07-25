# Memory Bank: Tasks

## 合約模組現有任務（2024-06-22）
- 主合約模組（hub/contract/）CRUD、型別、業主設定、序號管理已落地
- 樹狀元件、面板元件功能定位與整合
- 多次請款、動態審批等新需求檔案骨架與資料流設計

## 狀態
- [x] 主合約模組落地
- [ ] 樹狀元件、面板元件整合
- [ ] 多次請款、動態審批新需求落地

## 需求
- 合約可展開多次請款，子表格支援行內編輯
- 請款單根據業主自動選用對應流程模板，狀態流轉正確
- 設定頁可 CRUD 多個流程模板，支援步驟排序、條件分支
- 所有資料型別、service、UI 分層清晰，Memory Bank 文件同步 

## hub/ 目錄下合約相關元件現有任務（2024-06-22）
- contract/：主合約模組 CRUD、型別、業主設定、序號管理已落地
- fire-crud/：通用 CRUD UI/服務已落地，泛型化、欄位抽象化待加強
- settings/：業主清單管理、預設值設定已落地，與合約模組高度耦合
- basic/widget/fab：浮動按鈕已落地，純 UI 工具，與多模組共用
- tree/contract：樹狀合約元件僅 UI 佔位，功能定位待明確
- workspace/：工作區中心佔位，暫無合約關聯
- routes.ts：路由設定分層分明，無明顯耦合

## 狀態
- [x] 主合約模組落地
- [x] 通用 CRUD UI/服務落地
- [x] 設定頁落地
- [x] 浮動按鈕落地
- [ ] fire-crud/ 泛型化、欄位抽象化
- [ ] tree/contract 功能定位與資料流設計
- [ ] 多次請款、動態審批新需求落地 

## 多次請款與動態審批骨架任務狀態（2024-06-22）
- contract-payment-list.component.ts、contract-payment-form.component.ts、contract-payment.model.ts、contract-payment.service.ts、contract-workflow.model.ts、contract-workflow.service.ts 已完成骨架產生
- 下一步：資料流整合、UI prototype 
