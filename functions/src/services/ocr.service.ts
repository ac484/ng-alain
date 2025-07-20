/**
 * OCR主服務 - 整合PDF處理和Vision API
 */

import * as logger from 'firebase-functions/logger';
import { VisionService } from './vision.service';
import { PdfUtil } from '../utils/pdf.util';
import { OcrRequest, OcrResult } from '../types';

export class OcrService {
  private visionService: VisionService;

  constructor() {
    this.visionService = new VisionService();
  }

  /**
   * 處理PDF OCR請求
   */
  async processPdfOcr(request: OcrRequest): Promise<OcrResult> {
    try {
      // 獲取文件緩衝區
      const buffer = await this.getFileBuffer(request);

      // 驗證文件
      this.validateFile(buffer, request.fileName);

      // 記錄處理信息
      PdfUtil.logProcessingInfo(request.fileName, buffer);

      // 執行OCR
      const result = await this.visionService.extractText(buffer, request.options);

      logger.info('OCR processing completed:', {
        fileName: request.fileName,
        textLength: result.text.length,
        confidence: result.confidence,
        pageCount: result.pages.length
      });

      return result;
    } catch (error) {
      logger.error('OCR service error:', {
        fileName: request.fileName,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * 獲取文件緩衝區
   */
  private async getFileBuffer(request: OcrRequest): Promise<Buffer> {
    if (request.fileBuffer) {
      return request.fileBuffer;
    }

    if (request.fileUrl) {
      return await this.downloadFile(request.fileUrl);
    }

    throw new Error('No file buffer or URL provided');
  }

  /**
   * 下載文件
   */
  private async downloadFile(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  }

  /**
   * 驗證文件
   */
  private validateFile(buffer: Buffer, fileName: string): void {
    if (!buffer || buffer.length === 0) {
      throw new Error('Empty file buffer');
    }

    if (!PdfUtil.validateFileSize(buffer)) {
      throw new Error('File size exceeds 10MB limit');
    }

    if (!PdfUtil.validatePdfBuffer(buffer)) {
      logger.warn('File may not be a valid PDF:', { fileName });
      // 不拋出錯誤，因為Vision API可以處理多種圖像格式
    }
  }
}
