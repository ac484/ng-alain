/**
 * Firebase Functions - PDF OCR服務
 */

import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/https';
import * as admin from 'firebase-admin';
import { OcrController } from './controllers/ocr.controller';

// 初始化Firebase Admin
admin.initializeApp();

// 設置全局選項
setGlobalOptions({
  maxInstances: 10,
  memory: '1GiB',
  timeoutSeconds: 540
});

// 創建OCR控制器實例
const ocrController = new OcrController();

/**
 * PDF OCR文字提取API
 *
 * 使用方式:
 * POST /pdfOcr
 * Content-Type: application/json
 *
 * Body:
 * {
 *   "fileData": "base64編碼的PDF文件",
 *   "fileName": "document.pdf",
 *   "language": "zh-TW",
 *   "includeTextBlocks": true
 * }
 *
 * 或者:
 * {
 *   "fileUrl": "https://example.com/document.pdf",
 *   "fileName": "document.pdf"
 * }
 */
export const pdfOcr = onRequest(
  {
    maxInstances: 5,
    memory: '1GiB',
    timeoutSeconds: 540
  },
  async (request, response) => {
    await ocrController.handlePdfOcr(request, response);
  }
);
