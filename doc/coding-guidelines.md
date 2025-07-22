# Coding Guidelines for ng-alain Project

## Core Principles

### 1. 極簡主義編碼
- **單檔 <100 行**：保持檔案簡潔
- **單一職責**：每個函數只做一件事
- **最少依賴**：避免不必要的導入

### 2. TypeScript 嚴格模式
- **嚴禁使用 any**：所有型別必須明確
- **嚴格空值檢查**：使用 strictNullChecks
- **函數型別檢查**：使用 strictFunctionTypes

## 命名規範

### 1. 檔案命名
```typescript
// 元件檔案
user-list.component.ts
user-list.component.html
user-list.component.less
user-list.component.spec.ts

// 服務檔案
user.service.ts
user.service.spec.ts

// 模組檔案
user.module.ts
user-routing.module.ts

// 介面檔案
user.interface.ts
user.model.ts
```

### 2. 類別命名
```typescript
// 元件類別
export class UserListComponent {}

// 服務類別
export class UserService {}

// 模組類別
export class UserModule {}

// 介面
export interface User {
  id: string;
  name: string;
  email: string;
}

// 型別別名
export type UserStatus = 'active' | 'inactive' | 'pending';
```

### 3. 變數命名
```typescript
// 常數
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// 變數
const userName = 'John Doe';
const userList: User[] = [];
const isLoading = false;

// 私有變數
private readonly http = inject(HttpClient);
private dataSubject = new BehaviorSubject<User[]>([]);
```

### 4. 函數命名
```typescript
// 動詞開頭
loadUsers(): Observable<User[]> {}
createUser(user: User): Observable<User> {}
updateUser(id: string, user: Partial<User>): Observable<void> {}
deleteUser(id: string): Observable<void> {}

// 布林函數
isUserActive(user: User): boolean {}
hasPermission(permission: string): boolean {}
canEdit(user: User): boolean {}
```

## 元件編碼規範

### 1. 元件結構
```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent {
  // 依賴注入
  private readonly userService = inject(UserService);

  // 輸入屬性
  @Input() showActions = true;

  // 輸出事件
  @Output() userSelected = new EventEmitter<User>();

  // 公開屬性
  users$ = this.userService.getUsers();

  // 私有屬性
  private destroy$ = new Subject<void>();

  // 生命週期
  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 公開方法
  onUserClick(user: User): void {
    this.userSelected.emit(user);
  }

  // 私有方法
  private loadUsers(): void {
    this.userService.loadUsers().subscribe();
  }
}
```

### 2. 模板編碼
```html
<!-- 使用結構型指令 -->
<div *ngIf="users$ | async as users; else loading">
  <div *ngFor="let user of users; trackBy: trackByUserId">
    <app-user-card
      [user]="user"
      [showActions]="showActions"
      (edit)="onEdit(user)"
      (delete)="onDelete(user)">
    </app-user-card>
  </div>
</div>

<ng-template #loading>
  <nz-spin nzSize="large" />
</ng-template>

<!-- 使用屬性綁定 -->
<nz-button
  nzType="primary"
  [disabled]="isLoading"
  (click)="onSave()">
  儲存
</nz-button>

<!-- 使用事件綁定 -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <nz-form-item>
    <nz-form-label>姓名</nz-form-label>
    <nz-form-control>
      <input nz-input formControlName="name" />
    </nz-form-control>
  </nz-form-item>
</form>
```

## 服務編碼規範

### 1. 服務結構
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly usersSubject = new BehaviorSubject<User[]>([]);

  // 公開 Observable
  users$ = this.usersSubject.asObservable();

  // 公開方法
  getUsers(): Observable<User[]> {
    return this.users$;
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>('/api/users', user).pipe(
      tap(newUser => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);
      })
    );
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, updates).pipe(
      tap(updatedUser => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(user =>
          user.id === id ? updatedUser : user
        );
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        const filteredUsers = currentUsers.filter(user => user.id !== id);
        this.usersSubject.next(filteredUsers);
      })
    );
  }
}
```

### 2. Firebase 服務編碼
```typescript
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {
  private readonly firestore = inject(Firestore);

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return from(getDocs(usersRef)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as User))
      )
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<{ id: string }> {
    const usersRef = collection(this.firestore, 'users');
    return from(addDoc(usersRef, user)).pipe(
      map(docRef => ({ id: docRef.id }))
    );
  }

  updateUser(id: string, updates: Partial<User>): Observable<void> {
    const userRef = doc(this.firestore, 'users', id);
    return from(updateDoc(userRef, updates));
  }

  deleteUser(id: string): Observable<void> {
    const userRef = doc(this.firestore, 'users', id);
    return from(deleteDoc(userRef));
  }
}
```

## 型別定義規範

### 1. 介面定義
```typescript
// 基礎介面
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 用戶介面
export interface User extends BaseEntity {
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  status: UserStatus;
}

// 枚舉定義
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

// 型別別名
export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdateData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
```

### 2. 泛型使用
```typescript
// 泛型服務
export interface CrudService<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T | null>;
  create(data: Omit<T, 'id'>): Observable<T>;
  update(id: string, data: Partial<T>): Observable<T>;
  delete(id: string): Observable<void>;
}

// 泛型元件
export interface ListComponent<T> {
  items: T[];
  loading: boolean;
  onItemClick(item: T): void;
  onItemEdit(item: T): void;
  onItemDelete(item: T): void;
}
```

## 錯誤處理規範

### 1. 服務錯誤處理
```typescript
import { catchError, throwError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(error => {
        console.error('Failed to load users:', error);
        return throwError(() => new Error('載入用戶失敗'));
      })
    );
  }
}
```

### 2. 元件錯誤處理
```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngIf="error$ | async as error; else content">
      <nz-result nzStatus="error" [nzTitle]="error.message">
        <button nz-button nzType="primary" (click)="retry()">重試</button>
      </nz-result>
    </div>
    <ng-template #content>
      <!-- 正常內容 -->
    </ng-template>
  `
})
export class UserListComponent {
  error$ = new BehaviorSubject<Error | null>(null);

  loadUsers(): void {
    this.userService.loadUsers().pipe(
      catchError(error => {
        this.error$.next(error);
        return EMPTY;
      })
    ).subscribe();
  }

  retry(): void {
    this.error$.next(null);
    this.loadUsers();
  }
}
```

## 測試編碼規範

### 1. 服務測試
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load users', () => {
    const mockUsers = [
      { id: '1', name: 'User 1', email: 'user1@example.com' },
      { id: '2', name: 'User 2', email: 'user2@example.com' }
    ];

    service.loadUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

### 2. 元件測試
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);
    spy.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
```

## 樣式編碼規範

### 1. Less 編碼
```less
// 變數定義
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;

@font-size-base: 14px;
@font-size-lg: 16px;
@font-size-sm: 12px;

@border-radius-base: 6px;
@border-radius-sm: 4px;

// 混入定義
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 元件樣式
.user-list {
  padding: 16px;

  &__header {
    .flex-center();
    margin-bottom: 16px;

    h2 {
      margin: 0;
      font-size: @font-size-lg;
      font-weight: 600;
    }
  }

  &__content {
    .user-card {
      margin-bottom: 12px;
      border-radius: @border-radius-base;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__empty {
    .flex-center();
    padding: 48px 16px;
    color: #999;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .user-list {
    padding: 12px;

    &__header {
      flex-direction: column;
      gap: 8px;
    }
  }
}
```

## 效能優化規範

### 1. 變更檢測優化
```typescript
// 使用 OnPush 策略
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // 使用 trackBy 函數
  trackByUserId(index: number, user: User): string {
    return user.id;
  }

  // 使用 async pipe
  users$ = this.userService.getUsers();
}
```

### 2. 記憶體管理
```typescript
// 使用 takeUntil 取消訂閱
export class UserListComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 程式碼品質檢查

### 1. ESLint 規則
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 2. Prettier 配置
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

## 編碼檢查清單

### ✅ 必須遵循
- [ ] 使用 TypeScript 嚴格模式
- [ ] 檔案長度 <100 行
- [ ] 使用 OnPush 變更檢測
- [ ] 實現適當的錯誤處理
- [ ] 使用 async pipe 管理訂閱
- [ ] 實現 trackBy 函數
- [ ] 使用 inject() 函數注入依賴

### ❌ 禁止事項
- [ ] 使用 any 型別
- [ ] 在元件中直接操作 DOM
- [ ] 建立過度複雜的函數
- [ ] 忽略錯誤處理
- [ ] 使用同步 HTTP 請求
- [ ] 建立單次使用的抽象層
- [ ] 使用 var 關鍵字

> **核心原則**：保持代碼簡潔、可讀、可維護，優先使用 ng-alain 內建功能。
