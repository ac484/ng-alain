import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { runTransaction, getFirestore, doc as firestoreDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpaceNode } from '../models/models';

@Injectable({ providedIn: 'root' })
export class FirebaseCrudService {
  private collectionName = 'tree-nodes';
  constructor(private firestore: Firestore) {}

  getNodes(): Observable<SpaceNode[]> {
    const col = collection(this.firestore, this.collectionName);
    return collectionData(col, { idField: 'id' }) as Observable<SpaceNode[]>;
  }

  getNode(id: string): Observable<SpaceNode | undefined> {
    const ref = doc(this.firestore, this.collectionName + '/' + id);
    return from(getDoc(ref)).pipe(
      map(snap => {
        if (!snap.exists()) return undefined;
        const data = snap.data() as Omit<SpaceNode, 'id'>;
        return { ...data, id: snap.id } as SpaceNode;
      })
    );
  }

  addNode(node: SpaceNode): Promise<void> {
    const ref = doc(this.firestore, this.collectionName + '/' + node.id);
    return setDoc(ref, node);
  }

  updateNode(id: string, updates: Partial<SpaceNode>): Promise<void> {
    const ref = doc(this.firestore, this.collectionName + '/' + id);
    return updateDoc(ref, { ...updates, updatedAt: new Date().toISOString() });
  }

  deleteNode(id: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName + '/' + id);
    return deleteDoc(ref);
  }

  moveNodesBatch(updates: { id: string; parentKey: string | null; order: number }[]): Promise<void> {
    const db = getFirestore();
    return runTransaction(db, async transaction => {
      for (const u of updates) {
        const ref = firestoreDoc(db, this.collectionName + '/' + u.id);
        transaction.update(ref, {
          parentKey: u.parentKey,
          order: u.order,
          updatedAt: new Date().toISOString()
        });
      }
    });
  }
}
