# PDF掃描功能

這是一個使用Google Cloud Vision API掃描PDF文件的Firebase Cloud Function。

## 功能特點

- 使用Google Cloud Vision API進行PDF文檔文本識別
- 支持多頁PDF處理
- 結構化且極簡的代碼設計
- 只使用Google原生依賴包

## 使用方法

### 部署

```bash
cd lin-functions
npm install
npm run deploy
```

### API使用

發送POST請求到以下端點：

```
https://[YOUR_REGION]-[YOUR_PROJECT_ID].cloudfunctions.net/scanPdf
```

請求體格式：

```json
{
  "bucketName": "your-gcs-bucket-name",
  "pdfPath": "path/to/your/document.pdf"
}
```

響應格式：

```json
{
  "success": true,
  "result": {
    "text": "識別出的文本內容...",
    "pages": 5
  }
}
```

## 前提條件

1. 需要啟用Google Cloud Vision API
2. 需要設置適當的IAM權限，允許Cloud Functions訪問Cloud Storage和Vision API
3. PDF文件必須已上傳到Cloud Storage

## 注意事項

- 大型PDF文件可能需要更長的處理時間
- 函數超時設置為9分鐘，對於特別大的文件可能需要調整
- 處理結果會暫時存儲在Cloud Storage中，可能需要設置生命週期規則來清理
