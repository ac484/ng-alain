import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScanRequest {
  bucketName: string;
  pdfPath: string;
}

export interface ScanResult {
  text: string;
  pages: number;
}

export interface ScanResponse {
  success: boolean;
  result?: ScanResult;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {
  private apiUrl = 'https://us-central1-lin-in.cloudfunctions.net/scanPdf';

  constructor(private http: HttpClient) {}

  /**
   * 使用Google Cloud Vision API掃描PDF文件
   *
   * @param bucketName Google Cloud Storage桶名
   * @param pdfPath PDF文件在桶中的路徑
   */
  scanPdf(bucketName: string, pdfPath: string): Observable<ScanResponse> {
    const request: ScanRequest = {
      bucketName,
      pdfPath
    };

    return this.http.post<ScanResponse>(this.apiUrl, request);
  }
}
