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

  // 取得下一個唯一合約序號（企業級 counter，存於 hub/meta/counters/contractSerial）
  async getNextContractSerial(): Promise<string> {
    // Firestore 路徑：hub/meta/counters/contractSerial（企業級結構，偶數段）
    const counterRef = doc(this.firestore, 'hub/meta/counters/contractSerial');
    let nextValue = 1;
    await runTransaction(this.firestore, async transaction => {
      const counterSnap = await transaction.get(counterRef);
      if (!counterSnap.exists()) {
        transaction.set(counterRef, { value: 1 });
        nextValue = 1;
      } else {
        const current = counterSnap.data()['value'] || 0;
        nextValue = current + 1;
        transaction.update(counterRef, { value: nextValue });
      }
    });
    return 'C' + String(nextValue).padStart(5, '0');
  }

  // 取得業主清單與預設值
  async getClientsSettings(): Promise<{ list: string[]; default: string } | null> {
    const ref = doc(this.firestore, 'hub/meta/settings/clients');
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as { list: string[]; default: string };
  }

  // 設定業主清單與預設值
  async setClientsSettings(data: { list: string[]; default: string }): Promise<void> {
    const ref = doc(this.firestore, 'hub/meta/settings/clients');
    await setDoc(ref, data);
  }

  // 取得預設業主
  async getDefaultClient(): Promise<string> {
    const settings = await this.getClientsSettings();
    return settings?.default || '';
  }
}
