/**
 * 工作區時間軸元件
 *
 * 功能：
 * - 提供工作區的時間軸視圖
 * - 支援事件管理和時間線展示
 * - 整合專案里程碑和活動記錄
 *
 * 主要特性：
 * - 時間軸視圖展示
 * - 事件新增、編輯、刪除功能
 * - 事件類型和狀態管理
 * - 時間線過濾和搜尋
 *
 * 事件類型：
 * - 專案：專案相關事件
 * - 任務：任務完成和更新
 * - 里程碑：重要節點達成
 * - 會議：會議安排和記錄
 * - 問題：問題報告和解決
 *
 * 事件狀態：
 * - 已完成：綠色標示
 * - 進行中：藍色標示
 * - 待處理：灰色標示
 * - 延遲：紅色標示
 *
 * 互動功能：
 * - 事件點擊查看詳情
 * - 事件新增和編輯
 * - 時間軸縮放和導航
 * - 事件狀態更新
 *
 * 路由：/workspace/timeline
 * 依賴：ng-zorro-antd/timeline、ng-zorro-antd/modal、Angular Reactive Forms
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'task' | 'milestone' | 'meeting' | 'issue';
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  date: Date;
  user: string;
  color?: string;
  icon?: string;
}

@Component({
  selector: 'app-workspace-timeline',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTimelineModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzAvatarModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <nz-card nzTitle="工作區時間線" [nzExtra]="extraTemplate">
      <ng-template #extraTemplate>
        <button nz-button nzType="primary" (click)="showAddEventModal()">
          <span nz-icon nzType="plus"></span>
          新增事件
        </button>
      </ng-template>

      <div class="timeline-container">
        <nz-timeline>
          <nz-timeline-item *ngFor="let event of timelineEvents" [nzColor]="getEventColor(event.status)" [nzDot]="getEventDot(event)">
            <ng-template #customDot>
              <span nz-icon [nzType]="getEventIcon(event.type)" [style.color]="getEventColor(event.status)"></span>
            </ng-template>

            <div class="timeline-content">
              <div class="timeline-header">
                <h4 class="timeline-title">{{ event.title }}</h4>
                <div class="timeline-meta">
                  <nz-tag [nzColor]="getStatusColor(event.status)">
                    {{ getStatusText(event.status) }}
                  </nz-tag>
                  <span class="timeline-date">{{ event.date | date: 'yyyy-MM-dd HH:mm' }}</span>
                </div>
              </div>

              <p class="timeline-description">{{ event.description }}</p>

              <div class="timeline-footer">
                <nz-avatar [nzSize]="24" nzText="{{ event.user.charAt(0) }}"></nz-avatar>
                <span class="timeline-user">{{ event.user }}</span>
                <div class="timeline-actions">
                  <button nz-button nzType="link" nzSize="small" (click)="editEvent(event)">
                    <span nz-icon nzType="edit"></span>
                  </button>
                  <button nz-button nzType="link" nzSize="small" nzDanger (click)="deleteEvent(event.id)">
                    <span nz-icon nzType="delete"></span>
                  </button>
                </div>
              </div>
            </div>
          </nz-timeline-item>
        </nz-timeline>
      </div>
    </nz-card>

    <!-- 新增/編輯事件模態框 -->
    <nz-modal
      [(nzVisible)]="isEventModalVisible"
      [nzTitle]="isEditing ? '編輯事件' : '新增事件'"
      (nzOnCancel)="handleEventModalCancel()"
      (nzOnOk)="handleEventModalOk()"
    >
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

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>事件類型</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-select formControlName="type" placeholder="請選擇事件類型">
                <nz-option nzValue="project" nzLabel="專案"></nz-option>
                <nz-option nzValue="task" nzLabel="任務"></nz-option>
                <nz-option nzValue="milestone" nzLabel="里程碑"></nz-option>
                <nz-option nzValue="meeting" nzLabel="會議"></nz-option>
                <nz-option nzValue="issue" nzLabel="問題"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>狀態</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-select formControlName="status" placeholder="請選擇狀態">
                <nz-option nzValue="pending" nzLabel="待處理"></nz-option>
                <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
                <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
                <nz-option nzValue="delayed" nzLabel="延遲"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>日期時間</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <nz-date-picker formControlName="date" nzShowTime nzFormat="yyyy-MM-dd HH:mm"></nz-date-picker>
            </nz-form-control>
          </nz-form-item>
        </div>

        <div nz-col nzSpan="12">
          <nz-form-item>
            <nz-form-label [nzSpan]="12" nzRequired>負責人</nz-form-label>
            <nz-form-control [nzSpan]="12">
              <input nz-input formControlName="user" placeholder="請輸入負責人" />
            </nz-form-control>
          </nz-form-item>
        </div>
      </form>
    </nz-modal>
  `,
  styles: [
    `
      .timeline-container {
        padding: 16px 0;
      }

      .timeline-content {
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
        color: #262626;
      }

      .timeline-meta {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .timeline-date {
        font-size: 12px;
        color: #999;
      }

      .timeline-description {
        margin: 8px 0;
        color: #666;
        line-height: 1.5;
      }

      .timeline-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }

      .timeline-user {
        font-size: 12px;
        color: #1890ff;
      }

      .timeline-actions {
        margin-left: auto;
      }

      .timeline-actions button {
        padding: 0 4px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceTimelineComponent {
  timelineEvents: TimelineEvent[] = [];
  isEventModalVisible = false;
  isEditing = false;
  editingEventId: string | null = null;
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      type: ['task', [Validators.required]],
      status: ['pending', [Validators.required]],
      date: [null, [Validators.required]],
      user: ['', [Validators.required]]
    });

    this.initializeSampleEvents();
  }

  private initializeSampleEvents(): void {
    const today = new Date();
    this.timelineEvents = [
      {
        id: '1',
        title: '專案啟動會議',
        description: '召開新專案啟動會議，討論專案目標和時間安排',
        type: 'meeting',
        status: 'completed',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7, 10, 0),
        user: '張三'
      },
      {
        id: '2',
        title: '需求分析完成',
        description: '完成用戶需求分析，制定詳細的功能規格',
        type: 'milestone',
        status: 'completed',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5, 14, 30),
        user: '李四'
      },
      {
        id: '3',
        title: 'UI設計開始',
        description: '開始進行用戶介面設計工作',
        type: 'task',
        status: 'in-progress',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3, 9, 0),
        user: '王五'
      },
      {
        id: '4',
        title: '發現技術問題',
        description: '在開發過程中發現資料庫性能問題',
        type: 'issue',
        status: 'pending',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 16, 0),
        user: '趙六'
      },
      {
        id: '5',
        title: '第一階段測試',
        description: '開始進行第一階段的功能測試',
        type: 'task',
        status: 'pending',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
        user: '錢七'
      }
    ];
  }

  getEventColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'orange';
      case 'delayed':
        return 'red';
      default:
        return 'gray';
    }
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'project':
        return 'rocket';
      case 'task':
        return 'check-circle';
      case 'milestone':
        return 'flag';
      case 'meeting':
        return 'team';
      case 'issue':
        return 'exclamation-circle';
      default:
        return 'info-circle';
    }
  }

  getEventDot(event: TimelineEvent): any {
    return event.icon ? 'customDot' : undefined;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      case 'pending':
        return 'orange';
      case 'delayed':
        return 'red';
      default:
        return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '進行中';
      case 'pending':
        return '待處理';
      case 'delayed':
        return '延遲';
      default:
        return '未知';
    }
  }

  showAddEventModal(): void {
    this.isEditing = false;
    this.editingEventId = null;
    this.isEventModalVisible = true;
    this.eventForm.reset({
      type: 'task',
      status: 'pending'
    });
  }

  editEvent(event: TimelineEvent): void {
    this.isEditing = true;
    this.editingEventId = event.id;
    this.isEventModalVisible = true;
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      type: event.type,
      status: event.status,
      date: event.date,
      user: event.user
    });
  }

  handleEventModalCancel(): void {
    this.isEventModalVisible = false;
    this.eventForm.reset();
  }

  handleEventModalOk(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      if (this.isEditing && this.editingEventId) {
        // 編輯現有事件
        const index = this.timelineEvents.findIndex(event => event.id === this.editingEventId);
        if (index !== -1) {
          this.timelineEvents[index] = {
            ...this.timelineEvents[index],
            ...formValue
          };
          this.message.success('事件更新成功');
        }
      } else {
        // 新增事件
        const newEvent: TimelineEvent = {
          id: Date.now().toString(),
          ...formValue
        };
        this.timelineEvents.push(newEvent);
        this.message.success('事件新增成功');
      }

      this.isEventModalVisible = false;
      this.eventForm.reset();
    } else {
      this.message.error('請填寫完整資訊');
    }
  }

  deleteEvent(eventId: string): void {
    this.timelineEvents = this.timelineEvents.filter(event => event.id !== eventId);
    this.message.success('事件刪除成功');
  }
}
