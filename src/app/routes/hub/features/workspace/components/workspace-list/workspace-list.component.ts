/**
 * 工作區列表元件
 *
 * 功能：
 * - 展示所有工作區項目的列表
 * - 支援工地項目、設備管理、施工區域、運輸任務等多種類型
 * - 提供編輯和查看操作
 * - 整合 hub 架構的 FAB 元件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FabComponent } from '../../../../shared/components/fab/fab.component';
import { WorkspaceService } from '../../services/workspace.service';
import { WorkspaceItem } from '../../models/workspace.model';

@Component({
  selector: 'hub-workspace-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzSpaceModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    FabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- FAB for creating new workspace item -->
    <hub-fab (onAction)="createWorkspaceItem()"></hub-fab>
    
    <nz-card title="工作區管理" [nzExtra]="extraTemplate">
      <!-- 篩選器 -->
      <div class="filter-section" style="margin-bottom: 16px;">
        <nz-space>
          <input 
            nz-input 
            placeholder="搜尋項目名稱..." 
            [(ngModel)]="searchKeyword"
            (ngModelChange)="onSearch()"
            style="width: 200px;">
          
          <nz-select 
            [(ngModel)]="selectedType"
            (ngModelChange)="onTypeFilter()"
            nzPlaceHolder="選擇類型"
            nzAllowClear
            style="width: 150px;">
            <nz-option nzValue="工地項目" nzLabel="工地項目"></nz-option>
            <nz-option nzValue="設備管理" nzLabel="設備管理"></nz-option>
            <nz-option nzValue="施工區域" nzLabel="施工區域"></nz-option>
            <nz-option nzValue="運輸任務" nzLabel="運輸任務"></nz-option>
          </nz-select>
          
          <nz-select 
            [(ngModel)]="selectedStatus"
            (ngModelChange)="onStatusFilter()"
            nzPlaceHolder="選擇狀態"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="in-progress" nzLabel="進行中"></nz-option>
            <nz-option nzValue="active" nzLabel="使用中"></nz-option>
            <nz-option nzValue="maintenance" nzLabel="維護中"></nz-option>
            <nz-option nzValue="completed" nzLabel="已完成"></nz-option>
            <nz-option nzValue="pending" nzLabel="待開始"></nz-option>
          </nz-select>
        </nz-space>
      </div>

      <nz-table 
        #workspaceTable 
        [nzData]="filteredWorkspaceItems()" 
        [nzPageSize]="10"
        [nzLoading]="loading()">
        <thead>
          <tr>
            <th>項目/設備名稱</th>
            <th>類型</th>
            <th>負責人</th>
            <th>狀態</th>
            <th>進度</th>
            <th>創建日期</th>
            <th nzWidth="180px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of workspaceTable.data">
            <td>
              <div class="item-info">
                <strong>{{ item.name }}</strong>
                <div *ngIf="item.description" class="item-description">
                  {{ item.description }}
                </div>
              </div>
            </td>
            <td>
              <nz-tag [nzColor]="getTypeColor(item.type)">{{ item.type }}</nz-tag>
            </td>
            <td>{{ item.manager }}</td>
            <td>
              <nz-tag [nzColor]="getStatusColor(item.status)">
                {{ getStatusText(item.status) }}
              </nz-tag>
            </td>
            <td>
              <div class="progress-info">
                {{ item.progress }}%
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    [style.width.%]="item.progress"
                    [style.background-color]="getProgressColor(item.progress)">
                  </div>
                </div>
              </div>
            </td>
            <td>{{ item.createdAt | date: 'yyyy-MM-dd HH:mm' }}</td>
            <td>
              <nz-space nzSize="small">
                <button 
                  nz-button 
                  nzType="primary" 
                  nzSize="small" 
                  (click)="editWorkspaceItem(item)"
                  title="編輯">
                  <span nz-icon nzType="edit"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  (click)="viewWorkspaceItem(item)"
                  title="查看詳情">
                  <span nz-icon nzType="eye"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  (click)="manageWorkspaceItem(item)"
                  title="管理">
                  <span nz-icon nzType="setting"></span>
                </button>
                <button 
                  nz-button 
                  nzType="default" 
                  nzSize="small" 
                  nzDanger
                  (click)="deleteWorkspaceItem(item)"
                  title="刪除">
                  <span nz-icon nzType="delete"></span>
                </button>
              </nz-space>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </nz-card>

    <ng-template #extraTemplate>
      <nz-space>
        <button 
          nz-button 
          nzType="default" 
          (click)="refreshWorkspaceItems()"
          [nzLoading]="loading()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
        <button 
          nz-button 
          nzType="primary" 
          (click)="exportWorkspaceItems()">
          <span nz-icon nzType="export"></span>
          匯出
        </button>
      </nz-space>
    </ng-template>
  `,
  styles: [`
    .filter-section {
      padding: 16px;
      background: #fafafa;
      border-radius: 6px;
    }
    
    .item-info {
      max-width: 200px;
    }
    
    .item-description {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    
    .progress-info {
      min-width: 80px;
    }
    
    .progress-bar {
      width: 60px;
      height: 6px;
      background: #f0f0f0;
      border-radius: 3px;
      margin-top: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
  `]
})
export class WorkspaceListComponent implements OnInit {
  private workspaceService = inject(WorkspaceService);
  private router = inject(Router);

  // State management with signals
  workspaceItems = signal<WorkspaceItem[]>([]);
  filteredWorkspaceItems = signal<WorkspaceItem[]>([]);
  loading = signal(false);

  // Filter states
  searchKeyword = '';
  selectedType: string | null = null;
  selectedStatus: string | null = null;

  ngOnInit() {
    this.loadWorkspaceItems();
  }

  private async loadWorkspaceItems() {
    this.loading.set(true);
    try {
      this.workspaceService.getAllWorkspaceItems().subscribe(items => {
        this.workspaceItems.set(items);
        this.applyFilters();
        this.loading.set(false);
      });
    } catch (error) {
      console.error('載入工作區項目失敗:', error);
      this.loading.set(false);
    }
  }

  private applyFilters() {
    let filtered = this.workspaceItems();

    // 關鍵字搜尋
    if (this.searchKeyword) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(this.searchKeyword.toLowerCase()))
      );
    }

    // 類型篩選
    if (this.selectedType) {
      filtered = filtered.filter(item => item.type === this.selectedType);
    }

    // 狀態篩選
    if (this.selectedStatus) {
      filtered = filtered.filter(item => item.status === this.selectedStatus);
    }

    this.filteredWorkspaceItems.set(filtered);
  }

  onSearch() {
    this.applyFilters();
  }

  onTypeFilter() {
    this.applyFilters();
  }

  onStatusFilter() {
    this.applyFilters();
  }

  getTypeColor(type: string): string {
    switch (type) {
      case '工地項目': return 'blue';
      case '設備管理': return 'purple';
      case '施工區域': return 'orange';
      case '運輸任務': return 'green';
      default: return 'default';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'in-progress': return 'green';
      case 'active': return 'blue';
      case 'maintenance': return 'orange';
      case 'completed': return 'cyan';
      case 'pending': return 'default';
      default: return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'in-progress': return '進行中';
      case 'active': return '使用中';
      case 'maintenance': return '維護中';
      case 'completed': return '已完成';
      case 'pending': return '待開始';
      default: return '未知';
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#52c41a';
    if (progress >= 60) return '#1890ff';
    if (progress >= 40) return '#faad14';
    return '#f5222d';
  }

  createWorkspaceItem(): void {
    this.router.navigate(['/hub/workspace/create']);
  }

  editWorkspaceItem(item: WorkspaceItem): void {
    this.router.navigate(['/hub/workspace/edit', item.key]);
  }

  viewWorkspaceItem(item: WorkspaceItem): void {
    // TODO: 實現查看詳情功能
    console.log('查看工作區項目:', item);
  }

  manageWorkspaceItem(item: WorkspaceItem): void {
    // TODO: 實現管理功能
    console.log('管理工作區項目:', item);
  }

  async deleteWorkspaceItem(item: WorkspaceItem): Promise<void> {
    try {
      await this.workspaceService.deleteWorkspaceItem(item.key!);
      await this.refreshWorkspaceItems();
    } catch (error) {
      console.error('刪除工作區項目失敗:', error);
    }
  }

  async refreshWorkspaceItems(): Promise<void> {
    await this.loadWorkspaceItems();
  }

  exportWorkspaceItems(): void {
    // 實現匯出功能
    console.log('匯出工作區項目');
  }
}