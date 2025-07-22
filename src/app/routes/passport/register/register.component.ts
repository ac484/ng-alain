/**
 * NG-ALAIN 用戶註冊元件
 *
 * 功能：提供基本的用戶註冊表單
 * 整合：Firebase Auth 回調處理
 */

import { HttpContext } from '@angular/common/http';
import { ChangeDetectorRef, OnDestroy, inject, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient, I18nPipe } from '@delon/theme';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  imports: [ReactiveFormsModule, I18nPipe, RouterLink, NzAlertModule, NzFormModule, NzInputModule, NzButtonModule],
  standalone: true
})
export class UserRegisterComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]],
    userName: ['', [Validators.required]]
  });

  error = '';
  loading = false;

  submit(): void {
    this.error = '';
    const { email, password, confirm, userName } = this.form.controls;

    email.markAsDirty();
    email.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    confirm.markAsDirty();
    confirm.updateValueAndValidity();
    userName.markAsDirty();
    userName.updateValueAndValidity();

    if (email.invalid || password.invalid || confirm.invalid || userName.invalid) {
      return;
    }

    if (password.value !== confirm.value) {
      this.error = '密碼確認不匹配';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.http
      .post(
        '/register',
        {
          email: this.form.value.email,
          password: this.form.value.password,
          userName: this.form.value.userName
        },
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          this.cdr.detectChanges();
          return;
        }
        this.router.navigateByUrl('/passport/register-result');
      });
  }

  ngOnDestroy(): void {
    // 清理邏輯
  }
}
