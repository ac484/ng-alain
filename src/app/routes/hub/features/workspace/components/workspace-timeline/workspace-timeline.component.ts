/**
 * 工作區時間線元件
 * 
 * 功能：
 * - 工地施工時間線展示
 * - 支援設備、安全、施工、運輸等事件類型
 * - 使用 ng-zorro-antd timeline 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FabComponent } from '../../../../shared/components/fab/fab.component';

interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'pending' | 'delayed';
    date: Date;
    operator: string;
    type: 'equipment' | 'safety' | 'construction' | 'transport';
    duration?: number; // 持續時間（分鐘）
    location?: string;
}

@Component({
    selector: 'hub-workspace-timeline',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzCardModule,
        NzTimelineModule,
        NzButtonModule,
        NzIconModule,
        NzTagModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NzSpaceModule,
        FabComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- FAB for creating new timeline event -->
    <hub-fab (onAction)="createEvent()"></hub-fab>

    <nz-card title="工地施工時間線" [nzExtra]="extraTemplate">
      <!-- 篩選器 -->
      <div class="filter-section">
        <nz-space>
          <nz-select 
            [(ngModel)]="selectedType"
            (ngModelChange)="onTypeFilter()"
            nzPlaceHolder="選擇類型"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
            <nz-option nzValue="safety" nzLabel="安全"></nz-option>
            <nz-option nzValue="construction" nzLabel="施工"></nz-option>
            <nz-option nzValue="transport" nzLabel="運輸"></nz-option>
          </nz-select>
          
          <nz-select 
            [(ngModel)]="selectedStatus"
            (ngModelChange)="onStatusFilter()"
            nzPlaceHolder="選擇狀態"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
            <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
            <nz-option nzValue="pending" nzLabel="待處理"></nz-option>
            <nz-option nzValue="delayed" nzLabel="延遲"></nz-option>
          </nz-select>
        </nz-space>
      </div>

      <nz-timeline [nzMode]="'left'">
        <nz-timeline-item 
          *ngFor="let event of filteredEvents()" 
          [nzColor]="getStatusColor(event.status)"
          [nzDot]="dotTemplate">
          
          <ng-template #dotTemplate>
            <span nz-icon [nzType]="getTypeIcon(event.type)" class="timeline-icon"></span>
          </ng-template>

          <div class="timeline-item">
            <div class="timeline-header">
              <h4 class="timeline-title">{{ event.title }}</h4>
              <div class="timeline-tags">
                <nz-tag [nzColor]="getTypeColor(event.type)">
                  {{ getTypeText(event.type) }}
                </nz-tag>
                <nz-tag [nzColor]="getStatusColor(event.status)">
                  {{ getStatusText(event.status) }}
                </nz-tag>
              </div>
            </div>
            
            <p class="timeline-description">{{ event.description }}</p>
            
            <div class="timeline-meta">
              <div class="timeline-info">
                <span class="timeline-operator">
                  <span nz-icon nzType="user"></span>
                  操作員：{{ event.operator }}
                </span>
                <span class="timeline-date">
                  <span nz-icon nzType="clock-circle"></span>
                  {{ event.date | date: 'MM-dd HH:mm' }}
                </span>
                <span *ngIf="event.duration" class="timeline-duration">
                  <span nz-icon nzType="hourglass"></span>
                  耗時：{{ event.duration }}分鐘
                </span>
                <span *ngIf="event.location" class="timeline-location">
                  <span nz-icon nzType="environment"></span>
                  位置：{{ event.location }}
                </span>
              </div>
              <div class="timeline-actions">
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  (click)="editEvent(event)">
                  <span nz-icon nzType="edit"></span>
                  編輯
                </button>
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  nzDanger
                  (click)="deleteEvent(event)">
                  <span nz-icon nzType="delete"></span>
                  刪除
                </button>
              </div>
            </div>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>

    <!-- 事件表單模態框 -->
    <nz-modal
      [nzVisible]="showEventModal()"
      [nzTitle]="editingEvent() ? '編輯時間線事件' : '新增時間線事件'"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="closeEventModal()">
      
      <div *nzModalContent>
        <form nz-form [formGroup]="eventForm" (ngSubmit)="saveEvent()">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件標題</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入事件標題">
              <input nz-input formControlName="title" placeholder="請輸入事件標題">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">事件描述</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <textarea
                nz-input
                formControlName="description"
                rows="3"
                placeholder="請輸入事件描述">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件類型</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇事件類型">
              <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
                <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
                <nz-option nzValue="safety" nzLabel="安全"></nz-option>
                <nz-option nzValue="construction" nzLabel="施工"></nz-option>
                <nz-option nzValue="transport" nzLabel="運輸"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件狀態</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇事件狀態">
              <nz-select formControlName="status" nzPlaceHolder="請選擇狀態">
                <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
                <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
                <nz-option nzValue="pending" nzLabel="待處理"></nz-option>
                <nz-option nzValue="delayed" nzLabel="延遲"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>操作員</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入操作員">
              <input nz-input formControlName="operator" placeholder="請輸入操作員姓名">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">位置</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="location" placeholder="請輸入位置">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">持續時間(分鐘)</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input type="number" formControlName="duration" placeholder="請輸入持續時間">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件時間</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇事件時間">
              <nz-date-picker
                formControlName="date"
                nzShowTime
                nzFormat="yyyy-MM-dd HH:mm"
                nzPlaceHolder="請選擇事件時間"
                style="width: 100%">
              </nz-date-picker>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="6" [nzSpan]="18">
              <button nz-button nzType="primary" type="submit" [disabled]="!eventForm.valid">
                {{ editingEvent() ? '更新' : '創建' }}
              </button>
              <button nz-button type="button" (click)="closeEventModal()" style="margin-left: 8px;">
                取消
              </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </nz-modal>

    <ng-template #extraTemplate>
      <nz-space>
        <button nz-button nzType="primary" (click)="createEvent()">
          <span nz-icon nzType="plus"></span>
          新增事件
        </button>
        <button nz-button nzType="default" (click)="refreshEvents()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
      </nz-space>
    </ng-template>
  `,
    styles: [`
    .filter-section {
      padding: 16px;
      background: #fafafa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    
    .timeline-item {
      margin-left: 16px;
    }
    
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .timeline-title {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    
    .timeline-tags {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .timeline-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    
    .timeline-meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    
    .timeline-info {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: #999;
    }
    
    .timeline-info > span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .timeline-actions {
      display: flex;
      gap: 8px;
    }
    
    .timeline-icon {
      color: white;
      font-size: 14px;
    }
    
    :host ::ng-deep .ant-timeline-item-head {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    :host ::ng-deep .ant-timeline-item-content {
      margin-left: 32px;
      padding-bottom: 24px;
    }
  `]
})
export class WorkspaceTimelineComponent implements OnInit {
    private message = inject(NzMessageService);
    private fb = inject(FormBuilder);

    // State management
    events = signal<TimelineEvent[]>([]);
    filteredEvents = signal<TimelineEvent[]>([]);
    loading = signal(false);
    showEventModal = signal(false);
    editingEvent = signal<TimelineEvent | null>(null);

    // Filter states
    selectedType: string | null = null;
    selectedStatus: string | null = null;

    // Form
    eventForm: FormGroup;

    constructor() {
        this.eventForm = this.fb.group({
            title: ['', [Validators.required]],
            description: [''],
            type: ['equipment', [Validators.required]],
            status: ['completed', [Validators.required]],
            operator: ['', [Validators.required]],
            location: [''],
            duration: [null],
            date: [new Date(), [Validators.required]]
        });
    }

    ngOnInit() {
        this.loadEvents();
    }

    private loadEvents() {
        this.loading.set(true);

        // 載入模擬時間線事件數據
        const mockEvents: TimelineEvent[] = [
            {
                id: '1',
                title: '起重機進場安裝',
                description: '200噸履帶式起重機進場，完成基礎安裝和安全檢查',
                status: 'completed',
                date: new Date(2024, 0, 15, 8, 0),
                operator: '王師傅',
                type: 'equipment',
                duration: 240,
                location: '工地A區'
            },
            {
                id: '2',
                title: '鋼筋籠吊裝作業',
                description: '主體結構鋼筋籠吊裝，重量約15噸，使用100噸汽車吊',
                status: 'in-progress',
                date: new Date(2024, 0, 20, 14, 30),
                operator: '李師傅',
                type: 'construction',
                duration: 180,
                location: '主體結構區'
            },
            {
                id: '3',
                title: '高空作業安全檢查',
                description: '20米高空作業平台安全檢查，確認防護措施到位',
                status: 'pending',
                date: new Date(2024, 0, 25, 9, 0),
                operator: '張公安',
                type: 'safety',
                location: '高空作業區'
            },
            {
                id: '4',
                title: '混凝土泵車進場',
                description: '60米臂長混凝土泵車進場，準備進行主體澆築',
                status: 'delayed',
                date: new Date(2024, 0, 28, 7, 0),
                operator: '陳師傅',
                type: 'transport',
                location: '工地入口'
            },
            {
                id: '5',
                title: '設備維護完成',
                description: '挖掘機和推土機例行維護檢查完成，設備狀態良好',
                status: 'completed',
                date: new Date(2024, 0, 12, 16, 30),
                operator: '劉師傅',
                type: 'equipment',
                duration: 120,
                location: '設備維護區'
            }
        ];

        // 按時間排序（最新的在前）
        mockEvents.sort((a, b) => b.date.getTime() - a.date.getTime());

        this.events.set(mockEvents);
        this.applyFilters();
        this.loading.set(false);
    }

    private applyFilters() {
        let filtered = this.events();

        if (this.selectedType) {
            filtered = filtered.filter(event => event.type === this.selectedType);
        }

        if (this.selectedStatus) {
            filtered = filtered.filter(event => event.status === this.selectedStatus);
        }

        this.filteredEvents.set(filtered);
    }

    onTypeFilter() {
        this.applyFilters();
    }

    onStatusFilter() {
        this.applyFilters();
    }

    createEvent() {
        this.editingEvent.set(null);
        this.eventForm.reset({
            title: '',
            description: '',
            type: 'equipment',
            status: 'completed',
            operator: '',
            location: '',
            duration: null,
            date: new Date()
        });
        this.showEventModal.set(true);
    }

    editEvent(event: TimelineEvent) {
        this.editingEvent.set(event);
        this.eventForm.patchValue({
            title: event.title,
            description: event.description,
            type: event.type,
            status: event.status,
            operator: event.operator,
            location: event.location || '',
            duration: event.duration || null,
            date: event.date
        });
        this.showEventModal.set(true);
    }

    deleteEvent(event: TimelineEvent) {
        const currentEvents = this.events();
        const updatedEvents = currentEvents.filter(e => e.id !== event.id);
        this.events.set(updatedEvents);
        this.applyFilters();
        this.message.success('時間線事件刪除成功');
    }

    saveEvent() {
        if (this.eventForm.valid) {
            const formValue = this.eventForm.value;
            const eventData: TimelineEvent = {
                id: this.editingEvent()?.id || Date.now().toString(),
                title: formValue.title,
                description: formValue.description,
                type: formValue.type,
                status: formValue.status,
                operator: formValue.operator,
                location: formValue.location,
                duration: formValue.duration,
                date: formValue.date
            };

            const currentEvents = this.events();
            if (this.editingEvent()) {
                // 更新現有事件
                const index = currentEvents.findIndex(e => e.id === this.editingEvent()!.id);
                if (index !== -1) {
                    currentEvents[index] = eventData;
                    this.events.set([...currentEvents]);
                }
                this.message.success('時間線事件更新成功');
            } else {
                // 新增事件
                this.events.set([eventData, ...currentEvents]);
                this.message.success('時間線事件創建成功');
            }

            // 重新排序並應用篩選
            const sortedEvents = this.events().sort((a, b) => b.date.getTime() - a.date.getTime());
            this.events.set(sortedEvents);
            this.applyFilters();
            this.closeEventModal();
        }
    }

    closeEventModal() {
        this.showEventModal.set(false);
        this.editingEvent.set(null);
    }

    refreshEvents() {
        this.loadEvents();
        this.message.success('時間線已重新載入');
    }

    // 工具方法
    getStatusColor(status: string): string {
        const colors: Record<string, string> = {
            completed: 'green',
            'in-progress': 'blue',
            pending: 'orange',
            delayed: 'red'
        };
        return colors[status] || 'gray';
    }

    getStatusText(status: string): string {
        const texts: Record<string, string> = {
            completed: '已完成',
            'in-progress': '進行中',
            pending: '待處理',
            delayed: '延遲'
        };
        return texts[status] || '未知';
    }

    getTypeColor(type: string): string {
        const colors: Record<string, string> = {
            equipment: 'purple',
            safety: 'red',
            construction: 'blue',
            transport: 'orange'
        };
        return colors[type] || 'default';
    }

    getTypeText(type: string): string {
        const texts: Record<string, string> = {
            equipment: '設備',
            safety: '安全',
            construction: '施工',
            transport: '運輸'
        };
        return texts[type] || '未知';
    }

    getTypeIcon(type: string): string {
        const icons: Record<string, string> = {
            equipment: 'tool',
            safety: 'safety',
            construction: 'build',
            transport: 'car'
        };
        return icons[type] || 'clock-circle';
    }
}