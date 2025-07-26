import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
    selector: 'hub-workflow-steps',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NzStepsModule,
        NzTagModule
    ],
    template: `
    <nz-steps [nzCurrent]="currentStep" nzSize="small">
      @for (step of steps; track step.name) {
        <nz-step 
          [nzTitle]="step.name"
          [nzStatus]="getStepStatus(step.status)">
          <ng-template #nzDescription>
            <nz-tag [nzColor]="getStatusColor(step.status)">
              {{ getStatusText(step.status) }}
            </nz-tag>
          </ng-template>
        </nz-step>
      }
    </nz-steps>
  `
})
export class WorkflowStepsComponent {
    @Input() steps: any[] = [];
    @Input() currentStep = 0;

    getStepStatus(status: string): 'wait' | 'process' | 'finish' | 'error' {
        const statusMap: Record<string, 'wait' | 'process' | 'finish' | 'error'> = {
            'waiting': 'wait',
            'processing': 'process',
            'done': 'finish',
            'rejected': 'error'
        };
        return statusMap[status] || 'wait';
    }

    getStatusColor(status: string): string {
        const colorMap: Record<string, string> = {
            'waiting': 'default',
            'processing': 'blue',
            'done': 'green',
            'rejected': 'red'
        };
        return colorMap[status] || 'default';
    }

    getStatusText(status: string): string {
        const textMap: Record<string, string> = {
            'waiting': '等待中',
            'processing': '處理中',
            'done': '已完成',
            'rejected': '已拒絕'
        };
        return textMap[status] || status;
    }
}