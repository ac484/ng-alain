import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contract-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzButtonModule,
    NzProgressModule,
    NzTagModule,
    NzTableModule,
    NzSplitterModule,
    NzInputModule,
    NzLayoutModule
  ],
  templateUrl: './contract-panel.html',
  styleUrls: ['./contract-panel.less']
})
export class ContractPanelComponent implements OnInit {
  contracts: any[] = [];
  loading = false;
  filter = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.loading = true;
    // TODO: 實際應從 API 取得
    this.http.get('/contract').subscribe((result: any) => {
      this.contracts = result.list;
      this.loading = false;
    });
  }

  get filteredContracts() {
    if (!this.filter) return this.contracts;
    return this.contracts.filter(c => c.title.includes(this.filter) || c.client.includes(this.filter));
  }

  viewDetail(id: string) {
    /* 跳轉詳情 */
  }
  editContract(id: string) {
    /* 跳轉編輯 */
  }
  createContract() {
    /* 跳轉新增 */
  }

  getStatusColor(status: string) {
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
  getStatusText(status: string) {
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
}
