/**
 * 基礎表單元件
 *
 * 此元件負責：
 * - 提供基本表單功能展示
 * - 處理表單驗證和提交
 * - 展示表單提交反饋
 * - 支援與記憶體狀態整合的表單資料管理
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class BasicFormComponent {
  private readonly msg = inject(NzMessageService);
  private readonly cdr = inject(ChangeDetectorRef);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
    client: new FormControl(''),
    invites: new FormControl(''),
    weight: new FormControl(''),
    public: new FormControl(1, [Validators.min(1), Validators.max(3)]),
    publicUsers: new FormControl('')
  });
  submitting = false;

  submit(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
  }
}
