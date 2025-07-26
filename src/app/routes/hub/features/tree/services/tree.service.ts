import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../../../core/services/hub-crud.service';
import { TreeNode, TreeConfig, TreeOperation, TreeSearchCriteria, TreeStatistics } from '../models/tree.model';

/**
 * 樹狀結構服務
 * 
 * 提供樹狀結構的完整管理功能：
 * - CRUD 操作
 * - 層級管理
 * - 節點移動和複製
 * - 搜尋和篩選
 * - 統計資訊
 */
@Injectable({
    providedIn: 'root'
})
export class TreeService {
    private hubCrud = inject(HubCrudService);
    private readonly COLLECTION_NAME = 'hub_trees';
    private readonly CONFIG_COLLECTION = 'hub_tree_configs';
    private readonly OPERATION_COLLECTION = 'hub_tree_operations';

    /**
     * 獲取所有樹狀結構
     */
    getAllTrees(): Observable<TreeNode[]> {
        // 暫時返回模擬數據用於測試
        // 實際應用中應該使用: return this.hubCrud.useCollection<TreeNode>(this.COLLECTION_NAME);
        return new Observable(observer => {
            observer.next(this.getMockTreeNodes());
            observer.complete();
        });
    }

    /**
     * 根據 ID 獲取樹狀結構
     */
    getTreeById(id: string): Observable<TreeNode | undefined> {
        return this.hubCrud.useDoc<TreeNode>(this.COLLECTION_NAME, id);
    }

    /**
     * 創建新的樹狀結構
     */
    async createTree(tree: Omit<TreeNode, 'key'>): Promise<string> {
        const treeData = {
            ...tree,
            level: 0,
            maxLevel: 0,
            nodeCount: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const id = await this.hubCrud.add<TreeNode>(this.COLLECTION_NAME, treeData);

        // 記錄操作
        await this.logOperation(id, id, 'create', null, treeData, 'system');

        return id;
    }

    /**
     * 更新樹狀結構
     */
    async updateTree(id: string, updates: Partial<TreeNode>): Promise<void> {
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await this.hubCrud.update<TreeNode>(this.COLLECTION_NAME, id, updateData);

        // 記錄操作
        await this.logOperation(id, id, 'update', null, updateData, 'system');
    }

    /**
     * 刪除樹狀結構
     */
    async deleteTree(id: string): Promise<void> {
        await this.hubCrud.delete(this.COLLECTION_NAME, id);

        // 記錄操作
        await this.logOperation(id, id, 'delete', null, null, 'system');
    }

    /**
     * 搜尋樹狀結構
     */
    searchTrees(criteria: TreeSearchCriteria): Observable<TreeNode[]> {
        // 這裡可以實現更複雜的搜尋邏輯
        // 目前返回所有樹狀結構，實際應用中需要根據條件篩選
        return this.getAllTrees();
    }

    /**
     * 獲取樹狀結構統計資訊
     */
    async getTreeStatistics(treeId: string): Promise<TreeStatistics> {
        // 實現統計邏輯
        // 這裡返回模擬數據，實際應用中需要計算真實統計
        return {
            totalNodes: 0,
            activeNodes: 0,
            inactiveNodes: 0,
            maxDepth: 0,
            nodesByType: {
                '組織': 0,
                '分類': 0,
                '權限': 0,
                '流程': 0,
                '其他': 0
            },
            nodesByLevel: {}
        };
    }

    /**
     * 移動節點
     */
    async moveNode(nodeId: string, newParentId: string, newPosition?: number): Promise<void> {
        // 實現節點移動邏輯
        const updateData = {
            parentId: newParentId,
            updatedAt: new Date()
        };

        await this.hubCrud.update<TreeNode>(this.COLLECTION_NAME, nodeId, updateData);

        // 記錄操作
        await this.logOperation(nodeId, nodeId, 'move', null, updateData, 'system');
    }

    /**
     * 複製節點
     */
    async copyNode(nodeId: string, targetParentId: string): Promise<string> {
        // 實現節點複製邏輯
        const originalNode = await this.hubCrud.useDoc<TreeNode>(this.COLLECTION_NAME, nodeId).toPromise();

        if (!originalNode) {
            throw new Error('原始節點不存在');
        }

        const copiedNode = {
            ...originalNode,
            name: `${originalNode.name} (副本)`,
            parentId: targetParentId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        delete (copiedNode as any).key;

        const newId = await this.hubCrud.add<TreeNode>(this.COLLECTION_NAME, copiedNode);

        // 記錄操作
        await this.logOperation(nodeId, newId, 'copy', originalNode, copiedNode, 'system');

        return newId;
    }

    /**
     * 獲取樹狀結構配置
     */
    getTreeConfig(treeId: string): Observable<TreeConfig | undefined> {
        return this.hubCrud.useDoc<TreeConfig>(this.CONFIG_COLLECTION, treeId);
    }

    /**
     * 更新樹狀結構配置
     */
    async updateTreeConfig(treeId: string, config: Partial<TreeConfig>): Promise<void> {
        const configData = {
            ...config,
            treeId,
            updatedAt: new Date()
        };

        await this.hubCrud.update<TreeConfig>(this.CONFIG_COLLECTION, treeId, configData);
    }

    /**
     * 記錄操作日誌
     */
    private async logOperation(
        treeId: string,
        nodeId: string,
        operation: TreeOperation['operation'],
        oldValue: any,
        newValue: any,
        operatorId: string
    ): Promise<void> {
        const operationLog: Omit<TreeOperation, 'key'> = {
            treeId,
            nodeId,
            operation,
            oldValue,
            newValue,
            operatorId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.hubCrud.add<TreeOperation>(this.OPERATION_COLLECTION, operationLog);
    }

    /**
     * 獲取操作歷史
     */
    getOperationHistory(treeId: string): Observable<TreeOperation[]> {
        return this.hubCrud.useCollection<TreeOperation>(this.OPERATION_COLLECTION);
    }

    /**
     * 獲取模擬資料（用於開發測試）
     */
    getMockTreeNodes(): TreeNode[] {
        return [
            {
                key: '1',
                name: '組織架構樹',
                description: '公司組織架構管理',
                type: '組織',
                status: 'active',
                level: 0,
                maxLevel: 3,
                nodeCount: 15,
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-15')
            },
            {
                key: '2',
                name: '產品分類樹',
                description: '產品分類管理系統',
                type: '分類',
                status: 'active',
                level: 0,
                maxLevel: 4,
                nodeCount: 28,
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-01-20')
            },
            {
                key: '3',
                name: '權限管理樹',
                description: '系統權限分級管理',
                type: '權限',
                status: 'active',
                level: 0,
                maxLevel: 2,
                nodeCount: 12,
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date('2024-02-01')
            },
            {
                key: '4',
                name: '工作流程樹',
                description: '業務流程管理',
                type: '流程',
                status: 'active',
                level: 0,
                maxLevel: 3,
                nodeCount: 20,
                createdAt: new Date('2024-02-05'),
                updatedAt: new Date('2024-02-05')
            },
            {
                key: '5',
                name: '地區分布樹',
                description: '地理區域分類',
                type: '其他',
                status: 'inactive',
                level: 0,
                maxLevel: 2,
                nodeCount: 8,
                createdAt: new Date('2024-01-25'),
                updatedAt: new Date('2024-01-25')
            }
        ];
    }
}