/**
 * 工作區日曆元件
 *
 * 本檔案依據 ng-alain 20 架構，使用 ng-zorro-antd 日曆元件
 * 提供工作區日曆功能，支援事件管理和日期導航
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'task' | 'reminder';
  description?: string;
}

@Component({
  selector: 'app-workspace-calendar',
  standalone: true,
  imports: [
    CommonModule,
    NzCalendarModule,
    NzCardModule,
    NzButtonModule,
    NzBadgeModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,

    ReactiveFormsModule
  ],
  template: `
    <nz-card nzTitle="工作區日曆" [nzExtra]="extraTemplate">
      <ng-template #extraTemplate>
        <button nz-button nzType="primary" (click)="showAddEventModal()">
          <span nz-icon nzType="plus"></span>
          新增事件
        </button>
      </ng-template>

      <nz-calendar [nzFullscreen]="false" (nzSelectChange)="onDateSelect($event)" (nzPanelChange)="onPanelChange($event)">
        <ul *nzDateCell="let date" class="events">
          <ng-container *ngFor="let event of getEventsForDate(date)">
            <li [class]="'event-' + event.type" (click)="viewEvent(event)">
              <nz-badge [nzStatus]="getEventStatus(event.type)" [nzText]="event.title"></nz-badge>
            </li>
          </ng-container>
        </ul>
      </nz-calendar>
    </nz-card>

    <!-- 新增事件模態框 -->
    <nz-modal [(nzVisible)]="isAddEventVisible" nzTitle="新增事件" (nzOnCancel)="handleAddEventCancel()" (nzOnOk)="handleAddEventOk()">
      <form nz-form [formGroup]="eventForm" nz-row [nzGutter]="16">
        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件標題</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input formControlName="title" placeholder="請輸入事件標題" />
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件日期</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <nz-date-picker formControlName="date" nzShowTime nzFormat="yyyy-MM-dd HH:mm"></nz-date-picker>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>事件類型</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <nz-select formControlName="type" placeholder="請選擇事件類型">
                <nz-option nzValue="meeting" nzLabel="會議"></nz-option>
                <nz-option nzValue="task" nzLabel="任務"></nz-option>
                <nz-option nzValue="reminder" nzLabel="提醒"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="24">
          <nz-form-item>
            <nz-form-label [nzSpan]="6">事件描述</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <textarea
                nz-input
                formControlName="description"
                [nzAutosize]="{ minRows: 3, maxRows: 5 }"
                placeholder="請輸入事件描述"
              ></textarea>
            </nz-form-control>
          </nz-form-item>
        </div>
      </form>
    </nz-modal>

    <!-- 查看事件模態框 -->
    <nz-modal [(nzVisible)]="isViewEventVisible" nzTitle="事件詳情" (nzOnCancel)="handleViewEventCancel()">
      <div *ngIf="selectedEvent">
        <p><strong>標題：</strong>{{ selectedEvent.title }}</p>
        <p><strong>日期：</strong>{{ selectedEvent.date | date: 'yyyy-MM-dd HH:mm' }}</p>
        <p><strong>類型：</strong>{{ getEventTypeText(selectedEvent.type) }}</p>
        <p *ngIf="selectedEvent.description"><strong>描述：</strong>{{ selectedEvent.description }}</p>
      </div>
    </nz-modal>
  `,
  styles: [
    `
      .events {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
      }

      .event-meeting .ant-badge-status-dot {
        background-color: #1890ff;
      }

      .event-task .ant-badge-status-dot {
        background-color: #52c41a;
      }

      .event-reminder .ant-badge-status-dot {
        background-color: #faad14;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceCalendarComponent {
  events: CalendarEvent[] = [];
  isAddEventVisible = false;
  isViewEventVisible = false;
  selectedEvent: CalendarEvent | null = null;
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      date: [null, [Validators.required]],
      type: ['meeting', [Validators.required]],
      description: ['']
    });

    // 初始化示例事件
    this.initializeSampleEvents();
  }

  private initializeSampleEvents(): void {
    const today = new Date();
    this.events = [
      {
        id: '1',
        title: '團隊會議',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        type: 'meeting',
        description: '討論本週工作進度'
      },
      {
        id: '2',
        title: '完成報告',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 30),
        type: 'task',
        description: '完成季度報告撰寫'
      },
      {
        id: '3',
        title: '客戶回訪提醒',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 0),
        type: 'reminder',
        description: '回訪重要客戶'
      }
    ];
  }

  onDateSelect(date: Date): void {
    console.log('選擇日期:', date);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log('面板變更:', change);
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(
      event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  }

  getEventStatus(type: string): 'success' | 'processing' | 'warning' | 'error' {
    switch (type) {
      case 'meeting':
        return 'processing';
      case 'task':
        return 'success';
      case 'reminder':
        return 'warning';
      default:
        return 'error';
    }
  }

  getEventTypeText(type: string): string {
    switch (type) {
      case 'meeting':
        return '會議';
      case 'task':
        return '任務';
      case 'reminder':
        return '提醒';
      default:
        return '未知';
    }
  }

  showAddEventModal(): void {
    this.isAddEventVisible = true;
  }

  handleAddEventCancel(): void {
    this.isAddEventVisible = false;
    this.eventForm.reset({ type: 'meeting' });
  }

  handleAddEventOk(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: formValue.title,
        date: formValue.date,
        type: formValue.type,
        description: formValue.description
      };

      this.events.push(newEvent);
      this.message.success('事件新增成功');
      this.isAddEventVisible = false;
      this.eventForm.reset({ type: 'meeting' });
    } else {
      this.message.error('請填寫完整資訊');
    }
  }

  viewEvent(event: CalendarEvent): void {
    this.selectedEvent = event;
    this.isViewEventVisible = true;
  }

  handleViewEventCancel(): void {
    this.isViewEventVisible = false;
    this.selectedEvent = null;
  }
}
