/**
 * NG-ALAIN 權限控制演示元件 (整合 Firebase)
 *
 * 本檔案依據 Firebase Console 專案設定，使用 Firebase Client SDK 操作 Firestore
 * 展示 ng-alain ACL 權限控制系統與 Firebase 認證的整合
 *
 * 功能：
 * - 展示 ACL 權限控制機制
 * - 支援多種角色權限切換
 * - 整合 Firebase 用戶權限管理
 * - 即時更新選單和頁面權限
 *
 * 支援的角色類型：
 * - 全權限模式 (Full Access)
 * - 角色 A (Role A) - 特定權限
 * - 角色 B (Role B) - 特定權限
 * - Firebase 用戶角色 - 從 Firestore 讀取的動態權限
 *
 * 權限操作：
 * - 切換全權限模式
 * - 切換角色 A/B 權限
 * - 載入 Firebase 用戶權限
 * - 更新 Firebase 用戶權限
 * - 即時更新選單顯示
 *
 * 整合架構：
 * Firebase Auth → Firestore 用戶資料 → ng-alain ACL → 選單權限控制
 *
 * 使用場景：
 * - 開發階段權限測試
 * - 用戶權限管理演示
 * - ACL 系統功能驗證
 * - Firebase 整合測試
 *
 * 依賴服務：
 * - ACLService: ng-alain 權限控制服務
 * - MenuService: ng-alain 選單管理服務
 * - Auth: Firebase 認證服務
 * - Firestore: Firebase 資料庫服務
 *
 * 權限資料結構：
 * - role: 用戶角色 (admin, user, guest 等)
 * - permissions: 權限列表 (read, write, delete, admin 等)
 * - abilities: 具體操作權限
 *
 * 安全注意事項：
 * - 僅在開發環境使用此演示元件
 * - 生產環境應移除權限切換功能
 * - 權限更新應通過後端 API 進行
 * - 確保 Firestore 安全規則正確設定
 */

import { Component, inject, OnInit } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Auth } from '@angular/fire/auth';
import { SHARED_IMPORTS } from '@shared';
import { FirebaseACLService, ACLRole } from '../../../core/firebase/firebase-acl.service';
import { AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  imports: [SHARED_IMPORTS, AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor]
})
export class ACLComponent implements OnInit {
  // 注入服務
  private readonly aclSrv = inject(ACLService);
  private readonly menuSrv = inject(MenuService);
  private readonly auth = inject(Auth);
  private readonly firebaseACLSrv = inject(FirebaseACLService);

  // 狀態變數
  full = false;
  availableRoles: ACLRole[] = [];
  currentUserACL$ = this.firebaseACLSrv.userACL$;

  ngOnInit(): void {
    this.loadAvailableRoles();
  }

  get data() {
    return this.firebaseACLSrv.data;
  }

  private reMenu(): void {
    this.menuSrv.resume();
  }

  private loadAvailableRoles(): void {
    this.firebaseACLSrv.getRoles().subscribe(roles => {
      this.availableRoles = roles;
    });
  }

  toggleFull(): void {
    this.full = !this.full;
    this.aclSrv.setFull(this.full);
    this.reMenu();
  }

  setRole(roleId: string): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const role = this.availableRoles.find(r => r.id === roleId);
    if (!role) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [roleId], role.permissions).subscribe(() => {
      this.reMenu();
    });
  }

  clearACL(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    this.firebaseACLSrv.updateUserACL(user.uid, [], []).subscribe(() => {
      this.reMenu();
    });
  }
}
