# Hub 目錄結構完整規劃

## 目標結構樹

```
src/app/routes/hub/
├── core/                                    # 核心基礎設施
│   ├── services/                           # 核心業務服務
│   │   ├── hub-crud.service.ts            # 通用 CRUD 操作服務
│   │   ├── error-handling.service.ts      # 錯誤處理服務
│   │   └── index.ts                       # 服務匯出
│   ├── models/                            # 核心資料模型
│   │   ├── base.model.ts                  # 基礎模型介面
│   │   ├── auditable.model.ts             # 可審計模型介面
│   │   └── index.ts                       # 模型匯出
│   ├── repositories/                      # 資料存取層
│   │   ├── base.repository.ts             # 基礎儲存庫抽象類
│   │   └── index.ts                       # 儲存庫匯出
│   └── index.ts                          # 核心模組匯出
├── shared/                                # 共享元件和工具
│   ├── components/                        # 可重用 UI 元件
│   │   ├── fab/                          # 浮動操作按鈕
│   │   │   ├── fab.component.ts
│   │   │   ├── fab.component.html
│   │   │   ├── fab.component.less
│   │   │   └── index.ts
│   │   ├── error-boundary/               # 錯誤邊界元件
│   │   │   ├── error-boundary.component.ts
│   │   │   ├── error-boundary.component.html
│   │   │   ├── error-boundary.component.less
│   │   │   └── index.ts
│   │   ├── loading-spinner/              # 載入動畫元件
│   │   │   ├── loading-spinner.component.ts
│   │   │   ├── loading-spinner.component.html
│   │   │   ├── loading-spinner.component.less
│   │   │   └── index.ts
│   │   ├── confirmation-dialog/          # 確認對話框元件
│   │   │   ├── confirmation-dialog.component.ts
│   │   │   ├── confirmation-dialog.component.html
│   │   │   ├── confirmation-dialog.component.less
│   │   │   └── index.ts
│   │   └── index.ts                      # 元件匯出
│   ├── directives/                       # 共享指令
│   │   └── index.ts
│   ├── pipes/                           # 共享管道
│   │   └── index.ts
│   ├── utils/                           # 工具函數
│   │   ├── date.utils.ts
│   │   ├── validation.utils.ts
│   │   └── index.ts
│   └── index.ts                         # 共享模組匯出
├── features/                            # 功能模組
│   ├── contracts/                       # 合約管理功能
│   │   ├── components/                  # 合約相關元件
│   │   │   ├── contract-list/          # 合約列表元件
│   │   │   │   ├── contract-list.component.ts
│   │   │   │   ├── contract-list.component.html
│   │   │   │   ├── contract-list.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-form/          # 合約表單元件
│   │   │   │   ├── contract-form.component.ts
│   │   │   │   ├── contract-form.component.html
│   │   │   │   ├── contract-form.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-detail/        # 合約詳情元件
│   │   │   │   ├── contract-detail.component.ts
│   │   │   │   ├── contract-detail.component.html
│   │   │   │   ├── contract-detail.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-payments/      # 多次請款子功能
│   │   │   │   ├── payment-list/      # 請款列表元件
│   │   │   │   │   ├── payment-list.component.ts
│   │   │   │   │   ├── payment-list.component.html
│   │   │   │   │   ├── payment-list.component.less
│   │   │   │   │   └── index.ts
│   │   │   │   ├── payment-form/      # 請款表單元件
│   │   │   │   │   ├── payment-form.component.ts
│   │   │   │   │   ├── payment-form.component.html
│   │   │   │   │   ├── payment-form.component.less
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts           # 請款元件匯出
│   │   │   ├── contract-workflow/     # 動態審批子功能
│   │   │   │   ├── workflow-steps/   # 工作流程步驟元件
│   │   │   │   │   ├── workflow-steps.component.ts
│   │   │   │   │   ├── workflow-steps.component.html
│   │   │   │   │   ├── workflow-steps.component.less
│   │   │   │   │   └── index.ts
│   │   │   │   ├── workflow-designer/ # 工作流程設計器（未來功能）
│   │   │   │   │   ├── workflow-designer.component.ts
│   │   │   │   │   ├── workflow-designer.component.html
│   │   │   │   │   ├── workflow-designer.component.less
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts          # 工作流程元件匯出
│   │   │   └── index.ts              # 合約元件匯出
│   │   ├── services/                 # 合約業務邏輯
│   │   │   ├── contract.service.ts   # 合約服務
│   │   │   ├── contract-payment.service.ts # 請款服務
│   │   │   ├── contract-workflow.service.ts # 工作流程服務
│   │   │   ├── contract.repository.ts # 合約儲存庫
│   │   │   └── index.ts              # 服務匯出
│   │   ├── models/                   # 合約資料模型
│   │   │   ├── contract.model.ts     # 合約模型
│   │   │   ├── contract-payment.model.ts # 請款模型
│   │   │   ├── contract-workflow.model.ts # 工作流程模型
│   │   │   └── index.ts              # 模型匯出
│   │   ├── routes.ts                 # 合約功能路由
│   │   └── index.ts                  # 合約功能匯出
│   ├── settings/                     # 設定管理功能
│   │   ├── components/               # 設定相關元件
│   │   │   ├── settings-list/       # 設定列表元件
│   │   │   │   ├── settings-list.component.ts
│   │   │   │   ├── settings-list.component.html
│   │   │   │   ├── settings-list.component.less
│   │   │   │   └── index.ts
│   │   │   ├── client-settings/     # 業主設定元件
│   │   │   │   ├── client-settings.component.ts
│   │   │   │   ├── client-settings.component.html
│   │   │   │   ├── client-settings.component.less
│   │   │   │   └── index.ts
│   │   │   └── index.ts             # 設定元件匯出
│   │   ├── services/                # 設定業務邏輯
│   │   │   ├── settings.service.ts  # 設定服務
│   │   │   ├── settings.repository.ts # 設定儲存庫
│   │   │   └── index.ts             # 服務匯出
│   │   ├── models/                  # 設定資料模型
│   │   │   ├── settings.model.ts    # 設定模型
│   │   │   └── index.ts             # 模型匯出
│   │   ├── routes.ts                # 設定功能路由
│   │   └── index.ts                 # 設定功能匯出
│   ├── workspace/                   # 工作區管理功能
│   │   ├── components/              # 工作區相關元件
│   │   │   ├── workspace-dashboard/ # 工作區儀表板
│   │   │   │   ├── workspace-dashboard.component.ts
│   │   │   │   ├── workspace-dashboard.component.html
│   │   │   │   ├── workspace-dashboard.component.less
│   │   │   │   └── index.ts
│   │   │   └── index.ts             # 工作區元件匯出
│   │   ├── services/                # 工作區業務邏輯
│   │   │   ├── workspace.service.ts # 工作區服務
│   │   │   └── index.ts             # 服務匯出
│   │   ├── models/                  # 工作區資料模型
│   │   │   ├── workspace.model.ts   # 工作區模型
│   │   │   └── index.ts             # 模型匯出
│   │   ├── routes.ts                # 工作區功能路由
│   │   └── index.ts                 # 工作區功能匯出
│   └── index.ts                     # 功能模組匯出
├── routes.ts                        # 主要 Hub 路由配置
└── index.ts                         # Hub 模組匯出
```

## 現有檔案對應新位置映射表

### 核心服務層
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `fire-crud/hub-crud.service.ts` | `core/services/hub-crud.service.ts` | 增強為泛型服務 |
| - | `core/services/error-handling.service.ts` | 新建錯誤處理服務 |
| - | `core/repositories/base.repository.ts` | 新建儲存庫模式 |

### 共享元件
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `basic/widget/fab.component.ts` | `shared/components/fab/fab.component.ts` | 移除業務邏輯耦合 |
| - | `shared/components/error-boundary/` | 新建錯誤邊界元件 |
| - | `shared/components/loading-spinner/` | 新建載入元件 |

### 合約功能
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `contract/contract.component.ts` | `features/contracts/components/contract-detail/contract-detail.component.ts` | 重新命名並轉為獨立元件 |
| `contract/contract-list.component.ts` | `features/contracts/components/contract-list/contract-list.component.ts` | 轉為獨立元件 |
| `contract/contract-form.component.ts` | `features/contracts/components/contract-form/contract-form.component.ts` | 轉為獨立元件 |
| `contract/contract-payment-list.component.ts` | `features/contracts/components/contract-payments/payment-list/payment-list.component.ts` | 移至子功能目錄 |
| `contract/contract-payment-form.component.ts` | `features/contracts/components/contract-payments/payment-form/payment-form.component.ts` | 移至子功能目錄 |
| `contract/contract-workflow-steps.component.ts` | `features/contracts/components/contract-workflow/workflow-steps/workflow-steps.component.ts` | 移至子功能目錄 |
| `contract/contract.service.ts` | `features/contracts/services/contract.service.ts` | 使用儲存庫模式重構 |
| `contract/contract-payment.service.ts` | `features/contracts/services/contract-payment.service.ts` | 使用儲存庫模式重構 |
| `contract/contract-workflow.service.ts` | `features/contracts/services/contract-workflow.service.ts` | 使用儲存庫模式重構 |
| `contract/contract.model.ts` | `features/contracts/models/contract.model.ts` | 繼承基礎模型 |
| `contract/contract-payment.model.ts` | `features/contracts/models/contract-payment.model.ts` | 繼承基礎模型 |
| `contract/contract-workflow.model.ts` | `features/contracts/models/contract-workflow.model.ts` | 繼承基礎模型 |

### 設定功能
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `settings/settings.component.ts` | `features/settings/components/client-settings/client-settings.component.ts` | 重新命名並轉為獨立元件 |
| `settings/settings.component.html` | `features/settings/components/client-settings/client-settings.component.html` | 對應 HTML 檔案 |
| `settings/settings.component.less` | `features/settings/components/client-settings/client-settings.component.less` | 對應樣式檔案 |

### 工作區功能
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `workspace/workspace.component.ts` | `features/workspace/components/workspace-dashboard/workspace-dashboard.component.ts` | 重新命名並轉為獨立元件 |

### 路由配置
| 現有位置 | 新位置 | 說明 |
|---------|--------|------|
| `routes.ts` | `routes.ts` | 重構為懶載入配置 |
| - | `features/contracts/routes.ts` | 新建合約功能路由 |
| - | `features/settings/routes.ts` | 新建設定功能路由 |
| - | `features/workspace/routes.ts` | 新建工作區功能路由 |

## 執行順序建議

### 階段 1：基礎設施建立
1. 建立新目錄結構
2. 建立基礎模型和介面
3. 建立核心服務層

### 階段 2：共享元件遷移
1. 遷移 FAB 元件到共享目錄
2. 建立新的共享元件
3. 設定匯出檔案

### 階段 3：功能模組遷移
1. 遷移合約功能（優先級最高）
2. 遷移設定功能
3. 遷移工作區功能

### 階段 4：路由重構
1. 建立功能路由檔案
2. 重構主路由為懶載入
3. 測試路由功能

### 階段 5：清理和優化
1. 刪除舊檔案
2. 更新所有匯入語句
3. 執行測試和驗證

這個完整的結構規劃確保了每個任務都有明確的目標和位置，避免執行過程中的混亂。