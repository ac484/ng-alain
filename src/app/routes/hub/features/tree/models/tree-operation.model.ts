import { AuditableModel } from '../../../core/models';

/**
 * 樹狀操作類型
 * 用途：定義樹狀結構的各種操作類型
 */
export type TreeOperationType =
    | 'create'
    | 'update'
    | 'delete'
    | 'move'
    | 'copy'
    | 'activate'
    | 'deactivate'
    | 'expand'
    | 'collapse'
    | 'select'
    | 'check'
    | 'drag'
    | 'drop';

/**
 * 樹狀操作記錄介面
 * 用途：記錄樹狀結構的操作歷史
 * 繼承：AuditableModel（提供審計功能）
 */
export interface TreeOperation extends AuditableModel {
    treeId: string;
    nodeId: string;
    operation: TreeOperationType;
    oldValue?: any;
    newValue?: any;
    operatorId: string;
    description?: string;
    metadata?: Record<string, any>;
}

/**
 * 樹狀事件介面
 * 用途：定義自訂的樹狀事件格式
 */
export interface TreeEvent {
    eventName: string;
    nodeKey?: string;
    event?: MouseEvent | DragEvent;
    dragNodeKey?: string;
    selectedKeys?: string[];
    checkedKeys?: string[];
    expandedKeys?: string[];
    data?: any;
}

/**
 * 拖拽事件介面
 * 用途：定義拖拽操作的事件格式
 */
export interface TreeDragEvent {
    dragNodeKey: string;
    targetNodeKey: string;
    position: number; // -1: 前面, 0: 內部, 1: 後面
    event: DragEvent;
}

/**
 * 節點過濾器類型
 * 用途：定義節點過濾函數的簽名
 */
export type NodeFilter<T = any> = (node: T) => boolean;

/**
 * 節點排序器類型
 * 用途：定義節點排序函數的簽名
 */
export type NodeSorter<T = any> = (a: T, b: T) => number;

/**
 * 節點轉換器類型
 * 用途：定義節點轉換函數的簽名
 */
export type NodeTransformer<T = any> = (node: T) => T;