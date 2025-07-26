import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';
import { HubCrudService } from '../../../core/services';
import { WorkflowDefinition } from '../models';

@Injectable({ providedIn: 'root' })
export class ContractWorkflowService {
    private readonly collectionName = 'hub_workflow_definitions';

    constructor(private hubCrud: HubCrudService) { }

    // List all workflow templates
    listTemplates(): Observable<WorkflowDefinition[]> {
        return this.hubCrud.useCollection<WorkflowDefinition>(this.collectionName);
    }

    // Get workflow template for specific client
    async getTemplateForClient(clientId: string): Promise<WorkflowDefinition | null> {
        const col = collection(this.hubCrud.firestoreInstance, this.collectionName);
        const q = query(col, where('clientId', '==', clientId), where('isActive', '==', true));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return { key: doc.id, ...doc.data() } as WorkflowDefinition;
    }

    // Create new workflow template
    async createTemplate(data: Omit<WorkflowDefinition, 'key'>): Promise<string> {
        const col = collection(this.hubCrud.firestoreInstance, this.collectionName);
        const docRef = await addDoc(col, data);
        return docRef.id;
    }

    // Update workflow template
    async updateTemplate(id: string, data: Partial<WorkflowDefinition>): Promise<void> {
        const ref = doc(this.hubCrud.firestoreInstance, this.collectionName, id);
        await updateDoc(ref, data);
    }

    // Delete workflow template (with usage check)
    async deleteTemplate(id: string): Promise<void> {
        // Check if template is in use by active payments
        const isInUse = await this.isTemplateInUse(id);
        if (isInUse) {
            throw new Error('Cannot delete workflow template: it is currently in use by active payments');
        }

        const ref = doc(this.hubCrud.firestoreInstance, this.collectionName, id);
        await deleteDoc(ref);
    }

    // Check if workflow template is in use by active payments
    private async isTemplateInUse(templateId: string): Promise<boolean> {
        const paymentsCol = collection(this.hubCrud.firestoreInstance, 'hub_contract_payments');
        const q = query(paymentsCol, where('workflowId', '==', templateId));
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    }
}