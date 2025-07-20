/**
 * 工作區備忘錄元件
 *
 * 功能：
 * - 提供工作區的備忘錄管理
 * - 支援備忘錄的創建和編輯
 * - 整合快速筆記和想法記錄
 *
 * 主要特性：
 * - 備忘錄的列表展示
 * - 備忘錄內容的編輯功能
 * - 備忘錄分類和標籤管理
 * - 備忘錄搜尋和篩選
 *
 * 備忘錄內容：
 * - 標題和內容文字
 * - 創建時間和修改時間
 * - 分類標籤和優先級
 * - 相關連結和附件
 *
 * 互動功能：
 * - 備忘錄新增和編輯
 * - 備忘錄刪除和歸檔
 * - 備忘錄搜尋功能
 * - 備忘錄匯出功能
 *
 * 路由：/workspace/memos
 * 依賴：ng-zorro-antd/list、ng-zorro-antd/tag、ng-zorro-antd/button
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-workspace-memos',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzInputModule, NzListModule],
  template: `
    <nz-card nzTitle="備忘錄" [nzExtra]="extraTemplate">
      <nz-list [nzDataSource]="memos" [nzRenderItem]="item">
        <ng-template #item let-memo>
          <nz-list-item>
            <nz-list-item-meta [nzTitle]="memo.title" [nzDescription]="memo.content"> </nz-list-item-meta>
          </nz-list-item>
        </ng-template>
      </nz-list>
    </nz-card>

    <ng-template #extraTemplate>
      <button nz-button nzType="primary" nzSize="small">新增備忘錄</button>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
      }
    `
  ]
})
export class WorkspaceMemosComponent {
  memos = [
    { title: '重要會議', content: '明天下午 2 點與客戶開會' },
    { title: '專案截止', content: '週五前完成功能開發' },
    { title: '學習筆記', content: 'Angular 20 新特性研究' }
  ];
}
