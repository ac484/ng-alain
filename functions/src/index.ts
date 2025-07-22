import { setGlobalOptions } from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

// 重新導出 vision 模組的函數
export { extractPdfText } from './vision';

// 重新導出 CWA 模組的函數
export { getWeatherData } from './cwa';
