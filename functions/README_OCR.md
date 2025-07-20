# Firebase OCR API 服務

基於現有 Firebase Functions 架構實現的 PDF/TIFF OCR 文字提取功能，使用 Google Cloud Vision API 和 Firebase Admin Storage。

## 🏗️ 架構整合

### 現有架構
```
src/
├── api/
│   ├── controllers/          # REST API 控制器
│   ├── interceptors/         # 中間件
│   └── @types/              # 類型定義
├── core/
│   ├── services/            # 業務邏輯服務
│   ├── data/               # 數據層
│   └── utils/              # 工具函數
├── event-triggers/         # Firebase 事件觸發器
└── index.ts               # 主入口
```

### OCR 功能整合
```
src/
├── api/controllers/
│   └── ocr-controller/      # 新增 OCR 控制器
├── core/services/
│   └── ocr-service.ts       # 新增 OCR 服務
```

## 🚀 API 端點

### 基礎 URL
```
https://your-project.cloudfunctions.net/api
```

### 1. 智能文字提取
```bash
POST /api/ocr/extract
Content-Type: application/json

{
  "filePath": "documents/sample.pdf",
  "saveResult": true
}
```

**回應:**
```json
{
  "success": true,
  "data": {
    "text": "提取的文字內容...",
    "confidence": 0.95,
    "pages": 3,
    "resultPath": "documents/sample_ocr.txt"
  }
}
```

### 2. PDF 第一頁提取
```bash
POST /api/ocr/pdf-first-page
Content-Type: application/json

{
  "filePath": "documents/sample.pdf",
  "saveResult": false
}
```

### 3. Buffer 直接處理
```bash
POST /api/ocr/buffer
Content-Type: application/octet-stream

[Binary PDF/Image Data]
```

## 🔧 功能特點

### 智能文件處理
- **自動檢測**: 根據文件擴展名選擇最佳處理方式
- **PDF/TIFF**: 使用異步批量處理 (`asyncBatchAnnotateFiles`)
- **圖片**: 使用同步處理 (`textDetection`, `documentTextDetection`)

### Firebase 整合
- **Storage**: 使用 Firebase Admin Storage 進行文件操作
- **Functions**: 基於現有的 Express 架構
- **認證**: 自動使用 Firebase 專案認證

### 錯誤處理
- 完整的錯誤捕獲和回報
- 統一的 API 回應格式
- 詳細的錯誤日誌

## 📝 使用範例

### JavaScript/TypeScript 客戶端
```typescript
// 提取 PDF 文字
const response = await fetch('/api/ocr/extract', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    filePath: 'uploads/document.pdf',
    saveResult: true
  })
});

const result = await response.json();
console.log(result.data.text);
```

### cURL 範例
```bash
# 提取文字
curl -X POST https://your-project.cloudfunctions.net/api/ocr/extract \
  -H "Content-Type: application/json" \
  -d '{"filePath": "documents/sample.pdf", "saveResult": true}'

# PDF 第一頁
curl -X POST https://your-project.cloudfunctions.net/api/ocr/pdf-first-page \
  -H "Content-Type: application/json" \
  -d '{"filePath": "documents/sample.pdf"}'
```

## 🛠️ 開發與部署

### 安裝依賴
```bash
cd functions
npm install
```

### 本地開發
```bash
npm run emulator
```

### 編譯
```bash
npm run build
```

### 部署
```bash
npm run deploy
```

## 📊 支援的文件格式

| 格式 | 處理方式 | 說明 |
|------|----------|------|
| PDF | 異步批量處理 | 支援多頁文檔 |
| TIFF/TIF | 異步批量處理 | 支援多頁圖像 |
| JPG/JPEG | 同步處理 | 單頁圖像 |
| PNG | 同步處理 | 單頁圖像 |
| GIF | 同步處理 | 單頁圖像 |

## 🔐 權限設定

確保 Firebase 專案已啟用：
- ✅ Google Cloud Vision API
- ✅ Firebase Storage
- ✅ Firebase Functions
- ✅ Firebase Admin SDK

## 💡 最佳實踐

### 文件大小限制
- Vision API 對文件大小有限制 (通常 20MB)
- 大型 PDF 建議使用異步處理

### 性能優化
- 使用 `saveResult: false` 避免不必要的存儲操作
- 對於單頁 PDF，使用 `/pdf-first-page` 端點更快

### 錯誤處理
```typescript
try {
  const result = await ocrService.processFile(filePath, saveResult);
  // 處理成功結果
} catch (error) {
  console.error('OCR Error:', error.message);
  // 處理錯誤
}
```

## 🔍 與 Google Cloud Vision API 的對應

| 我們的方法 | Vision API 方法 | 用途 |
|-----------|----------------|------|
| `extractTextFromBuffer` | `textDetection` | 基本文字檢測 |
| `extractTextFromPdfFirstPage` | `documentTextDetection` | 文檔文字檢測 |
| `extractTextFromDocument` | `asyncBatchAnnotateFiles` | 批量異步處理 |

## 🚀 擴展功能

基於現有架構，可以輕鬆添加：
- 文字翻譯功能
- 文檔分類
- 表格提取
- 手寫文字識別
- 批量處理隊列

這個實現完全整合到你現有的 Firebase Functions 架構中，遵循相同的設計模式和最佳實踐！
