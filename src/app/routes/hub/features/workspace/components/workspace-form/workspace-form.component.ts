/**
 * 工作區表單元件
 * 
 * 功能：
 * - 創建新的工作區項目
 * - 編輯現有工作區項目
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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WorkspaceService } from '../../services/workspace.service';
import { WorkspaceItem, WorkspaceItemType, WorkspaceItemStatus } from '../../models/workspace.model';

@Component({
    selector: 'hub-workspace-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NzInputNumberModule,
        NzButtonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <nz-card [nzTitle]="isEditMode() ? '編輯工作區項目' : '創建工作區項目'">
      <form nz-form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
        <!-- 名稱 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>項目名稱</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請輸入項目名稱">
            <input 
              nz-input 
              formControlName="name" 
              placeholder="請輸入項目名稱">
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
              placeholder="請輸入項目描述">
            </textarea>
          </nz-form-control>
        </nz-form-item>

        <!-- 類型 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>類型</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請選擇項目類型">
            <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
              <nz-option nzValue="工地項目" nzLabel="工地項目"></nz-option>
              <nz-option nzValue="設備管理" nzLabel="設備管理"></nz-option>
              <nz-option nzValue="施工區域" nzLabel="施工區域"></nz-option>
              <nz-option nzValue="運輸任務" nzLabel="運輸任務"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <!-- 狀態 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>狀態</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請選擇項目狀態">
            <nz-select formControlName="status" nzPlaceHolder="請選擇狀態">
              <nz-option nzValue="pending" nzLabel="待開始"></nz-option>
              <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
              <nz-option nzValue="active" nzLabel="使用中"></nz-option>
              <nz-option nzValue="maintenance" nzLabel="維護中"></nz-option>
              <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>

        <!-- 負責人 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>負責人</nz-form-label>
          <nz-form-control [nzSpan]="18" nzErrorTip="請輸入負責人">
            <input 
              nz-input 
              formControlName="manager" 
              placeholder="請輸入負責人姓名">
          </nz-form-control>
        </nz-form-item>

        <!-- 進度 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">進度</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-input-number
              formControlName="progress"
              [nzMin]="0"
              [nzMax]="100"
              [nzStep]="1"
              nzPlaceHolder="請輸入進度百分比"
              style="width: 100%">
            </nz-input-number>
            <div class="form-help">進度百分比 (0-100)</div>
          </nz-form-control>
        </nz-form-item>

        <!-- 位置 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">位置</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input 
              nz-input 
              formControlName="location" 
              placeholder="請輸入項目位置">
          </nz-form-control>
        </nz-form-item>

        <!-- 開始日期 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">開始日期</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-date-picker
              formControlName="startDate"
              nzPlaceHolder="請選擇開始日期"
              style="width: 100%">
            </nz-date-picker>
          </nz-form-control>
        </nz-form-item>

        <!-- 結束日期 -->
        <nz-form-item>
          <nz-form-label [nzSpan]="6">結束日期</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <nz-date-picker
              formControlName="endDate"
              nzPlaceHolder="請選擇結束日期"
              style="width: 100%">
            </nz-date-picker>
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
              [disabled]="!workspaceForm.valid">
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
  `,
    styles: [`
    .form-help {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  `]
})
export class WorkspaceFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private workspaceService = inject(WorkspaceService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private message = inject(NzMessageService);

    // State management
    workspaceForm: FormGroup;
    submitting = signal(false);
    isEditMode = signal(false);
    workspaceId = signal<string | null>(null);

    constructor() {
        this.workspaceForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', [Validators.maxLength(500)]],
            type: ['工地項目', [Validators.required]],
            status: ['pending', [Validators.required]],
            manager: ['', [Validators.required, Validators.maxLength(50)]],
            progress: [0, [Validators.min(0), Validators.max(100)]],
            location: ['', [Validators.maxLength(200)]],
            startDate: [null],
            endDate: [null]
        });
    }

    ngOnInit() {
        // 檢查是否為編輯模式
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode.set(true);
            this.workspaceId.set(id);
            this.loadWorkspaceData(id);
        }
    }

    private async loadWorkspaceData(id: string) {
        try {
            this.workspaceService.getWorkspaceItemById(id).subscribe(item => {
                if (item) {
                    this.workspaceForm.patchValue({
                        name: item.name,
                        description: item.description || '',
                        type: item.type,
                        status: item.status,
                        manager: item.manager,
                        progress: item.progress,
                        location: item.location || '',
                        startDate: item.startDate || null,
                        endDate: item.endDate || null
                    });
                }
            });
        } catch (error) {
            console.error('載入工作區項目資料失敗:', error);
            this.message.error('載入資料失敗');
        }
    }

    async onSubmit() {
        if (this.workspaceForm.valid) {
            this.submitting.set(true);

            try {
                const formValue = this.workspaceForm.value;
                const workspaceData: Omit<WorkspaceItem, 'key'> = {
                    name: formValue.name,
                    description: formValue.description,
                    type: formValue.type as WorkspaceItemType,
                    status: formValue.status as WorkspaceItemStatus,
                    manager: formValue.manager,
                    progress: formValue.progress || 0,
                    location: formValue.location,
                    startDate: formValue.startDate,
                    endDate: formValue.endDate,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                if (this.isEditMode()) {
                    await this.workspaceService.updateWorkspaceItem(this.workspaceId()!, workspaceData);
                    this.message.success('工作區項目更新成功');
                } else {
                    await this.workspaceService.createWorkspaceItem(workspaceData);
                    this.message.success('工作區項目創建成功');
                }

                this.router.navigate(['/hub/workspace/list']);
            } catch (error) {
                console.error('操作失敗:', error);
                this.message.error(this.isEditMode() ? '更新失敗' : '創建失敗');
            } finally {
                this.submitting.set(false);
            }
        } else {
            // 標記所有欄位為已觸碰，顯示驗證錯誤
            Object.values(this.workspaceForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    onCancel() {
        this.router.navigate(['/hub/workspace/list']);
    }
}