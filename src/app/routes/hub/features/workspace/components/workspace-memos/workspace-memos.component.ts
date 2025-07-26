/**
 * 工作區備忘錄管理元件
 * 
 * 功能：
 * - 工地備忘錄的完整管理
 * - 支援安全、設備、施工、緊急等備忘錄類型
 * - 使用 ng-zorro-antd list 和 modal 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FabComponent } from '../../../../shared/components/fab/fab.component';

interface WorkspaceMemo {
    id: string;
    title: string;
    content: string;
    type: 'safety' | 'equipment' | 'construction' | 'emergency';
    priority: 'low' | 'medium' | 'high';
    date: string;
    createdAt: Date;
    updatedAt: Date;
}

@Component({
    selector: 'hub-workspace-memos',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzCardModule,
        NzButtonModule,
        NzInputModule,
        NzListModule,
        NzTagModule,
        NzModalModule,
        NzFormModule,
        NzSelectModule,
        NzIconModule,
        NzPopconfirmModule,
        NzSpaceModule,
        FabComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- FAB for creating new memo -->
    <hub-fab (onAction)="createMemo()"></hub-fab>

    <nz-card title="工地備忘錄" [nzExtra]="extraTemplate">
      <!-- 篩選器 -->
      <div class="filter-section">
        <nz-space>
          <input 
            nz-input 
            placeholder="搜尋備忘錄..." 
            [(ngModel)]="searchKeyword"
            (ngModelChange)="onSearch()"
            style="width: 200px;">
          
          <nz-select 
            [(ngModel)]="selectedType"
            (ngModelChange)="onTypeFilter()"
            nzPlaceHolder="選擇類型"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="safety" nzLabel="安全"></nz-option>
            <nz-option nzValue="equipment" nzLabel="設備"></nz-option>
            <nz-option nzValue="construction" nzLabel="施工"></nz-option>
            <nz-option nzValue="emergency" nzLabel="緊急"></nz-option>
          </nz-select>
          
          <nz-select 
            [(ngModel)]="selectedPriority"
            (ngModelChange)="onPriorityFilter()"
            nzPlaceHolder="選擇優先級"
            nzAllowClear
            style="width: 120px;">
            <nz-option nzValue="high" nzLabel="高"></nz-option>
            <nz-option nzValue="medium" nzLabel="中"></nz-option>
            <nz-option nzValue="low" nzLabel="低"></nz-option>
          </nz-select>
        </nz-space>
      </div>

      <nz-list [nzDataSource]="filteredMemos()" [nzRenderItem]="memoTemplate" [nzLoading]="loading()">
        <ng-template #memoTemplate let-memo>
          <nz-list-item [nzActions]="[editAction, deleteAction]">
            <nz-list-item-meta>
              <nz-list-item-meta-title>
                <div class="memo-header">
                  <span class="memo-title">{{ memo.title }}</span>
                  <div class="memo-tags">
                    <nz-tag [nzColor]="getTypeColor(memo.type)">
                      <span nz-icon [nzType]="getTypeIcon(memo.type)"></span>
                      {{ getTypeText(memo.type) }}
                    </nz-tag>
                    <nz-tag [nzColor]="getPriorityColor(memo.priority)">
                      {{ getPriorityText(memo.priority) }}
                    </nz-tag>
                  </div>
                </div>
              </nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <div class="memo-content">{{ memo.content }}</div>
                <div class="memo-meta">
                  <span class="memo-date">
                    <span nz-icon nzType="calendar"></span>
                    {{ memo.date }}
                  </span>
                  <span class="memo-updated">
                    更新於 {{ memo.updatedAt | date: 'MM-dd HH:mm' }}
                  </span>
                </div>
              </nz-list-item-meta-description>
            </nz-list-item-meta>

            <!-- 操作按鈕模板 -->
            <ng-template #editAction>
              <button 
                nz-button 
                nzType="link" 
                nzSize="small"
                (click)="editMemo(memo)"
                title="編輯備忘錄">
                <span nz-icon nzType="edit"></span>
                編輯
              </button>
            </ng-template>

            <ng-template #deleteAction>
              <nz-popconfirm
                nzTitle="確定要刪除這個備忘錄嗎？"
                nzOkText="確定"
                nzCancelText="取消"
                (nzOnConfirm)="deleteMemo(memo)">
                <button 
                  nz-button 
                  nzType="link" 
                  nzSize="small"
                  nzDanger
                  nz-popconfirm
                  title="刪除備忘錄">
                  <span nz-icon nzType="delete"></span>
                  刪除
                </button>
              </nz-popconfirm>
            </ng-template>
          </nz-list-item>
        </ng-template>
      </nz-list>
    </nz-card>

    <!-- 備忘錄表單模態框 -->
    <nz-modal
      [nzVisible]="showMemoModal()"
      [nzTitle]="editingMemo() ? '編輯備忘錄' : '新增備忘錄'"
      [nzFooter]="null"
      [nzWidth]="600"
      (nzOnCancel)="closeMemoModal()">
      
      <div *nzModalContent>
        <form nz-form [formGroup]="memoForm" (ngSubmit)="saveMemo()">
          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>備忘錄標題</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入備忘錄標題">
              <input nz-input formControlName="title" placeholder="請輸入備忘錄標題">
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>備忘錄類型</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇備忘錄類型">
              <nz-select formControlName="type" nzPlaceHolder="請選擇類型">
                <nz-option nzValue="safety" nzLabel="安全提醒"></nz-option>
                <nz-option nzValue="equipment" nzLabel="設備維護"></nz-option>
                <nz-option nzValue="construction" nzLabel="施工注意"></nz-option>
                <nz-option nzValue="emergency" nzLabel="緊急事項"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>優先級</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請選擇優先級">
              <nz-select formControlName="priority" nzPlaceHolder="請選擇優先級">
                <nz-option nzValue="high" nzLabel="高優先級"></nz-option>
                <nz-option nzValue="medium" nzLabel="中優先級"></nz-option>
                <nz-option nzValue="low" nzLabel="低優先級"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6" nzRequired>備忘錄內容</nz-form-label>
            <nz-form-control [nzSpan]="18" nzErrorTip="請輸入備忘錄內容">
              <textarea
                nz-input
                formControlName="content"
                rows="5"
                placeholder="請輸入詳細的備忘錄內容...">
              </textarea>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-control [nzOffset]="6" [nzSpan]="18">
              <button nz-button nzType="primary" type="submit" [disabled]="!memoForm.valid">
                {{ editingMemo() ? '更新' : '創建' }}
              </button>
              <button nz-button type="button" (click)="closeMemoModal()" style="margin-left: 8px;">
                取消
              </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </nz-modal>

    <ng-template #extraTemplate>
      <nz-space>
        <button nz-button nzType="primary" (click)="createMemo()">
          <span nz-icon nzType="plus"></span>
          新增備忘錄
        </button>
        <button nz-button nzType="default" (click)="refreshMemos()">
          <span nz-icon nzType="reload"></span>
          重新整理
        </button>
      </nz-space>
    </ng-template>
  `,
    styles: [`
    .filter-section {
      padding: 16px;
      background: #fafafa;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    
    .memo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .memo-title {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    
    .memo-tags {
      display: flex;
      gap: 8px;
    }
    
    .memo-content {
      color: #666;
      line-height: 1.6;
      margin-bottom: 12px;
      white-space: pre-wrap;
    }
    
    .memo-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #999;
    }
    
    .memo-date {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .memo-updated {
      font-style: italic;
    }
    
    :host ::ng-deep .ant-list-item {
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    :host ::ng-deep .ant-list-item:hover {
      background-color: #fafafa;
      border-radius: 6px;
      padding: 16px;
      margin: 0 -16px;
    }
    
    :host ::ng-deep .ant-list-item-meta-title {
      margin-bottom: 8px;
    }
    
    :host ::ng-deep .ant-list-item-action {
      margin-left: 16px;
    }
  `]
})
export class WorkspaceMemosComponent implements OnInit {
    private message = inject(NzMessageService);
    private fb = inject(FormBuilder);

    // State management
    memos = signal<WorkspaceMemo[]>([]);
    filteredMemos = signal<WorkspaceMemo[]>([]);
    loading = signal(false);
    showMemoModal = signal(false);
    editingMemo = signal<WorkspaceMemo | null>(null);

    // Filter states
    searchKeyword = '';
    selectedType: string | null = null;
    selectedPriority: string | null = null;

    // Form
    memoForm: FormGroup;

    constructor() {
        this.memoForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['safety', [Validators.required]],
            priority: ['medium', [Validators.required]],
            content: ['', [Validators.required, Validators.maxLength(1000)]]
        });
    }

    ngOnInit() {
        this.loadMemos();
    }

    private loadMemos() {
        this.loading.set(true);

        // 載入模擬備忘錄數據
        const mockMemos: WorkspaceMemo[] = [
            {
                id: '1',
                title: '起重機安全檢查提醒',
                content: '每日開工前必須檢查起重機制動系統、鋼絲繩磨損情況和安全裝置。\n\n檢查項目：\n1. 制動系統功能測試\n2. 鋼絲繩磨損檢查\n3. 安全裝置確認\n4. 操作員證照檢查',
                type: 'safety',
                priority: 'high',
                date: '2024-01-25',
                createdAt: new Date('2024-01-25'),
                updatedAt: new Date('2024-01-25')
            },
            {
                id: '2',
                title: '高空作業防護要求',
                content: '20米以上高空作業必須配戴安全帶、安全帽，設置防護網。\n\n安全要求：\n- 安全帶必須符合國家標準\n- 防護網設置高度不低於1.2米\n- 作業前進行安全教育\n- 天候不佳時禁止高空作業',
                type: 'safety',
                priority: 'high',
                date: '2024-01-24',
                createdAt: new Date('2024-01-24'),
                updatedAt: new Date('2024-01-24')
            },
            {
                id: '3',
                title: '混凝土泵車維護記錄',
                content: '60米泵車液壓系統檢查完成，下次維護日期：2024-02-15\n\n維護內容：\n- 液壓油更換\n- 臂架潤滑\n- 管路檢查\n- 電氣系統測試',
                type: 'equipment',
                priority: 'medium',
                date: '2024-01-23',
                createdAt: new Date('2024-01-23'),
                updatedAt: new Date('2024-01-23')
            },
            {
                id: '4',
                title: '鋼筋籠吊裝注意事項',
                content: '15噸鋼筋籠吊裝時注意重心平衡，使用4點吊裝確保安全。\n\n操作要點：\n- 確認吊點位置\n- 檢查吊具完整性\n- 控制吊裝速度\n- 設置警戒區域',
                type: 'construction',
                priority: 'high',
                date: '2024-01-22',
                createdAt: new Date('2024-01-22'),
                updatedAt: new Date('2024-01-22')
            },
            {
                id: '5',
                title: '緊急聯絡電話',
                content: '工地負責人：張師傅 0912-345-678\n安全主管：李公安 0923-456-789\n醫療急救：119\n消防報警：119\n\n緊急集合點：工地辦公室前空地',
                type: 'emergency',
                priority: 'high',
                date: '2024-01-21',
                createdAt: new Date('2024-01-21'),
                updatedAt: new Date('2024-01-21')
            },
            {
                id: '6',
                title: '噪音控制要求',
                content: '夜間施工需控制噪音在60分貝以下，避免影響周邊居民。\n\n控制措施：\n- 使用低噪音設備\n- 設置隔音屏障\n- 限制夜間作業時間\n- 定期噪音監測',
                type: 'construction',
                priority: 'medium',
                date: '2024-01-20',
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-01-20')
            }
        ];

        this.memos.set(mockMemos);
        this.applyFilters();
        this.loading.set(false);
    }

    private applyFilters() {
        let filtered = this.memos();

        // 關鍵字搜尋
        if (this.searchKeyword) {
            const keyword = this.searchKeyword.toLowerCase();
            filtered = filtered.filter(memo =>
                memo.title.toLowerCase().includes(keyword) ||
                memo.content.toLowerCase().includes(keyword)
            );
        }

        // 類型篩選
        if (this.selectedType) {
            filtered = filtered.filter(memo => memo.type === this.selectedType);
        }

        // 優先級篩選
        if (this.selectedPriority) {
            filtered = filtered.filter(memo => memo.priority === this.selectedPriority);
        }

        this.filteredMemos.set(filtered);
    }

    onSearch() {
        this.applyFilters();
    }

    onTypeFilter() {
        this.applyFilters();
    }

    onPriorityFilter() {
        this.applyFilters();
    }

    createMemo() {
        this.editingMemo.set(null);
        this.memoForm.reset({
            title: '',
            type: 'safety',
            priority: 'medium',
            content: ''
        });
        this.showMemoModal.set(true);
    }

    editMemo(memo: WorkspaceMemo) {
        this.editingMemo.set(memo);
        this.memoForm.patchValue({
            title: memo.title,
            type: memo.type,
            priority: memo.priority,
            content: memo.content
        });
        this.showMemoModal.set(true);
    }

    deleteMemo(memo: WorkspaceMemo) {
        const currentMemos = this.memos();
        const updatedMemos = currentMemos.filter(m => m.id !== memo.id);
        this.memos.set(updatedMemos);
        this.applyFilters();
        this.message.success('備忘錄刪除成功');
    }

    saveMemo() {
        if (this.memoForm.valid) {
            const formValue = this.memoForm.value;
            const now = new Date();
            const memoData: WorkspaceMemo = {
                id: this.editingMemo()?.id || Date.now().toString(),
                title: formValue.title,
                content: formValue.content,
                type: formValue.type,
                priority: formValue.priority,
                date: now.toISOString().split('T')[0],
                createdAt: this.editingMemo()?.createdAt || now,
                updatedAt: now
            };

            const currentMemos = this.memos();
            if (this.editingMemo()) {
                // 更新現有備忘錄
                const index = currentMemos.findIndex(m => m.id === this.editingMemo()!.id);
                if (index !== -1) {
                    currentMemos[index] = memoData;
                    this.memos.set([...currentMemos]);
                }
                this.message.success('備忘錄更新成功');
            } else {
                // 新增備忘錄
                this.memos.set([memoData, ...currentMemos]);
                this.message.success('備忘錄創建成功');
            }

            this.applyFilters();
            this.closeMemoModal();
        }
    }

    closeMemoModal() {
        this.showMemoModal.set(false);
        this.editingMemo.set(null);
    }

    refreshMemos() {
        this.loadMemos();
        this.message.success('備忘錄已重新載入');
    }

    // 工具方法
    getTypeColor(type: string): string {
        const colors: Record<string, string> = {
            safety: 'red',
            equipment: 'purple',
            construction: 'blue',
            emergency: 'orange'
        };
        return colors[type] || 'default';
    }

    getTypeText(type: string): string {
        const texts: Record<string, string> = {
            safety: '安全',
            equipment: '設備',
            construction: '施工',
            emergency: '緊急'
        };
        return texts[type] || '未知';
    }

    getTypeIcon(type: string): string {
        const icons: Record<string, string> = {
            safety: 'safety',
            equipment: 'tool',
            construction: 'build',
            emergency: 'warning'
        };
        return icons[type] || 'file-text';
    }

    getPriorityColor(priority: string): string {
        const colors: Record<string, string> = {
            high: 'red',
            medium: 'orange',
            low: 'green'
        };
        return colors[priority] || 'default';
    }

    getPriorityText(priority: string): string {
        const texts: Record<string, string> = {
            high: '高',
            medium: '中',
            low: '低'
        };
        return texts[priority] || '未知';
    }
}