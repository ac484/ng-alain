import {
  Firestore, // Firestore 服務
  collection, // 取得集合參考
  doc, // 取得文件參考
  getDoc, // 讀取單筆文件
  getDocs, // 讀取多筆文件
  collectionData, // 取得 Observable 形式的集合資料
  docData, // 取得 Observable 形式的文件資料
  setDoc, // 設定文件（覆寫）
  updateDoc, // 更新文件（局部）
  deleteDoc, // 刪除文件
  addDoc, // 新增文件（自動生成 id）
  query, // 建立查詢
  where, // 查詢條件
  orderBy, // 排序
  limit, // 限制筆數
  startAfter, // 分頁開始點
  startAt, // 分頁起點
  endAt, // 分頁終點
  endBefore, // 分頁終點（不包含）
  onSnapshot, // 監聽文件 / 集合變化
  enableIndexedDbPersistence, // 啟用 IndexedDB 離線快取
  WithFieldValue, // 型別限制：可以寫入文件的資料格式
  DocumentData // 文件資料基本型別
} from '@angular/fire/firestore';
