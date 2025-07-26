import { AuditableModel } from '../../../core/models';

/**
 * 節點類型枚舉
 * 用途：定義空間節點的不同類型
 */
export type SpaceNodeType = 'root' | 'trunk' | 'branch' | 'leaf';

/**
 * 節點狀態枚舉
 * 用途：定義節點的生命週期狀態
 */
export type NodeStatus = 'active' | 'inactive' | 'archived';

/**
 * 節點權限介面
 * 用途：定義節點的訪問和操作權限
 */
export interface NodePermissions {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canAddChildren: boolean;
    canAddTasks: boolean;
}

/**
 * 空間節點介面
 * 用途：擴展官方 NzTreeNodeOptions，添加業務相關屬性
 * 繼承：AuditableModel（提供審計功能）
 */
export interface SpaceNode extends AuditableModel {
    // 基本屬性（對應官方 NzTreeNodeOptions）
    title: string;
    icon?: string;
    isLeaf?: boolean;
    checked?: boolean;
    selected?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    expanded?: boolean;
    children?: SpaceNode[];

    // 業務擴展屬性
    name: string;
    type: SpaceNodeType;
    status?: NodeStatus;
    description?: string;
    permissions?: NodePermissions;
    metadata?: Record<string, any>;

    // 任務相關屬性
    isTask?: boolean;
    taskCount?: number;
    completedTaskCount?: number;
    order?: number;
    parentKey?: string | number | null;
}

/**
 * 預設圖標常數
 * 用途：定義各種節點類型的預設圖標
 */
export const DEFAULT_ICONS = {
    root: 'cluster',
    trunk: 'branches',
    branch: 'folder',
    leaf: 'file',
    task: 'check-circle',
    completed: 'check-circle',
    pending: 'clock-circle',
    inProgress: 'sync'
} as const;

/**
 * 狀態顏色常數
 * 用途：定義各種狀態對應的顏色
 */
export const STATUS_COLORS = {
    active: 'green',
    inactive: 'gray',
    archived: 'orange'
} as const;