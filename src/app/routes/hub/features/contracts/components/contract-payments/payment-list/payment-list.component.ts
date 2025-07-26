import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'hub-payment-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NzTableModule,
        NzTagModule,
        NzButtonModule
    ],
    template: `
    <nz-table [nzData]="payments" nzSize="small" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>付款金額</th>
          <th>狀態</th>
          <th>創建時間</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        @for (payment of payments; track payment.id) {
          <tr>
            <td>{{ payment.amount | currency:'TWD' }}</td>
            <td>
              <nz-tag [nzColor]="getStatusColor(payment.status)">
                {{ getStatusText(payment.status) }}
              </nz-tag>
            </td>
            <td>{{ payment.createdAt | date:'short' }}</td>
            <td>
              <button nz-button nzType="link" nzSize="small">編輯</button>
            </td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class PaymentListComponent {
    @Input() payments: any[] = [];

    getStatusColor(status: string): string {
        const colorMap: Record<string, string> = {
            'draft': 'default',
            'submitted': 'blue',
            'approved': 'green',
            'rejected': 'red'
        };
        return colorMap[status] || 'default';
    }

    getStatusText(status: string): string {
        const textMap: Record<string, string> = {
            'draft': '草稿',
            'submitted': '已提交',
            'approved': '已核准',
            'rejected': '已拒絕'
        };
        return textMap[status] || status;
    }
}