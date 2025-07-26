// 統一匯出所有樹狀結構相關模型

// 基礎樹狀模型
export * from './tree.model';

// 空間節點模型
export * from './space-node.model';

// 任務模型
export * from './task.model';

// 樹狀操作模型
export * from './tree-operation.model';

// 樹狀工具類
export * from './tree-utils';

// ng-zorro-antd 相容性類型
export type NzTreeNodeKey = string | number;

/**
 * 官方樹狀節點選項介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義樹狀節點的基本屬性
 */
export interface NzTreeNodeOptions {
    title: string;
    key: string;
    icon?: string;
    children?: NzTreeNodeOptions[];
    isLeaf?: boolean;
    checked?: boolean;
    selected?: boolean;
    expanded?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    [key: string]: any;
}

/**
 * 官方樹狀節點介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：樹狀節點的完整實例，包含所有方法和屬性
 */
export interface NzTreeNode {
    title: string;
    key: string;
    level: number;
    children: NzTreeNode[];
    origin: NzTreeNodeOptions;
    getParentNode(): NzTreeNode | null;
    isLeaf: boolean;
    isExpanded: boolean;
    isDisabled: boolean;
    isDisableCheckbox: boolean;
    isSelectable: boolean;
    isChecked: boolean;
    isHalfChecked: boolean;
    isSelected: boolean;
    isLoading: boolean;
    isMatched: boolean;
    setSyncChecked(checked: boolean, halfChecked: boolean): void;
    getChildren(): NzTreeNode[];
    addChildren(children: NzTreeNode[] | NzTreeNodeOptions[], index?: number): void;
    clearChildren(): void;
    remove(): void;
    [key: string]: any;
}

/**
 * 官方樹狀事件格式介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義樹狀組件的事件回調格式
 */
export interface NzFormatEmitEvent {
    eventName: string;
    node: NzTreeNode | null;
    event: MouseEvent | DragEvent | null;
    dragNode?: NzTreeNode;
    selectedKeys?: NzTreeNode[];
    checkedKeys?: NzTreeNode[];
    matchedKeys?: NzTreeNode[];
    keys?: string[];
    nodes?: NzTreeNode[];
}

/**
 * 官方拖拽前事件介面
 * 來源：ng-zorro-antd/core/tree
 * 用途：定義拖拽放置前的確認事件格式
 */
export interface NzFormatBeforeDropEvent {
    dragNode: NzTreeNode;
    node: NzTreeNode;
    pos: number;
}

/**
 * 擴展的樹狀節點選項介面
 * 用途：繼承官方 NzTreeNodeOptions，添加業務屬性
 */
export interface ExtendedTreeNodeOptions extends NzTreeNodeOptions {
    isTask?: boolean;
    taskCount?: number;
    completedTaskCount?: number;
    nodeType?: import('./space-node.model').SpaceNodeType;
    nodeStatus?: import('./space-node.model').NodeStatus;
    permissions?: import('./space-node.model').NodePermissions;
    metadata?: Record<string, any>;
}

/**
 * 扁平化節點介面
 * 用途：用於虛擬滾動和高效渲染
 */
export interface FlattenNode {
    parent: FlattenNode | null;
    children: FlattenNode[];
    pos: string;
    data: ExtendedTreeNodeOptions;
    isStart: boolean[];
    isEnd: boolean[];
}