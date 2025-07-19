/**
 * 分步表單容器元件
 *
 * 此元件負責：
 * - 整合分步表單的各個步驟
 * - 管理表單步驟的切換
 * - 提供表單狀態的共享服務
 * - 支援與 Redis 快取整合的表單進度保存
 */

import { AfterViewInit, Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { Step1Component } from './step1.component';
import { Step2Component } from './step2.component';
import { Step3Component } from './step3.component';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.less'],
  providers: [TransferService],
  imports: [...SHARED_IMPORTS, NzStepsModule, Step1Component, Step2Component, Step3Component]
})
export class StepFormComponent implements AfterViewInit {
  private readonly srv = inject(TransferService);
  get item(): TransferService {
    return this.srv;
  }

  ngAfterViewInit(): void {
    console.log('item', this.item);
  }
}
