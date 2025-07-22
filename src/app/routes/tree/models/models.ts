/**
 * 樹狀結構模型定義
 * 完全跟隨 ng-zorro-antd 官方型別定義
 * 提供完整的樹狀節點和任務管理型別支援
 */

// ==================== 官方型別定義複製（基礎型別，請勿修改） ====================
// ⚠️ 重要：以下型別定義直接複製自 ng-zorro-antd/core/tree
// 這些是官方基礎型別，作為整個樹狀結構的基礎，請勿修改
// 如需擴展，請在下方「擴展型別定義」區塊中進行

// 從官方 ng-zorro-antd/core/tree 複製的型別定義
export type NzTreeNodeKey = string | number;

/**
 * 官方樹狀節點選項介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義樹狀節點的基本屬性
 */
export interface NzTreeNodeOptions {
  title: string; // 節點標題
  key: string; // 節點唯一識別碼
  icon?: string; // 節點圖標
  children?: NzTreeNodeOptions[]; // 子節點陣列
  isLeaf?: boolean; // 是否為葉子節點
  checked?: boolean; // 是否被勾選
  selected?: boolean; // 是否被選中
  expanded?: boolean; // 是否展開
  selectable?: boolean; // 是否可選
  disabled?: boolean; // 是否禁用
  disableCheckbox?: boolean; // 是否禁用複選框
  [key: string]: any; // 支援自訂屬性（官方設計）
}

/**
 * 官方樹狀節點介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：樹狀節點的完整實例，包含所有方法和屬性
 */
export interface NzTreeNode {
  title: string; // 節點標題
  key: string; // 節點唯一識別碼
  level: number; // 節點層級
  children: NzTreeNode[]; // 子節點陣列
  origin: NzTreeNodeOptions; // 原始節點選項
  getParentNode(): NzTreeNode | null; // 獲取父節點
  isLeaf: boolean; // 是否為葉子節點
  isExpanded: boolean; // 是否展開
  isDisabled: boolean; // 是否禁用
  isDisableCheckbox: boolean; // 是否禁用複選框
  isSelectable: boolean; // 是否可選
  isChecked: boolean; // 是否勾選
  isHalfChecked: boolean; // 是否半選
  isSelected: boolean; // 是否選中
  isLoading: boolean; // 是否載入中
  isMatched: boolean; // 是否匹配（搜尋用）
  setSyncChecked(checked: boolean, halfChecked: boolean): void; // 設置同步勾選狀態
  getChildren(): NzTreeNode[]; // 獲取子節點
  addChildren(children: NzTreeNode[] | NzTreeNodeOptions[], index?: number): void; // 添加子節點
  clearChildren(): void; // 清除子節點
  remove(): void; // 移除節點
  [key: string]: any; // 支援自訂屬性（官方設計）
}

/**
 * 官方樹狀事件格式介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義樹狀組件的事件回調格式
 */
export interface NzFormatEmitEvent {
  eventName: string; // 事件名稱
  node: NzTreeNode | null; // 當前操作節點
  event: MouseEvent | DragEvent | null; // 原生事件
  dragNode?: NzTreeNode; // 拖拽節點（拖拽時存在）
  selectedKeys?: NzTreeNode[]; // 已選中節點列表
  checkedKeys?: NzTreeNode[]; // 已勾選節點列表
  matchedKeys?: NzTreeNode[]; // 匹配節點列表（搜尋用）
  keys?: string[]; // 節點鍵值陣列
  nodes?: NzTreeNode[]; // 節點陣列
}

/**
 * 官方拖拽前事件介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義拖拽放置前的確認事件格式
 */
export interface NzFormatBeforeDropEvent {
  dragNode: NzTreeNode; // 拖拽節點
  node: NzTreeNode; // 目標節點
  pos: number; // 放置位置（-1: 前面, 0: 內部, 1: 後面）
}

// ==================== 業務型別定義（可自由擴展） ====================

/**
 * 節點類型枚舉
 * 用途：定義空間節點的不同類型
 */
export type SpaceNodeType = 'root' | 'trunk' | 'branch' | 'leaf'; // 根節點、主幹、分支、葉子節點

/**
 * 節點狀態枚舉
 * 用途：定義節點的生命週期狀態
 */
export type NodeStatus = 'active' | 'inactive' | 'archived'; // 活動、不活動、已歸檔

/**
 * 任務狀態枚舉
 * 用途：定義任務的執行狀態
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'; // 待辦、進行中、已完成、已取消

/**
 * 任務優先級枚舉
 * 用途：定義任務的優先級別
 */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'; // 低、中、高、緊急

/**
 * 節點權限介面
 * 用途：定義節點的訪問和操作權限
 */
export interface NodePermissions {
  canView: boolean; // 是否可查看
  canEdit: boolean; // 是否可編輯
  canDelete: boolean; // 是否可刪除
  canAddChildren: boolean; // 是否可新增子節點
  canAddTasks: boolean; // 是否可新增任務
}

// ==================== 基礎實體介面 ====================

/**
 * 基礎實體介面
 * 用途：所有實體的基礎屬性，提供審計追蹤功能
 */
export interface BaseEntity {
  id: string; // 主鍵ID
  createdAt?: string; // 建立時間（ISO 日期字串）
  updatedAt?: string; // 更新時間（ISO 日期字串）
  createdBy?: string; // 建立者 ID
  updatedBy?: string; // 更新者 ID
}

// ==================== 空間節點介面 ====================

/**
 * 空間節點介面
 * 用途：擴展官方 NzTreeNodeOptions，添加業務相關屬性
 * 繼承：BaseEntity（提供審計功能）
 */
export interface SpaceNode extends BaseEntity {
  // 基本屬性（對應官方 NzTreeNodeOptions）
  title: string; // 顯示標題
  key: string; // 唯一識別碼
  icon?: string; // 圖標
  isLeaf?: boolean; // 是否為葉子節點
  checked?: boolean; // 是否選中
  selected?: boolean; // 是否被選中
  selectable?: boolean; // 是否可選
  disabled?: boolean; // 是否禁用
  disableCheckbox?: boolean; // 是否禁用複選框
  expanded?: boolean; // 是否展開
  children?: SpaceNode[]; // 子節點

  // 業務擴展屬性
  name: string; // 節點名稱
  type: SpaceNodeType; // 節點類型
  status?: NodeStatus; // 節點狀態（可選，僅結構節點用）
  description?: string; // 節點描述
  permissions?: NodePermissions; // 節點權限
  metadata?: Record<string, any>; // 額外元資料

  // 任務相關屬性
  isTask?: boolean; // 是否為任務節點
  taskStatus?: TaskStatus; // 任務狀態（僅任務節點有）
  taskCount?: number; // 任務數量
  completedTaskCount?: number; // 已完成任務數量
  order?: number; // 拖曳排序用
  parentKey?: NzTreeNodeKey | null; // 父節點 key，直接對應 key 型別
}

// ==================== 任務相關介面 ====================

/**
 * 葉脈任務介面
 * 用途：定義葉子節點下的具體任務
 * 繼承：BaseEntity（提供審計功能）
 */
export interface LeafTask extends BaseEntity {
  title: string; // 任務標題
  description: string; // 任務描述
  status: TaskStatus; // 任務狀態
  priority: TaskPriority; // 任務優先級
  dueDate?: string; // 截止日期
  assignedTo?: string; // 指派給
  estimatedHours?: number; // 預估工時
  actualHours?: number; // 實際工時
  tags?: string[]; // 標籤
  attachments?: string[]; // 附件 ID 列表
  parentNodeId: string; // 父節點 ID
  order: number; // 排序順序
}

/**
 * 任務統計介面
 * 用途：統計任務的各種狀態數量
 */
export interface TaskStatistics {
  total: number; // 總數量
  pending: number; // 待辦
  inProgress: number; // 進行中
  completed: number; // 已完成
  cancelled: number; // 已取消
  overdue: number; // 逾期
}

// ==================== 擴展型別定義（基於官方型別） ====================

/**
 * 擴展的樹狀節點選項介面
 * 用途：繼承官方 NzTreeNodeOptions，添加業務屬性
 * 基礎：NzTreeNodeOptions（官方基礎型別）
 */
export interface ExtendedTreeNodeOptions extends NzTreeNodeOptions {
  // 自訂業務屬性
  isTask?: boolean; // 是否為任務節點
  taskCount?: number; // 任務數量
  completedTaskCount?: number; // 已完成任務數量
  nodeType?: SpaceNodeType; // 節點類型
  nodeStatus?: NodeStatus; // 節點狀態
  permissions?: NodePermissions; // 節點權限
  metadata?: Record<string, any>; // 額外元資料
}

/**
 * 扁平化節點介面
 * 用途：用於虛擬滾動和高效渲染
 * 參考：官方 FlattenNode 設計模式
 */
export interface FlattenNode {
  parent: FlattenNode | null; // 父節點
  children: FlattenNode[]; // 子節點
  pos: string; // 位置字串
  data: ExtendedTreeNodeOptions; // 節點資料（使用擴展型別）
  isStart: boolean[]; // 是否為開始節點
  isEnd: boolean[]; // 是否為結束節點
}

// ==================== 樹狀結構介面 ====================

/**
 * 樹狀節點選項類型別名
 * 用途：直接使用官方型別，確保相容性
 */
export type TreeNodeOptions = NzTreeNodeOptions;

/**
 * 樹狀結構事件介面
 * 用途：定義自訂的樹狀事件格式
 * 參考：官方 NzFormatEmitEvent 設計
 */
export interface TreeEvent {
  eventName: string; // 事件名稱
  node?: NzTreeNode; // 節點（使用官方型別）
  event?: MouseEvent | DragEvent; // 事件
  dragNode?: NzTreeNode; // 拖動節點（使用官方型別）
  selectedKeys?: string[]; // 選中鍵
  checkedKeys?: string[]; // 勾選鍵
  expandedKeys?: string[]; // 展開鍵
}

// ==================== 工具型別 ====================

/**
 * 節點過濾器類型
 * 用途：定義節點過濾函數的簽名
 */
export type NodeFilter = (node: SpaceNode) => boolean;

/**
 * 節點排序器類型
 * 用途：定義節點排序函數的簽名
 */
export type NodeSorter = (a: SpaceNode, b: SpaceNode) => number;

/**
 * 節點轉換器類型
 * 用途：定義節點轉換函數的簽名
 */
export type NodeTransformer = (node: SpaceNode) => SpaceNode;

// ==================== 常數定義 ====================

/**
 * 預設圖標常數
 * 用途：定義各種節點類型的預設圖標
 */
export const DEFAULT_ICONS = {
  root: 'cluster', // 根節點
  trunk: 'branches', // 主幹
  branch: 'folder', // 分支
  leaf: 'file', // 葉子節點
  task: 'check-circle', // 任務
  completed: 'check-circle', // 已完成
  pending: 'clock-circle', // 待辦
  inProgress: 'sync' // 進行中
} as const;

/**
 * 狀態顏色常數
 * 用途：定義各種狀態對應的顏色
 */
export const STATUS_COLORS = {
  active: 'green', // 活動
  inactive: 'gray', // 不活動
  archived: 'orange', // 已歸檔
  pending: 'blue', // 待辦
  'in-progress': 'orange', // 進行中
  completed: 'green', // 已完成
  cancelled: 'red', // 已取消
  low: 'blue', // 低
  medium: 'orange', // 中
  high: 'red', // 高
  urgent: 'red' // 緊急
} as const;

// ==================== 工具函數型別 ====================

/**
 * 節點操作工具介面
 * 用途：定義節點操作的標準方法集合
 */
export interface NodeUtils {
  // 節點查找方法
  findNodeByKey: (nodes: SpaceNode[], key: string) => SpaceNode | null; // 根據鍵值查找節點
  findNodeById: (nodes: SpaceNode[], id: string) => SpaceNode | null; // 根據ID查找節點

  // 節點遍歷方法
  traverseNodes: (nodes: SpaceNode[], callback: (node: SpaceNode) => void) => void; // 遍歷所有節點

  // 節點過濾方法
  filterNodes: (nodes: SpaceNode[], filter: NodeFilter) => SpaceNode[]; // 過濾節點

  // 節點排序方法
  sortNodes: (nodes: SpaceNode[], sorter: NodeSorter) => SpaceNode[]; // 排序節點

  // 節點轉換方法
  transformNodes: (nodes: SpaceNode[], transformer: NodeTransformer) => SpaceNode[]; // 轉換節點

  // 節點統計方法
  getNodeStatistics: (nodes: SpaceNode[]) => {
    total: number; // 總數量
    leaf: number; // 葉子節點數量
    task: number; // 任務數量
    completed: number; // 已完成數量
  };
}

// ==================== 模型定義完成 ====================
