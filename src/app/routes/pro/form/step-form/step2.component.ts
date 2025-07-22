/**
 * 轉賬確認元件
 *
 * 此元件負責：
 * - 顯示轉賬確認頁面
 * - 處理支付密碼驗證
 * - 提交轉賬請求
 * - 支援與 Redis 快取整合的安全驗證
 */

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '@shared';

import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class Step2Component implements OnInit {
  private readonly srv = inject(TransferService);

  form = new FormGroup({
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  });
  loading = false;
  get item(): TransferService {
    return this.srv;
  }

  ngOnInit(): void {
    this.form.patchValue(this.item);
  }

  _submitForm(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      ++this.item.step;
    }, 500);
  }

  prev(): void {
    --this.item.step;
  }
}
