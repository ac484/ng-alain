import { BaseModel } from '../../../core/models';

export interface ClientSettings extends BaseModel {
    list: string[];
    default: string;
}