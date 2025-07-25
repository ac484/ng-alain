import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContractPayment } from './contract-payment.model';
import { ContractAttachmentService } from './contract-attachment.service';

export interface PaymentFormData {
  amount: number;
  remark: string;
  attachments: string[];
}

@Component({
  selector: 'app-contract-payment-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzUploadModule,
    NzIconModule
  ],
  template: `
    <form nz-form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>付款金額</nz-form-label>
        <nz-form-control [nzSpan]="18" nzErrorTip="請輸入有效的付款金額">
          <nz-input-number
            formControlName="amount"
            [nzMin]="0.01"
            [nzStep]="0.01"
            nzPlaceHolder="請輸入付款金額"
            style="width: 100%">
          </nz-input-number>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">備註</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <textarea
            nz-input
            formControlName="remark"
            rows="3"
            placeholder="請輸入備註說明">
          </textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">附件</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <nz-upload
            nzMultiple
            [nzFileList]="fileList()"
            [nzBeforeUpload]="beforeUpload"
            [nzCustomRequest]="customUpload"
            (nzChange)="handleFileChange($event)"
            [nzShowUploadList]="{
              showPreviewIcon: true,
              showRemoveIcon: true,
              showDownloadIcon: true
            }">
            <button nz-button [nzLoading]="uploading()">
              <span nz-icon nzType="upload"></span>
              <span>上傳附件</span>
            </button>
          </nz-upload>
          <div style="margin-top: 8px; color: #8c8c8c; font-size: 12px;">
            支援圖片、PDF、Word、Excel文件，單個文件不超過10MB，最多5個文件
          </div>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzOffset]="6" [nzSpan]="18">
          <button
            nz-button
            nzType="primary"
            [nzLoading]="isSubmitting()"
            [disabled]="!paymentForm.valid || isSubmitting()"
            type="submit">
            {{ editMode() ? '更新' : '創建' }}付款請求
          </button>
          <button
            nz-button
            type="button"
            (click)="onCancel()"
            style="margin-left: 8px;">
            取消
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class ContractPaymentFormComponent implements OnInit {
  @Input() payment: ContractPayment | null = null;
  @Input() contractId: string = '';
  @Output() formSubmit = new EventEmitter<PaymentFormData>();
  @Output() formCancel = new EventEmitter<void>();

  // Signals for reactive state management
  isSubmitting = signal(false);
  editMode = computed(() => !!this.payment);
  fileList = signal<NzUploadFile[]>([]);
  uploading = signal(false);

  paymentForm: FormGroup;
  private attachmentService = inject(ContractAttachmentService);

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.paymentForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.payment) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      remark: [''],
      attachments: [[]]
    });
  }

  private populateForm(): void {
    if (this.payment) {
      this.paymentForm.patchValue({
        amount: this.payment.amount,
        remark: this.payment.remark,
        attachments: this.payment.attachments
      });

      // Convert attachment URLs to file list format
      const attachmentFiles: NzUploadFile[] = this.payment.attachments.map((url, index) => ({
        uid: `${index}`,
        name: this.attachmentService.getFileNameFromUrl(url),
        status: 'done' as const,
        url: url,
        size: 0,
        type: ''
      }));
      this.fileList.set(attachmentFiles);
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    // Check file count limit
    if (this.fileList().length >= 5) {
      this.message.error('最多只能上傳5個文件！');
      return false;
    }

    // Use attachment service validation
    return this.attachmentService.validateFile(file as any);
  };

  customUpload = (item: any): any => {
    this.uploading.set(true);

    // Upload file using attachment service
    this.attachmentService.uploadFile(item.file, this.contractId || 'temp')
      .then((downloadURL) => {
        // Update file status to done
        item.onSuccess(downloadURL, item.file);
        this.message.success(`${item.file.name} 上傳成功`);
      })
      .catch((error) => {
        // Update file status to error
        item.onError(error, item.file);
        this.message.error(`${item.file.name} 上傳失敗`);
      })
      .finally(() => {
        this.uploading.set(false);
      });
  };

  handleFileChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // Limit to 5 files
    fileList = fileList.slice(-5);

    this.fileList.set(fileList);

    // Update form control with file URLs from successful uploads
    const attachmentUrls = fileList
      .filter(file => file.status === 'done')
      .map(file => {
        // Get URL from response (customUpload returns downloadURL)
        if (file.response) {
          return file.response;
        }
        // For existing files, use the url property
        return file.url || '';
      })
      .filter(url => url); // Remove empty URLs

    this.paymentForm.patchValue({ attachments: attachmentUrls });
  }

  onSubmit(): void {
    if (this.paymentForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      const formData: PaymentFormData = {
        amount: this.paymentForm.value.amount,
        remark: this.paymentForm.value.remark || '',
        attachments: this.paymentForm.value.attachments || []
      };

      this.formSubmit.emit(formData);

      // Reset submitting state after a delay (parent component should handle this)
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  resetForm(): void {
    this.paymentForm.reset();
    this.fileList.set([]);
    this.isSubmitting.set(false);
  }
}