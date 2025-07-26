import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { doc, runTransaction, getDoc, setDoc } from '@angular/fire/firestore';
import { HubCrudService } from '../../../core/services';
import { Contract } from '../models';

@Injectable({ providedIn: 'root' })
export class ContractService {
    constructor(private hubCrud: HubCrudService) { }

    list(): Observable<Contract[]> {
        return this.hubCrud.useCollection<Contract>('hub_contract');
    }

    getById(id: string): Observable<Contract | undefined> {
        return this.hubCrud.useDoc<Contract>('hub_contract', id);
    }

    add(data: Omit<Contract, 'key'>): Promise<string> {
        return this.hubCrud.add('hub_contract', data);
    }

    update(id: string, data: Partial<Contract>): Promise<void> {
        return this.hubCrud.update('hub_contract', id, data);
    }

    delete(id: string): Promise<void> {
        return this.hubCrud.delete('hub_contract', id);
    }

    async getNextContractSerial(): Promise<string> {
        const counterRef = doc(this.hubCrud.firestoreInstance, 'hub/meta/counters/contractSerial');
        let nextValue = 1;

        await runTransaction(this.hubCrud.firestoreInstance, async transaction => {
            const counterSnap = await transaction.get(counterRef);

            if (!counterSnap.exists()) {
                transaction.set(counterRef, { value: 1, available: [] });
                nextValue = 1;
            } else {
                const data = counterSnap.data();
                const available: number[] = data['available'] || [];

                if (available.length > 0) {
                    available.sort((a, b) => a - b);
                    nextValue = available.shift()!;
                    transaction.update(counterRef, { available });
                } else {
                    nextValue = (data['value'] || 0) + 1;
                    transaction.update(counterRef, { value: nextValue });
                }
            }
        });

        return 'C' + String(nextValue).padStart(5, '0');
    }

    async getClientsSettings(): Promise<{ list: string[]; default: string } | null> {
        const ref = doc(this.hubCrud.firestoreInstance, 'hub/meta/settings/clients');
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() as { list: string[]; default: string } : null;
    }

    async setClientsSettings(data: { list: string[]; default: string }): Promise<void> {
        const ref = doc(this.hubCrud.firestoreInstance, 'hub/meta/settings/clients');
        await setDoc(ref, data);
    }
}