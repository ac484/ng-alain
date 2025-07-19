/**
 * 基本設定元件
 *
 * 此元件負責：
 * - 管理用戶基本資料設定
 * - 處理頭像上傳和個人資訊更新
 * - 提供地理位置選擇功能
 * - 支援與 Firebase Firestore 整合的用戶資料管理
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadComponent } from 'ng-zorro-antd/upload';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly msg = inject(NzMessageService);

  avatar = '';
  userLoading = true;
  user!: ProAccountSettingsUser;

  // #region geo

  provinces: ProAccountSettingsCity[] = [];
  cities: ProAccountSettingsCity[] = [];

  ngOnInit(): void {
    // 使用 Firebase Auth 獲取當前用戶
    user(this.auth)
      .pipe(
        switchMap(currentUser => {
          if (!currentUser) {
            this.msg.error('用戶未登入');
            return of(null);
          }

          // 從 Firestore 獲取用戶資料
          const userDoc = doc(this.firestore, 'users', currentUser.uid);
          return getDoc(userDoc);
        }),
        map(docSnap => {
          if (!docSnap?.exists()) {
            // 如果用戶資料不存在，創建預設資料
            return this.createDefaultUser();
          }
          return docSnap.data() as ProAccountSettingsUser;
        })
      )
      .subscribe({
        next: userData => {
          this.userLoading = false;
          this.user = userData;
          this.loadProvinces();
          this.choProvince(userData.geographic.province.key, false);
          this.cdr.detectChanges();
        },
        error: error => {
          this.msg.error('載入用戶資料失敗');
          console.error('Error loading user data:', error);
          this.userLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private createDefaultUser(): ProAccountSettingsUser {
    return {
      email: this.auth.currentUser?.email || '',
      name: this.auth.currentUser?.displayName || '新用戶',
      profile: '',
      country: 'China',
      address: '',
      phone: '',
      avatar: '',
      geographic: {
        province: { key: '330000' },
        city: { key: '330100' }
      }
    };
  }

  private loadProvinces(): void {
    // 載入省份資料（可以從 Firestore 或靜態資料）
    this.provinces = [
      { name: '上海', id: '310000' },
      { name: '北京', id: '110000' },
      { name: '浙江省', id: '330000' }
    ];
  }

  choProvince(pid: string, cleanCity = true): void {
    // 根據省份載入城市資料
    const citiesMap: Record<string, ProAccountSettingsCity[]> = {
      '310000': [{ name: '市辖区', id: '310100' }],
      '110000': [{ name: '市辖区', id: '110100' }],
      '330000': [
        { name: '杭州市', id: '330100' },
        { name: '宁波市', id: '330200' },
        { name: '温州市', id: '330300' }
      ]
    };

    this.cities = citiesMap[pid] || [];
    if (cleanCity) {
      this.user.geographic.city.key = '';
    }
    this.cdr.detectChanges();
  }

  // #endregion

  save(): boolean {
    if (!this.auth.currentUser) {
      this.msg.error('用戶未登入');
      return false;
    }

    // 更新 Firestore 中的用戶資料
    const userDoc = doc(this.firestore, 'users', this.auth.currentUser.uid);
    updateDoc(userDoc, {
      email: this.user.email,
      name: this.user.name,
      profile: this.user.profile,
      country: this.user.country,
      address: this.user.address,
      phone: this.user.phone,
      avatar: this.user.avatar,
      geographic: this.user.geographic
    })
      .then(() => {
        this.msg.success('保存成功');
      })
      .catch(error => {
        this.msg.error('保存失敗');
        console.error('Error saving user data:', error);
      });

    return false;
  }
}
