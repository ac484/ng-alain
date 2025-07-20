/**
 * PDF OCR使用範例
 */

import { OcrService } from '../services/ocr.service';
import { OcrRequest } from '../types';

/**
 * 範例1: 使用文件緩衝區
 */
export async function exampleWithBuffer() {
  const ocrService = new OcrService();

  // 假設你有一個PDF文件的Buffer
  const pdfBuffer = Buffer.from('...'); // 實際的PDF數據

  const request: OcrRequest = {
    fileBuffer: pdfBuffer,
    fileName: 'sample.pdf',
    options: {
      language: 'zh-TW',
      includeTextBlocks: true,
      detectOrientation: false
    }
  };

  try {
    const result = await ocrService.processPdfOcr(request);

    console.log('提取的文字:', result.text);
    console.log('信心度:', result.confidence);
    console.log('頁數:', result.pages.length);

    // 遍歷每一頁
    result.pages.forEach((page, index) => {
      console.log(`第${index + 1}頁文字:`, page.text);
      console.log(`第${index + 1}頁信心度:`, page.confidence);
    });
  } catch (error) {
    console.error('OCR處理失敗:', error);
  }
}

/**
 * 範例2: 使用文件URL
 */
export async function exampleWithUrl() {
  const ocrService = new OcrService();

  const request: OcrRequest = {
    fileUrl: 'https://example.com/document.pdf',
    fileName: 'remote-document.pdf',
    options: {
      language: 'zh-TW'
    }
  };

  try {
    const result = await ocrService.processPdfOcr(request);
    return result;
  } catch (error) {
    console.error('OCR處理失敗:', error);
    throw error;
  }
}

/**
 * 範例3: HTTP請求格式
 */
export const httpRequestExample = {
  method: 'POST',
  url: 'https://your-project.cloudfunctions.net/pdfOcr',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fileData: 'JVBERi0xLjQKJcOkw7zDtsO...', // base64編碼的PDF
    fileName: 'document.pdf',
    language: 'zh-TW',
    includeTextBlocks: true,
    detectOrientation: false
  })
};
