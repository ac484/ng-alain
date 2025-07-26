// 基礎模型介面 - 極簡設計
export interface BaseModel {
    key?: string;
}

// 可審計模型介面 - 僅在需要時使用
export interface AuditableModel extends BaseModel {
    createdAt?: Date;
    updatedAt?: Date;
}