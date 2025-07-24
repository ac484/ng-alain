# Memory Bank: Active Context

## 當前開發重點（2024-06-22）
- contract-payment-list（多次請款子表格，嵌套於合約清單）
- workflow-settings（動態審批流程設計器，支援多模板、拖拉、條件分支）

## 目前狀態
- 型別設計已完成（contract-payment.model.ts、contract-workflow.model.ts）
- contract-payment.service.ts、contract-workflow.service.ts 初稿完成，資料流/狀態機邏輯設計中
- workflow-settings.component.ts UI/資料流設計進行中
- contract-payment-list.component.ts 行內編輯/狀態流轉整合進行中

## 遇到的挑戰
- 資料流整合（合約/請款/流程模板多層嵌套）
- 狀態機條件分支設計（流程模板彈性、狀態流轉驗證）
- UI/Service 分層（避免耦合，型別安全）

## 下一步
- 完成 service/service 單元測試
- 完成 UI prototype（contract-payment-list、workflow-settings）
- 持續同步 Memory Bank 文件，記錄設計決策、狀態機範本、資料結構 
