import { BaseModel, AuditableModel } from '../../../core/models';
import { SpaceNodeType, NodeStatus } from './space-node.model';
import { TaskStatistics } from './task.model';

/**
 * 樹狀節點基礎介面 - 擴展版
 * 整合原有功能與新的 SpaceNode 功能
 */
export interface TreeNode extends AuditableModel {
    name: string;
    title: string; // 對應 SpaceNode 的 title
    description?: string;
    type: TreeType;
    nodeType?: SpaceNodeType; // 新增：對應 SpaceNode 的 type
    status: TreeStatus;
    nodeStatus?: NodeStatus; // 新增：對應 SpaceNode 的 status
    parentId?: string;
    level: number;
    maxLevel: number;
    nodeCount: number;
    children?: TreeNode[];
    metadata?: TreeNodeMetadata;

    // 新增：ng-zorro-antd 相容屬性
    icon?: string;
    isLeaf?: boolean;
    checked?: boolean;
    selected?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    expanded?: boolean;

    // 新增：任務相關屬性
    isTask?: boolean;
    taskCount?: number;
    completedTaskCount?: number;
    taskStatistics?: TaskStatistics;
    order?: number;
}

/**
 * 樹狀結構類型 - 擴展版
 */
export type TreeType = '組織' | '分類' | '權限' | '流程' | '其他' | 'space';

/**
 * 樹狀結構狀態 - 擴展版
 */
export type TreeStatus = 'active' | 'inactive' | 'draft' | 'archived';

/**
 * 樹狀節點元數據 - 擴展版
 */
export interface TreeNodeMetadata {
    icon?: string;
    color?: string;
    order?: number;
    permissions?: string[];
    attributes?: Record<string, any>;
    // 新增：SpaceNode 相容屬性
    nodePermissions?: {
        canView: boolean;
        canEdit: boolean;
        canDelete: boolean;
        canAddChildren: boolean;
        canAddTasks: boolean;
    };
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

// TreeOperation 和 TreeOperationType 已在 tree-operation.model.ts 中定義

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