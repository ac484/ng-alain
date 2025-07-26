import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SettingsService } from '../../services';

@Component({
    selector: 'hub-settings-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        NzInputModule,
        NzButtonModule,
        NzListModule,
        NzTagModule,
        NzPopconfirmModule
    ],
    template: `
    <div class="settings-container">
      <h3>業主設定</h3>
      
      <div class="add-client">
        <nz-input-group nzCompact>
          <input 
            nz-input 
            [(ngModel)]="newClient" 
            placeholder="輸入新業主名稱"
            (keyup.enter)="addClient()"
            style="width: 300px;" />
          <button nz-button nzType="primary" (click)="addClient()">新增</button>
        </nz-input-group>
      </div>

      <nz-list [nzDataSource]="clients()" nzBordered>
        <ng-template #item let-client>
          <nz-list-item [nzActions]="[defaultAction, deleteAction]">
            <span>{{ client }}</span>
            @if (defaultClient() === client) {
              <nz-tag nzColor="green">預設</nz-tag>
            }
            
            <ng-template #defaultAction>
              @if (defaultClient() !== client) {
                <a (click)="setDefault(client)">設為預設</a>
              }
            </ng-template>
            
            <ng-template #deleteAction>
              <a nz-popconfirm 
                 nzPopconfirmTitle="確定刪除此業主？" 
                 (nzOnConfirm)="removeClient(client)"
                 nzDanger>
                刪除
              </a>
            </ng-template>
          </nz-list-item>
        </ng-template>
      </nz-list>
    </div>
  `,
    styles: [`
    .settings-container {
      padding: 24px;
    }
    .add-client {
      margin-bottom: 16px;
    }
  `]
})
export class SettingsListComponent implements OnInit {
    clients = signal<string[]>([]);
    defaultClient = signal<string>('');
    newClient = '';

    constructor(
        private settingsService: SettingsService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.loadSettings();
    }

    private async loadSettings() {
        try {
            const settings = await this.settingsService.getClientsSettings();
            this.clients.set(settings?.list || []);
            this.defaultClient.set(settings?.default || '');
        } catch (error) {
            this.message.error('載入設定失敗');
        }
    }

    async addClient() {
        const client = this.newClient.trim();
        if (!client || this.clients().includes(client)) return;

        const newClients = [...this.clients(), client];
        this.clients.set(newClients);
        this.newClient = '';

        await this.saveSettings();
    }

    async removeClient(client: string) {
        const newClients = this.clients().filter(c => c !== client);
        this.clients.set(newClients);

        if (this.defaultClient() === client) {
            this.defaultClient.set(newClients[0] || '');
        }

        await this.saveSettings();
    }

    async setDefault(client: string) {
        this.defaultClient.set(client);
        await this.saveSettings();
    }

    private async saveSettings() {
        try {
            await this.settingsService.setClientsSettings({
                list: this.clients(),
                default: this.defaultClient()
            });
            this.message.success('設定已保存');
        } catch (error) {
            this.message.error('保存失敗');
        }
    }
}