import { Injectable } from '@angular/core';
import { initializePDFJS, getPDFJS } from './pdf.config';

export interface PDFParseResult {
  success: boolean;
  data?: string[];
  error?: string;
  pageCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  private isInitialized = false;

  constructor() {
    this.initPDFJS();
  }

  /**
   * 初始化 PDF.js
   */
  private async initPDFJS(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await initializePDFJS();
      this.isInitialized = true;
      console.log('PDF.js 初始化成功');
    } catch (error) {
      console.error('PDF.js 初始化失敗:', error);
      throw new Error('PDF 解析庫初始化失敗');
    }
  }

  /**
   * 解析 PDF 檔案
   */
  async parsePDF(file: File): Promise<PDFParseResult> {
    try {
      // 確保已初始化
      if (!this.isInitialized) {
        await this.initPDFJS();
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = getPDFJS();

      // 載入 PDF 文檔
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        verbosity: 0 // 減少日誌輸出
      });

      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      const textLines: string[] = [];

      // 逐頁提取文字
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent({
            normalizeWhitespace: true
          });

          // 提取每行文字
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ')
            .split('\n')
            .filter((line: string) => line.trim());

          textLines.push(...pageText);

          // 定期釋放記憶體
          if (pageNum % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
          }
        } catch (pageError) {
          console.warn(`第 ${pageNum} 頁解析失敗:`, pageError);
          // 繼續處理下一頁
        }
      }

      return {
        success: true,
        data: textLines,
        pageCount
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF 解析失敗',
        pageCount: 0
      };
    }
  }

  /**
   * 檢查檔案是否為有效的 PDF
   */
  isValidPDF(file: File): boolean {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  }

  /**
   * 格式化檔案大小
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * 獲取檔案信息
   */
  getFileInfo(file: File): { name: string; size: string; type: string } {
    return {
      name: file.name,
      size: this.formatFileSize(file.size),
      type: file.type
    };
  }
}
