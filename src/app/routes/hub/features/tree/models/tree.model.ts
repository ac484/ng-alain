import { BaseModel, AuditableModel } from '../../../core/models';

/**
 * 樹狀節點基礎介面
 */
export interface TreeNode extends AuditableModel {
    name: string;
    description?: string;
    type: TreeType;
    status: TreeStatus;
    parentId?: string;
    level: number;
    maxLevel: number;
    nodeCount: number;
    children?: TreeNode[];
    metadata?: TreeNodeMetadata;
}

/**
 * 樹狀結構類型
 */
export type TreeType = '組織' | '分類' | '權限' | '流程' | '其他';

/**
 * 樹狀結構狀態
 */
export type TreeStatus = 'active' | 'inactive' | 'draft';

/**
 * 樹狀節點元數據
 */
export interface TreeNodeMetadata {
    icon?: string;
    color?: string;
    order?: number;
    permissions?: string[];
    attributes?: Record<string, any>;
}

/**
 * 樹狀結構配置
 */
export interface TreeConfig extends BaseModel {
    treeId: string;
    allowMultipleSelection: boolean;
    allowDragDrop: boolean;
    showCheckbox: boolean;
    expandAll: boolean;
    maxDepth?: number;
    nodeTemplate?: string;
}

/**
 * 樹狀操作記錄
 */
export interface TreeOperation extends AuditableModel {
    treeId: string;
    nodeId: string;
    operation: TreeOperationType;
    oldValue?: any;
    newValue?: any;
    operatorId: string;
}

/**
 * 樹狀操作類型
 */
export type TreeOperationType =
    | 'create'
    | 'update'
    | 'delete'
    | 'move'
    | 'copy'
    | 'activate'
    | 'deactivate';

/**
 * 樹狀搜尋條件
 */
export interface TreeSearchCriteria {
    keyword?: string;
    type?: TreeType;
    status?: TreeStatus;
    level?: number;
    parentId?: string;
    dateRange?: {
        start: Date;
        end: Date;
    };
}

/**
 * 樹狀統計資訊
 */
export interface TreeStatistics {
    totalNodes: number;
    activeNodes: number;
    inactiveNodes: number;
    maxDepth: number;
    nodesByType: Record<TreeType, number>;
    nodesByLevel: Record<number, number>;
}