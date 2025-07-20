import * as admin from 'firebase-admin';

export class StorageService {
  private bucket: any;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    this.bucket = admin.storage().bucket();
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    try {
      const file = this.bucket.file(filePath);
      const [buffer] = await file.download();
      return buffer;
    } catch (error) {
      throw new Error(`Storage download error: ${error}`);
    }
  }

  async uploadResult(filePath: string, content: string): Promise<string> {
    try {
      const resultPath = filePath.replace(/\.[^/.]+$/, '_ocr.txt');
      const file = this.bucket.file(resultPath);

      await file.save(content, {
        metadata: { contentType: 'text/plain' }
      });

      return resultPath;
    } catch (error) {
      throw new Error(`Storage upload error: ${error}`);
    }
  }

  // 獲取文件的 GCS URI (用於 Vision API)
  getGcsUri(filePath: string): string {
    return `gs://${this.bucket.name}/${filePath}`;
  }

  // 檢查文件是否為 PDF/TIFF
  isPdfOrTiff(filePath: string): boolean {
    const ext = filePath.toLowerCase().split('.').pop();
    return ['pdf', 'tiff', 'tif'].includes(ext || '');
  }
}
