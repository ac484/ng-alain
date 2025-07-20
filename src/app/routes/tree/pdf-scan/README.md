# PDF OCR 掃描組件

## 功能說明

這個組件整合了 Firebase Functions 的 OCR 服務，提供 PDF 和圖片的文字提取功能。

## 主要功能

### 1. 文件上傳
- 支援拖拽上傳
- 支援的格式：PDF、TIFF、JPG、PNG、GIF
- 文件大小限制：20MB

### 2. OCR 處理
- **智能處理**：根據文件類型自動選擇最佳處理方式
- **PDF 第一頁**：快速處理 PDF 的第一頁
- **Buffer 處理**：直接處理文件數據

### 3. 結果展示
- 文字長度統計
- 頁數統計
- 信心度顯示
- 格式化文字內容

### 4. 結果操作
- 複製到剪貼板
- 下載為文字文件
- 清除結果

## 技術架構

### 服務層
- `OcrService`: 處理 OCR API 調用
- `Firebase Functions`: 後端 OCR 處理

### 組件層
- `TreePdfScanComponent`: 主要 UI 組件
- 使用 ng-zorro-antd 組件庫

## API 端點

```typescript
// Firebase Functions URL
https://us-central1-lin-in.cloudfunctions.net/api

// 端點
/ocr/extract        // 智能文字提取
/ocr/pdf-first-page // PDF 第一頁處理
/ocr/buffer         // Buffer 直接處理
```

## 使用方式

### 1. 路由訪問
```
/tree/pdf-scan
```

### 2. 組件使用
```typescript
import { TreePdfScanComponent } from './pdf-scan.component';
```

### 3. 服務調用
```typescript
import { OcrService } from '../../../core/services/ocr.service';

// 注入服務
constructor(private ocrService: OcrService) {}

// 使用服務
this.ocrService.extractFromBuffer(arrayBuffer).subscribe(result => {
  console.log(result.text);
});
```

## 配置要求

### 1. Firebase 配置
- Firebase Functions 已部署
- Google Cloud Vision API 已啟用
- Firebase Storage 已配置

### 2. Angular 配置
- HttpClient 已配置
- ng-zorro-antd 已安裝
- ReactiveFormsModule 已導入

## 錯誤處理

組件包含完整的錯誤處理：
- 文件類型驗證
- 文件大小檢查
- API 錯誤處理
- 用戶友好的錯誤提示

## 性能優化

- 使用 OnPush 變更檢測策略
- 懶載入組件
- 適當的錯誤邊界
- 記憶體洩漏防護

## 未來擴展

- 批量文件處理
- 更多文件格式支援
- OCR 結果編輯功能
- 歷史記錄功能
