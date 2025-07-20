export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface OcrRequest {
  filePath: string;
  saveResult?: boolean;
}

export interface OcrResult {
  text: string;
  resultPath?: string;
  confidence?: number;
}
