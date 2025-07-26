import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ClientSettingsComponent } from '../client-settings/client-settings.component';
import { WorkflowTemplatesComponent } from '../workflow-templates/workflow-templates.component';

@Component({
  selector: 'hub-settings-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzTabsModule,
    NzCardModule,
    ClientSettingsComponent,
    WorkflowTemplatesComponent
  ],
  template: `
    <div class="settings-page">
      <nz-tabset nzType="card">
        <nz-tab nzTitle="業主管理">
          <nz-card nzTitle="業主清單管理" [nzLoading]="isLoading()">
            <hub-client-settings></hub-client-settings>
          </nz-card>
        </nz-tab>

        <nz-tab nzTitle="流程模板">
          <nz-card nzTitle="工作流程模板管理">
            <hub-workflow-templates [clients]="clients()"></hub-workflow-templates>
          </nz-card>
        </nz-tab>
      </nz-tabset>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 24px;
    }
  `]
})
export class SettingsListComponent {
  isLoading = signal(false);
  clients = signal<string[]>([]);
}