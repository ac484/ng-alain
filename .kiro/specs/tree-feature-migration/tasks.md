# Implementation Plan

- [x] 1. 遷移數據模型到 hub 架構



  - 將 `routes/tree/models/models.ts` 拆分並遷移到 `hub/features/tree/models/`
  - 創建 space-node.model.ts、task.model.ts、tree-operation.model.ts
  - 整合到 hub 的 BaseModel 和 AuditableModel
  - 確保與現有 hub/features/tree/models/tree.model.ts 相容
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 2. 遷移 Firebase CRUD 組件
  - 將 `routes/tree/firebase-crud/firebase-crud.component.ts` 遷移到 `hub/features/tree/components/tree-crud/`
  - 保持原有模態框和表單驗證邏輯
  - 將 Firebase 直接調用改為使用 hub-crud.service
  - 整合到 hub 的統一樣式系統
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. 遷移 Firebase CRUD 服務
  - 將 `routes/tree/firebase-crud/firebase-crud.service.ts` 遷移到 `hub/features/tree/services/tree-crud.service.ts`
  - 保持所有 CRUD 操作方法
  - 整合 hub-crud.service 作為底層數據操作
  - 添加錯誤處理和日誌記錄
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 4. 遷移樹狀面板組件
  - 將 `routes/tree/panel/panel.component.*` 遷移到 `hub/features/tree/components/tree-panel/`
  - 保持完整的拖拽、搜尋、右鍵選單功能
  - 保持分割面板佈局和任務管理整合
  - 使用 hub 的響應式設計模式
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 5. 增強現有 TreeService
  - 擴展 `hub/features/tree/services/tree.service.ts`
  - 添加高級樹狀操作（移動、複製、搜尋）
  - 整合任務管理功能
  - 添加統計和分析功能
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3_

- [ ] 6. 遷移 PDF 掃描組件
  - 將 `routes/tree/pdf-scan/pdf-scan.component.*` 遷移到 `hub/features/tree/components/tree-pdf-scan/`
  - 保持 Google Cloud Vision API 整合
  - 保持頁面選擇和裁切功能
  - 整合到 hub 的文件管理系統
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 7. 遷移掃描結果組件
  - 將 `routes/tree/scan-result/scan-result.component.*` 遷移到 `hub/features/tree/components/tree-scan-result/`
  - 保持文件列表和管理功能
  - 保持預覽和下載功能
  - 整合到 hub 的統一列表組件樣式
  - _Requirements: 5.3, 5.4, 5.5_

- [ ] 8. 創建 PDF 處理服務
  - 創建 `hub/features/tree/services/pdf-processing.service.ts`
  - 封裝 Google Cloud Vision API 調用
  - 提供 PDF 裁切和處理功能
  - 整合 Firebase Storage 操作
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9. 增強樹狀列表組件
  - 擴展現有 `hub/features/tree/components/tree-list/tree-list.component.ts`
  - 參考 `routes/tree/list/list.component.ts` 的功能
  - 添加更多過濾和排序選項
  - 整合到 hub 的統一表格組件
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 10. 更新路由配置
  - 更新 `hub/features/tree/routes.ts` 添加新路由
  - 添加 tree-crud、document-viewer 等路由
  - 確保所有遷移的組件都有對應路由
  - 保持與原始路由的相容性
  - _Requirements: 6.1, 6.2_

- [ ] 11. 建立任務管理功能
  - 基於原始 models.ts 中的 LeafTask 介面
  - 實現任務狀態管理和優先級系統
  - 建立任務統計和進度追蹤功能
  - 整合到樹狀面板的任務列表中
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 12. 實現向後相容性
  - 確保原始 `routes/tree` 路由繼續運作
  - 提供路由重定向或並行支援
  - 創建數據遷移工具（如需要）
  - 實現漸進式遷移策略
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 13. 整合測試和驗證
  - 創建單元測試覆蓋所有遷移的組件和服務
  - 驗證所有原始功能都正常運作
  - 測試 hub 整合的正確性
  - 進行端到端測試確保用戶流程完整
  - _Requirements: 所有需求的測試驗證_

- [ ] 14. 清理和文檔
  - 更新組件匯出和依賴關係
  - 創建遷移完成的文檔說明
  - 建立使用指南和最佳實踐
  - 清理不需要的臨時文件和代碼
  - _Requirements: 所有需求的文檔支援_