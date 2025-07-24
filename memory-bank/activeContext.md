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
