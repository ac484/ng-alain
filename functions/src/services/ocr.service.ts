import { VisionService } from './vision.service';
import { StorageService } from './storage.service';

export interface OcrResult {
  text: string;
  resultPath?: string;
  confidence?: number;
  pages?: number;
}

export class OcrService {
  private visionService: VisionService;
  private storageService: StorageService;

  constructor() {
    this.visionService = new VisionService();
    this.storageService = new StorageService();
  }

  async processFile(filePath: string, saveResult = false): Promise<OcrResult> {
    try {
      let visionResult;

      // 檢查是否為 PDF/TIFF 多頁文檔
      if (this.storageService.isPdfOrTiff(filePath)) {
        // 使用異步批量處理 (適用於多頁 PDF/TIFF)
        const gcsUri = this.storageService.getGcsUri(filePath);
        visionResult = await this.visionService.extractTextFromDocument(gcsUri);
      } else {
        // 使用同步處理 (適用於單頁圖片)
        const buffer = await this.storageService.downloadFile(filePath);
        visionResult = await this.visionService.extractTextFromBuffer(buffer);
      }

      const result: OcrResult = {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };

      // 可選：保存結果到Storage
      if (saveResult && visionResult.text) {
        result.resultPath = await this.storageService.uploadResult(filePath, visionResult.text);
      }

      return result;
    } catch (error) {
      throw new Error(`OCR processing error: ${error}`);
    }
  }

  async processBuffer(buffer: Buffer): Promise<OcrResult> {
    try {
      const visionResult = await this.visionService.extractTextFromBuffer(buffer);
      return {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };
    } catch (error) {
      throw new Error(`OCR buffer processing error: ${error}`);
    }
  }

  // 專門處理 PDF 第一頁的方法
  async processPdfFirstPage(filePath: string, saveResult = false): Promise<OcrResult> {
    try {
      const buffer = await this.storageService.downloadFile(filePath);
      const visionResult = await this.visionService.extractTextFromPdfFirstPage(buffer);

      const result: OcrResult = {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };

      if (saveResult && visionResult.text) {
        result.resultPath = await this.storageService.uploadResult(filePath, visionResult.text);
      }

      return result;
    } catch (error) {
      throw new Error(`PDF first page processing error: ${error}`);
    }
  }
}
