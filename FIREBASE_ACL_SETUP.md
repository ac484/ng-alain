# Firebase ACL 設置指南

## 概述

這個實現將 @delon/acl 與 Firestore 無縫整合，提供企業級的權限管理系統。設計遵循極簡主義原則，看起來就像是 @delon/acl 的自然擴展。

## 架構特點

- **極簡主義設計**：延續 @delon/acl 的 API 風格
- **無縫整合**：透明的 Firestore 後端，前端無感知
- **自動同步**：權限變更自動同步到 @delon/acl
- **企業級安全**：完整的 Firestore 安全規則

## 資料結構

### Firestore 集合

1. **acl_roles** - 角色定義
2. **acl_permissions** - 權限定義  
3. **acl_users** - 用戶權限分配

### 預設角色

- `user` - 一般用戶 (dashboard:read, user:read)
- `user1` - 認證用戶 (dashboard:read, user:read, user:write)
- `admin` - 管理員 (所有權限)

## 使用方式

### 1. 在組件中使用

```typescript
import { FirebaseACLService } from '@core';

export class MyComponent {
  private firebaseACL = inject(FirebaseACLService);

  // 檢查權限 (延續 @delon/acl API)
  canEdit = this.firebaseACL.can('user:write');
  isAdmin = this.firebaseACL.hasRole('admin');

  // 更新用戶權限
  updateUserRole(uid: string, roles: string[]) {
    const role = await this.firebaseACL.getRoles().toPromise();
    const permissions = role.find(r => r.id === roles[0])?.permissions || [];
    this.firebaseACL.updateUserACL(uid, roles, permissions).subscribe();
  }
}
```

### 2. 在模板中使用

```html
<!-- 使用原生 @delon/acl 指令 -->
<button *acl="'user:write'">編輯</button>
<div *acl="['admin']">管理員專用</div>

<!-- 顯示當前權限狀態 -->
<div *ngIf="firebaseACL.userACL$ | async as userACL">
  <p>角色：{{ userACL.roles.join(', ') }}</p>
  <nz-tag *ngFor="let permission of userACL.permissions">
    {{ permission }}
  </nz-tag>
</div>
```

### 3. 路由守衛

```typescript
// 路由配置保持不變
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [aclCanActivate],
  data: { guard: 'admin' }
}
```

## 初始化

系統會自動初始化預設的角色和權限，無需手動設置。

## 安全配置

1. 複製 `firestore.rules.example` 到 `firestore.rules`
2. 部署安全規則：`firebase deploy --only firestore:rules`

## 管理界面

訪問 `/delon/acl-admin` 查看角色和權限管理界面（需要管理員權限）。

## 測試

1. 訪問 `/delon/acl` 測試權限切換
2. 訪問 `/delon/guard` 測試路由守衛
3. 觀察左側選單的權限變化

## 特點

- ✅ 完全兼容現有 @delon/acl 代碼
- ✅ 自動權限同步
- ✅ 企業級安全
- ✅ 極簡 API 設計
- ✅ 無縫 Firestore 整合
- ✅ 實時權限更新