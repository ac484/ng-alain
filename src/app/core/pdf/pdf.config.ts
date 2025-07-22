/**
 * PDF.js 配置檔案
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Cloud Firestore
 */

export interface PDFConfig {
  workerSrc: string;
  cMapUrl: string;
  cMapPacked: boolean;
  standardFontDataUrl: string;
}

export const PDF_CONFIG: PDFConfig = {
  workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
  cMapPacked: true,
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

    if ((window as any).pdfjsLib) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_CONFIG.workerSrc;
      pdfjsLib.cMapUrl = PDF_CONFIG.cMapUrl;
      pdfjsLib.cMapPacked = PDF_CONFIG.cMapPacked;
      pdfjsLib.standardFontDataUrl = PDF_CONFIG.standardFontDataUrl;
      pdfjsLib.GlobalWorkerOptions.verbosity = 0;
      resolve();
    };
    script.onerror = () => reject(new Error('PDF.js 載入失敗'));
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
