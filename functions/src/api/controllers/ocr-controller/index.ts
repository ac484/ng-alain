import { Request, Response } from 'express';
import { HttpServer } from '../index';
import { OcrService } from '../../../core/services/ocr-service';

export class OcrController {
  private ocrService: OcrService;

  constructor() {
    this.ocrService = new OcrService();
  }

  initialize(httpServer: HttpServer): void {
    // 智能 PDF/圖片處理
    httpServer.post('/ocr/extract', this.extractText.bind(this));

    // PDF 第一頁處理
    httpServer.post('/ocr/pdf-first-page', this.extractPdfFirstPage.bind(this));

    // Buffer 處理
    httpServer.post('/ocr/buffer', this.extractFromBuffer.bind(this));
  }

  private async extractText(req: Request, res: Response): Promise<void> {
    try {
      const { filePath, saveResult = false } = req.body;

      if (!filePath) {
        res.status(400).json({
          success: false,
          error: 'filePath is required'
        });
        return;
      }

      const result = await this.ocrService.processFile(filePath, saveResult);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('OCR Extract Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async extractPdfFirstPage(req: Request, res: Response): Promise<void> {
    try {
      const { filePath, saveResult = false } = req.body;

      if (!filePath) {
        res.status(400).json({
          success: false,
          error: 'filePath is required'
        });
        return;
      }

      const result = await this.ocrService.processPdfFirstPage(filePath, saveResult);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('PDF First Page OCR Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async extractFromBuffer(req: Request, res: Response): Promise<void> {
    try {
      // Check if we have raw buffer data
      if (!req.body || req.body.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Buffer data is required'
        });
        return;
      }

      // Ensure we have a Buffer (raw body parser should provide this)
      const buffer = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body);

      const result = await this.ocrService.processBuffer(buffer);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('OCR Buffer Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
