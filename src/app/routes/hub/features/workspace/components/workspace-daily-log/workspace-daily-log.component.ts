/**
 * 工作區日誌管理元件
 * 
 * 功能：
 * - 工地施工日誌記錄和展示
 * - 支援施工、設備、安全、管理等日誌類型
 * - 使用 ng-zorro-antd timeline 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FabComponent } from '../../../shared/components/fab/fab.component';

interface WorkspaceLog {
    id: string;
    time: string;
    content: string;
    type: 'construction' | 'equipment' | 'safety' | 'management';
    operator: string;
    status: 'normal' | 'warning' | 'error';
    date: Date;
}

@Component({
    selector: 'hub-workspace-daily-log',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzCardModule,
        NzTimelineModule,
        NzButtonModule,
        NzInputModule,
        NzTagModule,
        NzModalModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        FabComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- FAB for creating new log -->
    <hub-fab (onAction)="createLog()"></hub-fab>

    <nz-card title="工地施工日誌" [nzExtra]="extraTemplate">
      <!-- 日期篩選 -->
      <div class="filter-section">
        <nz-space>
          <nz-date-picker
            [(ngModel)]="selectedDate"
            (ngModelChange)="onDateFilter()"
            nzPlaceHolder="選擇日期"
            style="width: 150px;">
          </nz-date-picker>
          
          <nz-select 
            [(ngModel)]="selectedType"
            (ngModelChange)="onTypeFilter()"
            nzPlaceHolder="選擇類型"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="construction" nzLabel="施工"></nz-option>
            <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
            <nz-option nzValue="safety" nzLabel="安全"></nz-option>
            <nz-option nzValue="management" nzLabel="管理"></nz-option>
          </nz-select>
        </nz-space>
      </div>

      <nz-timeline>
        <nz-timeline-item 
          *ngFor="let log of filteredLogs()" 
          [nzColor]="getStatusColor(log.status)">
          <div class="log-item">
            <div class="log-header">
              <span class="log-time">{{ log.time }}</span>
              <nz-tag [nzColor]="getTypeColor(log.type)">
                {{ getTypeText(log.type) }}
              </nz-tag>
              <nz-tag [nzColor]="getStatusColor(log.status)">
                {{ getStatusText(log.status) }}
              </nz-tag>
            </div>
            <div class="log-content">{{ log.content }}</div>
            <div class="log-operator">操作員：{{ log.operator }}</div>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>

    <!-- 新增日誌模態框 -->
    <nz-modal
      [nzVisible]="showLogModal()"
      nzTitle="新增日誌"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="closeLogModal()">
      
      <div *nzModalContent>
        <form nz-form [formGroup]="logForm" (ngSubmit)="saveLog()">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>日誌類型</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇日誌類型">
              <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
                <nz-option nzValue="construction" nzLabel="施工"></nz-option>
                <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
                <nz-option nzValue="safety" nzLabel="安全"></nz-option>
                <nz-option nzValue="management" nzLabel="管理"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>日誌內容</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入日誌內容">
              <textarea
                nz-input
                formControlName="content"
                rows="4"
                placeholder="請輸入詳細的日誌內容">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>操作員</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入操作員">
              <input nz-input formControlName="operator" placeholder="請輸入操作員姓名">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>狀態</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇狀態">
              <nz-select formControlName="status" nzPlaceHolder="請選擇狀態">
                <nz-option nzValue="normal" nzLabel="正常"></nz-option>
                <nz-option nzValue="warning" nzLabel="警告"></nz-option>
                <nz-option nzValue="error" nzLabel="錯誤"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>時間</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇時間">
              <nz-date-picker
                formControlName="datetime"
                nzShowTime
                nzFormat="yyyy-MM-dd HH:mm"
                nzPlaceHolder="請選擇日期時間"
                style="width: 100%">
              </nz-date-picker>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="6" [nzSpan]="18">
              <button nz-button nzType="primary" type="submit" [disabled]="!logForm.valid">
                創建日誌
              </button>
              <button nz-button type="button" (click)="closeLogModal()" style="margin-left: 8px;">
                取消
              </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </nz-modal>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" (click)="createLog()">
        新增日誌
      </button>
    </ng-template>
  `,
    styles: [`
    .filter-section {
      padding: 16px;
      background: #fafafa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    
    .log-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .log-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .log-time {
      font-size: 12px;
      color: #999;
      font-weight: 500;
      min-width: 60px;
    }

    .log-content {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      padding: 8px 0;
    }

    .log-operator {
      font-size: 12px;
      color: #666;
    }
  `]
})
export class WorkspaceDailyLogComponent implements OnInit {
    private message = inject(NzMessageService);
    private fb = inject(FormBuilder);

    // State management
    dailyLogs = signal<WorkspaceLog[]>([]);
    filteredLogs = signal<WorkspaceLog[]>([]);
    showLogModal = signal(false);

    // Filter states
    selectedDate: Date | null = null;
    selectedType: string | null = null;

    // Form
    logForm: FormGroup;

    constructor() {
        this.logForm = this.fb.group({
            type: ['construction', [Validators.required]],
            content: ['', [Validators.required]],
            operator: ['', [Validators.required]],
            status: ['normal', [Validators.required]],
            datetime: [new Date(), [Validators.required]]
        });
    }

    ngOnInit() {
        this.loadLogs();
    }

    private loadLogs() {
        const mockLogs: WorkspaceLog[] = [
            {
                id: '1',
                time: '08:00',
                content: '工地開工，進行安全晨會，確認今日施工計劃和安全注意事項',
                type: 'management',
                operator: '張負責人',
                status: 'normal',
                date: new Date()
            },
            {
                id: '2',
                time: '08:30',
                content: '200噸履帶式起重機開機檢查，制動系統、鋼絲繩、安全裝置正常',
                type: 'equipment',
                operator: '王師傅',
                status: 'normal',
                date: new Date()
            },
            {
                id: '3',
                time: '09:00',
                content: '開始主體結構鋼筋籠吊裝作業，重量約15噸，使用100噸汽車吊配合',
                type: 'construction',
                operator: '李師傅',
                status: 'normal',
                date: new Date()
            },
            {
                id: '4',
                time: '14:00',
                content: '發現鋼筋籠吊裝時重心偏移，立即停止作業進行調整',
                type: 'safety',
                operator: '李師傅',
                status: 'warning',
                date: new Date()
            }
        ];

        this.dailyLogs.set(mockLogs);
        this.applyFilters();
    }

    private applyFilters() {
        let filtered = this.dailyLogs();

        if (this.selectedDate) {
            const selectedDateStr = this.selectedDate.toDateString();
            filtered = filtered.filter(log => log.date.toDateString() === selectedDateStr);
        }

        if (this.selectedType) {
            filtered = filtered.filter(log => log.type === this.selectedType);
        }

        this.filteredLogs.set(filtered);
    }

    onDateFilter() {
        this.applyFilters();
    }

    onTypeFilter() {
        this.applyFilters();
    }

    createLog() {
        this.logForm.reset({
            type: 'construction',
            content: '',
            operator: '',
            status: 'normal',
            datetime: new Date()
        });
        this.showLogModal.set(true);
    }

    saveLog() {
        if (this.logForm.valid) {
            const formValue = this.logForm.value;
            const logData: WorkspaceLog = {
                id: Date.now().toString(),
                time: formValue.datetime.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
                content: formValue.content,
                type: formValue.type,
                operator: formValue.operator,
                status: formValue.status,
                date: formValue.datetime
            };

            const currentLogs = this.dailyLogs();
            this.dailyLogs.set([logData, ...currentLogs]);
            this.applyFilters();
            this.closeLogModal();
            this.message.success('日誌創建成功');
        }
    }

    closeLogModal() {
        this.showLogModal.set(false);
    }

    getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            normal: 'green',
            warning: 'orange',
            error: 'red'
        };
        return colors[status] || 'blue';
    }

    getStatusText(status: string): string {
        const texts: Record<string, string> = {
            normal: '正常',
            warning: '警告',
            error: '錯誤'
        };
        return texts[status] || '未知';
    }

    getTypeColor(type: string): string {
        const colors: Record<string, string> = {
            construction: 'blue',
            equipment: 'purple',
            safety: 'red',
            management: 'green'
        };
        return colors[type] || 'default';
    }

    getTypeText(type: string): string {
        const texts: Record<string, string> = {
            construction: '施工',
            equipment: '設備',
            safety: '安全',
            management: '管理'
        };
        return texts[type] || '未知';
    }
}