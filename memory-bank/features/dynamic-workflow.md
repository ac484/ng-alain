# Feature: Dynamic Workflow（動態審批流程）

## 目標
- 支援多種審批流程模板，業主/合約可選不同流程。
- 流程模板可 CRUD、拖拉排序、條件分支。
- 請款單根據業主自動選用對應流程模板。

## 型別設計
- WorkflowDefinition：
  - id: string
  - name: string
  - ownerIds: string[]
  - steps: WorkflowStep[]
  - conditions: WorkflowCondition[]
  - createdAt: Timestamp
  - updatedAt: Timestamp
- WorkflowStep：
  - name: string
  - approverRole: string
  - actions: string[]
  - nextStep: string | null
  - conditionId: string | null
- WorkflowCondition：
  - id: string
  - field: string
  - operator: '=' | '>' | '<' | 'in' | 'not in'
  - value: any

## 狀態機邏輯
- contract-workflow.service.ts：根據請款單/業主載入對應流程模板，控制狀態流轉
- 支援條件分支、節點動作、歷程追蹤

## 資料儲存
- 所有流程模板、節點、條件皆存於 Firestore，支援即時同步 
