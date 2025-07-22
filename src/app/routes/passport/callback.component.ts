/**
 * NG-ALAIN 認證回調元件
 *
 * 功能：統一處理所有認證回調
 * 支援：Auth0、GitHub、Firebase Auth（郵箱、Google、匿名）
 * 模式：整合 @delon/auth token 驗證流程
 */

import { Component, Input, OnInit, inject } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, serverTimestamp } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { SocialService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: string;
  permissions: string[];
  createdAt?: any;
  updatedAt?: any;
  lastLoginAt?: any;
  loginMethod?: 'email' | 'google' | 'anonymous';
  isActive?: boolean;
}

@Component({
  selector: 'app-callback',
  template: `
    <div class="callback-loading">
      <nz-spin nzSize="large" nzTip="處理登入中..."></nz-spin>
    </div>
  `,
  providers: [SocialService],
  standalone: true,
  imports: [NzSpinModule],
  styles: [
    `
      .callback-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `
  ]
})
export class CallbackComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly socialService = inject(SocialService);
  private readonly settingsSrv = inject(SettingsService);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private readonly startupSrv = inject(StartupService);
  private readonly message = inject(NzMessageService);

  @Input() type = '';
  private isProcessing = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'] || '';
      this.handleCallback();
    });
  }

  /**
   * 處理認證回調
   */
  private handleCallback(): void {
    if (this.isProcessing) {
      return; // 避免重複處理
    }

    if (this.type === 'firebase') {
      // Firebase Auth 回調處理
      this.handleFirebaseAuthCallback();
    } else {
      // 第三方平台回調處理（Auth0、GitHub 等）
      this.handleSocialCallback();
    }
  }

  /**
   * 處理第三方平台回調
   */
  private handleSocialCallback(): void {
    this.isProcessing = true;

    // 使用原本的 SocialService.callback() 處理第三方登入
    this.socialService.callback()['subscribe'](
      (res: any) => {
        if (res) {
          // 第三方登入成功，設定用戶資訊
          this.settingsSrv.setUser(res);

          // 清空路由复用信息
          this.reuseTabService?.clear();

          // 導航到首頁
          this.router.navigateByUrl('/');
          this.message.success('登入成功！');
        } else {
          this.message.error('登入失敗');
          this.router.navigateByUrl('/passport/login');
        }
        this.isProcessing = false;
      },
      (error: any) => {
        console.error('第三方登入回調失敗:', error);
        this.message.error('登入失敗，請稍後再試');
        this.router.navigateByUrl('/passport/login');
        this.isProcessing = false;
      }
    );
  }

  /**
   * 處理 Firebase Auth 回調
   */
  private handleFirebaseAuthCallback(): void {
    this.isProcessing = true;

    // 使用 Promise 包裝 onAuthStateChanged，避免重複觸發
    new Promise<User | null>(resolve => {
      const unsubscribe = onAuthStateChanged(this.auth, (user: User | null) => {
        unsubscribe(); // 立即取消訂閱，避免重複觸發
        resolve(user);
      });
    }).then(async (user: User | null) => {
      if (user) {
        try {
          // 儲存用戶資料到 Firestore
          await this.saveUserToFirestore(user);

          // 獲取完整用戶資料（包含權限）
          const userProfile = await this.getUserProfile(user.uid).toPromise();

          // 準備用戶資訊（按照原本的格式）
          const userInfo = {
            token: user.uid,
            name: userProfile?.displayName || user.displayName || user.email || 'Anonymous',
            email: user.email || '',
            id: user.uid,
            time: +new Date(),
            role: userProfile?.role || 'user',
            permissions: userProfile?.permissions || ['dashboard'],
            expired: +new Date() + 1000 * 60 * 60 * 24 * 7 // 7天過期
          };

          // 先設定用戶資訊到 SettingsService（按照原本的順序）
          this.settingsSrv.setUser({
            ...this.settingsSrv.user,
            ...userInfo
          });

          // 然後呼叫 socialService.callback() 並傳入用戶資訊
          this.socialService.callback(userInfo);

          console.log('Firebase Auth 回調成功，設定用戶資訊:', userInfo);
          this.message.success('登入成功！');
        } catch (error) {
          console.error('Firebase Auth 回調處理失敗:', error);
          this.message.error('登入處理失敗，請稍後再試');
          this.router.navigateByUrl('/passport/login');
        }
      } else {
        // 沒有用戶，可能是登出狀態
        console.log('Firebase Auth 回調：無用戶狀態');
        this.router.navigateByUrl('/passport/login');
      }
      this.isProcessing = false;
    });
  }

  /**
   * 儲存用戶資料到 Firestore
   */
  private async saveUserToFirestore(user: User): Promise<void> {
    const userRef = doc(this.firestore, 'acl_users', user.uid);
    const now = serverTimestamp();

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: ['user'],
      permissions: ['dashboard'],
      lastLoginAt: now,
      updatedAt: now,
      loginMethod: this.determineLoginMethod(user),
      isActive: true
    };

    await setDoc(userRef, userData, { merge: true });
  }

  /**
   * 獲取用戶資料
   */
  private getUserProfile(uid: string): Observable<UserProfile | null> {
    const userRef = doc(this.firestore, 'acl_users', uid);
    return from(getDoc(userRef)).pipe(
      map(userDoc => {
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            uid: data['uid'],
            email: data['email'],
            displayName: data['displayName'],
            photoURL: data['photoURL'],
            emailVerified: data['emailVerified'],
            role: data['roles']?.[0] || 'user',
            permissions: data['permissions'] || ['dashboard'],
            createdAt: data['createdAt'],
            updatedAt: data['updatedAt'],
            lastLoginAt: data['lastLoginAt'],
            loginMethod: data['loginMethod'],
            isActive: data['isActive']
          } as UserProfile;
        }
        return null;
      })
    );
  }

  /**
   * 判斷登入方式
   */
  private determineLoginMethod(user: User): 'email' | 'google' | 'anonymous' {
    if (user.isAnonymous) {
      return 'anonymous';
    }
    if (user.providerData.some(provider => provider.providerId === 'google.com')) {
      return 'google';
    }
    return 'email';
  }
}
