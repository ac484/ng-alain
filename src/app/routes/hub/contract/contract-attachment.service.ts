import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface AttachmentFile {
    uid: string;
    name: string;
    url: string;
    size: number;
    type: string;
    status: 'uploading' | 'done' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ContractAttachmentService {
    private storage = inject(Storage);
    private message = inject(NzMessageService);

    // Validate file before upload
    validateFile(file: File): boolean {
        // Check file type
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (!allowedTypes.includes(file.type)) {
            this.message.error('不支援的文件類型！只能上傳圖片、PDF或Office文檔');
            return false;
        }

        // Check file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.message.error('文件大小不能超過 10MB！');
            return false;
        }

        return true;
    }

    // Upload file to Firebase Storage
    async uploadFile(file: File, paymentId: string): Promise<string> {
        if (!this.validateFile(file)) {
            throw new Error('File validation failed');
        }

        try {
            // Create unique file path
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const filePath = `contract-payments/${paymentId}/${fileName}`;

            // Create storage reference
            const storageRef = ref(this.storage, filePath);

            // Upload file
            const snapshot = await uploadBytes(storageRef, file);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error('Upload error:', error);
            this.message.error('文件上傳失敗');
            throw error;
        }
    }

    // Delete file from Firebase Storage
    async deleteFile(fileUrl: string): Promise<void> {
        try {
            // Extract file path from URL
            const storageRef = ref(this.storage, fileUrl);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Delete error:', error);
            this.message.error('文件刪除失敗');
            throw error;
        }
    }

    // Get file name from URL
    getFileNameFromUrl(url: string): string {
        try {
            const urlParts = url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const decodedName = decodeURIComponent(fileName.split('?')[0]);
            // Remove timestamp prefix if exists
            return decodedName.replace(/^\d+_/, '');
        } catch (error) {
            return 'Unknown File';
        }
    }

    // Get file type icon
    getFileTypeIcon(fileName: string): string {
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return 'file-pdf';
            case 'doc':
            case 'docx':
                return 'file-word';
            case 'xls':
            case 'xlsx':
                return 'file-excel';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'file-image';
            default:
                return 'file';
        }
    }
}