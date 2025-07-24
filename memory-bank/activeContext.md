# Memory Bank: Active Context

## 合約模組完整上下文（2024-06-22）

### hub/contract/
- contract-list.component.ts：合約主清單，支援行內編輯（合約名稱、代碼、金額）、業主下拉切換、新增、刪除。UI 直接呼叫 contract.service.ts 進行 CRUD，業主清單由 contract.service.ts 取得。型別依賴 Contract。UI/Service 分離良好。**限制：無多次請款、流程欄位，僅單層合約資料。**
- contract-form.component.ts：合約新增/編輯表單，Reactive Form 驗證。@Input 傳入合約資料與業主清單，@Output save/cancel。型別依賴 Contract。純表單元件，無資料存取邏輯。
- contract.component.ts：路由進入點，僅渲染 <contract-list>。純容器。
- contract.model.ts：Contract interface，欄位有 key, contractSerial, client, contractName, contractCode, feeCode, amount。所有合約資料型別依據。
- contract.service.ts：合約 CRUD、業主設定、合約序號管理。底層依賴 HubCrudService 操作 Firestore。所有合約資料操作唯一入口，業務邏輯集中。**限制：無多次請款、流程、歷程等複雜欄位與邏輯。**

### hub/basic/widget/fab.component.ts
- 浮動按鈕（FAB），支援拖曳、動態方向、可擴充多功能，主要用於觸發新增（emit 'add'）。由父元件（如 contract-list、hub-fire-crud）接收 onAction 事件，觸發新增資料。純 UI 工具，無資料邏輯，與合約模組、fire-crud 等多處共用。

### hub/fire-crud/hub-crud.component.ts & hub-crud.service.ts
- 通用 CRUD UI 與服務，支援表格行內編輯、刪除、新增，欄位設計偏向合約範例（contractSerial、client、contractName...）。直接呼叫 HubCrudService 操作 Firestore，資料型別預設為 Contract，但理論上可泛用。UI/Service 分離，UI 仍有合約欄位耦合（如 contractName），但已盡量抽象。尚未完全泛型化，部分欄位/邏輯仍與合約耦合。

### hub/settings/settings.component.ts/html
- 業主清單管理，支援 CRUD、預設值設定，直接操作 contractService 的 get/setClientsSettings。UI 直接呼叫 contractService，資料存於 Firestore。與合約模組（contractService）高度耦合，屬於合約設定子模組。

### hub/tree/contract.component.ts/html
- 合約樹狀元件，目前僅為 UI 佔位，尚無實際資料流與邏輯。未與主合約模組直接耦合，功能定位待明確。

### hub/workspace/workspace.component.ts/html
- 工作區中心佔位，暫無與合約直接關聯。

### hub/routes.ts
- 路由設定，合約、樹狀合約、工作區、設定等皆有對應路由。各子模組獨立路由進入點，路由層級分明，無明顯耦合。

### contract/contract-panel/
- 合約面板元件，可能用於合約詳情、操作面板、特殊場景（如審批、歷程）。需確認是否共用 contract.model.ts/contract.service.ts。**與主合約模組關聯待釐清，可能有重複邏輯。**

### 其他
- routes.ts：合約路由設定，指向 hub/contract 或 contract-panel。
- memory-bank/features/contract-payments.md：僅為文件，無程式碼。

### 分層與現有問題
- 主合約模組分層清楚，型別安全，UI/Service 分離，業務邏輯集中。
- 合約相關 UI 分布於 hub/contract、hub/tree、contract-panel，存在分散與潛在重複，需進一步整合或明確分工。
- 多次請款、動態審批等新需求尚未有對應檔案，僅在文件規劃。
- 合約資料為單層結構，無嵌套子表格與流程欄位。
- contract.service.ts 為唯一業務邏輯入口，其他元件多為 UI 展現。

---

### 綜合現況分析
- 合約主模組（contract/）：分層清楚，UI/Service/型別分離，業務邏輯集中於 contract.service.ts。
- 通用 CRUD（fire-crud/）：理論上泛用，但實作上仍有合約欄位耦合，需進一步抽象。
- 設定（settings/）：高度耦合於合約模組，屬於合約設定子模組。
- 工具（fab）：純 UI 工具，與多模組共用。
- 樹狀元件（tree/）：僅 UI 佔位，功能定位待明確。
- 工作區（workspace/）：暫無合約關聯。
- 路由（routes.ts）：分層分明，無明顯耦合。

---

### 與「完全同步」的差距
- fire-crud/ 實際上與合約模組有欄位耦合，Memory Bank 已明確記錄。
- settings/ 實際上是合約設定子模組，Memory Bank 已明確記錄。
- fab、tree、workspace 等工具/元件的定位、資料流、耦合狀態已完整納入 Memory Bank。
- 合約相關的所有 UI/Service/設定/工具/資料流/耦合點，已在 Memory Bank 條列到每一層級。

> 本摘要為後續 Memory Bank 文件、型別設計、功能擴充的基礎，請隨時同步更新。 

### 多次請款與動態審批骨架現況（2024-06-22）
- contract-payment-list.component.ts：多次請款子表格骨架已建立
- contract-payment-form.component.ts：單次請款編輯表單骨架已建立
- contract-payment.model.ts：多次請款型別骨架已建立
- contract-payment.service.ts：多次請款 service 骨架已建立
- contract-workflow.model.ts：請款審批流程型別骨架已建立
- contract-workflow.service.ts：動態審批流程 service 骨架已建立
- 下一步：資料流整合、UI prototype 實作 

### 多次請款與動態審批骨架檔案設計說明（2024-06-22）

#### contract-payment-list.component.ts
- 設計動機：合約清單展開多次請款子表格，支援行內編輯、動態載入、狀態渲染。
- 職責：UI 展示與互動，所有資料操作透過 ContractPaymentService。
- 資料流：@Input contractId，ngOnInit 時呼叫 paymentService.list(contractId) 載入資料，addRow/stopEdit/deleteRow 皆呼叫 service。
- 型別依賴：ContractPayment。
- 整合點：需在 contract-list.component.ts 展開子表格時動態載入。
- 現況：骨架已建立，尚未串接主合約清單、尚未實作資料驗證與狀態流轉。
- TODO：串接主合約清單、實作資料驗證、狀態流轉、UI prototype。

#### contract-payment-form.component.ts
- 設計動機：單次請款編輯表單，支援欄位驗證、儲存、取消。
- 職責：UI 表單，所有資料操作透過 ContractPaymentService。
- 資料流：@Input payment，@Output save/cancel。
- 型別依賴：ContractPayment。
- 整合點：供 contract-payment-list.component.ts 彈窗/行內編輯時使用。
- 現況：骨架已建立，尚未串接資料流、驗證、UI prototype。
- TODO：串接 paymentService、完善驗證、UI prototype。

#### contract-payment.model.ts
- 設計動機：定義多次請款資料結構，支援狀態、流程、附件、備註等。
- 職責：型別定義，供 service 與 UI 使用。
- 資料流：與 contract-payment.service.ts、contract-payment-list.component.ts 串接。
- 現況：骨架已建立，型別可擴充。
- TODO：根據實際需求擴充欄位。

#### contract-payment.service.ts
- 設計動機：封裝多次請款的 CRUD 與業務邏輯，未來可擴充狀態流轉、驗證等。
- 職責：所有請款資料的存取、驗證、狀態流轉。
- 資料流：底層依賴 HubCrudService，所有操作皆透過此 service。
- 型別依賴：ContractPayment。
- 整合點：供 contract-payment-list、contract-payment-form 等元件呼叫。
- 現況：骨架已建立，狀態流轉/驗證等業務邏輯待補。
- TODO：實作狀態流轉、資料驗證、串接 UI。

#### contract-workflow.model.ts
- 設計動機：定義動態審批流程的資料結構，支援多模板、條件分支。
- 職責：型別定義，供 service 與 UI 使用。
- 資料流：與 contract-payment.service.ts、contract-workflow.service.ts 串接。
- 現況：骨架已建立，尚未串接實際流程設計器/設定頁。
- TODO：根據流程設計需求擴充欄位。

#### contract-workflow.service.ts
- 設計動機：封裝動態審批流程模板 CRUD、狀態機邏輯、流程運行時狀態管理。
- 職責：所有流程模板的存取、狀態機運作。
- 資料流：底層依賴 HubCrudService，所有操作皆透過此 service。
- 型別依賴：WorkflowDefinition。
- 整合點：供流程設計器、contract-payment.service.ts 等呼叫。
- 現況：骨架已建立，狀態機邏輯待補。
- TODO：實作狀態機、串接流程設計器、資料驗證。 
