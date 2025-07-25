import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractPayment } from './contract-payment.model';

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
    NzUploadModule
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
            (nzChange)="handleFileChange($event)">
            <button nz-button>
              <span>上傳附件</span>
            </button>
          </nz-upload>
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
  fileList = signal<any[]>([]);

  paymentForm: FormGroup;

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
      const attachmentFiles = this.payment.attachments.map((url, index) => ({
        uid: `${index}`,
        name: `attachment-${index + 1}`,
        status: 'done',
        url: url
      }));
      this.fileList.set(attachmentFiles);
    }
  }

  beforeUpload = (file: any): boolean => {
    // Validate file type and size
    const isValidType = file.type.includes('image/') ||
      file.type === 'application/pdf' ||
      file.type.includes('document');

    if (!isValidType) {
      this.message.error('只能上傳圖片、PDF或文檔文件！');
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.message.error('文件大小不能超過 10MB！');
      return false;
    }

    return false; // Prevent automatic upload, handle manually
  };

  handleFileChange(info: any): void {
    let fileList = [...info.fileList];

    // Limit to 5 files
    fileList = fileList.slice(-5);

    this.fileList.set(fileList);

    // Update form control with file URLs (in real implementation, upload to storage first)
    const attachmentUrls = fileList
      .filter(file => file.status === 'done')
      .map(file => file.url || file.response?.url || '');

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