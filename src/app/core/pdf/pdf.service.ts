import { Injectable } from '@angular/core';

import { initializePDFJS, getPDFJS } from './pdf.config';

export interface CustomerPOItem {
  customerPO: string;
  content: string;
  costRef?: string;
}

export interface PDFParseResult {
  success: boolean;
  data?: string[];
  customerPOItems?: CustomerPOItem[];
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
      if (!this.isInitialized) {
        await this.initPDFJS();
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = getPDFJS();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0 });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      const textLines: string[] = [];

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent({ normalizeWhitespace: true });

          // 更精確的文字提取，保持原始位置和順序
          const textItems = textContent.items.map((item: any) => ({
            text: item.str,
            x: item.transform[4],
            y: item.transform[5]
          }));

          // 按Y座標排序（從上到下），然後按X座標排序（從左到右）
          textItems.sort((a: any, b: any) => {
            const yDiff = b.y - a.y; // Y座標越大越靠上
            if (Math.abs(yDiff) > 5) {
              // 如果Y座標差異超過5，按Y排序
              return yDiff;
            }
            return a.x - b.x; // 否則按X座標排序
          });

          // 將文字項目組合成行
          const pageLines: string[] = [];
          let currentLine = '';
          let lastY = textItems[0]?.y || 0;

          textItems.forEach((item: any) => {
            if (Math.abs(item.y - lastY) > 5) {
              // 新的一行
              if (currentLine.trim()) {
                pageLines.push(currentLine.trim());
              }
              currentLine = item.text;
              lastY = item.y;
            } else {
              currentLine += ` ${item.text}`;
            }
          });

          if (currentLine.trim()) {
            pageLines.push(currentLine.trim());
          }

          textLines.push(...pageLines.filter(line => line.trim()));
        } catch (pageError) {
          console.warn(`第 ${pageNum} 頁解析失敗:`, pageError);
        }
      }

      const customerPOItems = this.extractCustomerPOStructure(textLines);
      return { success: true, data: textLines, customerPOItems, pageCount };
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
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * 提取Customer PO結構
   * 處理格式如：3RDTW5BG(Cost Ref: 6600011)(Customer PO: )LV SWGR
   */
  extractCustomerPOStructure(textLines: string[]): CustomerPOItem[] {
    const customerPOItems: CustomerPOItem[] = [];

    // 正則表達式用於匹配完整的模式
    const fullPattern = /([A-Z0-9]+)\(Cost Ref:\s*([^)]+)\)\(Customer PO:\s*\)(.+)/;

    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i].trim();

      // 檢查是否包含 "Customer PO:"
      if (line.includes('Customer PO:')) {
        let identifier = '';
        let costRef = '';
        let contentLine = '';
        let customerPOLine = line;

        // 嘗試匹配完整模式：識別碼(Cost Ref: 數字)(Customer PO: )內容
        const fullMatch = line.match(fullPattern);

        if (fullMatch) {
          // 完整匹配成功
          identifier = fullMatch[1]; // 例如 "3RDTW5BG"
          costRef = fullMatch[2]; // 例如 "6600011"
          contentLine = fullMatch[3].trim(); // 例如 "LV SWGR"
        } else {
          // 如果不是完整模式，則分別提取各部分

          // 提取Cost Ref
          const costRefMatch = line.match(/\(Cost Ref:\s*([^)]+)\)/);
          if (costRefMatch) {
            costRef = costRefMatch[1].trim();
          }

          // 提取識別碼（通常在行首）
          const identifierMatch = line.match(/^([A-Z0-9]+)(?:\(|\s)/);
          if (identifierMatch) {
            identifier = identifierMatch[1].trim();
          }

          // 查找Customer PO:後面的內容
          const customerPOIndex = line.indexOf('Customer PO:');
          if (customerPOIndex !== -1) {
            const afterCustomerPO = line.substring(customerPOIndex + 'Customer PO:'.length).trim();

            // 如果Customer PO:後面有內容（不只是一個右括號）
            if (afterCustomerPO && !afterCustomerPO.startsWith(')')) {
              contentLine = afterCustomerPO.replace(/\(Cost Ref:\s*[^)]+\)/, '').trim();
            }
            // 如果Customer PO:後面是右括號，檢查括號後是否有內容
            else if (afterCustomerPO.startsWith(')')) {
              const afterParenthesis = afterCustomerPO.substring(1).trim();
              if (afterParenthesis) {
                contentLine = afterParenthesis;
              }
            }
          }

          // 如果還沒找到內容，查找下一行
          if (!contentLine && i + 1 < textLines.length) {
            const nextLine = textLines[i + 1].trim();

            // 確保下一行不是另一個Customer PO項目
            if (!nextLine.includes('Customer PO:') && !nextLine.includes('Cost Ref:') && nextLine.length > 0) {
              contentLine = nextLine;
              i++; // 跳過已處理的下一行
            }
          }
        }

        // 創建Customer PO項目
        customerPOItems.push({
          customerPO: identifier ? `${identifier}(Customer PO:)` : customerPOLine,
          content: contentLine,
          costRef: costRef || undefined
        });
      }
    }

    return customerPOItems;
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
