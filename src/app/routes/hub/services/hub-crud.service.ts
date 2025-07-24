import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// 泛型 CRUD 服務
@Injectable({ providedIn: 'root' })
export class HubCrudService<T extends { key?: string }> {
  constructor(private firestore: Firestore) {}

  // 取得所有資料（即時監聽）
  getAll(collectionName: string): Observable<T[]> {
    const col = collection(this.firestore, collectionName) as CollectionReference<T>;
    return collectionData(col, { idField: 'key' }) as Observable<T[]>;
  }

  // 取得單筆
  getById(collectionName: string, id: string): Observable<T | undefined> {
    const ref = doc(this.firestore, collectionName, id) as any;
    return docData(ref, { idField: 'key' }) as Observable<T | undefined>;
  }

  // 新增
  async add(collectionName: string, data: T): Promise<string> {
    const col = collection(this.firestore, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(col, data);
    return docRef.id;
  }

  // 更新
  async update(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const ref = doc(this.firestore, collectionName, id);
    await updateDoc(ref, data as DocumentData);
  }

  // 刪除
  async delete(collectionName: string, id: string): Promise<void> {
    const ref = doc(this.firestore, collectionName, id);
    await deleteDoc(ref);
  }

  // 即時監聽（同 getAll，語意區分）
  listen(collectionName: string): Observable<T[]> {
    return this.getAll(collectionName);
  }
}
