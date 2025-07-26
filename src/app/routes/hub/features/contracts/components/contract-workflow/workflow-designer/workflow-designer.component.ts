import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
    selector: 'hub-workflow-designer',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NzCardModule,
        NzAlertModule
    ],
    template: `
    <nz-card nzTitle="工作流程設計器">
      <nz-alert 
        nzType="info" 
        nzMessage="此功能正在開發中" 
        nzDescription="工作流程設計器將在未來版本中提供，敬請期待。"
        nzShowIcon>
      </nz-alert>
    </nz-card>
  `
})
export class WorkflowDesignerComponent {
    // 未來功能 - 工作流程設計器
}