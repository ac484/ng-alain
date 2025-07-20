import * as admin from 'firebase-admin';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export interface OcrResult {
  text: string;
  resultPath?: string;
  confidence?: number;
  pages?: number;
}

export interface TextDetectionResult {
  text: string;
  pages?: number;
  confidence?: number;
}

export class OcrService {
  private visionClient: ImageAnnotatorClient;
  private bucket: any;

  constructor() {
    this.visionClient = new ImageAnnotatorClient();
    // 延遲初始化 bucket，避免在模組載入時就調用
    this.bucket = null;
  }

  private getBucket() {
    if (!this.bucket) {
      this.bucket = admin.storage().bucket();
    }
    return this.bucket;
  }

  // 智能處理文件 (根據類型選擇最佳方法)
  async processFile(filePath: string, saveResult = false): Promise<OcrResult> {
    try {
      let visionResult: TextDetectionResult;

      if (this.isPdfOrTiff(filePath)) {
        // PDF/TIFF 使用異步批量處理
        const gcsUri = this.getGcsUri(filePath);
        visionResult = await this.extractTextFromDocument(gcsUri);
      } else {
        // 圖片使用同步處理
        const buffer = await this.downloadFile(filePath);
        visionResult = await this.extractTextFromBuffer(buffer);
      }

      const result: OcrResult = {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };

      if (saveResult && visionResult.text) {
        result.resultPath = await this.uploadResult(filePath, visionResult.text);
      }

      return result;
    } catch (error) {
      throw new Error(`OCR processing error: ${error}`);
    }
  }

  // 處理 Buffer 數據
  async processBuffer(buffer: Buffer): Promise<OcrResult> {
    try {
      const visionResult = await this.extractTextFromBuffer(buffer);
      return {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };
    } catch (error) {
      throw new Error(`OCR buffer processing error: ${error}`);
    }
  }

  // 專門處理 PDF 第一頁
  async processPdfFirstPage(filePath: string, saveResult = false): Promise<OcrResult> {
    try {
      const buffer = await this.downloadFile(filePath);
      const visionResult = await this.extractTextFromPdfFirstPage(buffer);

      const result: OcrResult = {
        text: visionResult.text,
        confidence: visionResult.confidence,
        pages: visionResult.pages
      };

      if (saveResult && visionResult.text) {
        result.resultPath = await this.uploadResult(filePath, visionResult.text);
      }

      return result;
    } catch (error) {
      throw new Error(`PDF first page processing error: ${error}`);
    }
  }

  // === Private Methods ===

  private async downloadFile(filePath: string): Promise<Buffer> {
    try {
      const file = this.getBucket().file(filePath);
      const [buffer] = await file.download();
      return buffer;
    } catch (error) {
      throw new Error(`Storage download error: ${error}`);
    }
  }

  private async uploadResult(filePath: string, content: string): Promise<string> {
    try {
      const resultPath = filePath.replace(/\.[^/.]+$/, '_ocr.txt');
      const file = this.getBucket().file(resultPath);

      await file.save(content, {
        metadata: { contentType: 'text/plain' }
      });

      return resultPath;
    } catch (error) {
      throw new Error(`Storage upload error: ${error}`);
    }
  }

  private getGcsUri(filePath: string): string {
    return `gs://${this.getBucket().name}/${filePath}`;
  }

  private isPdfOrTiff(filePath: string): boolean {
    const ext = filePath.toLowerCase().split('.').pop();
    return ['pdf', 'tiff', 'tif'].includes(ext || '');
  }

  private async extractTextFromBuffer(buffer: Buffer): Promise<TextDetectionResult> {
    try {
      const [result] = await this.visionClient.textDetection({
        image: { content: buffer }
      });

      const detections = result.textAnnotations;
      return {
        text: detections?.[0]?.description || '',
        pages: 1
      };
    } catch (error) {
      throw new Error(`Vision API error: ${error}`);
    }
  }

  private async extractTextFromDocument(gcsUri: string): Promise<TextDetectionResult> {
    try {
      const formattedUri = gcsUri.startsWith('gs://') ? gcsUri : `gs://${gcsUri}`;

      const [operation] = await this.visionClient.asyncBatchAnnotateFiles({
        requests: [
          {
            inputConfig: {
              gcsSource: { uri: formattedUri },
              mimeType: this.getMimeType(gcsUri)
            },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            outputConfig: {
              gcsDestination: {
                uri: formattedUri.replace(/\.[^/.]+$/, '_output/')
              }
            }
          }
        ]
      });

      const [result] = await operation.promise();

      let allText = '';
      let pageCount = 0;

      if (result.responses && result.responses.length > 0) {
        for (const response of result.responses) {
          const responseAny = response as any;
          if (responseAny.fullTextAnnotation) {
            allText += responseAny.fullTextAnnotation.text || '';
            pageCount += responseAny.fullTextAnnotation.pages?.length || 0;
          }
        }
      }

      return {
        text: allText || 'No text detected',
        pages: pageCount,
        confidence: 0.8
      };
    } catch (error) {
      throw new Error(`Document processing error: ${error}`);
    }
  }

  private async extractTextFromPdfFirstPage(buffer: Buffer): Promise<TextDetectionResult> {
    try {
      const [result] = await this.visionClient.documentTextDetection({
        image: { content: buffer }
      });

      const fullText = result.fullTextAnnotation;
      return {
        text: fullText?.text || '',
        pages: fullText?.pages?.length || 0,
        confidence: this.calculateAverageConfidence(fullText)
      };
    } catch (error) {
      throw new Error(`PDF text detection error: ${error}`);
    }
  }

  private getMimeType(filename: string): string {
    const ext = filename.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf':
        return 'application/pdf';
      case 'tiff':
      case 'tif':
        return 'image/tiff';
      default:
        return 'application/pdf';
    }
  }

  private calculateAverageConfidence(fullText: any): number {
    if (!fullText?.pages) return 0;

    let totalConfidence = 0;
    let wordCount = 0;

    for (const page of fullText.pages) {
      for (const block of page.blocks || []) {
        for (const paragraph of block.paragraphs || []) {
          for (const word of paragraph.words || []) {
            if (word.confidence) {
              totalConfidence += word.confidence;
              wordCount++;
            }
          }
        }
      }
    }

    return wordCount > 0 ? totalConfidence / wordCount : 0;
  }
}
