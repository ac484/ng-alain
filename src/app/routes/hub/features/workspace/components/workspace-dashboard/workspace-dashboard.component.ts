import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
    selector: 'hub-workspace-dashboard',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NzCardModule,
        NzStatisticModule
    ],
    template: `
    <div class="workspace-dashboard">
      <h2>工作區儀表板</h2>
      
      <div class="stats-grid">
        <nz-card>
          <nz-statistic 
            nzTitle="總合約數" 
            [nzValue]="0"
            nzSuffix="個">
          </nz-statistic>
        </nz-card>
        
        <nz-card>
          <nz-statistic 
            nzTitle="待處理請款" 
            [nzValue]="0"
            nzSuffix="筆">
          </nz-statistic>
        </nz-card>
        
        <nz-card>
          <nz-statistic 
            nzTitle="本月收入" 
            [nzValue]="0"
            nzPrefix="$">
          </nz-statistic>
        </nz-card>
      </div>
      
      <nz-card nzTitle="快速操作" style="margin-top: 16px;">
        <p>工作區功能開發中...</p>
      </nz-card>
    </div>
  `,
    styles: [`
    .workspace-dashboard {
      padding: 24px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
  `]
})
export class WorkspaceDashboardComponent { }