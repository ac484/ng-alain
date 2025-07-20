import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { OcrService } from './services/ocr.service';
import cors from 'cors';

const corsHandler = cors({ origin: true });

const ocrService = new OcrService();

export const extractTextFromPdf = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const { filePath, saveResult = false } = req.body;

      if (!filePath) {
        res.status(400).json({ error: 'filePath is required' });
        return;
      }

      const result = await ocrService.processFile(filePath, saveResult);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('OCR Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
});

export const extractTextFromBuffer = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      if (!req.body || !Buffer.isBuffer(req.body)) {
        res.status(400).json({ error: 'Buffer data is required' });
        return;
      }

      const result = await ocrService.processBuffer(req.body);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('OCR Buffer Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
});

// 專門處理 PDF 第一頁的端點
export const extractTextFromPdfFirstPage = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const { filePath, saveResult = false } = req.body;

      if (!filePath) {
        res.status(400).json({ error: 'filePath is required' });
        return;
      }

      const result = await ocrService.processPdfFirstPage(filePath, saveResult);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('PDF First Page OCR Error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
});
