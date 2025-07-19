import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-workspace-daily-log',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzTimelineModule, NzButtonModule, NzInputModule],
  template: `
    <nz-card nzTitle="工作日誌" [nzExtra]="extraTemplate">
      <nz-timeline>
        <nz-timeline-item *ngFor="let log of dailyLogs">
          <div class="log-item">
            <div class="log-time">{{ log.time }}</div>
            <div class="log-content">{{ log.content }}</div>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" nzSize="small">新增日誌</button>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
      }

      .log-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .log-time {
        font-size: 12px;
        color: #999;
      }

      .log-content {
        font-size: 14px;
        color: #333;
      }
    `
  ]
})
export class WorkspaceDailyLogComponent {
  dailyLogs = [
    { time: '09:00', content: '開始今日工作，檢查郵件和待辦事項' },
    { time: '10:30', content: '參加團隊會議，討論專案進度' },
    { time: '14:00', content: '完成功能開發，進行程式碼審查' },
    { time: '16:30', content: '撰寫技術文件，準備明日工作' },
    { time: '18:00', content: '結束今日工作，整理工作環境' }
  ];
}
