import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { ScanController } from './controllers/scanController';

// 設置全局選項
setGlobalOptions({ maxInstances: 10 });

// 初始化控制器
const scanController = new ScanController();

// 定義HTTP端點
export const scanPdf = onRequest(
  {
    memory: '1GiB', // 為PDF處理分配更多記憶體
    timeoutSeconds: 540 // 增加超時時間到9分鐘
  },
  async (request, response) => {
    logger.info('PDF掃描請求開始', { structuredData: true });

    // CORS處理
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method === 'OPTIONS') {
      response.set('Access-Control-Allow-Methods', 'POST');
      response.set('Access-Control-Allow-Headers', 'Content-Type');
      response.status(204).send('');
      return;
    }

    // 只允許POST請求
    if (request.method !== 'POST') {
      response.status(405).send('僅支持POST方法');
      return;
    }

    // 處理請求
    await scanController.scanPdf(request, response);
  }
);
