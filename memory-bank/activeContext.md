# Memory Bank: Active Context

## 合約模組現有上下文（2024-06-22）

### 主要檔案與分層
- contract-list.component.ts：合約清單，行內編輯、業主切換、CRUD
- contract-form.component.ts：合約表單，Reactive Form 驗證、欄位編輯
- contract.component.ts：合約主元件，路由進入點/容器
- contract.model.ts：Contract 型別定義
- contract.service.ts：合約 CRUD、業主設定、合約序號管理

### 資料流與型別
- UI 透過 ContractService 取得/操作合約資料，所有資料皆依賴 Contract 型別
- 合約資料結構：key, contractSerial, client, contractName, contractCode, feeCode, amount
- 合約序號、業主清單等業務邏輯集中於 Service

### 現有優缺點
- 分層清楚，型別安全，UI/Service 分離，業務邏輯集中
- 但尚未有多次請款、動態審批等新需求的型別、Service、UI
- 合約資料為單層結構，無嵌套子表格與流程欄位

### 與其他模組關聯
- HubCrudService：底層 Firestore CRUD
- FabComponent：浮動按鈕，觸發新增
- settings.component.ts：呼叫 ContractService 取得/設定業主清單

---

> 本摘要為後續 Memory Bank 文件、型別設計、功能擴充的基礎，請隨時同步更新。 
