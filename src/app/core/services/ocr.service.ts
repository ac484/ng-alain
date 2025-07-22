import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface OcrResult {
  text: string;
  resultPath?: string;
  confidence?: number;
  pages?: number;
}

export interface OcrResponse {
  success: boolean;
  data?: OcrResult;
  error?: string;
}

export interface OcrRequest {
  filePath: string;
  saveResult?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private readonly http = inject(HttpClient);

  // Firebase Functions URL - 根據環境自動選擇
  private readonly functionsUrl = environment.production
    ? 'https://us-central1-lin-in.cloudfunctions.net/api'
    : 'http://localhost:3003/lin-in/us-central1/api'; // Firebase Emulator URL

  /**
   * 智能文字提取 - 根據文件類型自動選擇最佳處理方式
   */
  extractText(request: OcrRequest): Observable<OcrResult> {
    return this.http.post<OcrResponse>(`${this.functionsUrl}/ocr/extract`, request).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * PDF 第一頁處理 - 快速處理 PDF 的第一頁
   */
  extractPdfFirstPage(request: OcrRequest): Observable<OcrResult> {
    return this.http.post<OcrResponse>(`${this.functionsUrl}/ocr/pdf-first-page`, request).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Buffer 直接處理 - 處理文件 Buffer 數據
   */
  extractFromBuffer(buffer: ArrayBuffer): Observable<OcrResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });

    return this.http.post<OcrResponse>(`${this.functionsUrl}/ocr/buffer`, buffer, { headers }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * 處理 API 響應
   */
  private handleResponse(response: OcrResponse): OcrResult {
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'OCR 處理失敗');
    }
  }

  /**
   * 處理錯誤
   */
  private handleError(error: any): Observable<never> {
    console.error('OCR Service Error:', error);

    let errorMessage = 'OCR 服務錯誤';

    if (error.error?.error) {
      errorMessage = error.error.error;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * 檢查文件類型是否支援
   */
  isSupportedFileType(file: File): boolean {
    const supportedTypes = ['application/pdf', 'image/tiff', 'image/tif', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    const supportedExtensions = ['.pdf', '.tiff', '.tif', '.jpg', '.jpeg', '.png', '.gif'];

    return supportedTypes.includes(file.type) || supportedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  }

  /**
   * 檢查文件大小是否符合限制
   */
  isValidFileSize(file: File, maxSizeMB: number = 20): boolean {
    return file.size <= maxSizeMB * 1024 * 1024;
  }

  /**
   * 將文件轉換為 ArrayBuffer
   */
  fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };

      reader.onerror = () => {
        reject(new Error('文件讀取失敗'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * 格式化文字內容
   */
  formatText(text: string): string {
    if (!text) return '';

    return text.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/  /g, '&nbsp;&nbsp;');
  }

  /**
   * 複製文字到剪貼板
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('複製失敗:', error);
      return false;
    }
  }

  /**
   * 下載文字為文件
   */
  downloadTextFile(text: string, filename?: string): void {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename || `ocr-result-${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }
}
