import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData,
  runTransaction,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HubCrudService {
  private firestore = inject(Firestore);

  // 語法糖：取得集合（自動型別）
  useCollection<T extends { key?: string }>(collectionName: string): Observable<T[]> {
    const col = collection(this.firestore, collectionName) as CollectionReference<T>;
    return collectionData(col, { idField: 'key' as keyof T }) as Observable<T[]>;
  }

  // 語法糖：取得單筆
  useDoc<T extends { key?: string }>(collectionName: string, id: string): Observable<T | undefined> {
    const ref = doc(this.firestore, collectionName, id) as any;
    return docData(ref, { idField: 'key' as keyof T }) as Observable<T | undefined>;
  }

  // 新增
  async add<T>(collectionName: string, data: T): Promise<string> {
    const col = collection(this.firestore, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(col, data);
    return docRef.id;
  }

  // 更新
  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const ref = doc(this.firestore, collectionName, id);
    await updateDoc(ref, data as DocumentData);
  }

  // 刪除
  async delete<T>(collectionName: string, id: string): Promise<void> {
    const ref = doc(this.firestore, collectionName, id);
    await deleteDoc(ref);
  }
}
