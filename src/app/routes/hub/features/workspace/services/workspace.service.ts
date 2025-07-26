import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../../../core/services/hub-crud.service';
import {
    WorkspaceItem,
    WorkspaceEquipment,
    WorkspaceTask,
    WorkspaceStatistics,
    WorkspaceItemType,
    WorkspaceItemStatus
} from '../models/workspace.model';

/**
 * 工作區服務
 * 
 * 提供工作區項目的完整管理功能：
 * - CRUD 操作
 * - 設備管理
 * - 任務管理
 * - 統計資訊
 */
@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {
    private hubCrud = inject(HubCrudService);
    private readonly WORKSPACE_COLLECTION = 'hub_workspace_items';
    private readonly EQUIPMENT_COLLECTION = 'hub_workspace_equipment';
    private readonly TASK_COLLECTION = 'hub_workspace_tasks';

    /**
     * 獲取所有工作區項目
     */
    getAllWorkspaceItems(): Observable<WorkspaceItem[]> {
        // 暫時返回模擬數據用於測試
        // 實際應用中應該使用: return this.hubCrud.useCollection<WorkspaceItem>(this.WORKSPACE_COLLECTION);
        return new Observable(observer => {
            observer.next(this.getMockWorkspaceItems());
            observer.complete();
        });
    }

    /**
     * 根據 ID 獲取工作區項目
     */
    getWorkspaceItemById(id: string): Observable<WorkspaceItem | undefined> {
        return this.hubCrud.useDoc<WorkspaceItem>(this.WORKSPACE_COLLECTION, id);
    }

    /**
     * 創建新的工作區項目
     */
    async createWorkspaceItem(item: Omit<WorkspaceItem, 'key'>): Promise<string> {
        const itemData = {
            ...item,
            progress: item.progress || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.hubCrud.add<WorkspaceItem>(this.WORKSPACE_COLLECTION, itemData);
    }

    /**
     * 更新工作區項目
     */
    async updateWorkspaceItem(id: string, updates: Partial<WorkspaceItem>): Promise<void> {
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await this.hubCrud.update<WorkspaceItem>(this.WORKSPACE_COLLECTION, id, updateData);
    }

    /**
     * 刪除工作區項目
     */
    async deleteWorkspaceItem(id: string): Promise<void> {
        await this.hubCrud.delete(this.WORKSPACE_COLLECTION, id);
    }

    /**
     * 根據類型獲取工作區項目
     */
    getWorkspaceItemsByType(type: WorkspaceItemType): Observable<WorkspaceItem[]> {
        // 這裡可以實現更複雜的查詢邏輯
        // 目前返回所有項目，實際應用中需要根據類型篩選
        return this.getAllWorkspaceItems();
    }

    /**
     * 根據狀態獲取工作區項目
     */
    getWorkspaceItemsByStatus(status: WorkspaceItemStatus): Observable<WorkspaceItem[]> {
        // 這裡可以實現更複雜的查詢邏輯
        // 目前返回所有項目，實際應用中需要根據狀態篩選
        return this.getAllWorkspaceItems();
    }

    /**
     * 更新工作區項目進度
     */
    async updateProgress(id: string, progress: number): Promise<void> {
        await this.updateWorkspaceItem(id, { progress });
    }

    /**
     * 更新工作區項目狀態
     */
    async updateStatus(id: string, status: WorkspaceItemStatus): Promise<void> {
        await this.updateWorkspaceItem(id, { status });
    }

    // 設備管理相關方法
    /**
     * 獲取所有設備
     */
    getAllEquipment(): Observable<WorkspaceEquipment[]> {
        return this.hubCrud.useCollection<WorkspaceEquipment>(this.EQUIPMENT_COLLECTION);
    }

    /**
     * 創建新設備
     */
    async createEquipment(equipment: Omit<WorkspaceEquipment, 'key'>): Promise<string> {
        const equipmentData = {
            ...equipment,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.hubCrud.add<WorkspaceEquipment>(this.EQUIPMENT_COLLECTION, equipmentData);
    }

    /**
     * 更新設備
     */
    async updateEquipment(id: string, updates: Partial<WorkspaceEquipment>): Promise<void> {
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await this.hubCrud.update<WorkspaceEquipment>(this.EQUIPMENT_COLLECTION, id, updateData);
    }

    /**
     * 刪除設備
     */
    async deleteEquipment(id: string): Promise<void> {
        await this.hubCrud.delete(this.EQUIPMENT_COLLECTION, id);
    }

    // 任務管理相關方法
    /**
     * 獲取工作區項目的所有任務
     */
    getTasksByWorkspaceItem(workspaceItemId: string): Observable<WorkspaceTask[]> {
        return this.hubCrud.useCollection<WorkspaceTask>(this.TASK_COLLECTION);
    }

    /**
     * 創建新任務
     */
    async createTask(task: Omit<WorkspaceTask, 'key'>): Promise<string> {
        const taskData = {
            ...task,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await this.hubCrud.add<WorkspaceTask>(this.TASK_COLLECTION, taskData);
    }

    /**
     * 更新任務
     */
    async updateTask(id: string, updates: Partial<WorkspaceTask>): Promise<void> {
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await this.hubCrud.update<WorkspaceTask>(this.TASK_COLLECTION, id, updateData);
    }

    /**
     * 刪除任務
     */
    async deleteTask(id: string): Promise<void> {
        await this.hubCrud.delete(this.TASK_COLLECTION, id);
    }

    /**
     * 獲取工作區統計資訊
     */
    async getWorkspaceStatistics(): Promise<WorkspaceStatistics> {
        // 實現統計邏輯
        // 這裡返回模擬數據，實際應用中需要計算真實統計
        return {
            totalItems: 0,
            itemsByType: {
                '工地項目': 0,
                '設備管理': 0,
                '施工區域': 0,
                '運輸任務': 0
            },
            itemsByStatus: {
                'pending': 0,
                'in-progress': 0,
                'active': 0,
                'maintenance': 0,
                'completed': 0,
                'cancelled': 0
            },
            averageProgress: 0,
            overdueItems: 0,
            completedThisMonth: 0
        };
    }

    /**
     * 搜尋工作區項目
     */
    searchWorkspaceItems(keyword: string): Observable<WorkspaceItem[]> {
        // 實現搜尋邏輯
        // 目前返回所有項目，實際應用中需要根據關鍵字搜尋
        return this.getAllWorkspaceItems();
    }

    /**
     * 匯出工作區項目資料
     */
    async exportWorkspaceItems(): Promise<Blob> {
        // 實現匯出邏輯
        const items = await this.getAllWorkspaceItems().toPromise();
        const csvContent = this.convertToCSV(items || []);
        return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    }

    /**
     * 將資料轉換為 CSV 格式
     */
    private convertToCSV(items: WorkspaceItem[]): string {
        const headers = ['名稱', '類型', '狀態', '負責人', '進度', '創建時間'];
        const csvRows = [headers.join(',')];

        items.forEach(item => {
            const row = [
                item.name,
                item.type,
                item.status,
                item.manager,
                `${item.progress}%`,
                item.createdAt?.toISOString() || ''
            ];
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }

    /**
     * 獲取模擬資料（用於開發測試）
     */
    getMockWorkspaceItems(): WorkspaceItem[] {
        return [
            {
                key: '1',
                name: '台北市信義區商業大樓工程',
                description: '50層商業大樓建設項目',
                type: '工地項目',
                status: 'in-progress',
                manager: '張負責人',
                progress: 65,
                startDate: new Date('2024-01-15'),
                endDate: new Date('2024-12-31'),
                location: '台北市信義區',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15')
            },
            {
                key: '2',
                name: '200噸履帶式起重機',
                description: '大型履帶式起重機設備管理',
                type: '設備管理',
                status: 'active',
                manager: '王師傅',
                progress: 100,
                location: '設備倉庫A',
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-01-20')
            },
            {
                key: '3',
                name: '主體結構施工區域',
                description: '大樓主體結構施工管理',
                type: '施工區域',
                status: 'in-progress',
                manager: '李監工',
                progress: 45,
                location: '工地B區',
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date('2024-02-01')
            },
            {
                key: '4',
                name: '60米混凝土泵車',
                description: '高層建築混凝土澆築設備',
                type: '設備管理',
                status: 'maintenance',
                manager: '陳師傅',
                progress: 0,
                location: '維修廠',
                createdAt: new Date('2024-01-25'),
                updatedAt: new Date('2024-01-25')
            },
            {
                key: '5',
                name: '設備運輸任務A',
                description: '起重機從倉庫運輸至工地',
                type: '運輸任務',
                status: 'completed',
                manager: '劉師傅',
                progress: 100,
                createdAt: new Date('2024-01-18'),
                updatedAt: new Date('2024-01-18')
            },
            {
                key: '6',
                name: '新北市板橋區住宅工程',
                description: '30層住宅大樓建設',
                type: '工地項目',
                status: 'pending',
                manager: '黃負責人',
                progress: 0,
                location: '新北市板橋區',
                createdAt: new Date('2024-02-05'),
                updatedAt: new Date('2024-02-05')
            }
        ];
    }
}