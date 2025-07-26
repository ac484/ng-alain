import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
    constructor(private message: NzMessageService) { }

    handleError(error: any, context?: string): void {
        console.error(`Error in ${context}:`, error);
        const message = this.getErrorMessage(error);
        this.message.error(message);
    }

    private getErrorMessage(error: any): string {
        if (error?.message) return error.message;
        if (typeof error === 'string') return error;
        return '發生未預期的錯誤';
    }
}