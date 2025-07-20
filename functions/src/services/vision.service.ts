/**
 * Google Cloud Vision API 服務
 */

import { ImageAnnotatorClient } from '@google-cloud/vision';
import * as logger from 'firebase-functions/logger';
import { OcrResult, PageResult, TextBlock, BoundingBox, OcrOptions } from '../types';

export class VisionService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new ImageAnnotatorClient();
  }

  /**
   * 執行OCR文字識別
   */
  async extractText(imageBuffer: Buffer, options: OcrOptions = {}): Promise<OcrResult> {
    try {
      const request = {
        image: { content: imageBuffer },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION' as const,
            maxResults: 1
          }
        ],
        imageContext: {
          languageHints: options.language ? [options.language] : ['zh-TW']
        }
      };

      const [result] = await this.client.annotateImage(request);

      if (!result.fullTextAnnotation) {
        return {
          text: '',
          confidence: 0,
          pages: []
        };
      }

      return this.processVisionResult(result, options);
    } catch (error) {
      logger.error('Vision API error:', error);
      throw new Error(`OCR processing failed: ${error}`);
    }
  }

  /**
   * 處理Vision API結果
   */
  private processVisionResult(result: any, options: OcrOptions): OcrResult {
    const fullText = result.fullTextAnnotation;
    const pages: PageResult[] = [];

    if (fullText.pages) {
      fullText.pages.forEach((page: any, index: number) => {
        const pageResult: PageResult = {
          pageNumber: index + 1,
          text: this.extractPageText(page),
          confidence: this.calculatePageConfidence(page),
          blocks: options.includeTextBlocks ? this.extractTextBlocks(page) : []
        };
        pages.push(pageResult);
      });
    }

    return {
      text: fullText.text || '',
      confidence: this.calculateOverallConfidence(pages),
      pages
    };
  }

  /**
   * 提取頁面文字
   */
  private extractPageText(page: any): string {
    if (!page.blocks) return '';

    return page.blocks
      .map((block: any) =>
        block.paragraphs
          ?.map((paragraph: any) => paragraph.words?.map((word: any) => word.symbols?.map((symbol: any) => symbol.text).join('')).join(' '))
          .join('\n')
      )
      .join('\n\n');
  }

  /**
   * 計算頁面信心度
   */
  private calculatePageConfidence(page: any): number {
    if (!page.blocks) return 0;

    let totalConfidence = 0;
    let count = 0;

    page.blocks.forEach((block: any) => {
      if (block.confidence !== undefined) {
        totalConfidence += block.confidence;
        count++;
      }
    });

    return count > 0 ? totalConfidence / count : 0;
  }

  /**
   * 提取文字區塊
   */
  private extractTextBlocks(page: any): TextBlock[] {
    if (!page.blocks) return [];

    return page.blocks.map((block: any) => ({
      text: this.extractBlockText(block),
      confidence: block.confidence || 0,
      boundingBox: this.extractBoundingBox(block.boundingBox)
    }));
  }

  /**
   * 提取區塊文字
   */
  private extractBlockText(block: any): string {
    if (!block.paragraphs) return '';

    return block.paragraphs
      .map((paragraph: any) => paragraph.words?.map((word: any) => word.symbols?.map((symbol: any) => symbol.text).join('')).join(' '))
      .join('\n');
  }

  /**
   * 提取邊界框
   */
  private extractBoundingBox(boundingBox: any): BoundingBox {
    if (!boundingBox?.vertices || boundingBox.vertices.length < 2) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    const vertices = boundingBox.vertices;
    const x = Math.min(...vertices.map((v: any) => v.x || 0));
    const y = Math.min(...vertices.map((v: any) => v.y || 0));
    const maxX = Math.max(...vertices.map((v: any) => v.x || 0));
    const maxY = Math.max(...vertices.map((v: any) => v.y || 0));

    return {
      x,
      y,
      width: maxX - x,
      height: maxY - y
    };
  }

  /**
   * 計算整體信心度
   */
  private calculateOverallConfidence(pages: PageResult[]): number {
    if (pages.length === 0) return 0;

    const totalConfidence = pages.reduce((sum, page) => sum + page.confidence, 0);
    return totalConfidence / pages.length;
  }
}
