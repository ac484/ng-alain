/**
 * 類型定義
 */

export interface OcrResult {
  text: string;
  confidence: number;
  pages: PageResult[];
}

export interface PageResult {
  pageNumber: number;
  text: string;
  confidence: number;
  blocks: TextBlock[];
}

export interface TextBlock {
  text: string;
  confidence: number;
  boundingBox: BoundingBox;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OcrRequest {
  fileUrl?: string;
  fileBuffer?: Buffer;
  fileName: string;
  options?: OcrOptions;
}

export interface OcrOptions {
  language?: string;
  detectOrientation?: boolean;
  includeTextBlocks?: boolean;
}
