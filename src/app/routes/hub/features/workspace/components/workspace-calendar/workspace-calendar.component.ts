/**
 * 工作區行事曆元件
 * 
 * 功能：
 * - 工地施工行事曆展示
 * - 支援設備、安全、施工、維護等事件類型
 * - 使用 ng-zorro-antd calendar 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../../services/workspace.service';

interface WorkspaceEvent {
    id: string;
    title: string;
    date: Date;
    type: 'construction' | 'equipment' | 'safety' | 'maintenance';
    priority: 'low' | 'medium' | 'high';
    description?: string;
}

@Component({
    selector: 'hub-workspace-calendar',
    standalone: true,
    imports: [
        CommonModule,
        NzCalendarModule,
        NzCardModule,
        NzBadgeModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <nz-card title="工作區行事曆" [nzExtra]="extraTemplate">
      <nz-calendar [nzFullscreen]="true">
        <ul *nzDateCell="let date" class="events">
          <ng-container *ngFor="let event of getEventsForDate(date)">
            <li [class]="'event-' + event.type" (click)="viewEvent(event)">
              <nz-badge 
                [nzStatus]="getEventStatus(event.type)" 
                [nzText]="event.title"
                class="event-badge">
              </nz-badge>
            </li>
          </ng-container>
        </ul>
      </nz-calendar>
    </nz-card>

    <!-- 新增事件模態框 -->
    <nz-modal
      [nzVisible]="showEventModal()"
      [nzTitle]="editingEvent() ? '編輯事件' : '新增事件'"
      [nzFooter]="null"
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
            <nz-form-label [nzSpan]="6" nzRequired>事件類型</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇事件類型">
              <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
                <nz-option nzValue="construction" nzLabel="施工"></nz-option>
                <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
                <nz-option nzValue="safety" nzLabel="安全"></nz-option>
                <nz-option nzValue="maintenance" nzLabel="維護"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>優先級</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇優先級">
              <nz-select formControlName="priority" nzPlaceHolder="請選擇優先級">
                <nz-option nzValue="low" nzLabel="低"></nz-option>
                <nz-option nzValue="medium" nzLabel="中"></nz-option>
                <nz-option nzValue="high" nzLabel="高"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>日期時間</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇日期時間">
              <nz-date-picker
                formControlName="date"
                nzShowTime
                nzFormat="yyyy-MM-dd HH:mm"
                nzPlaceHolder="請選擇日期時間"
                style="width: 100%">
              </nz-date-picker>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">描述</nz-form-label>
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
      <button nz-button nzType="primary" (click)="addEvent()">
        新增事件
      </button>
    </ng-template>
  `,
    styles: [`
    .events {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .events li {
      cursor: pointer;
      margin-bottom: 2px;
    }
    
    .event-badge {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
    }
    
    .event-construction .ant-badge-status-dot {
      background-color: #1890ff;
    }
    
    .event-equipment .ant-badge-status-dot {
      background-color: #722ed1;
    }
    
    .event-safety .ant-badge-status-dot {
      background-color: #f5222d;
    }
    
    .event-maintenance .ant-badge-status-dot {
      background-color: #fa8c16;
    }
  `]
})
export class WorkspaceCalendarComponent implements OnInit {
    private workspaceService = inject(WorkspaceService);
    private fb = inject(FormBuilder);

    // State management
    events = signal<WorkspaceEvent[]>([]);
    showEventModal = signal(false);
    editingEvent = signal<WorkspaceEvent | null>(null);
    eventForm: FormGroup;

    constructor() {
        this.eventForm = this.fb.group({
            title: ['', [Validators.required]],
            type: ['construction', [Validators.required]],
            priority: ['medium', [Validators.required]],
            date: [new Date(), [Validators.required]],
            description: ['']
        });
    }

    ngOnInit() {
        this.loadEvents();
    }

    private loadEvents() {
        // 載入模擬事件數據
        this.events.set([
            {
                id: '1',
                title: '主體結構施工開始',
                date: new Date(2024, 0, 15, 8, 0),
                type: 'construction',
                priority: 'high',
                description: '開始主體結構施工作業'
            },
            {
                id: '2',
                title: '起重機安全檢查',
                date: new Date(2024, 0, 20, 7, 30),
                type: 'safety',
                priority: 'high',
                description: '200噸履帶式起重機安全檢查'
            },
            {
                id: '3',
                title: '混凝土泵車維護',
                date: new Date(2024, 0, 25, 9, 0),
                type: 'maintenance',
                priority: 'medium',
                description: '60米混凝土泵車例行維護'
            },
            {
                id: '4',
                title: '鋼筋籠吊裝作業',
                date: new Date(2024, 0, 28, 14, 0),
                type: 'construction',
                priority: 'high',
                description: '主體結構鋼筋籠吊裝'
            }
        ]);
    }

    getEventsForDate(date: Date): WorkspaceEvent[] {
        return this.events().filter(
            event =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear()
        );
    }

    getEventStatus(type: string): 'success' | 'processing' | 'warning' | 'error' {
        const status: Record<string, 'success' | 'processing' | 'warning' | 'error'> = {
            construction: 'processing',
            equipment: 'success',
            safety: 'error',
            maintenance: 'warning'
        };
        return status[type] || 'warning';
    }

    addEvent() {
        this.editingEvent.set(null);
        this.eventForm.reset({
            title: '',
            type: 'construction',
            priority: 'medium',
            date: new Date(),
            description: ''
        });
        this.showEventModal.set(true);
    }

    viewEvent(event: WorkspaceEvent) {
        this.editingEvent.set(event);
        this.eventForm.patchValue({
            title: event.title,
            type: event.type,
            priority: event.priority,
            date: event.date,
            description: event.description || ''
        });
        this.showEventModal.set(true);
    }

    saveEvent() {
        if (this.eventForm.valid) {
            const formValue = this.eventForm.value;
            const eventData: WorkspaceEvent = {
                id: this.editingEvent()?.id || Date.now().toString(),
                title: formValue.title,
                type: formValue.type,
                priority: formValue.priority,
                date: formValue.date,
                description: formValue.description
            };

            const currentEvents = this.events();
            if (this.editingEvent()) {
                // 更新現有事件
                const index = currentEvents.findIndex(e => e.id === this.editingEvent()!.id);
                if (index !== -1) {
                    currentEvents[index] = eventData;
                    this.events.set([...currentEvents]);
                }
            } else {
                // 新增事件
                this.events.set([...currentEvents, eventData]);
            }

            this.closeEventModal();
        }
    }

    closeEventModal() {
        this.showEventModal.set(false);
        this.editingEvent.set(null);
    }
}