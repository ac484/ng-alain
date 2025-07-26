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
    DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BaseModel } from '../models';

@Injectable({ providedIn: 'root' })
export class HubCrudService {
    private firestore = inject(Firestore);

    get firestoreInstance(): Firestore {
        return this.firestore;
    }

    useCollection<T extends BaseModel>(collectionName: string): Observable<T[]> {
        const col = collection(this.firestore, collectionName) as CollectionReference<T>;
        return collectionData(col, { idField: 'key' as keyof T }) as Observable<T[]>;
    }

    useDoc<T extends BaseModel>(collectionName: string, id: string): Observable<T | undefined> {
        const ref = doc(this.firestore, collectionName, id);
        return docData(ref, { idField: 'key' as keyof T }) as Observable<T | undefined>;
    }

    async add<T extends BaseModel>(collectionName: string, data: Omit<T, 'key'>): Promise<string> {
        const col = collection(this.firestore, collectionName) as CollectionReference<T>;
        const docRef = await addDoc(col, data as any);
        return docRef.id;
    }

    async update<T extends BaseModel>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
        const ref = doc(this.firestore, collectionName, id);
        await updateDoc(ref, data as DocumentData);
    }

    async delete(collectionName: string, id: string): Promise<void> {
        const ref = doc(this.firestore, collectionName, id);
        await deleteDoc(ref);
    }
}