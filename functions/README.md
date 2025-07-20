# Firebase Functions - PDF OCR服務

基於Google Cloud Vision API的PDF文字提取服務，採用極簡主義設計，結構化、模組化、服務化架構。

## 架構設計

```
src/
├── types/           # 類型定義
├── services/        # 服務層
│   ├── vision.service.ts    # Vision API服務
│   └── ocr.service.ts       # OCR主服務
├── controllers/     # 控制層
│   └── ocr.controller.ts    # HTTP請求控制器
├── utils/          # 工具層
│   └── pdf.util.ts         # PDF處理工具
├── examples/       # 使用範例
└── index.ts        # 函數入口
```

## 功能特點

- ✅ **極簡設計**: 最小化依賴，專注核心功能
- ✅ **模組化**: 清晰的分層架構，低耦合高內聚
- ✅ **類型安全**: 完整的TypeScript類型定義
- ✅ **錯誤處理**: 完善的錯誤處理和日誌記錄
- ✅ **CORS支持**: 支持跨域請求
- ✅ **多格式支持**: 支持PDF和其他圖像格式
- ✅ **靈活輸入**: 支持文件緩衝區和URL兩種方式

## API使用

### HTTP請求

```bash
POST https://your-project.cloudfunctions.net/pdfOcr
Content-Type: application/json

{
  "fileData": "base64編碼的PDF文件",
  "fileName": "document.pdf",
  "language": "zh-TW",
  "includeTextBlocks": true,
  "detectOrientation": false
}
```

### 請求參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `fileData` | string | 否* | base64編碼的文件數據 |
| `fileUrl` | string | 否* | 文件URL地址 |
| `fileName` | string | 是 | 文件名稱 |
| `language` | string | 否 | 語言代碼，默認"zh-TW" |
| `includeTextBlocks` | boolean | 否 | 是否包含文字區塊信息 |
| `detectOrientation` | boolean | 否 | 是否檢測文字方向 |

*註：`fileData`和`fileUrl`至少提供一個

### 響應格式

```json
{
  "success": true,
  "data": {
    "text": "提取的完整文字",
    "confidence": 0.95,
    "pages": [
      {
        "pageNumber": 1,
        "text": "第一頁文字",
        "confidence": 0.96,
        "blocks": [...]
      }
    ]
  },
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

## 本地開發

### 安裝依賴
```bash
cd functions
npm install
```

### 編譯TypeScript
```bash
npm run build
```

### 本地測試
```bash
npm run serve
```

### 部署到Firebase
```bash
npm run deploy
```

## 代碼風格

遵循Google JavaScript Style Guide和ESLint規則：
- 使用雙引號
- 2空格縮進
- TypeScript嚴格模式
- 完整的類型註解

## 性能優化

- 設置記憶體限制為1GB
- 超時時間540秒
- 最大實例數限制
- 文件大小限制10MB

## 錯誤處理

所有錯誤都會被適當捕獲和記錄，返回標準化的錯誤響應格式。

## 安全考量

- CORS配置
- 文件類型驗證
- 文件大小限制
- 輸入參數驗證
