import { Component, OnInit, ChangeDetectionStrategy, signal, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractService } from '../../../contracts/services';

@Component({
  selector: 'hub-client-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzSelectModule,
    NzTagModule,
    NzPopconfirmModule,
    NzIconModule
  ],
  template: `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
        <input nz-input placeholder="新增業主" [value]="clientInput()" 
               (input)="updateClientInput($any($event.target).value)"
               (keyup.enter)="addClient()" style="width: 200px;" />
        <button nz-button nzType="primary" (click)="addClient()" [disabled]="!clientInput().trim()">
          <span nz-icon nzType="plus"></span>
          新增業主
        </button>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="margin-right: 8px;">預設業主：</label>
        <nz-select [ngModel]="defaultClient()" (ngModelChange)="setDefaultClient($event)" 
                   style="width: 200px;" nzPlaceHolder="請選擇預設業主">
          <nz-option *ngFor="let client of clients()" [nzValue]="client" [nzLabel]="client">
          </nz-option>
        </nz-select>
      </div>
    </div>

    <nz-table [nzData]="clients()" nzSize="small" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>業主名稱</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let client of clients()">
          <td>{{ client }}</td>
          <td>
            <nz-tag [nzColor]="client === defaultClient() ? 'blue' : 'default'">
              {{ client === defaultClient() ? '預設' : '一般' }}
            </nz-tag>
          </td>
          <td>
            <button nz-button nzType="link" nzSize="small" (click)="setDefaultClient(client)"
              [disabled]="client === defaultClient()">
              設為預設
            </button>
            <nz-popconfirm nzTitle="確定要刪除此業主嗎？" (nzOnConfirm)="removeClient(client)">
              <button nz-button nzType="link" nzSize="small" nzDanger nz-popconfirm>
                刪除
              </button>
            </nz-popconfirm>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class ClientSettingsComponent implements OnInit {
  @Output() clientsChanged = new EventEmitter<string[]>();

  private contractService = inject(ContractService);
  private message = inject(NzMessageService);

  clients = signal<string[]>([]);
  defaultClient = signal<string>('');
  clientInput = signal<string>('');

  ngOnInit(): void {
    this.loadClients();
  }

  async loadClients(): Promise<void> {
    try {
      const settings = await this.contractService.getClientsSettings();
      const clientsList = settings?.list || [];
      this.clients.set(clientsList);
      this.defaultClient.set(settings?.default || '');
      this.clientsChanged.emit(clientsList);
    } catch (error) {
      this.message.error('載入業主清單失敗');
    }
  }

  async addClient(): Promise<void> {
    const input = this.clientInput().trim();
    if (!input || this.clients().includes(input)) return;

    const newClients = [...this.clients(), input];
    this.clients.set(newClients);
    this.clientInput.set('');
    await this.saveClients();
  }

  async removeClient(client: string): Promise<void> {
    const newClients = this.clients().filter(c => c !== client);
    this.clients.set(newClients);

    if (this.defaultClient() === client) {
      this.defaultClient.set(newClients[0] || '');
    }

    await this.saveClients();
  }

  async setDefaultClient(client: string): Promise<void> {
    this.defaultClient.set(client);
    await this.saveClients();
  }

  private async saveClients(): Promise<void> {
    try {
      await this.contractService.setClientsSettings({
        list: this.clients(),
        default: this.defaultClient()
      });
      this.clientsChanged.emit(this.clients());
      this.message.success('業主設定已保存');
    } catch (error) {
      this.message.error('保存失敗');
    }
  }

  updateClientInput(value: string): void {
    this.clientInput.set(value);
  }
}