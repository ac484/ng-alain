/**
 * 轉賬完成元件
 *
 * 此元件負責：
 * - 顯示轉賬結果頁面
 * - 提供轉賬成功的反饋
 * - 顯示轉賬詳細資訊
 * - 支援與 Redis 快取整合的交易記錄
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzResultModule } from 'ng-zorro-antd/result';

import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...SHARED_IMPORTS, NzResultModule]
})
export class Step3Component {
  private readonly srv = inject(TransferService);

  get item(): TransferService {
    return this.srv;
  }
}
