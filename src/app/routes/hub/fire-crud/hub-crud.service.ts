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

  // 取得下一個唯一合約序號（支援序號回收，存於 hub/meta/counters/contractSerial）
  /**
   * 取得下一個唯一合約序號（支援序號回收，存於 hub/meta/counters/contractSerial）
   * Firestore 結構：
   *   value: number // 目前最大序號
   *   available: number[] // 可回收再用的序號（已排序，最小優先）
   */
  async getNextContractSerial(): Promise<string> {
    const counterRef = doc(this.firestore, 'hub/meta/counters/contractSerial');
    let nextValue = 1;
    await runTransaction(this.firestore, async transaction => {
      const counterSnap = await transaction.get(counterRef);
      let value = 0;
      let available: number[] = [];
      if (!counterSnap.exists()) {
        value = 1;
        available = [];
        transaction.set(counterRef, { value, available });
        nextValue = value;
      } else {
        const data = counterSnap.data();
        value = data['value'] || 0;
        available = Array.isArray(data['available']) ? [...data['available']] : [];
        if (available.length > 0) {
          // 取最小可用序號
          available.sort((a, b) => a - b);
          nextValue = available.shift()!;
          transaction.update(counterRef, { available });
        } else {
          nextValue = value + 1;
          transaction.update(counterRef, { value: nextValue });
        }
      }
    });
    return 'C' + String(nextValue).padStart(5, '0');
  }

  /**
   * 刪除合約時回收序號
   * @param contractSerial 合約序號（如 C00001）
   */
  async recycleContractSerial(contractSerial: string): Promise<void> {
    const num = Number(contractSerial.replace(/^C/, ''));
    if (!num || isNaN(num)) return;
    const counterRef = doc(this.firestore, 'hub/meta/counters/contractSerial');
    await runTransaction(this.firestore, async transaction => {
      const counterSnap = await transaction.get(counterRef);
      if (!counterSnap.exists()) {
        transaction.set(counterRef, { value: num, available: [num] });
      } else {
        const data = counterSnap.data();
        let available: number[] = Array.isArray(data['available']) ? [...data['available']] : [];
        if (!available.includes(num)) {
          available.push(num);
          available.sort((a, b) => a - b);
          transaction.update(counterRef, { available });
        }
      }
    });
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
