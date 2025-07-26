/**
 * 樹狀結構表單元件
 * 
 * 功能：
 * - 創建新的樹狀結構
 * - 編輯現有樹狀結構
 * - 表單驗證
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TreeService } from '../../services/tree.service';
import { TreeNode, TreeType, TreeStatus } from '../../models/tree.model';

@Component({
  selector: 'hub-tree-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-card [nzTitle]="isEditMode() ? '編輯樹狀結構' : '創建樹狀結構'">
      <form nz-form [formGroup]="treeForm" (ngSubmit)="onSubmit()">
        <!-- 名稱 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>名稱</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請輸入樹狀結構名稱">
            <input 
              nz-input 
              formControlName="name" 
              placeholder="請輸入樹狀結構名稱">
          </nz-form-control>
        </nz-form-item>

        <!-- 描述 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">描述</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <textarea 
              nz-input 
              formControlName="description" 
              rows="3"
              placeholder="請輸入樹狀結構描述">
            </textarea>
          </nz-form-control>
        </nz-form-item>

        <!-- 類型 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>類型</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請選擇樹狀結構類型">
            <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
              <nz-option nzValue="組織" nzLabel="組織"></nz-option>
              <nz-option nzValue="分類" nzLabel="分類"></nz-option>
              <nz-option nzValue="權限" nzLabel="權限"></nz-option>
              <nz-option nzValue="流程" nzLabel="流程"></nz-option>
              <nz-option nzValue="其他" nzLabel="其他"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <!-- 狀態 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">狀態</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-switch 
              formControlName="isActive"
              nzCheckedChildren="啟用"
              nzUnCheckedChildren="停用">
            </nz-switch>
          </nz-form-control>
        </nz-form-item>

        <!-- 父節點 (僅在有 parentId 參數時顯示) -->
        <nz-form-item *ngIf="parentId()">
          <nz-form-label [nzSpan]="6">父節點</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input 
              nz-input 
              [value]="parentNodeName()"
              readonly
              placeholder="父節點">
          </nz-form-control>
        </nz-form-item>

        <!-- 操作按鈕 -->
        <nz-form-item>
          <nz-form-control [nzOffset]="6" [nzSpan]="18">
            <button 
              nz-button 
              nzType="primary" 
              type="submit"
              [nzLoading]="submitting()"
              [disabled]="!treeForm.valid">
              {{ isEditMode() ? '更新' : '創建' }}
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
    </nz-card>
  `
})
export class TreeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private treeService = inject(TreeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private message = inject(NzMessageService);

  // State management
  treeForm: FormGroup;
  submitting = signal(false);
  isEditMode = signal(false);
  treeId = signal<string | null>(null);
  parentId = signal<string | null>(null);
  parentNodeName = signal<string>('');

  constructor() {
    this.treeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      type: ['組織', [Validators.required]],
      isActive: [true]
    });
  }

  ngOnInit() {
    // 檢查是否為編輯模式
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.treeId.set(id);
      this.loadTreeData(id);
    }

    // 檢查是否有父節點參數
    const parentId = this.route.snapshot.queryParamMap.get('parentId');
    if (parentId) {
      this.parentId.set(parentId);
      this.loadParentNodeName(parentId);
    }
  }

  private async loadTreeData(id: string) {
    try {
      this.treeService.getTreeById(id).subscribe(tree => {
        if (tree) {
          this.treeForm.patchValue({
            name: tree.name,
            description: tree.description || '',
            type: tree.type,
            isActive: tree.status === 'active'
          });
        }
      });
    } catch (error) {
      console.error('載入樹狀結構資料失敗:', error);
      this.message.error('載入資料失敗');
    }
  }

  private async loadParentNodeName(parentId: string) {
    try {
      this.treeService.getTreeById(parentId).subscribe(parent => {
        if (parent) {
          this.parentNodeName.set(parent.name);
        }
      });
    } catch (error) {
      console.error('載入父節點資料失敗:', error);
    }
  }

  async onSubmit() {
    if (this.treeForm.valid) {
      this.submitting.set(true);

      try {
        const formValue = this.treeForm.value;
        const treeData: Omit<TreeNode, 'key'> = {
          name: formValue.name,
          title: formValue.name, // 添加必需的 title 屬性
          description: formValue.description,
          type: formValue.type as TreeType,
          status: formValue.isActive ? 'active' : 'inactive' as TreeStatus,
          parentId: this.parentId() || undefined,
          level: this.parentId() ? 1 : 0, // 簡化的層級計算
          maxLevel: 0,
          nodeCount: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        if (this.isEditMode()) {
          await this.treeService.updateTree(this.treeId()!, treeData);
          this.message.success('樹狀結構更新成功');
        } else {
          await this.treeService.createTree(treeData);
          this.message.success('樹狀結構創建成功');
        }

        this.router.navigate(['/hub/tree/list']);
      } catch (error) {
        console.error('操作失敗:', error);
        this.message.error(this.isEditMode() ? '更新失敗' : '創建失敗');
      } finally {
        this.submitting.set(false);
      }
    } else {
      // 標記所有欄位為已觸碰，顯示驗證錯誤
      Object.values(this.treeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/hub/tree/list']);
  }
}