/**
 * 郵箱登入/註冊彈窗元件
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Authentication
 * 提供郵箱登入、註冊和密碼重置功能
 */

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseAuthService } from '../../../core/auth/firebase-auth.service';
import { StartupService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, NzFormModule, NzInputModule, NzButtonModule, NzTabsModule],
  template: `
    <div class="email-auth-modal">
      <nz-tabs [nzAnimated]="false" (nzSelectChange)="switchTab($event)">
        <nz-tab [nzTitle]="'登入'">
          <form nz-form [formGroup]="loginForm" (ngSubmit)="login()">
            <nz-form-item>
              <nz-form-control nzErrorTip="請輸入有效的郵箱地址">
                <nz-input-group nzSize="large" nzPrefixIcon="mail">
                  <input nz-input formControlName="email" placeholder="郵箱地址" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-control nzErrorTip="請輸入密碼">
                <nz-input-group nzSize="large" nzPrefixIcon="lock">
                  <input nz-input type="password" formControlName="password" placeholder="密碼" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <button nz-button type="submit" nzType="primary" nzSize="large" [nzLoading]="loading" nzBlock> 登入 </button>
            </nz-form-item>
          </form>
        </nz-tab>

        <nz-tab [nzTitle]="'註冊'">
          <form nz-form [formGroup]="registerForm" (ngSubmit)="register()">
            <nz-form-item>
              <nz-form-control nzErrorTip="請輸入有效的郵箱地址">
                <nz-input-group nzSize="large" nzPrefixIcon="mail">
                  <input nz-input formControlName="email" placeholder="郵箱地址" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-control nzErrorTip="密碼至少6位">
                <nz-input-group nzSize="large" nzPrefixIcon="lock">
                  <input nz-input type="password" formControlName="password" placeholder="密碼" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-control nzErrorTip="請確認密碼">
                <nz-input-group nzSize="large" nzPrefixIcon="lock">
                  <input nz-input type="password" formControlName="confirmPassword" placeholder="確認密碼" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <button nz-button type="submit" nzType="primary" nzSize="large" [nzLoading]="loading" nzBlock> 註冊 </button>
            </nz-form-item>
          </form>
        </nz-tab>

        <nz-tab [nzTitle]="'重置密碼'">
          <form nz-form [formGroup]="resetForm" (ngSubmit)="resetPassword()">
            <nz-form-item>
              <nz-form-control nzErrorTip="請輸入有效的郵箱地址">
                <nz-input-group nzSize="large" nzPrefixIcon="mail">
                  <input nz-input formControlName="email" placeholder="郵箱地址" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <button nz-button type="submit" nzType="primary" nzSize="large" [nzLoading]="loading" nzBlock> 發送重置郵箱 </button>
            </nz-form-item>
          </form>
        </nz-tab>
      </nz-tabs>
    </div>
  `,
  styles: [
    `
      .email-auth-modal {
        padding: 20px 0;
      }

      nz-form-item {
        margin-bottom: 16px;
      }

      .ant-tabs-content-holder {
        padding-top: 16px;
      }
    `
  ]
})
export class EmailLoginModalComponent {
  private readonly modalRef = inject(NzModalRef);
  private readonly message = inject(NzMessageService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly startupService = inject(StartupService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loading = false;
  currentTab = 0;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: this.passwordMatchValidator }
  );

  resetForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  switchTab(event: any): void {
    this.currentTab = event.index;
  }

  passwordMatchValidator(group: any): { [key: string]: any } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    try {
      const user = await this.firebaseAuth.loginWithEmail(email!, password!).toPromise();
      if (user) {
        this.message.success('登入成功！');
        this.modalRef.close(user);

        // 重新載入啟動服務
        this.startupService.load().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    } catch (error: any) {
      console.error('登入失敗:', error);
      this.message.error(this.getErrorMessage(error.code));
    } finally {
      this.loading = false;
    }
  }

  async register(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.loading = true;
    const { email, password } = this.registerForm.value;

    try {
      const user = await this.firebaseAuth.registerWithEmail(email!, password!).toPromise();
      if (user) {
        this.message.success('註冊成功！請檢查郵箱進行驗證。');
        this.modalRef.close(user);

        // 重新載入啟動服務
        this.startupService.load().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    } catch (error: any) {
      console.error('註冊失敗:', error);
      this.message.error(this.getErrorMessage(error.code));
    } finally {
      this.loading = false;
    }
  }

  async resetPassword(): Promise<void> {
    if (this.resetForm.invalid) {
      this.markFormGroupTouched(this.resetForm);
      return;
    }

    this.loading = true;
    const { email } = this.resetForm.value;

    try {
      await this.firebaseAuth.sendPasswordReset(email!).toPromise();
      this.message.success('密碼重置郵箱已發送，請檢查郵箱。');
      this.modalRef.close();
    } catch (error: any) {
      console.error('發送重置郵箱失敗:', error);
      this.message.error(this.getErrorMessage(error.code));
    } finally {
      this.loading = false;
    }
  }

  private markFormGroupTouched(formGroup: any): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return '用戶不存在';
      case 'auth/wrong-password':
        return '密碼錯誤';
      case 'auth/email-already-in-use':
        return '郵箱已被使用';
      case 'auth/weak-password':
        return '密碼強度太弱';
      case 'auth/invalid-email':
        return '郵箱格式無效';
      case 'auth/too-many-requests':
        return '請求過於頻繁，請稍後再試';
      default:
        return '操作失敗，請稍後再試';
    }
  }
}
