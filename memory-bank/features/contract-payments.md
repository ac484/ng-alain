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
