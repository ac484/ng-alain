export interface ScanResult {
  text: string;
  pages: number;
}

export interface ScanRequest {
  bucketName: string;
  pdfPath: string;
}
