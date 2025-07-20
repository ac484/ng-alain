/**
 * OCR控制器 - HTTP請求處理
 */

import { Request } from 'firebase-functions/https';
import { Response } from 'express';
import * as logger from 'firebase-functions/logger';
import { OcrService } from '../services/ocr.service';
import { OcrRequest } from '../types';

export class OcrController {
  private ocrService: OcrService;

  constructor() {
    this.ocrService = new OcrService();
  }

  /**
   * 處理PDF OCR HTTP請求
   */
  async handlePdfOcr(req: Request, res: Response): Promise<void> {
    try {
      // 設置CORS
      this.setCorsHeaders(res);

      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      if (req.method !== 'POST') {
        res.status(405).json({
          error: 'Method not allowed',
          message: 'Only POST method is supported'
        });
        return;
      }

      // 解析請求
      const ocrRequest = await this.parseRequest(req);

      // 處理OCR
      const result = await this.ocrService.processPdfOcr(ocrRequest);

      // 返回結果
      res.status(200).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('OCR controller error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      res.status(500).json({
        success: false,
        error: 'OCR processing failed',
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * 解析HTTP請求
   */
  private async parseRequest(req: Request): Promise<OcrRequest> {
    const contentType = req.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      return this.parseMultipartRequest(req);
    }

    if (contentType.includes('application/json')) {
      return this.parseJsonRequest(req);
    }

    throw new Error('Unsupported content type');
  }

  /**
   * 解析multipart請求
   */
  private parseMultipartRequest(_req: Request): OcrRequest {
    // 注意：這裡需要使用multipart解析庫，如busboy
    // 為了保持極簡，這裡提供基本結構
    throw new Error('Multipart parsing not implemented. Use JSON request.');
  }

  /**
   * 解析JSON請求
   */
  private parseJsonRequest(req: Request): OcrRequest {
    const body = req.body;

    if (!body) {
      throw new Error('Request body is required');
    }

    // 從base64解碼文件
    let fileBuffer: Buffer | undefined;
    if (body.fileData) {
      try {
        fileBuffer = Buffer.from(body.fileData, 'base64');
      } catch (error) {
        throw new Error('Invalid base64 file data');
      }
    }

    return {
      fileUrl: body.fileUrl,
      fileBuffer,
      fileName: body.fileName || 'unknown.pdf',
      options: {
        language: body.language || 'zh-TW',
        detectOrientation: body.detectOrientation || false,
        includeTextBlocks: body.includeTextBlocks || false
      }
    };
  }

  /**
   * 設置CORS標頭
   */
  private setCorsHeaders(res: Response): void {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Max-Age', '3600');
  }
}
