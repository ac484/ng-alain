# Tech Context

## 前端技術棧
- Angular v20
- ng-zorro-antd v20
- TypeScript（嚴格模式）
- RxJS

## 後端/資料庫
- Firebase Firestore（NoSQL）
- @angular/fire

## 開發工具
- Yarn
- Angular CLI
- VSCode

## 其他
- OnPush Change Detection
- Memory Bank 文件同步 

## UI 元件標準化原則（2024-更新）
- 所有表單、表格、彈窗、通知、分頁、選單、進度條等 UI 元件，**務必優先使用 ng-zorro-antd 官方元件**。
- 僅在官方元件無法滿足需求時，才自訂元件。
- 設計、審查、重構時，需主動檢查是否有可用 ng-zorro-antd 元件。

### ng-zorro-antd v20 常用組件分類清單

#### 資料展示
- `nz-table`（表格，支援排序、分頁、篩選、嵌套、行內編輯）
- `nz-list`（清單）
- `nz-card`（卡片）
- `nz-descriptions`（描述列表）
- `nz-tree`（樹狀結構）
- `nz-collapse`（手風琴）
- `nz-timeline`（時間軸）
- `nz-tag`（標籤）
- `nz-badge`（徽章）
- `nz-avatar`（頭像）
- `nz-empty`（空狀態）

#### 表單與輸入
- `nz-form`（表單）
- `nz-input`（輸入框）
- `nz-input-number`（數字輸入框）
- `nz-select`（下拉選單）
- `nz-checkbox`（勾選框）
- `nz-radio`（單選框）
- `nz-switch`（開關）
- `nz-slider`（滑桿）
- `nz-date-picker`（日期選擇器）
- `nz-time-picker`（時間選擇器）
- `nz-upload`（檔案上傳）
- `nz-rate`（評分）

#### 操作與反饋
- `nz-button`（按鈕）
- `nz-dropdown`（下拉選單）
- `nz-modal`（對話框）
- `nz-popconfirm`（氣泡確認框）
- `nz-message`（全域訊息）
- `nz-notification`（全域通知）
- `nz-spin`（加載中）
- `nz-progress`（進度條）
- `nz-alert`（警告提示）
- `nz-tooltip`（提示）
- `nz-popover`（氣泡卡片）
- `nz-drawer`（抽屜）

#### 導航與佈局
- `nz-menu`（選單）
- `nz-breadcrumb`（麵包屑）
- `nz-pagination`（分頁）
- `nz-steps`（步驟條）
- `nz-tabs`（分頁籤）
- `nz-anchor`（錨點）
- `nz-affix`（固頂）
- `nz-layout`（佈局）
- `nz-grid`（網格系統）
- `nz-divider`（分隔線）

#### 圖表與媒體
- `nz-image`（圖片）
- `nz-carousel`（輪播）
- `nz-calendar`（行事曆）
- `nz-statistic`（統計數字）
- `nz-countdown`（倒數計時）
- `nz-skeleton`（骨架屏）

#### 其他
- `nz-icon`（圖標）
- `nz-back-top`（回到頂部）
- `nz-segmented`（分段控制）
- `nz-resizable`（可調整大小）
- `nz-qrcode`（二維碼） 
