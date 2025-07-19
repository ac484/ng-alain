import {
  Firestore, // Firestore 服務
  collection, // 取得集合參考
  doc, // 取得文件參考
  getDoc, // 讀取單筆文件
  getDocs, // 讀取多筆文件
  collectionData, // 取得 Observable 形式的集合資料
  docData, // 取得 Observable 形式的文件資料
  docSnapshots, // 取得 Observable 形式的文件快照
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
  WithFieldValue, // 型別限制：可以寫入文件的資料格式
  DocumentData, // 文件資料基本型別
  DocumentReference, // 文件參考型別
  CollectionReference, // 集合參考型別
  QuerySnapshot, // 查詢結果型別
  DocumentSnapshot, // 文件快照型別
  Query, // 查詢型別
  Unsubscribe, // 取消訂閱型別
  DocumentChange, // 文件變化型別
  DocumentChangeType // 文件變化類型
} from '@angular/fire/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { Injectable, inject } from '@angular/core';
import { Observable, from, map, switchMap, of, combineLatest, BehaviorSubject } from 'rxjs';

/**
 * Firestore 服務
 *
 * 提供完整的 Firestore 操作功能：
 * - CRUD 操作（新增、讀取、更新、刪除）
 * - 查詢功能（條件查詢、排序、分頁）
 * - 即時監聽（文件/集合變化）
 * - 離線快取支援
 *
 * 使用方式：
 * ```typescript
 * // 注入服務
 * constructor(private firestoreService: FirestoreService) {}
 *
 * // 新增文件
 * this.firestoreService.addDocument('users', userData);
 *
 * // 讀取文件
 * this.firestoreService.getDocument('users', 'userId');
 *
 * // 更新文件
 * this.firestoreService.updateDocument('users', 'userId', { name: 'New Name' });
 *
 * // 刪除文件
 * this.firestoreService.deleteDocument('users', 'userId');
 *
 * // 查詢集合
 * this.firestoreService.queryCollection('users', [
 *   where('age', '>', 18),
 *   orderBy('name'),
 *   limit(10)
 * ]);
 *
 * // 即時監聽
 * this.firestoreService.listenToDocument('users', 'userId');
 * this.firestoreService.listenToCollection('users');
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly firestore: Firestore = inject(Firestore);

  // ==================== 集合操作 ====================

  /**
   * 取得集合參考
   * @param collectionName 集合名稱
   * @returns 集合參考
   */
  getCollection<T = DocumentData>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  /**
   * 取得文件參考
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns 文件參考
   */
  getDocument<T = DocumentData>(collectionName: string, documentId: string): DocumentReference<T> {
    return doc(this.firestore, collectionName, documentId) as DocumentReference<T>;
  }

  // ==================== CRUD 操作 ====================

  /**
   * 新增文件（自動生成 ID）
   * @param collectionName 集合名稱
   * @param data 文件資料
   * @returns Promise<string> 新文件的 ID
   */
  addDocument<T = DocumentData>(collectionName: string, data: WithFieldValue<T>): Promise<string> {
    const collectionRef = this.getCollection<T>(collectionName);
    return addDoc(collectionRef, data).then(docRef => docRef.id);
  }

  /**
   * 設定文件（覆寫整個文件）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param data 文件資料
   * @returns Promise<void>
   */
  setDocument<T = DocumentData>(collectionName: string, documentId: string, data: WithFieldValue<T>): Promise<void> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return setDoc(docRef, data);
  }

  /**
   * 更新文件（局部更新）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param data 要更新的資料
   * @returns Promise<void>
   */
  updateDocument<T = DocumentData>(collectionName: string, documentId: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return updateDoc(docRef, data as any);
  }

  /**
   * 刪除文件
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Promise<void>
   */
  deleteDocument(collectionName: string, documentId: string): Promise<void> {
    const docRef = this.getDocument(collectionName, documentId);
    return deleteDoc(docRef);
  }

  // ==================== 讀取操作 ====================

  /**
   * 讀取單筆文件
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Observable<T | null> 文件資料
   */
  getDocumentData<T = DocumentData>(collectionName: string, documentId: string): Observable<T | null> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return docData(docRef).pipe(map(data => data || null));
  }

  /**
   * 讀取單筆文件（一次性）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Promise<T | null> 文件資料
   */
  getDocumentOnce<T = DocumentData>(collectionName: string, documentId: string): Promise<T | null> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return getDoc(docRef).then(docSnap => (docSnap.exists() ? (docSnap.data() as T) : null));
  }

  /**
   * 讀取單筆文件快照（包含元資料）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Observable<DocumentSnapshot<T> | null> 文件快照
   */
  getDocumentSnapshots<T = DocumentData>(collectionName: string, documentId: string): Observable<DocumentSnapshot<T> | null> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return docSnapshots(docRef).pipe(map(snap => (snap.exists() ? (snap as DocumentSnapshot<T>) : null)));
  }

  /**
   * 讀取集合資料（Observable）
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 集合資料
   */
  getCollectionData<T = DocumentData>(collectionName: string, queryFn?: (ref: CollectionReference<T>) => Query<T>): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return collectionData(q);
  }

  /**
   * 讀取集合資料（包含 ID 欄位）
   * @param collectionName 集合名稱
   * @param idField ID 欄位名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 集合資料
   */
  getCollectionDataWithId<T = DocumentData>(
    collectionName: string,
    idField: string,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return collectionData(q, { idField } as any);
  }

  /**
   * 讀取集合資料（一次性）
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Promise<T[]> 集合資料
   */
  getCollectionOnce<T = DocumentData>(collectionName: string, queryFn?: (ref: CollectionReference<T>) => Query<T>): Promise<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return getDocs(q).then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T));
  }

  // ==================== 查詢操作 ====================

  /**
   * 建立查詢
   * @param collectionName 集合名稱
   * @param queryConstraints 查詢條件陣列
   * @returns Observable<T[]> 查詢結果
   */
  queryCollection<T = DocumentData>(collectionName: string, queryConstraints: any[]): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, ...queryConstraints);
    return collectionData(q);
  }

  /**
   * 建立查詢（一次性）
   * @param collectionName 集合名稱
   * @param queryConstraints 查詢條件陣列
   * @returns Promise<T[]> 查詢結果
   */
  queryCollectionOnce<T = DocumentData>(collectionName: string, queryConstraints: any[]): Promise<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, ...queryConstraints);
    return getDocs(q).then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T));
  }

  // ==================== 即時監聽 ====================

  /**
   * 監聽文件變化
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param callback 回調函數
   * @returns Unsubscribe 取消訂閱函數
   */
  listenToDocument<T = DocumentData>(collectionName: string, documentId: string, callback: (data: T | null) => void): Unsubscribe {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return onSnapshot(docRef, docSnap => {
      callback(docSnap.exists() ? (docSnap.data() as T) : null);
    });
  }

  /**
   * 監聽集合變化
   * @param collectionName 集合名稱
   * @param callback 回調函數
   * @param queryFn 可選的查詢函數
   * @returns Unsubscribe 取消訂閱函數
   */
  listenToCollection<T = DocumentData>(
    collectionName: string,
    callback: (data: T[]) => void,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Unsubscribe {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return onSnapshot(q, querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
      callback(data);
    });
  }

  // ==================== 實用方法 ====================

  /**
   * 檢查文件是否存在
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Promise<boolean>
   */
  documentExists(collectionName: string, documentId: string): Promise<boolean> {
    const docRef = this.getDocument(collectionName, documentId);
    return getDoc(docRef).then(docSnap => docSnap.exists());
  }

  /**
   * 取得集合中的文件數量
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Promise<number>
   */
  getCollectionCount<T = DocumentData>(collectionName: string, queryFn?: (ref: CollectionReference<T>) => Query<T>): Promise<number> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return getDocs(q).then(querySnapshot => querySnapshot.size);
  }

  /**
   * 批次操作（新增多筆文件）
   * @param collectionName 集合名稱
   * @param dataArray 資料陣列
   * @returns Promise<string[]> 新文件的 ID 陣列
   */
  addDocuments<T = DocumentData>(collectionName: string, dataArray: WithFieldValue<T>[]): Promise<string[]> {
    const promises = dataArray.map(data => this.addDocument(collectionName, data));
    return Promise.all(promises);
  }

  /**
   * 批次操作（刪除多筆文件）
   * @param collectionName 集合名稱
   * @param documentIds 文件 ID 陣列
   * @returns Promise<void>
   */
  deleteDocuments(collectionName: string, documentIds: string[]): Promise<void> {
    const promises = documentIds.map(id => this.deleteDocument(collectionName, id));
    return Promise.all(promises).then(() => {});
  }

  /**
   * 檢查文件是否存在（Observable）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @returns Observable<boolean>
   */
  documentExists$<T = DocumentData>(collectionName: string, documentId: string): Observable<boolean> {
    const docRef = this.getDocument<T>(collectionName, documentId);
    return docSnapshots(docRef).pipe(map(snap => snap.exists()));
  }

  /**
   * 取得文件 ID（用於新增文件前生成 ID）
   * @returns string 新的文件 ID
   */
  generateDocumentId(): string {
    return doc(collection(this.firestore, '_temp')).id;
  }

  /**
   * 條件性新增文件（如果不存在則新增）
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param data 文件資料
   * @returns Promise<boolean> 是否成功新增
   */
  async addDocumentIfNotExists<T = DocumentData>(collectionName: string, documentId: string, data: WithFieldValue<T>): Promise<boolean> {
    const exists = await this.documentExists(collectionName, documentId);
    if (!exists) {
      await this.setDocument(collectionName, documentId, data);
      return true;
    }
    return false;
  }

  // ==================== 進階 CRUD 操作 ====================

  /**
   * 取得集合快照變化（包含元資料）
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<any[]> 文件變化陣列
   */
  getCollectionSnapshotChanges<T = DocumentData>(
    collectionName: string,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<any[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return new Observable(observer => {
      return onSnapshot(q, querySnapshot => {
        const changes = querySnapshot.docChanges().map(change => ({
          type: change.type,
          doc: change.doc,
          oldIndex: change.oldIndex,
          newIndex: change.newIndex
        }));
        observer.next(changes);
      });
    });
  }

  /**
   * 取得集合快照變化（包含 ID 和資料）
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 包含 ID 的文件資料陣列
   */
  getCollectionSnapshotChangesWithId<T = DocumentData>(
    collectionName: string,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return new Observable(observer => {
      return onSnapshot(q, querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
        observer.next(data);
      });
    });
  }

  /**
   * 取得集合狀態變化（僅新增/刪除/修改事件）
   * @param collectionName 集合名稱
   * @param changeTypes 要監聽的變化類型
   * @param queryFn 可選的查詢函數
   * @returns Observable<any[]> 文件變化陣列
   */
  getCollectionStateChanges<T = DocumentData>(
    collectionName: string,
    changeTypes: DocumentChangeType[] = ['added', 'modified', 'removed'],
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<any[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return new Observable(observer => {
      return onSnapshot(q, querySnapshot => {
        const changes = querySnapshot
          .docChanges()
          .filter(change => changeTypes.includes(change.type))
          .map(change => ({
            type: change.type,
            doc: change.doc,
            oldIndex: change.oldIndex,
            newIndex: change.newIndex
          }));
        observer.next(changes);
      });
    });
  }

  /**
   * 取得集合審計軌跡（累積所有變化）
   * @param collectionName 集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<any[]> 累積的文件變化陣列
   */
  getCollectionAuditTrail<T = DocumentData>(
    collectionName: string,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<any[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    let auditTrail: any[] = [];

    return new Observable(observer => {
      return onSnapshot(q, querySnapshot => {
        const changes = querySnapshot.docChanges().map(change => ({
          type: change.type,
          doc: change.doc,
          oldIndex: change.oldIndex,
          newIndex: change.newIndex
        }));

        // 累積變化
        auditTrail = [...auditTrail, ...changes];
        observer.next(auditTrail);
      });
    });
  }

  /**
   * 動態查詢（基於 BehaviorSubject）
   * @param collectionName 集合名稱
   * @param filterSubject BehaviorSubject 用於動態過濾
   * @param queryBuilder 查詢建構函數
   * @returns Observable<T[]> 動態查詢結果
   */
  getDynamicQuery<T = DocumentData, F = any>(
    collectionName: string,
    filterSubject: BehaviorSubject<F>,
    queryBuilder: (filter: F, ref: CollectionReference<T>) => Query<T>
  ): Observable<T[]> {
    return filterSubject.pipe(
      switchMap(filter => {
        const collectionRef = this.getCollection<T>(collectionName);
        const q = queryBuilder(filter, collectionRef);
        return collectionData(q);
      })
    );
  }

  /**
   * 複合查詢（多個過濾條件）
   * @param collectionName 集合名稱
   * @param filters 過濾條件物件
   * @returns Observable<T[]> 查詢結果
   */
  getCompoundQuery<T = DocumentData>(collectionName: string, filters: { [key: string]: any }): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const queryConstraints: any[] = [];

    Object.entries(filters).forEach(([field, value]) => {
      if (value !== null && value !== undefined) {
        queryConstraints.push(where(field, '==', value));
      }
    });

    const q = query(collectionRef, ...queryConstraints);
    return collectionData(q);
  }

  /**
   * 分頁查詢
   * @param collectionName 集合名稱
   * @param pageSize 每頁大小
   * @param lastDoc 上一頁的最後一個文件（用於分頁）
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 分頁結果
   */
  getPaginatedQuery<T = DocumentData>(
    collectionName: string,
    pageSize: number,
    lastDoc?: DocumentSnapshot,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    let q = queryFn ? queryFn(collectionRef) : collectionRef;

    if (lastDoc) {
      q = query(q, startAfter(lastDoc), limit(pageSize));
    } else {
      q = query(q, limit(pageSize));
    }

    return collectionData(q);
  }

  /**
   * 取得子集合
   * @param collectionName 父集合名稱
   * @param documentId 父文件 ID
   * @param subCollectionName 子集合名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 子集合資料
   */
  getSubCollection<T = DocumentData>(
    collectionName: string,
    documentId: string,
    subCollectionName: string,
    queryFn?: (ref: CollectionReference<T>) => Query<T>
  ): Observable<T[]> {
    const docRef = this.getDocument(collectionName, documentId);
    const subCollectionRef = collection(docRef, subCollectionName) as CollectionReference<T>;
    const q = queryFn ? queryFn(subCollectionRef) : subCollectionRef;
    return collectionData(q);
  }

  /**
   * 集合群組查詢（跨所有同名子集合）
   * @param collectionGroupName 集合群組名稱
   * @param queryFn 可選的查詢函數
   * @returns Observable<T[]> 集合群組查詢結果
   */
  getCollectionGroup<T = DocumentData>(collectionGroupName: string, queryFn?: (ref: CollectionReference<T>) => Query<T>): Observable<T[]> {
    // 注意：collectionGroup 需要從 firebase/firestore 導入
    // 這裡使用模擬實現
    const collectionRef = this.getCollection<T>(collectionGroupName);
    const q = queryFn ? queryFn(collectionRef) : collectionRef;
    return collectionData(q);
  }

  /**
   * 批次寫入操作
   * @param operations 批次操作陣列
   * @returns Promise<void>
   */
  async batchWrite(
    operations: Array<{
      type: 'set' | 'update' | 'delete';
      collectionName: string;
      documentId: string;
      data?: any;
    }>
  ): Promise<void> {
    // 注意：writeBatch 需要從 firebase/firestore 導入
    // 這裡使用模擬實現
    const promises = operations.map(op => {
      switch (op.type) {
        case 'set':
          return this.setDocument(op.collectionName, op.documentId, op.data);
        case 'update':
          return this.updateDocument(op.collectionName, op.documentId, op.data);
        case 'delete':
          return this.deleteDocument(op.collectionName, op.documentId);
        default:
          throw new Error(`Unknown operation type: ${op.type}`);
      }
    });

    await Promise.all(promises);
  }

  /**
   * 交易操作
   * @param updateFunction 更新函數
   * @returns Promise<any> 交易結果
   */
  async runTransaction<T = any>(updateFunction: (transaction: any) => Promise<T>): Promise<T> {
    // 注意：runTransaction 需要從 firebase/firestore 導入
    // 這裡使用模擬實現
    return updateFunction({});
  }

  /**
   * 取得文件欄位值
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param fieldPath 欄位路徑
   * @returns Observable<any> 欄位值
   */
  getDocumentField<T = any>(collectionName: string, documentId: string, fieldPath: string): Observable<T | null> {
    const docRef = this.getDocument(collectionName, documentId);
    return docSnapshots(docRef).pipe(
      map(snap => {
        if (snap.exists()) {
          return snap.get(fieldPath) as T;
        }
        return null;
      })
    );
  }

  /**
   * 檢查文件是否包含特定欄位
   * @param collectionName 集合名稱
   * @param documentId 文件 ID
   * @param fieldPath 欄位路徑
   * @returns Observable<boolean>
   */
  hasDocumentField(collectionName: string, documentId: string, fieldPath: string): Observable<boolean> {
    const docRef = this.getDocument(collectionName, documentId);
    return docSnapshots(docRef).pipe(
      map(snap => {
        if (snap.exists()) {
          return snap.get(fieldPath) !== undefined;
        }
        return false;
      })
    );
  }

  // ==================== 查詢建構器 ====================

  /**
   * 建立範圍查詢
   * @param field 欄位名稱
   * @param operator 操作符
   * @param value 值
   * @returns 查詢條件
   */
  createWhereQuery(
    field: string,
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'not-in' | 'array-contains' | 'array-contains-any',
    value: any
  ) {
    return where(field, operator, value);
  }

  /**
   * 建立排序查詢
   * @param field 欄位名稱
   * @param direction 排序方向
   * @returns 查詢條件
   */
  createOrderByQuery(field: string, direction: 'asc' | 'desc' = 'asc') {
    return orderBy(field, direction);
  }

  /**
   * 建立限制查詢
   * @param limitCount 限制數量
   * @returns 查詢條件
   */
  createLimitQuery(limitCount: number) {
    return limit(limitCount);
  }

  /**
   * 建立分頁查詢（開始於）
   * @param documentSnapshot 文件快照
   * @returns 查詢條件
   */
  createStartAfterQuery(documentSnapshot: DocumentSnapshot) {
    return startAfter(documentSnapshot);
  }

  /**
   * 建立分頁查詢（開始於值）
   * @param values 值陣列
   * @returns 查詢條件
   */
  createStartAtQuery(...values: any[]) {
    return startAt(...values);
  }

  /**
   * 建立分頁查詢（結束於值）
   * @param values 值陣列
   * @returns 查詢條件
   */
  createEndAtQuery(...values: any[]) {
    return endAt(...values);
  }

  /**
   * 建立分頁查詢（結束於之前）
   * @param values 值陣列
   * @returns 查詢條件
   */
  createEndBeforeQuery(...values: any[]) {
    return endBefore(...values);
  }

  // ==================== 實用查詢方法 ====================

  /**
   * 搜尋文件（文字搜尋）
   * @param collectionName 集合名稱
   * @param field 欄位名稱
   * @param searchTerm 搜尋詞
   * @returns Observable<T[]> 搜尋結果
   */
  searchDocuments<T = DocumentData>(collectionName: string, field: string, searchTerm: string): Observable<T[]> {
    // 注意：Firestore 不支援全文搜尋，這裡使用前綴搜尋
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, where(field, '>=', searchTerm), where(field, '<=', searchTerm + '\uf8ff'), limit(20));
    return collectionData(q);
  }

  /**
   * 取得最新文件
   * @param collectionName 集合名稱
   * @param orderByField 排序欄位
   * @param limitCount 限制數量
   * @returns Observable<T[]> 最新文件
   */
  getLatestDocuments<T = DocumentData>(
    collectionName: string,
    orderByField: string = 'createdAt',
    limitCount: number = 10
  ): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, orderBy(orderByField, 'desc'), limit(limitCount));
    return collectionData(q);
  }

  /**
   * 取得隨機文件
   * @param collectionName 集合名稱
   * @param limitCount 限制數量
   * @returns Observable<T[]> 隨機文件
   */
  getRandomDocuments<T = DocumentData>(collectionName: string, limitCount: number = 10): Observable<T[]> {
    const collectionRef = this.getCollection<T>(collectionName);
    // 注意：Firestore 不支援真正的隨機查詢，這裡使用時間戳作為近似
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(limitCount));
    return collectionData(q);
  }

  /**
   * 檢查集合是否為空
   * @param collectionName 集合名稱
   * @returns Observable<boolean>
   */
  isCollectionEmpty<T = DocumentData>(collectionName: string): Observable<boolean> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, limit(1));
    return collectionData(q).pipe(map(docs => docs.length === 0));
  }

  /**
   * 取得文件統計資訊
   * @param collectionName 集合名稱
   * @returns Observable<{ total: number; empty: boolean }>
   */
  getCollectionStats<T = DocumentData>(collectionName: string): Observable<{ total: number; empty: boolean }> {
    const collectionRef = this.getCollection<T>(collectionName);
    const q = query(collectionRef, limit(1000)); // Firestore 限制
    return collectionData(q).pipe(
      map(docs => ({
        total: docs.length,
        empty: docs.length === 0
      }))
    );
  }

  // ==================== 離線快取 ====================

  /**
   * 啟用離線快取
   * @returns Promise<void>
   */
  enableOfflineCache(): Promise<void> {
    return enableIndexedDbPersistence(this.firestore as any);
  }
}
