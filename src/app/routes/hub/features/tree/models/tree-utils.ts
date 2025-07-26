import { SpaceNode } from './space-node.model';
import { NodeFilter, NodeSorter, NodeTransformer } from './tree-operation.model';
import { TaskStatistics } from './task.model';

/**
 * 節點操作工具類
 * 用途：提供節點操作的標準方法集合
 */
export class TreeNodeUtils {
    /**
     * 根據鍵值查找節點
     */
    static findNodeByKey(nodes: SpaceNode[], key: string): SpaceNode | null {
        for (const node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const found = this.findNodeByKey(node.children, key);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    /**
     * 根據名稱查找節點
     */
    static findNodeByName(nodes: SpaceNode[], name: string): SpaceNode | null {
        for (const node of nodes) {
            if (node.name === name) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const found = this.findNodeByName(node.children, name);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    /**
     * 遍歷所有節點
     */
    static traverseNodes(nodes: SpaceNode[], callback: (node: SpaceNode) => void): void {
        for (const node of nodes) {
            callback(node);
            if (node.children && node.children.length > 0) {
                this.traverseNodes(node.children, callback);
            }
        }
    }

    /**
     * 過濾節點
     */
    static filterNodes(nodes: SpaceNode[], filter: NodeFilter): SpaceNode[] {
        const result: SpaceNode[] = [];

        for (const node of nodes) {
            const filteredChildren = node.children ? this.filterNodes(node.children, filter) : [];

            if (filter(node) || filteredChildren.length > 0) {
                result.push({
                    ...node,
                    children: filteredChildren
                });
            }
        }

        return result;
    }

    /**
     * 排序節點
     */
    static sortNodes(nodes: SpaceNode[], sorter: NodeSorter): SpaceNode[] {
        const sorted = [...nodes].sort(sorter);

        return sorted.map(node => ({
            ...node,
            children: node.children ? this.sortNodes(node.children, sorter) : undefined
        }));
    }

    /**
     * 轉換節點
     */
    static transformNodes(nodes: SpaceNode[], transformer: NodeTransformer): SpaceNode[] {
        return nodes.map(node => {
            const transformed = transformer(node);
            return {
                ...transformed,
                children: node.children ? this.transformNodes(node.children, transformer) : undefined
            };
        });
    }

    /**
     * 獲取節點統計資訊
     */
    static getNodeStatistics(nodes: SpaceNode[]): {
        total: number;
        leaf: number;
        task: number;
        completed: number;
    } {
        let total = 0;
        let leaf = 0;
        let task = 0;
        let completed = 0;

        this.traverseNodes(nodes, (node) => {
            total++;
            if (node.isLeaf) {
                leaf++;
            }
            if (node.isTask) {
                task++;
                if (node.completedTaskCount && node.taskCount && node.completedTaskCount === node.taskCount) {
                    completed++;
                }
            }
        });

        return { total, leaf, task, completed };
    }

    /**
     * 獲取任務統計資訊
     */
    static getTaskStatistics(nodes: SpaceNode[]): TaskStatistics {
        let total = 0;
        let pending = 0;
        let inProgress = 0;
        let completed = 0;
        let cancelled = 0;
        let overdue = 0;

        this.traverseNodes(nodes, (node) => {
            if (node.taskCount) {
                total += node.taskCount;
            }
            if (node.completedTaskCount) {
                completed += node.completedTaskCount;
            }
            // 這裡可以根據實際需求添加更詳細的統計邏輯
        });

        // 簡化的統計，實際應用中需要更詳細的任務狀態追蹤
        pending = total - completed;

        return {
            total,
            pending,
            inProgress,
            completed,
            cancelled,
            overdue
        };
    }

    /**
     * 將 SpaceNode 轉換為 NzTreeNodeOptions
     */
    static toNzTreeNodeOptions(node: SpaceNode): any {
        return {
            title: node.title,
            key: node.key,
            icon: node.icon,
            isLeaf: node.isLeaf,
            checked: node.checked,
            selected: node.selected,
            expanded: node.expanded,
            selectable: node.selectable,
            disabled: node.disabled,
            disableCheckbox: node.disableCheckbox,
            children: node.children ? node.children.map(child => this.toNzTreeNodeOptions(child)) : undefined,
            // 自訂屬性
            isTask: node.isTask,
            taskCount: node.taskCount,
            completedTaskCount: node.completedTaskCount,
            nodeType: node.type,
            nodeStatus: node.status,
            permissions: node.permissions,
            metadata: node.metadata
        };
    }

    /**
     * 從 NzTreeNodeOptions 轉換為 SpaceNode
     */
    static fromNzTreeNodeOptions(options: any): SpaceNode {
        return {
            key: options.key,
            title: options.title,
            name: options.title, // 預設使用 title 作為 name
            type: options.nodeType || 'leaf',
            icon: options.icon,
            isLeaf: options.isLeaf,
            checked: options.checked,
            selected: options.selected,
            expanded: options.expanded,
            selectable: options.selectable,
            disabled: options.disabled,
            disableCheckbox: options.disableCheckbox,
            children: options.children ? options.children.map((child: any) => this.fromNzTreeNodeOptions(child)) : undefined,
            // 自訂屬性
            status: options.nodeStatus,
            description: options.description,
            permissions: options.permissions,
            metadata: options.metadata,
            isTask: options.isTask,
            taskCount: options.taskCount,
            completedTaskCount: options.completedTaskCount,
            order: options.order,
            parentKey: options.parentKey
        };
    }

    /**
     * 獲取節點路徑
     */
    static getNodePath(nodes: SpaceNode[], targetKey: string): SpaceNode[] {
        const path: SpaceNode[] = [];

        const findPath = (currentNodes: SpaceNode[], currentPath: SpaceNode[]): boolean => {
            for (const node of currentNodes) {
                const newPath = [...currentPath, node];

                if (node.key === targetKey) {
                    path.push(...newPath);
                    return true;
                }

                if (node.children && findPath(node.children, newPath)) {
                    return true;
                }
            }
            return false;
        };

        findPath(nodes, []);
        return path;
    }

    /**
     * 獲取節點深度
     */
    static getNodeDepth(nodes: SpaceNode[]): number {
        let maxDepth = 0;

        const calculateDepth = (currentNodes: SpaceNode[], currentDepth: number): void => {
            for (const node of currentNodes) {
                maxDepth = Math.max(maxDepth, currentDepth);
                if (node.children && node.children.length > 0) {
                    calculateDepth(node.children, currentDepth + 1);
                }
            }
        };

        calculateDepth(nodes, 1);
        return maxDepth;
    }
}