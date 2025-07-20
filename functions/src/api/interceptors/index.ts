import { Request, Response, NextFunction } from 'express';
import { verifyIdTokenInterceptor } from './verify-idtoken-interceptor';
import bodyParser from 'body-parser';

export const interceptors: Array<(req: Request, res: Response, next: NextFunction) => void> = [
  // CORS interceptor - must be first to handle preflight requests
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '3600');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  },

  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  // Raw body parser for binary data (like OCR buffer)
  bodyParser.raw({
    type: 'application/octet-stream',
    limit: '50mb' // Increase limit for large files
  }),

  // Setting default values
  (req, res, next) => {
    req.claims = {} as any;
    next();
  },
  verifyIdTokenInterceptor
];
