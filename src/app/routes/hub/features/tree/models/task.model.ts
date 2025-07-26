import { AuditableModel } from '../../../core/models';

/**
 * 任務狀態枚舉
 * 用途：定義任務的執行狀態
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

/**
 * 任務優先級枚舉
 * 用途：定義任務的優先級別
 */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * 葉脈任務介面
 * 用途：定義葉子節點下的具體任務
 * 繼承：AuditableModel（提供審計功能）
 */
export interface LeafTask extends AuditableModel {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
    assignedTo?: string;
    estimatedHours?: number;
    actualHours?: number;
    tags?: string[];
    attachments?: string[];
    parentNodeId: string;
    order: number;
}

/**
 * 任務統計介面
 * 用途：統計任務的各種狀態數量
 */
export interface TaskStatistics {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    overdue: number;
}

/**
 * 任務狀態顏色常數
 * 用途：定義各種任務狀態對應的顏色
 */
export const TASK_STATUS_COLORS = {
    pending: 'blue',
    'in-progress': 'orange',
    completed: 'green',
    cancelled: 'red'
} as const;

/**
 * 任務優先級顏色常數
 * 用途：定義各種優先級對應的顏色
 */
export const TASK_PRIORITY_COLORS = {
    low: 'blue',
    medium: 'orange',
    high: 'red',
    urgent: 'red'
} as const;