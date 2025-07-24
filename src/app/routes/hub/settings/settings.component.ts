import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HubCrudService } from '../fire-crud/hub-crud.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hub-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NzInputModule, NzButtonModule]
})
export class HubSettingsComponent implements OnInit {
  clients: string[] = [];
  defaultClient: string = '';
  clientInput = '';
  isLoading = false;
  private hubCrud = inject(HubCrudService);

  ngOnInit(): void {
    this.loadClients();
  }

  async loadClients() {
    this.isLoading = true;
    const settings = await this.hubCrud.getClientsSettings();
    this.clients = settings?.list || [];
    this.defaultClient = settings?.default || '';
    this.isLoading = false;
  }

  async addClient() {
    if (!this.clientInput.trim() || this.clients.includes(this.clientInput.trim())) return;
    this.clients = [...this.clients, this.clientInput.trim()];
    this.clientInput = '';
    await this.saveClients();
  }

  async removeClient(client: string) {
    this.clients = this.clients.filter(c => c !== client);
    if (this.defaultClient === client) {
      this.defaultClient = this.clients[0] || '';
    }
    await this.saveClients();
  }

  async setDefaultClient(client: string) {
    this.defaultClient = client;
    await this.saveClients();
  }

  async saveClients() {
    await this.hubCrud.setClientsSettings({ list: this.clients, default: this.defaultClient });
  }
}
