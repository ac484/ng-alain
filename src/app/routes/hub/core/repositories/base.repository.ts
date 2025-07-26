import { Observable } from 'rxjs';
import { HubCrudService } from '../services';
import { BaseModel } from '../models';

export abstract class BaseRepository<T extends BaseModel> {
    constructor(
        protected crudService: HubCrudService,
        protected collectionName: string
    ) { }

    list(): Observable<T[]> {
        return this.crudService.useCollection<T>(this.collectionName);
    }

    getById(id: string): Observable<T | undefined> {
        return this.crudService.useDoc<T>(this.collectionName, id);
    }

    async create(data: Omit<T, 'key'>): Promise<string> {
        return this.crudService.add(this.collectionName, data);
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        return this.crudService.update(this.collectionName, id, data);
    }

    async delete(id: string): Promise<void> {
        return this.crudService.delete(this.collectionName, id);
    }
}