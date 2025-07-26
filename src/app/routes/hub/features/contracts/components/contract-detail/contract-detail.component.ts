import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ContractService } from '../../services';
import { Contract } from '../../models';

@Component({
    selector: 'hub-contract-detail',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NzCardModule,
        NzDescriptionsModule,
        NzButtonModule
    ],
    template: `
    @if (contract(); as c) {
      <nz-card [nzTitle]="'合約詳情 - ' + c.contractSerial" [nzExtra]="extraTemplate">
        <nz-descriptions nzBordered [nzColumn]="2">
          <nz-descriptions-item nzTitle="合約序號">{{ c.contractSerial }}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="業主">{{ c.client }}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="合約名稱">{{ c.contractName }}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="合約金額">{{ c.amount | currency:'TWD' }}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="合約案號" [nzSpan]="2">{{ c.contractCode || '未設定' }}</nz-descriptions-item>
          <nz-descriptions-item nzTitle="費用識別碼" [nzSpan]="2">{{ c.feeCode || '未設定' }}</nz-descriptions-item>
        </nz-descriptions>
        
        <ng-template #extraTemplate>
          <button nz-button nzType="primary" (click)="editContract()">編輯</button>
          <button nz-button (click)="goBack()" style="margin-left: 8px;">返回</button>
        </ng-template>
      </nz-card>
    } @else {
      <nz-card nzTitle="載入中...">
        <p>正在載入合約詳情...</p>
      </nz-card>
    }
  `
})
export class ContractDetailComponent implements OnInit {
    contract = signal<Contract | null>(null);
    contractId?: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) { }

    ngOnInit() {
        this.contractId = this.route.snapshot.paramMap.get('id') || undefined;
        if (this.contractId) {
            this.loadContract();
        }
    }

    private loadContract() {
        if (this.contractId) {
            this.contractService.getById(this.contractId).subscribe(contract => {
                this.contract.set(contract || null);
            });
        }
    }

    editContract() {
        if (this.contractId) {
            this.router.navigate(['/hub/contracts', this.contractId, 'edit']);
        }
    }

    goBack() {
        this.router.navigate(['/hub/contracts']);
    }
}