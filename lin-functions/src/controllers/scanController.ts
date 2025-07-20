import { Request, Response } from 'firebase-functions';
import { PdfService } from '../services/pdfService';
import { ScanRequest } from '../types';

export class ScanController {
  private pdfService: PdfService;

  constructor() {
    this.pdfService = new PdfService();
  }

  async scanPdf(req: Request, res: Response): Promise<void> {
    try {
      const { bucketName, pdfPath } = req.body as ScanRequest;

      if (!bucketName || !pdfPath) {
        res.status(400).json({ error: '缺少必要參數: bucketName 和 pdfPath' });
        return;
      }

      const result = await this.pdfService.scanPdf(bucketName, pdfPath);
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('掃描控制器錯誤:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : '未知錯誤'
      });
    }
  }
}
