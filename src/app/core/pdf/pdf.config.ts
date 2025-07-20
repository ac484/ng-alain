/**
 * PDF.js 配置檔案
 *
 * 此檔案用於配置 PDF.js 庫的初始化設定
 * 支援中英文 PDF 檔案解析，專注於文字提取
 * 不提取圖片內容，支援任意大小的 PDF 檔案
 */

export interface PDFConfig {
  workerSrc: string;
  cMapUrl: string;
  cMapPacked: boolean;
  standardFontDataUrl: string;
}

export const PDF_CONFIG: PDFConfig = {
  // PDF.js worker 檔案路徑
  workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',

  // 字體映射檔案路徑（支援中文）
  cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',

  // 是否使用壓縮的字體映射
  cMapPacked: true,

  // 標準字體資料路徑
  standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/'
};

/**
 * 初始化 PDF.js 庫
 */
export function initializePDFJS(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('PDF.js 只能在瀏覽器環境中使用'));
      return;
    }

    // 檢查是否已經載入
    if ((window as any).pdfjsLib) {
      resolve();
      return;
    }

    // 動態載入 PDF.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;

      // 配置 PDF.js
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_CONFIG.workerSrc;

      // 設定字體映射（支援中文）
      pdfjsLib.cMapUrl = PDF_CONFIG.cMapUrl;
      pdfjsLib.cMapPacked = PDF_CONFIG.cMapPacked;
      pdfjsLib.standardFontDataUrl = PDF_CONFIG.standardFontDataUrl;

      // 優化設定：專注於文字提取
      pdfjsLib.GlobalWorkerOptions.verbosity = 0; // 減少日誌輸出

      resolve();
    };
    script.onerror = () => {
      reject(new Error('PDF.js 載入失敗'));
    };

    document.head.appendChild(script);
  });
}

/**
 * 檢查 PDF.js 是否已初始化
 */
export function isPDFJSInitialized(): boolean {
  return typeof window !== 'undefined' && !!(window as any).pdfjsLib;
}

/**
 * 獲取 PDF.js 實例
 */
export function getPDFJS(): any {
  if (!isPDFJSInitialized()) {
    throw new Error('PDF.js 未初始化，請先調用 initializePDFJS()');
  }
  return (window as any).pdfjsLib;
}

// 匯出所有服務
export * from './pdf.service';
export * from '../tree/tree-converter.service';
