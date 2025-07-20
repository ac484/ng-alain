import { ImageAnnotatorClient } from '@google-cloud/vision';

export interface TextDetectionResult {
  text: string;
  pages?: number;
  confidence?: number;
}

export class VisionService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new ImageAnnotatorClient();
  }

  // 單頁圖片文字檢測
  async extractTextFromBuffer(buffer: Buffer): Promise<TextDetectionResult> {
    try {
      const [result] = await this.client.textDetection({
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

  // PDF/TIFF 多頁文檔檢測 (使用 Firebase Storage URI)
  async extractTextFromDocument(gcsUri: string): Promise<TextDetectionResult> {
    try {
      // 構建 GCS URI (Firebase Storage 格式: gs://bucket-name/path)
      const formattedUri = gcsUri.startsWith('gs://') ? gcsUri : `gs://${gcsUri}`;

      const [operation] = await this.client.asyncBatchAnnotateFiles({
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

      // 等待異步操作完成
      const [result] = await operation.promise();

      // 處理結果
      let allText = '';
      let pageCount = 0;

      if (result.responses && result.responses.length > 0) {
        for (const response of result.responses) {
          if (response.fullTextAnnotation) {
            allText += response.fullTextAnnotation.text || '';
            pageCount += response.fullTextAnnotation.pages?.length || 0;
          }
        }
      }

      return {
        text: allText || 'No text detected',
        pages: pageCount,
        confidence: 0.8 // 預設信心度
      };
    } catch (error) {
      throw new Error(`Document processing error: ${error}`);
    }
  }

  // 同步處理 PDF 第一頁
  async extractTextFromPdfFirstPage(buffer: Buffer): Promise<TextDetectionResult> {
    try {
      const [result] = await this.client.documentTextDetection({
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
