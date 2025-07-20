import { Storage } from '@google-cloud/storage';
import { ScanResult } from '../types';
import * as vision from '@google-cloud/vision';

export class PdfService {
  private storage: Storage;
  private visionClient: vision.ImageAnnotatorClient;

  constructor() {
    this.storage = new Storage();
    this.visionClient = new vision.ImageAnnotatorClient();
  }

  async scanPdf(bucketName: string, pdfPath: string): Promise<ScanResult> {
    try {
      // 1. 設置GCS URI
      const gcsSourceUri = `gs://${bucketName}/${pdfPath}`;
      const gcsDestinationUri = `gs://${bucketName}/output/`;

      // 2. 配置批次文檔處理請求
      const inputConfig = {
        mimeType: 'application/pdf',
        gcsSource: {
          uri: gcsSourceUri
        }
      };

      const outputConfig = {
        gcsDestination: {
          uri: gcsDestinationUri
        }
      };

      const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];

      const request = {
        requests: [
          {
            inputConfig,
            features,
            outputConfig
          }
        ]
      };

      // 3. 執行異步批次註釋
      const [operation] = await this.visionClient.asyncBatchAnnotateFiles(request);
      const [filesResponse] = await operation.promise();

      // 4. 獲取結果
      const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;

      // 5. 從輸出JSON文件中獲取文本
      const outputPrefix = destinationUri.split('gs://')[1].split('/')[1];
      const bucket = this.storage.bucket(bucketName);

      const [files] = await bucket.getFiles({ prefix: outputPrefix });

      let fullText = '';
      let pageCount = 0;

      for (const file of files) {
        if (file.name.endsWith('.json')) {
          const [content] = await file.download();
          const response = JSON.parse(content.toString());

          if (response.responses) {
            for (const pageResponse of response.responses) {
              if (pageResponse.fullTextAnnotation) {
                fullText += pageResponse.fullTextAnnotation.text + '\n';
                pageCount++;
              }
            }
          }
        }
      }

      return {
        text: fullText.trim(),
        pages: pageCount
      };
    } catch (error) {
      console.error('PDF掃描錯誤:', error);
      throw error;
    }
  }
}
