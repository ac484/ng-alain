import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContractAttachmentComponent } from './attachment.component';

@Component({
  selector: 'app-contract-attachment-page',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, ContractAttachmentComponent],
  template: `
    <nz-card>
      <div style="margin-bottom: 16px;">
        <button nz-button (click)="goBack()">
          <span nz-icon nzType="arrow-left"></span>
          返回合約詳情
        </button>
      </div>
      <app-contract-attachment [contractId]="contractId"></app-contract-attachment>
    </nz-card>
  `
})
export class ContractAttachmentPageComponent implements OnInit {
  contractId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id') || '';
  }

  goBack(): void {
    window.history.back();
  }
}
