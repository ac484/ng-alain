/**
 * 基本設定元件
 *
 * 此元件負責：
 * - 管理用戶基本資料設定
 * - 處理頭像上傳和個人資訊更新
 * - 提供地理位置選擇功能
 * - 支援與記憶體狀態整合的用戶資料管理
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent } from 'ng-zorro-antd/upload';
import { zip, of } from 'rxjs';
import { FirebaseAuthService, FirebaseUser } from '@core';
import { Auth } from '@angular/fire/auth';

interface ProAccountSettingsUser {
  email: string;
  name: string;
  profile: string;
  country: string;
  address: string;
  phone: string;
  avatar: string;
  geographic: {
    province: {
      key: string;
    };
    city: {
      key: string;
    };
  };
}

interface ProAccountSettingsCity {
  name: string;
  id: string;
}

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...SHARED_IMPORTS, NzUploadComponent]
})
export class ProAccountSettingsBaseComponent implements OnInit {
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly msg = inject(NzMessageService);
  private readonly firebaseAuth = inject(FirebaseAuthService);
  private readonly auth = inject(Auth);

  avatar = '';
  userLoading = true;
  user!: ProAccountSettingsUser;

  // #region geo

  provinces: ProAccountSettingsCity[] = [];
  cities: ProAccountSettingsCity[] = [];

  ngOnInit(): void {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      this.msg.error('用戶未登入');
      return;
    }

    // 從 Firebase 獲取用戶資料
    zip(
      this.firebaseAuth.getUserProfile(currentUser.uid),
      this.http.get('/geo/province') // 地理位置資料仍使用 Mock API
    ).subscribe({
      next: ([firebaseUser, province]: [FirebaseUser | null, ProAccountSettingsCity[]]) => {
        this.userLoading = false;

        if (firebaseUser) {
          // 將 Firebase 用戶資料轉換為 ProAccountSettingsUser 格式
          this.user = {
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            profile: firebaseUser.profile || '',
            country: firebaseUser.country || 'China',
            address: firebaseUser.address || '',
            phone: firebaseUser.phone || '',
            avatar: firebaseUser.photoURL || '',
            geographic: firebaseUser.geographic || {
              province: { key: '' },
              city: { key: '' }
            }
          };
        } else {
          // 如果沒有 Firebase 資料，使用預設值
          this.user = {
            email: currentUser.email || '',
            name: currentUser.displayName || '',
            profile: '',
            country: 'China',
            address: '',
            phone: '',
            avatar: currentUser.photoURL || '',
            geographic: {
              province: { key: '' },
              city: { key: '' }
            }
          };
        }

        this.provinces = province;
        this.choProvince(this.user.geographic.province.key, false);
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('載入用戶資料失敗:', error);
        this.msg.error('載入用戶資料失敗');
        this.userLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  choProvince(pid: string, cleanCity = true): void {
    this.http.get(`/geo/${pid}`).subscribe(res => {
      this.cities = res;
      if (cleanCity) {
        this.user.geographic.city.key = '';
      }
      this.cdr.detectChanges();
    });
  }

  // #endregion

  save(): boolean {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      this.msg.error('用戶未登入');
      return false;
    }

    // 更新 Firebase 用戶資料
    const updates: Partial<FirebaseUser> = {
      displayName: this.user.name,
      email: this.user.email,
      profile: this.user.profile,
      country: this.user.country,
      address: this.user.address,
      phone: this.user.phone,
      geographic: this.user.geographic
    };

    this.firebaseAuth.updateUserProfile(updates).subscribe({
      next: () => {
        this.msg.success('用戶資料更新成功！');
        // 重新載入用戶資料
        this.ngOnInit();
      },
      error: error => {
        console.error('更新用戶資料失敗:', error);
        this.msg.error('更新用戶資料失敗');
      }
    });

    return false;
  }
}
