# Frameworks Rules for ng-alain Project

## Core Framework Stack

### 1. 主要框架
- **Angular 20.0.0**：核心前端框架
- **ng-alain 20.0.0**：企業級管理後台框架
- **TypeScript 5.8.2**：開發語言（嚴格模式）

### 2. UI 框架
- **ng-zorro-antd 20.0.0**：Ant Design 元件庫
- **@delon/abc 20.0.0**：業務元件庫
- **@delon/theme 20.0.0**：主題系統

### 3. 後端服務
- **Firebase 12.0.0**：後端即服務
- **AngularFire 20.0.1**：Firebase Angular 整合

## Angular 20 最佳實踐

### 1. 控制流程語法
```typescript
// 使用新的控制流程語法
@Component({
  template: `
    @if (user$ | async; as user) {
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
      </div>
    } @else {
      <nz-spin nzSize="large" />
    }

    @for (item of items$ | async; track item.id) {
      <div class="item">{{ item.name }}</div>
    } @empty {
      <div class="empty">沒有資料</div>
    }
  `
})
export class UserComponent {
  user$ = this.userService.getCurrentUser();
  items$ = this.itemService.getItems();
}
```

### 2. 獨立元件
```typescript
// 使用獨立元件
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzAvatarModule],
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>{{ user.name }}</nz-card-title>
      </nz-card-header>
      <nz-card-content>
        <p>{{ user.email }}</p>
      </nz-card-content>
    </nz-card>
  `
})
export class UserCardComponent {
  @Input() user!: User;
}
```

### 3. 依賴注入
```typescript
// 使用 inject() 函數
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent {
  private readonly userService = inject(UserService);
  private readonly message = inject(NzMessageService);

  users$ = this.userService.getUsers();

  onUserClick(user: User): void {
    this.message.success(`選擇了用戶：${user.name}`);
  }
}
```

## ng-alain 框架使用

### 1. 佈局系統
```typescript
// 基本佈局
@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options">
      <ng-template #contentTpl>
        <router-outlet />
      </ng-template>
    </layout-default>
  `
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`
  };
}
```

### 2. 表格元件 (ST)
```typescript
// 使用 ST 表格
@Component({
  template: `
    <st #st [data]="data" [columns]="columns" [req]="req" [res]="res">
      <ng-template st-row="custom" let-item>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>
          <button nz-button nzType="primary" (click)="edit(item)">編輯</button>
        </td>
      </ng-template>
    </st>
  `
})
export class UserListComponent {
  data = 'users';
  columns: STColumn[] = [
    { title: '姓名', index: 'name' },
    { title: '郵箱', index: 'email' },
    { title: '操作', type: 'custom' }
  ];

  req: STReq = {
    method: 'GET',
    url: '/api/users',
    params: { page: 1, size: 10 }
  };

  res: STRes = {
    process: (data: any[]) => data.map(item => ({ ...item, key: item.id }))
  };
}
```

### 3. 表單元件 (SF)
```typescript
// 使用 SF 表單
@Component({
  template: `
    <sf #sf [schema]="schema" [formData]="formData" (formSubmit)="onSubmit($event)">
      <div class="sf__footer">
        <button nz-button nzType="primary" [disabled]="!sf.valid">提交</button>
        <button nz-button (click)="reset()">重置</button>
      </div>
    </sf>
  `
})
export class UserFormComponent {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        maxLength: 50,
        ui: {
          placeholder: '請輸入姓名'
        }
      },
      email: {
        type: 'string',
        title: '郵箱',
        format: 'email',
        ui: {
          placeholder: '請輸入郵箱'
        }
      },
      role: {
        type: 'string',
        title: '角色',
        enum: [
          { label: '管理員', value: 'admin' },
          { label: '用戶', value: 'user' }
        ],
        ui: {
          widget: 'select'
        }
      }
    },
    required: ['name', 'email', 'role']
  };

  formData = {};

  onSubmit(value: any): void {
    console.log('表單提交：', value);
  }

  reset(): void {
    this.formData = {};
  }
}
```

### 4. 搜尋元件 (SE)
```typescript
// 使用 SE 搜尋
@Component({
  template: `
    <se #se [schema]="schema" [formData]="formData" (formSubmit)="onSearch($event)">
      <div class="se__footer">
        <button nz-button nzType="primary">搜尋</button>
        <button nz-button (click)="reset()">重置</button>
      </div>
    </se>
  `
})
export class UserSearchComponent {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        ui: {
          placeholder: '請輸入姓名'
        }
      },
      role: {
        type: 'string',
        title: '角色',
        enum: [
          { label: '全部', value: '' },
          { label: '管理員', value: 'admin' },
          { label: '用戶', value: 'user' }
        ],
        ui: {
          widget: 'select'
        }
      }
    }
  };

  formData = {};

  onSearch(value: any): void {
    console.log('搜尋條件：', value);
  }

  reset(): void {
    this.formData = {};
  }
}
```

## ng-zorro-antd 使用

### 1. 基礎元件
```typescript
// 按鈕元件
<button nz-button nzType="primary" [disabled]="isLoading" (click)="save()">
  <i nz-icon nzType="save"></i>
  儲存
</button>

// 表格元件
<nz-table #basicTable [nzData]="data" [nzLoading]="loading">
  <thead>
    <tr>
      <th>姓名</th>
      <th>郵箱</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of basicTable.data">
      <td>{{ data.name }}</td>
      <td>{{ data.email }}</td>
      <td>
        <a nz-button nzType="link" (click)="edit(data)">編輯</a>
        <a nz-button nzType="link" nzDanger (click)="delete(data)">刪除</a>
      </td>
    </tr>
  </tbody>
</nz-table>

// 表單元件
<form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
  <nz-form-item>
    <nz-form-label [nzSpan]="6" nzRequired>姓名</nz-form-label>
    <nz-form-control [nzSpan]="14" nzErrorTip="請輸入姓名">
      <input nz-input formControlName="name" placeholder="請輸入姓名" />
    </nz-form-control>
  </nz-form-item>

  <nz-form-item>
    <nz-form-label [nzSpan]="6" nzRequired>郵箱</nz-form-label>
    <nz-form-control [nzSpan]="14" nzErrorTip="請輸入有效的郵箱">
      <input nz-input formControlName="email" placeholder="請輸入郵箱" />
    </nz-form-control>
  </nz-form-item>

  <nz-form-item>
    <nz-form-control [nzOffset]="6" [nzSpan]="14">
      <button nz-button nzType="primary" [disabled]="!form.valid">提交</button>
    </nz-form-control>
  </nz-form-item>
</form>
```

### 2. 進階元件
```typescript
// 模態框
<nz-modal
  [(nzVisible)]="isVisible"
  nzTitle="編輯用戶"
  (nzOnCancel)="handleCancel()"
  (nzOnOk)="handleOk()">
  <ng-container *nzModalContent>
    <app-user-form [user]="currentUser" (formSubmit)="onFormSubmit($event)" />
  </ng-container>
</nz-modal>

// 通知
constructor(private message: NzMessageService) {}

showSuccess(): void {
  this.message.success('操作成功');
}

showError(): void {
  this.message.error('操作失敗');
}

// 確認對話框
constructor(private modal: NzModalService) {}

showDeleteConfirm(user: User): void {
  this.modal.confirm({
    nzTitle: '確認刪除',
    nzContent: `確定要刪除用戶 ${user.name} 嗎？`,
    nzOkText: '確定',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteUser(user.id),
    nzCancelText: '取消'
  });
}
```

## Firebase 整合

### 1. Firebase 配置
```typescript
// app.config.ts
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    // Firebase 配置
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'your-api-key',
        authDomain: 'your-project.firebaseapp.com',
        projectId: 'your-project-id',
        storageBucket: 'your-project.appspot.com',
        messagingSenderId: '123456789',
        appId: 'your-app-id'
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ]
};
```

### 2. Firestore 操作
```typescript
// Firestore 服務
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly firestore = inject(Firestore);

  // 取得集合
  getCollection<T>(collectionName: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return from(getDocs(collectionRef)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as T))
      )
    );
  }

  // 新增文件
  addDocument<T>(collectionName: string, data: Omit<T, 'id'>): Observable<{ id: string }> {
    const collectionRef = collection(this.firestore, collectionName);
    return from(addDoc(collectionRef, data as DocumentData)).pipe(
      map(docRef => ({ id: docRef.id }))
    );
  }

  // 更新文件
  updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Observable<void> {
    const docRef = doc(this.firestore, collectionName, id);
    return from(updateDoc(docRef, data as DocumentData));
  }

  // 刪除文件
  deleteDocument(collectionName: string, id: string): Observable<void> {
    const docRef = doc(this.firestore, collectionName, id);
    return from(deleteDoc(docRef));
  }
}
```

### 3. 認證服務
```typescript
// 認證服務
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);

  // 當前用戶
  currentUser$ = user(this.auth);

  // 登入
  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // 註冊
  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // 登出
  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
```

## 狀態管理

### 1. 使用 RxJS
```typescript
// 狀態管理服務
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly stateSubject = new BehaviorSubject<AppState>(initialState);
  state$ = this.stateSubject.asObservable();

  // 更新狀態
  updateState(newState: Partial<AppState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...newState
    });
  }

  // 選擇器
  select<K extends keyof AppState>(key: K): Observable<AppState[K]> {
    return this.state$.pipe(
      map(state => state[key])
    );
  }
}
```

### 2. 使用 Signals (Angular 20)
```typescript
// 使用 Signals
@Component({
  selector: 'app-user-list',
  template: `
    @if (users(); as userList) {
      <div *ngFor="let user of userList">
        {{ user.name }}
      </div>
    }
  `
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  // 使用 Signals
  users = signal<User[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(users => {
      this.users.set(users);
    });
  }
}
```

## 路由配置

### 1. 懶載入路由
```typescript
// 路由配置
export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];
```

### 2. 路由守衛
```typescript
// 認證守衛
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean> {
    return user(this.auth).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
```

## 效能優化

### 1. 變更檢測策略
```typescript
// 使用 OnPush 策略
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;

  // 使用 trackBy 函數
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

### 2. 虛擬滾動
```typescript
// 大量資料使用虛擬滾動
<nz-virtual-scroll-viewport [itemSize]="54" [maxBufferPx]="200" [minBufferPx]="100">
  <div *cdkVirtualFor="let user of users; trackBy: trackByUserId">
    <app-user-card [user]="user" />
  </div>
</nz-virtual-scroll-viewport>
```

## 測試框架

### 1. 單元測試
```typescript
// 服務測試
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

  it('should load users', () => {
    const mockUsers = [{ id: '1', name: 'User 1' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush(mockUsers);
  });
});
```

### 2. 元件測試
```typescript
// 元件測試
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 框架檢查清單

### ✅ 必須遵循
- [ ] 使用 Angular 20 新特性
- [ ] 使用 ng-alain 內建元件
- [ ] 使用 ng-zorro-antd 元件庫
- [ ] 實現懶載入路由
- [ ] 使用 OnPush 變更檢測
- [ ] 實現適當的錯誤處理
- [ ] 使用 TypeScript 嚴格模式

### ❌ 禁止事項
- [ ] 使用過時的 Angular 語法
- [ ] 直接操作 DOM
- [ ] 使用 any 型別
- [ ] 忽略錯誤處理
- [ ] 建立不必要的抽象層
- [ ] 使用非官方 Firebase SDK

> **核心原則**：充分利用 Angular 20 和 ng-alain 框架特性，保持代碼簡潔高效。
