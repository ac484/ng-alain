# Feature: Contract Payments（多次請款）

## 目標
- 合約可展開多次請款，子表格支援行內編輯、動態載入。
- 每筆請款單可綁定動態審批流程，狀態流轉正確。

## 型別設計
- ContractPayment：
  - id: string
  - contractId: string
  - amount: number
  - status: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'invoiced' | 'countdown'
  - workflowId: string
  - steps: ContractPaymentStep[]
  - attachments: string[]
  - remark: string
  - createdAt: Timestamp
  - updatedAt: Timestamp
- ContractPaymentStep：
  - name: string
  - status: 'pending' | 'done' | 'rejected'
  - approver: string
  - comment: string
  - updatedAt: Timestamp

## 資料流
- contract-list.component.ts（父）：展開顯示 contract-payment-list（子）
- contract-payment-list.component.ts：載入/編輯多次請款，根據合約/業主載入對應流程
- contract-payment-form.component.ts：單筆請款行內編輯
- contract-payment.service.ts：CRUD、資料驗證、狀態流轉

## UI 分層
- 父/子元件分離，UI 只依賴對應 service
- OnPush 策略，型別安全 

## 現有合約模組與多次請款/動態審批的銜接現況（2024-06-22）
- 目前合約資料結構為單層，無嵌套子表格（多次請款）與流程欄位
- contract-payment-list.component.ts、contract-payment.model.ts、contract-workflow.model.ts 等新需求檔案尚未落地
- contract.service.ts 尚未支援多次請款、動態審批等複雜資料流與狀態機
- 合約相關 UI 分布於 hub/contract、hub/tree、contract-panel，存在分散與潛在重複，需進一步整合或明確分工 

## hub/ 目錄下合約相關元件現有設計現況與問題（2024-06-22）
- contract/：僅有單層合約結構，無多次請款、流程欄位與對應型別/service/UI
- fire-crud/：通用 CRUD UI/服務部分欄位/邏輯仍與合約耦合，泛型化待加強
- settings/：高度耦合於合約模組，屬於合約設定子模組
- basic/widget/fab：純 UI 工具，與多模組共用
- tree/contract：僅 UI 佔位，功能定位待明確
- workspace/：暫無合約關聯
- routes.ts：路由設定分層分明，無明顯耦合 
