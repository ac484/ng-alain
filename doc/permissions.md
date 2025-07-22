# Delon ACL + Firebase 權限管理系統

> 本專案使用 **@delon/acl** 與 **Firebase Firestore** 整合的權限管理系統，實現基於角色的訪問控制 (RBAC)。
>
> 設計原則：**極簡主義、安全優先、易於管理、與 ng-alain 架構一致**。

## 系統架構

```
Firebase Auth (認證) → Firestore (角色/權限存儲) → Delon ACL (前端權限控制) → Route Guards (路由保護)
```

## Firebase Firestore 資料結構

### 用戶角色集合 (user_roles)
```typescript
interface UserRole {
  uid: string;                    // Firebase Auth UID
  email: string;                  // 用戶郵箱
  displayName?: string;           // 顯示名稱
  roles: string[];                // 角色列表
  permissions: string[];          // 權限列表
  isActive: boolean;              // 是否啟用
  createdAt: Timestamp;           // 創建時間
  updatedAt: Timestamp;           // 更新時間
  lastLoginAt?: Timestamp;        // 最後登入時間
}

// Firestore 路徑: /user_roles/{uid}
```

### 角色定義集合 (roles)
```typescript
interface Role {
  id: string;                     // 角色 ID
  name: string;                   // 角色名稱
  description: string;            // 角色描述
  permissions: string[];          // 權限列表
  isSystem: boolean;              // 是否為系統角色
  createdAt: Timestamp;           // 創建時間
  updatedAt: Timestamp;           // 更新時間
}

// Firestore 路徑: /roles/{roleId}
```

### 權限定義集合 (permissions)
```typescript
interface Permission {
  id: string;                     // 權限 ID
  name: string;                   // 權限名稱
  description: string;            // 權限描述
  resource: string;               // 資源類型
  action: string;                 // 操作類型
  isSystem: boolean;              // 是否為系統權限
  createdAt: Timestamp;           // 創建時間
}

// Firestore 路徑: /permissions/{permissionId}
```

## 系統角色定義

```typescript
// 預定義角色
export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
  USER: 'user',
  GUEST: 'guest'
} as const;

// 預定義權限
export const SYSTEM_PERMISSIONS = {
  // 用戶管理
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',

  // 系統管理
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_ROLES: 'system:roles',

  // 專案管理
  PROJECT_CREATE: 'project:create',
  PROJECT_READ: 'project:read',
  PROJECT_UPDATE: 'project:update',
  PROJECT_DELETE: 'project:delete',

  // 代碼生成
  CODE_GENERATE: 'code:generate',
  CODE_REVIEW: 'code:review',

  // 知識管理
  KNOWLEDGE_READ: 'knowledge:read',
  KNOWLEDGE_WRITE: 'knowledge:write',
  KNOWLEDGE_DELETE: 'knowledge:delete'
} as const;
```

## Firebase 整合服務

### Firebase ACL 服務
```typescript
import { Injectable, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ACLService } from '@delon/acl';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseACLService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly aclSrv = inject(ACLService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // 監聽 Firebase Auth 狀態變化
    authState(this.auth).subscribe(async (user) => {
      this.currentUserSubject.next(user);

      if (user) {
        await this.loadUserRoles(user.uid);
      } else {
        this.clearACL();
      }
    });
  }

  // 載入用戶角色和權限
  private async loadUserRoles(uid: string): Promise<void> {
    try {
      const userRoleDoc = await getDoc(doc(this.firestore, 'user_roles', uid));

      if (userRoleDoc.exists()) {
        const userRole = userRoleDoc.data() as UserRole;

        // 設置 Delon ACL
        this.aclSrv.set({
          role: userRole.roles,
          ability: userRole.permissions
        });
      } else {
        // 新用戶，設置預設角色
        await this.createDefaultUserRole(uid);
      }
    } catch (error) {
      console.error('載入用戶角色失敗:', error);
      this.clearACL();
    }
  }

  // 創建預設用戶角色
  private async createDefaultUserRole(uid: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;

    const defaultUserRole: UserRole = {
      uid,
      email: user.email || '',
      displayName: user.displayName || '',
      roles: [SYSTEM_ROLES.USER],
      permissions: [SYSTEM_PERMISSIONS.USER_READ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(this.firestore, 'user_roles', uid), defaultUserRole);

    // 設置 ACL
    this.aclSrv.set({
      role: defaultUserRole.roles,
      ability: defaultUserRole.permissions
    });
  }

  // 更新用戶角色
  async updateUserRoles(uid: string, roles: string[], permissions: string[]): Promise<void> {
    const userRoleRef = doc(this.firestore, 'user_roles', uid);

    await updateDoc(userRoleRef, {
      roles,
      permissions,
      updatedAt: new Date()
    });

    // 如果是當前用戶，立即更新 ACL
    if (uid === this.auth.currentUser?.uid) {
      this.aclSrv.set({
        role: roles,
        ability: permissions
      });
    }
  }

  // 檢查用戶權限
  can(permission: string): boolean {
    return this.aclSrv.can(permission);
  }

  // 檢查用戶角色
  hasRole(role: string): boolean {
    return this.aclSrv.hasRole(role);
  }

  // 清除 ACL
  private clearACL(): void {
    this.aclSrv.setFull(false);
    this.aclSrv.set({ role: [], ability: [] });
  }

  // 獲取當前用戶角色
  getCurrentUserRoles(): string[] {
    return this.aclSrv.data.roles;
  }

  // 獲取當前用戶權限
  getCurrentUserPermissions(): Array<string | number> {
    return this.aclSrv.data.abilities;
  }
}
```

## 路由守衛整合

### Firebase ACL 路由守衛
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FirebaseACLService } from './firebase-acl.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseACLGuard implements CanActivate {
  constructor(
    private firebaseACL: FirebaseACLService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const requiredPermissions = route.data['permissions'] as string[];

    // 檢查角色
    if (requiredRoles?.length) {
      const hasRole = requiredRoles.some(role => this.firebaseACL.hasRole(role));
      if (!hasRole) {
        this.router.navigate(['/passport/login']);
        return false;
      }
    }

    // 檢查權限
    if (requiredPermissions?.length) {
      const hasPermission = requiredPermissions.some(permission =>
        this.firebaseACL.can(permission)
      );
      if (!hasPermission) {
        this.router.navigate(['/exception/403']);
        return false;
      }
    }

    return true;
  }
}
```

## 路由配置

### 使用 Firebase ACL 守衛
```typescript
// routes.ts
import { Routes } from '@angular/router';
import { FirebaseACLGuard } from '@core/guards/firebase-acl.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [FirebaseACLGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { permissions: [SYSTEM_PERMISSIONS.PROJECT_READ] }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {
          roles: [SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.SUPER_ADMIN],
          permissions: [SYSTEM_PERMISSIONS.SYSTEM_CONFIG]
        }
      },
      {
        path: 'users',
        component: UserManagementComponent,
        data: {
          roles: [SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.MANAGER],
          permissions: [SYSTEM_PERMISSIONS.USER_READ]
        }
      }
    ]
  }
];
```

## 模板使用

### 權限指令使用
```html
<!-- 基於權限顯示 -->
<button
  *acl="SYSTEM_PERMISSIONS.USER_CREATE"
  (click)="createUser()">
  創建用戶
</button>

<!-- 基於角色顯示 -->
<div *acl="[SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.MANAGER]">
  管理員專用內容
</div>

<!-- 條件顯示 -->
<th *acl="[SYSTEM_PERMISSIONS.USER_UPDATE, SYSTEM_PERMISSIONS.USER_DELETE]">
  操作
</th>
```

## Firestore 安全規則

### 用戶角色安全規則
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用戶角色文檔
    match /user_roles/{userId} {
      // 用戶只能讀取自己的角色
      allow read: if request.auth != null && request.auth.uid == userId;

      // 管理員可以讀取所有用戶角色
      allow read: if request.auth != null &&
        exists(/databases/$(database)/documents/user_roles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/user_roles/$(request.auth.uid)).data.roles.hasAny(['admin', 'super_admin']);

      // 只有管理員可以更新用戶角色
      allow write: if request.auth != null &&
        exists(/databases/$(database)/documents/user_roles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/user_roles/$(request.auth.uid)).data.roles.hasAny(['admin', 'super_admin']);
    }

    // 角色定義文檔
    match /roles/{roleId} {
      // 所有認證用戶可以讀取角色定義
      allow read: if request.auth != null;

      // 只有超級管理員可以修改角色定義
      allow write: if request.auth != null &&
        exists(/databases/$(database)/documents/user_roles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/user_roles/$(request.auth.uid)).data.roles.hasAny(['super_admin']);
    }

    // 權限定義文檔
    match /permissions/{permissionId} {
      // 所有認證用戶可以讀取權限定義
      allow read: if request.auth != null;

      // 只有超級管理員可以修改權限定義
      allow write: if request.auth != null &&
        exists(/databases/$(database)/documents/user_roles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/user_roles/$(request.auth.uid)).data.roles.hasAny(['super_admin']);
    }
  }
}
```

## 初始化腳本

### 系統初始化
```typescript
// 初始化系統角色和權限
export async function initializeSystemRoles(firestore: Firestore): Promise<void> {
  const roles = [
    {
      id: SYSTEM_ROLES.SUPER_ADMIN,
      name: '超級管理員',
      description: '擁有所有權限',
      permissions: Object.values(SYSTEM_PERMISSIONS),
      isSystem: true
    },
    {
      id: SYSTEM_ROLES.ADMIN,
      name: '管理員',
      description: '系統管理權限',
      permissions: [
        SYSTEM_PERMISSIONS.USER_CREATE,
        SYSTEM_PERMISSIONS.USER_READ,
        SYSTEM_PERMISSIONS.USER_UPDATE,
        SYSTEM_PERMISSIONS.PROJECT_CREATE,
        SYSTEM_PERMISSIONS.PROJECT_READ,
        SYSTEM_PERMISSIONS.PROJECT_UPDATE,
        SYSTEM_PERMISSIONS.KNOWLEDGE_READ,
        SYSTEM_PERMISSIONS.KNOWLEDGE_WRITE
      ],
      isSystem: true
    },
    {
      id: SYSTEM_ROLES.USER,
      name: '一般用戶',
      description: '基本使用權限',
      permissions: [
        SYSTEM_PERMISSIONS.PROJECT_READ,
        SYSTEM_PERMISSIONS.KNOWLEDGE_READ
      ],
      isSystem: true
    }
  ];

  for (const role of roles) {
    await setDoc(doc(firestore, 'roles', role.id), {
      ...role,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
```

## 使用檢查清單

- [ ] 配置 Firebase 專案和 Firestore
- [ ] 初始化系統角色和權限
- [ ] 整合 FirebaseACLService 到應用程式
- [ ] 配置路由守衛
- [ ] 設置 Firestore 安全規則
- [ ] 測試權限控制功能
- [ ] 實作用戶角色管理介面
- [ ] 配置錯誤處理和重定向

> **核心原則**: 使用 delon ACL 提供前端權限控制，Firebase Firestore 提供後端權限存儲，實現完整的 RBAC 系統。
description: |
  Delon ACL + Firebase 權限管理系統，整合 @delon/acl 與 Firebase Firestore。
  提供完整的 RBAC 實作，包括角色管理、權限控制和路由保護。
  遵循極簡主義原則，與 ng-alain 架構保持一致。
globs:
  - "src/app/core/auth/**/*"
  - "src/app/core/guards/**/*"
  - "src/app/shared/directives/**/*"
  - "firestore.rules"
  - "**/*.ts"
alwaysApply: false
---
