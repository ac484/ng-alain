import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc } from '@angular/fire/firestore';
import { HubCrudService } from '../../../core/services';
import { ClientSettings } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(private hubCrud: HubCrudService) { }

    async getClientsSettings(): Promise<ClientSettings | null> {
        const ref = doc(this.hubCrud.firestoreInstance, 'hub/meta/settings/clients');
        const snap = await getDoc(ref);
        return snap.exists() ? { key: ref.id, ...snap.data() } as ClientSettings : null;
    }

    async setClientsSettings(data: Omit<ClientSettings, 'key'>): Promise<void> {
        const ref = doc(this.hubCrud.firestoreInstance, 'hub/meta/settings/clients');
        await setDoc(ref, data);
    }

    async getDefaultClient(): Promise<string> {
        const settings = await this.getClientsSettings();
        return settings?.default || '';
    }
}