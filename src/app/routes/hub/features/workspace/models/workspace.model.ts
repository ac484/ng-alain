import { BaseModel } from '../../../core/models';

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