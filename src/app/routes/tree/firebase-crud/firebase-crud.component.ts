import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { FirebaseCrudService } from './firebase-crud.service';
import { SpaceNode } from '../models/models';

@Component({
  selector: 'app-firebase-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <ng-template #crudModal let-modal>
      <form [formGroup]="nodeForm" (ngSubmit)="handleOk(modal)">
        <div nz-form-item>
          <div nz-form-label><label>標題</label></div>
          <div nz-form-control><input nz-input formControlName="title" /></div>
        </div>
        <div nz-form-item>
          <div nz-form-label><label>父節點</label></div>
          <div nz-form-control><input nz-input formControlName="parentKey" /></div>
        </div>
        <div style="text-align:right">
          <button nz-button nzType="default" (click)="modal.destroy()">取消</button>
          <button nz-button nzType="primary" [disabled]="!nodeForm.valid" htmlType="submit">確定</button>
        </div>
      </form>
    </ng-template>
  `
})
export class FirebaseCrudComponent {
  @ViewChild('crudModal', { static: true }) crudModal!: TemplateRef<any>;
  @Output() dataChanged = new EventEmitter<void>();
  nodeForm: FormGroup;
  isEditMode = false;
  modalTitle = '新增節點';
  private editNodeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    private crud: FirebaseCrudService
  ) {
    this.nodeForm = this.fb.group({
      title: ['', Validators.required],
      parentKey: ['']
    });
  }

  refresh(): void {
    // this.nodes$ = this.crud.getNodes(); // Removed as per edit hint
  }

  showAddModal(parentKey?: string | null): void {
    this.isEditMode = false;
    this.modalTitle = '新增節點';
    this.nodeForm.reset({ title: '', parentKey: parentKey ?? '' });
    this.modal.create({
      nzTitle: this.modalTitle,
      nzContent: this.crudModal,
      nzFooter: null
    });
  }

  showEditModal(node: SpaceNode): void {
    this.isEditMode = true;
    this.modalTitle = '編輯節點';
    this.editNodeId = node.id;
    this.nodeForm.reset({
      title: node.title,
      parentKey: node.parentKey ?? ''
    });
    this.modal.create({
      nzTitle: this.modalTitle,
      nzContent: this.crudModal,
      nzFooter: null
    });
  }

  handleOk(modal: any): void {
    if (this.nodeForm.valid) {
      const formValue = this.nodeForm.value;
      if (this.isEditMode && this.editNodeId) {
        this.crud
          .updateNode(this.editNodeId, {
            title: formValue.title,
            parentKey: formValue.parentKey || null
          })
          .then(() => {
            this.message.success('節點更新成功');
            modal.destroy();
            this.refresh();
            this.dataChanged.emit();
          });
      } else {
        const now = new Date().toISOString();
        const key = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newNode: SpaceNode = {
          id: key,
          key,
          title: formValue.title,
          name: formValue.title,
          type: 'branch',
          status: 'active',
          order: 0,
          parentKey: formValue.parentKey || null,
          createdAt: now,
          updatedAt: now
        };
        this.crud.addNode(newNode).then(() => {
          this.message.success('節點新增成功');
          modal.destroy();
          this.refresh();
          this.dataChanged.emit();
        });
      }
    }
  }

  deleteNode(node: SpaceNode): void {
    this.crud.deleteNode(node.id).then(() => {
      this.message.success('刪除成功');
      this.refresh();
      this.dataChanged.emit();
    });
  }
}
