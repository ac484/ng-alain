/**
 * 轉賬填寫元件
 *
 * 此元件負責：
 * - 顯示轉賬資訊填寫表單
 * - 驗證轉賬資訊的有效性
 * - 處理表單提交並進入下一步
 * - 支援與記憶體狀態整合的表單資料保存
 */

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '@shared';

import { TransferService } from './transfer.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class Step1Component implements OnInit {
  private readonly srv = inject(TransferService);

  form = new FormGroup({
    pay_account: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    receiver_type: new FormControl('', Validators.required),
    receiver_account: new FormControl('', Validators.required),
    receiver_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    amount: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.pattern(`[0-9]+`), Validators.min(1), Validators.max(10000 * 100)])
    )
  });

  get item(): TransferService {
    return this.srv;
  }

  ngOnInit(): void {
    this.form.patchValue(this.item as any);
  }

  _submitForm(): void {
    Object.assign(this.item, this.form.value);
    ++this.item.step;
  }
}
