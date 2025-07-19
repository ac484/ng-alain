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

import { Component, inject } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { SHARED_IMPORTS } from '@shared';
import { from } from 'rxjs';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  imports: SHARED_IMPORTS
})
export class ACLComponent {
  // 注入 ng-alain 核心服務
  private readonly aclSrv = inject(ACLService); // 權限控制服務
  private readonly menuSrv = inject(MenuService); // 選單管理服務

  // 注入 Firebase 服務
  private readonly auth = inject(Auth); // Firebase 認證服務
  private readonly firestore = inject(Firestore); // Firebase 資料庫服務

  // 權限狀態變數
  full = true; // 全權限模式狀態
  roleA = ''; // 角色 A 狀態
  roleB = ''; // 角色 B 狀態
  firebaseRole = ''; // Firebase 用戶角色狀態

  /**
   * 獲取當前 ACL 資料
   *
   * 返回當前權限控制服務的完整資料，包含：
   * - full: 是否為全權限模式
   * - roles: 當前角色列表
   * - abilities: 當前權限列表
   */
  get data(): {
    full: boolean;
    roles: string[];
    abilities: Array<string | number>;
  } {
    return this.aclSrv.data;
  }

  /**
   * 重新載入選單
   *
   * 功能：根據當前權限重新載入選單資料
   * 用途：權限變更後更新選單顯示
   */
  private reMenu(): void {
    this.menuSrv.resume();
  }

  /**
   * 切換全權限模式
   *
   * 功能：切換全權限模式狀態
   * 操作：
   * - 切換 full 狀態
   * - 設定 ACL 全權限
   * - 重新載入選單
   */
  toggleFull(): void {
    this.full = !this.full;
    this.aclSrv.setFull(this.full);
    this.reMenu();
  }

  /**
   * 切換角色 A 權限
   *
   * 功能：切換角色 A 的權限狀態
   * 操作：
   * - 關閉全權限模式
   * - 切換角色 A 狀態 (role-a 或空)
   * - 設定 ACL 角色權限
   * - 重新載入選單
   */
  toggleRoleA(): void {
    this.full = false;
    this.roleA = this.roleA === 'role-a' ? '' : 'role-a';
    this.aclSrv.setFull(this.full);
    this.aclSrv.setRole([this.roleA]);
    this.reMenu();
  }

  /**
   * 切換角色 B 權限
   *
   * 功能：切換角色 B 的權限狀態
   * 操作：
   * - 關閉全權限模式
   * - 切換角色 B 狀態 (role-b 或空)
   * - 設定 ACL 角色權限
   * - 重新載入選單
   */
  toggleRoleB(): void {
    this.full = false;
    this.roleB = this.roleB === 'role-b' ? '' : 'role-b';
    this.aclSrv.setFull(this.full);
    this.aclSrv.setRole([this.roleB]);
    this.reMenu();
  }

  /**
   * 載入 Firebase 用戶權限
   *
   * 功能：從 Firestore 載入當前 Firebase 用戶的權限資料
   * 流程：
   * 1. 檢查當前 Firebase 用戶狀態
   * 2. 從 Firestore users 集合讀取用戶資料
   * 3. 提取角色和權限資訊
   * 4. 設定 ng-alain ACL 權限
   * 5. 更新選單顯示
   *
   * 權限資料來源：Firestore users/{uid} 文檔
   * 權限欄位：role, permissions
   *
   * 錯誤處理：
   * - 無用戶時記錄日誌並返回
   * - Firestore 讀取失敗時記錄錯誤
   */
  async loadFirebaseUserRole(): Promise<void> {
    // 檢查當前 Firebase 用戶
    const user = this.auth.currentUser;
    if (!user) {
      console.log('沒有 Firebase 用戶');
      return;
    }

    try {
      // 從 Firestore 讀取用戶資料
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData['role'] || 'user';
        const permissions = userData['permissions'] || ['read'];

        // 更新本地狀態
        this.firebaseRole = role;
        this.full = false;

        // 使用 ng-alain 標準方法設定權限
        this.aclSrv.set({
          role: [role],
          ability: permissions
        });

        // 重新載入選單
        this.reMenu();
        console.log('載入 Firebase 用戶權限:', { role, permissions });
      }
    } catch (error) {
      console.error('載入 Firebase 用戶權限失敗:', error);
    }
  }

  /**
   * 更新 Firebase 用戶權限
   *
   * 功能：更新當前 Firebase 用戶的權限資料到 Firestore
   * 流程：
   * 1. 檢查當前 Firebase 用戶狀態
   * 2. 根據新角色生成對應權限
   * 3. 更新 Firestore 用戶資料
   * 4. 設定 ng-alain ACL 權限
   * 5. 更新選單顯示
   *
   * 參數：
   * - newRole: 新的用戶角色 (admin, user, guest 等)
   *
   * 權限映射：
   * - admin: ['read', 'write', 'delete', 'admin']
   * - 其他角色: ['read', 'write']
   *
   * 更新欄位：
   * - role: 用戶角色
   * - permissions: 權限列表
   * - updatedAt: 更新時間戳
   *
   * 錯誤處理：
   * - 無用戶時記錄日誌並返回
   * - Firestore 更新失敗時記錄錯誤
   *
   * 安全注意事項：
   * - 此功能僅用於開發測試
   * - 生產環境應通過後端 API 進行權限管理
   */
  async updateFirebaseUserRole(newRole: string): Promise<void> {
    // 檢查當前 Firebase 用戶
    const user = this.auth.currentUser;
    if (!user) {
      console.log('沒有 Firebase 用戶');
      return;
    }

    try {
      // 準備更新資料
      const userRef = doc(this.firestore, 'users', user.uid);
      const permissions = newRole === 'admin' ? ['read', 'write', 'delete', 'admin'] : ['read', 'write'];

      // 更新 Firestore 用戶資料
      await updateDoc(userRef, {
        role: newRole,
        permissions: permissions,
        updatedAt: serverTimestamp() // 使用伺服器時間戳
      });

      // 更新本地狀態
      this.firebaseRole = newRole;
      this.full = false;

      // 使用 ng-alain 標準方法設定權限
      this.aclSrv.set({
        role: [newRole],
        ability: permissions
      });

      // 重新載入選單
      this.reMenu();
      console.log('更新 Firebase 用戶權限:', { role: newRole, permissions });
    } catch (error) {
      console.error('更新 Firebase 用戶權限失敗:', error);
    }
  }
}
