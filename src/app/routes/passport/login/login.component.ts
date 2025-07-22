/**
 * NG-ALAIN 登入頁面元件
 *
 * 功能：提供基本的表單登入功能
 * 整合：Firebase Auth 回調處理
 */

import { HttpContext } from '@angular/common/http';
import { ChangeDetectorRef, OnDestroy, inject, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient, I18nPipe } from '@delon/theme';
import { environment } from '@env/environment';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { finalize } from 'rxjs/operators';

import { AnonymousLoginComponent } from '../anonymous-login/anonymous-login.component';
import { EmailLoginComponent } from '../email-login';
import { GoogleAuthComponent } from '../google-auth/google-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    I18nPipe,
    NzCheckboxModule,
    NzAlertModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    AnonymousLoginComponent,
    EmailLoginComponent,
    GoogleAuthComponent
  ],
  standalone: true
})
export class UserLoginComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  form = inject(FormBuilder).nonNullable.group({
    userName: ['', []],
    password: ['', []],
    remember: [true]
  });

  error = '';
  loading = false;

  submit(): void {
    this.error = '';
    const { userName, password } = this.form.controls;
    userName.markAsDirty();
    userName.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    if (userName.invalid || password.invalid) {
      return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此加上 `ALLOW_ANONYMOUS` 表示不触发用户 Token 校验
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post(
        '/login/account',
        {
          userName: this.form.value.userName,
          password: this.form.value.password
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
        // 清空路由复用信息
        // 设置用户Token信息
        // TODO: Mock expired value
        res.user.expired = +new Date() + 1000 * 60 * 5;
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        let url = '/';
        if (url.includes('/passport')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
  }

  ngOnDestroy(): void {
    // 清理邏輯
  }
}
