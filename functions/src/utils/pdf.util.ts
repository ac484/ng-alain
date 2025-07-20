/**
 * PDF處理工具
 */

import * as logger from 'firebase-functions/logger';

export class PdfUtil {
  /**
   * 驗證PDF文件
   */
  static validatePdfBuffer(buffer: Buffer): boolean {
    if (!buffer || buffer.length === 0) {
      return false;
    }

    // 檢查PDF文件頭
    const pdfHeader = buffer.subarray(0, 4).toString();
    return pdfHeader === '%PDF';
  }

  /**
   * 驗證文件大小
   */
  static validateFileSize(buffer: Buffer, maxSizeMB = 10): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return buffer.length <= maxSizeBytes;
  }

  /**
   * 獲取文件信息
   */
  static getFileInfo(buffer: Buffer, fileName: string) {
    return {
      fileName,
      fileSize: buffer.length,
      fileSizeFormatted: this.formatFileSize(buffer.length),
      isPdf: this.validatePdfBuffer(buffer),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 格式化文件大小
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * 記錄處理信息
   */
  static logProcessingInfo(fileName: string, buffer: Buffer) {
    const info = this.getFileInfo(buffer, fileName);
    logger.info('Processing PDF file:', {
      fileName: info.fileName,
      fileSize: info.fileSizeFormatted,
      isPdf: info.isPdf,
      timestamp: info.timestamp
    });
  }
}
