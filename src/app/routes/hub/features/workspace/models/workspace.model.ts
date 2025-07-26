import { BaseModel, AuditableModel } from '../../../core/models';

export interface WorkspaceStats extends BaseModel {
    totalContracts: number;
    pendingPayments: number;
    monthlyRevenue: number;
    activeClients: number;
}

export interface WorkspaceSettings extends BaseModel {
    userId: string;
    dashboardLayout: DashboardWidget[];
    preferences: WorkspacePreferences;
}

export interface DashboardWidget {
    id: string;
    type: 'stats' | 'chart' | 'list' | 'calendar';
    title: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    config: any;
}

export interface WorkspacePreferences {
    theme: 'light' | 'dark';
    language: 'zh-TW' | 'en-US';
    notifications: boolean;
}

/**
 * 工作區項目介面
 */
export interface WorkspaceItem extends AuditableModel {
    name: string;
    description?: string;
    type: WorkspaceItemType;
    status: WorkspaceItemStatus;
    manager: string;
    progress: number;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    equipment?: WorkspaceEquipment[];
    tasks?: WorkspaceTask[];
    metadata?: WorkspaceItemMetadata;
}

/**
 * 工作區項目類型
 */
export type WorkspaceItemType = '工地項目' | '設備管理' | '施工區域' | '運輸任務';

/**
 * 工作區項目狀態
 */
export type WorkspaceItemStatus = 'pending' | 'in-progress' | 'active' | 'maintenance' | 'completed' | 'cancelled';

/**
 * 工作區設備介面
 */
export interface WorkspaceEquipment extends AuditableModel {
    name: string;
    type: string;
    model?: string;
    serialNumber?: string;
    status: 'available' | 'in-use' | 'maintenance' | 'retired';
    location?: string;
    operator?: string;
    specifications?: Record<string, any>;
}

/**
 * 工作區任務介面
 */
export interface WorkspaceTask extends AuditableModel {
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignee?: string;
    dueDate?: Date;
    workspaceItemId: string;
    dependencies?: string[];
}

/**
 * 工作區項目元數據
 */
export interface WorkspaceItemMetadata {
    budget?: number;
    actualCost?: number;
    estimatedDuration?: number;
    actualDuration?: number;
    riskLevel?: 'low' | 'medium' | 'high';
    tags?: string[];
    attachments?: WorkspaceAttachment[];
}

/**
 * 工作區附件介面
 */
export interface WorkspaceAttachment extends AuditableModel {
    fileName: string;
    fileSize: number;
    fileType: string;
    url: string;
    uploadedBy: string;
}

/**
 * 工作區統計介面
 */
export interface WorkspaceStatistics {
    totalItems: number;
    itemsByType: Record<WorkspaceItemType, number>;
    itemsByStatus: Record<WorkspaceItemStatus, number>;
    averageProgress: number;
    overdueItems: number;
    completedThisMonth: number;
}