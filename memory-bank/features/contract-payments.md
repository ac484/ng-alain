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

## 多次請款與動態審批骨架檔案落地狀態（2024-06-22）
- contract-payment-list.component.ts、contract-payment-form.component.ts、contract-payment.model.ts、contract-payment.service.ts、contract-workflow.model.ts、contract-workflow.service.ts 已建立骨架
- 下一步：資料流整合、UI prototype 

## 多次請款與動態審批骨架檔案設計細節（2024-06-22）

### contract-payment-list.component.ts
- 設計動機：合約清單展開多次請款子表格，支援行內編輯、動態載入、狀態渲染。
- 職責：UI 展示與互動，所有資料操作透過 ContractPaymentService。
- 資料流：@Input contractId，ngOnInit 時呼叫 paymentService.list(contractId) 載入資料，addRow/stopEdit/deleteRow 皆呼叫 service。
- 型別依賴：ContractPayment。
- 整合點：需在 contract-list.component.ts 展開子表格時動態載入。
- 現況：骨架已建立，尚未串接主合約清單、尚未實作資料驗證與狀態流轉。
- TODO：串接主合約清單、實作資料驗證、狀態流轉、UI prototype。

### contract-payment-form.component.ts
- 設計動機：單次請款編輯表單，支援欄位驗證、儲存、取消。
- 職責：UI 表單，所有資料操作透過 ContractPaymentService。
- 資料流：@Input payment，@Output save/cancel。
- 型別依賴：ContractPayment。
- 整合點：供 contract-payment-list.component.ts 彈窗/行內編輯時使用。
- 現況：骨架已建立，尚未串接資料流、驗證、UI prototype。
- TODO：串接 paymentService、完善驗證、UI prototype。

### contract-payment.model.ts
- 設計動機：定義多次請款資料結構，支援狀態、流程、附件、備註等。
- 職責：型別定義，供 service 與 UI 使用。
- 資料流：與 contract-payment.service.ts、contract-payment-list.component.ts 串接。
- 現況：骨架已建立，型別可擴充。
- TODO：根據實際需求擴充欄位。

### contract-payment.service.ts
- 設計動機：封裝多次請款的 CRUD 與業務邏輯，未來可擴充狀態流轉、驗證等。
- 職責：所有請款資料的存取、驗證、狀態流轉。
- 資料流：底層依賴 HubCrudService，所有操作皆透過此 service。
- 型別依賴：ContractPayment。
- 整合點：供 contract-payment-list、contract-payment-form 等元件呼叫。
- 現況：骨架已建立，狀態流轉/驗證等業務邏輯待補。
- TODO：實作狀態流轉、資料驗證、串接 UI。

### contract-workflow.model.ts
- 設計動機：定義動態審批流程的資料結構，支援多模板、條件分支。
- 職責：型別定義，供 service 與 UI 使用。
- 資料流：與 contract-payment.service.ts、contract-workflow.service.ts 串接。
- 現況：骨架已建立，尚未串接實際流程設計器/設定頁。
- TODO：根據流程設計需求擴充欄位。

### contract-workflow.service.ts
- 設計動機：封裝動態審批流程模板 CRUD、狀態機邏輯、流程運行時狀態管理。
- 職責：所有流程模板的存取、狀態機運作。
- 資料流：底層依賴 HubCrudService，所有操作皆透過此 service。
- 型別依賴：WorkflowDefinition。
- 整合點：供流程設計器、contract-payment.service.ts 等呼叫。
- 現況：骨架已建立，狀態機邏輯待補。
- TODO：實作狀態機、串接流程設計器、資料驗證。
