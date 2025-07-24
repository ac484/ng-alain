import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { Contract } from './contract.model';
import { doc, runTransaction, getDoc, setDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private hubCrud: HubCrudService) {}

  list(): Observable<Contract[]> {
    return this.hubCrud.useCollection<Contract>('hub_contract');
  }
  add(data: Contract): Promise<string> {
    return this.hubCrud.add('hub_contract', data);
  }
  update(id: string, data: Partial<Contract>): Promise<void> {
    return this.hubCrud.update('hub_contract', id, data);
  }
  delete(id: string): Promise<void> {
    return this.hubCrud.delete('hub_contract', id);
  }
  // 合約專屬：取得下一個唯一合約序號
  async getNextContractSerial(): Promise<string> {
    const counterRef = doc(this.hubCrud['firestore'], 'hub/meta/counters/contractSerial');
    let nextValue = 1;
    await runTransaction(this.hubCrud['firestore'], async transaction => {
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

  // 合約專屬：刪除合約時回收序號
  async recycleContractSerial(contractSerial: string): Promise<void> {
    const num = Number(contractSerial.replace(/^C/, ''));
    if (!num || isNaN(num)) return;
    const counterRef = doc(this.hubCrud['firestore'], 'hub/meta/counters/contractSerial');
    await runTransaction(this.hubCrud['firestore'], async transaction => {
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

  // 合約專屬：取得業主清單與預設值
  async getClientsSettings(): Promise<{ list: string[]; default: string } | null> {
    const ref = doc(this.hubCrud['firestore'], 'hub/meta/settings/clients');
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as { list: string[]; default: string };
  }

  // 合約專屬：設定業主清單與預設值
  async setClientsSettings(data: { list: string[]; default: string }): Promise<void> {
    const ref = doc(this.hubCrud['firestore'], 'hub/meta/settings/clients');
    await setDoc(ref, data);
  }

  // 合約專屬：取得預設業主
  async getDefaultClient(): Promise<string> {
    const settings = await this.getClientsSettings();
    return settings?.default || '';
  }
  // 其他合約專屬邏輯可於此擴充
}
