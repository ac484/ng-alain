import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contract-panel',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzProgressModule, NzTagModule, NzTabsModule],
  templateUrl: './contract-panel.html',
  styleUrls: ['./contract-panel.less']
})
export class ContractPanelComponent implements OnInit {
  contractId = '1'; // TODO: 實際應由路由取得
  contract: any;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadContract();
  }

  loadContract(): void {
    this.loading = true;
    this.http.get(`/contract/${this.contractId}`).subscribe(result => {
      this.contract = result;
      this.loading = false;
    });
  }

  // 狀態顏色與文字
  getStatusColor(status?: string): string {
    switch (status) {
      case 'draft':
        return 'default';
      case 'pending':
        return 'processing';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  }
  getStatusText(status?: string): string {
    switch (status) {
      case 'draft':
        return '草稿';
      case 'pending':
        return '待審核';
      case 'approved':
        return '已核准';
      case 'rejected':
        return '已拒絕';
      default:
        return '未知';
    }
  }
  getProgressStatus(progress: number): 'success' | 'normal' | 'active' | 'exception' {
    if (progress >= 100) return 'success';
    if (progress >= 80) return 'normal';
    if (progress >= 50) return 'active';
    return 'exception';
  }
}
