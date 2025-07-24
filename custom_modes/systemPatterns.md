# 系統架構模式

## 整體架構設計

### 🏗️ 核心架構原則

1. **模組化分離**: 每個功能模組獨立，降低耦合度
2. **服務導向**: 業務邏輯集中在服務層，組件專注於 UI 互動
3. **響應式設計**: 全面採用 RxJS 處理非同步資料流
4. **型別安全**: 100% TypeScript 嚴格模式，確保編譯時型別檢查
5. **效能優先**: OnPush 變更檢測策略，最小化不必要的重新渲染

### 📁 目錄結構模式

```
ng-alain/src/app/
├── core/                           # 核心服務與設定
│   ├── firebase/                   # Firebase 整合服務
│   │   ├── firebase-acl.service.ts
│   │   ├── firebase-user.service.ts
│   │   ├── firebase-system.service.ts   # 🆕 新增系統管理服務
│   │   └── models/                      # 🆕 Firebase 資料模型
│   ├── services/                   # 通用服務
│   └── startup/                    # 應用啟動設定
├── routes/                         # 路由模組
│   ├── system/                     # 🆕 統一系統管理模組
│   │   ├── routes.ts               # 系統管理路由配置
│   │   ├── shared/                 # 共用組件與服務
│   │   ├── account/                # 帳號管理
│   │   ├── role/                   # 角色管理
│   │   ├── menu/                   # 菜單管理
│   │   └── department/             # 部門管理
│   └── delon/                      # 🚫 移除舊的分散 ACL 頁面
└── shared/                         # 共用組件與工具
```

## 🔧 服務層架構模式

### Firebase 服務層設計

```typescript
// 基礎 Firebase 服務抽象類別
abstract class BaseFirebaseService<T> {
  protected abstract collectionName: string;
  
  // 標準 CRUD 操作
  create(data: Partial<T>): Observable<string>
  read(id: string): Observable<T | null>
  update(id: string, data: Partial<T>): Observable<void>
  delete(id: string): Observable<void>
  list(query?: QueryConstraint[]): Observable<T[]>
  
  // 批量操作
  batchCreate(items: Partial<T>[]): Observable<string[]>
  batchUpdate(updates: {id: string, data: Partial<T>}[]): Observable<void>
  batchDelete(ids: string[]): Observable<void>
}

// 具體實作範例
@Injectable({providedIn: 'root'})
export class UserService extends BaseFirebaseService<User> {
  protected collectionName = 'users';
  
  // 特定業務邏輯
  getUsersByDepartment(deptId: string): Observable<User[]>
  assignRolesToUser(userId: string, roleIds: string[]): Observable<void>
  resetPassword(userId: string): Observable<void>
}
```

### 權限服務整合模式

```typescript
@Injectable({providedIn: 'root'})
export class SystemPermissionService {
  constructor(
    private aclService: ACLService,
    private firebaseAcl: FirebaseACLService
  ) {}
  
  // 權限檢查統一入口
  canAccess(resource: string, action: string): Observable<boolean>
  
  // 動態權限載入
  loadUserPermissions(userId: string): Observable<void>
  
  // 權限變更通知
  onPermissionsChanged(): Observable<string[]>
}
```

## 🎨 組件架構模式

### OnPush 組件基礎模式

```typescript
@Component({
  selector: 'system-base-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-card>
      <!-- 搜尋與篩選區域 -->
      <div nz-row [nzGutter]="16" class="search-area">
        <div nz-col [nzSpan]="6">
          <nz-input-group nzPrefixIcon="search">
            <input nz-input placeholder="搜尋..." 
                   [ngModel]="searchTerm$ | async"
                   (ngModelChange)="searchSubject.next($event)">
          </nz-input-group>
        </div>
        <div nz-col [nzSpan]="6">
          <nz-select placeholder="選擇部門" 
                     [ngModel]="selectedDept$ | async"
                     (ngModelChange)="deptSubject.next($event)">
            <nz-option *ngFor="let dept of departments$ | async" 
                       [nzValue]="dept.id" [nzLabel]="dept.name">
            </nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="12" class="text-right">
          <button nz-button nzType="primary" (click)="openCreateModal()">
            <i nz-icon nzType="plus"></i> 新增
          </button>
        </div>
      </div>

      <!-- 資料表格 -->
      <st [data]="data$ | async" 
          [columns]="columns" 
          [loading]="loading$ | async"
          [total]="total$ | async"
          [pi]="page$ | async"
          [ps]="pageSize$ | async"
          (change)="onTableChange($event)">
      </st>
    </nz-card>
  `
})
export class BaseListComponent implements OnInit {
  // 響應式資料流
  data$ = this.service.list$.pipe(
    map(items => items.map(item => ({
      ...item,
      statusBadge: this.getStatusBadge(item.status)
    })))
  );
  
  loading$ = this.service.loading$;
  total$ = this.service.total$;
  
  // 搜尋與篩選
  searchSubject = new BehaviorSubject('');
  deptSubject = new BehaviorSubject('');
  pageSubject = new BehaviorSubject(1);
  
  searchTerm$ = this.searchSubject.asObservable();
  selectedDept$ = this.deptSubject.asObservable();
  page$ = this.pageSubject.asObservable();
  
  constructor(
    protected service: BaseService,
    protected cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    // 整合搜尋條件
    combineLatest([
      this.searchTerm$,
      this.selectedDept$,
      this.page$
    ]).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(([search, dept, page]) => {
      this.service.loadData({ search, dept, page });
    });
  }
}
```

### 彈窗組件模式

```typescript
@Component({
  selector: 'system-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-modal [(nzVisible)]="visible" 
              [nzTitle]="title" 
              [nzOkLoading]="submitting$ | async"
              (nzOnOk)="onSubmit()"
              (nzOnCancel)="onCancel()">
      
      <ng-container *nzModalContent>
        <form nz-form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- 動態表單內容 -->
          <div *ngFor="let field of formFields" [ngSwitch]="field.type">
            
            <!-- 文字輸入 -->
            <nz-form-item *ngSwitchCase="'text'">
              <nz-form-label [nzRequired]="field.required">{{field.label}}</nz-form-label>
              <nz-form-control [nzErrorTip]="field.errorTip">
                <input nz-input [formControlName]="field.key" [placeholder]="field.placeholder">
              </nz-form-control>
            </nz-form-item>
            
            <!-- 選擇器 -->
            <nz-form-item *ngSwitchCase="'select'">
              <nz-form-label [nzRequired]="field.required">{{field.label}}</nz-form-label>
              <nz-form-control [nzErrorTip]="field.errorTip">
                <nz-select [formControlName]="field.key" [nzPlaceHolder]="field.placeholder">
                  <nz-option *ngFor="let option of field.options" 
                             [nzValue]="option.value" 
                             [nzLabel]="option.label">
                  </nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
            
          </div>
        </form>
      </ng-container>
      
    </nz-modal>
  `
})
export class BaseModalComponent implements OnInit {
  @Input() visible = false;
  @Input() title = '';
  @Input() data: any = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitted = new EventEmitter<any>();
  
  form: FormGroup;
  formFields: FormField[] = [];
  submitting$ = new BehaviorSubject(false);
  
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  
  protected buildForm(fields: FormField[]): void {
    this.formFields = fields;
    const formConfig: {[key: string]: any} = {};
    
    fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      formConfig[field.key] = [field.defaultValue || '', validators];
    });
    
    this.form = this.fb.group(formConfig);
  }
  
  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    
    this.submitting$.next(true);
    const formData = this.form.value;
    
    this.submitted.emit({
      isEdit: !!this.data,
      data: this.data ? { ...this.data, ...formData } : formData
    });
  }
}
```

## 🚦 路由與權限模式

### 路由配置模式

```typescript
// system/routes.ts
export const routes: Routes = [
  {
    path: '',
    component: SystemLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      },
      {
        path: 'account',
        loadComponent: () => import('./account/account.component').then(m => m.AccountComponent),
        data: { 
          title: '帳號管理',
          key: 'system:account',
          permissions: ['system:account:view']
        },
        canActivate: [PermissionGuard]
      },
      {
        path: 'role',
        loadComponent: () => import('./role/role.component').then(m => m.RoleComponent),
        data: { 
          title: '角色管理',
          key: 'system:role',
          permissions: ['system:role:view']
        },
        canActivate: [PermissionGuard]
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent),
        data: { 
          title: '菜單管理',
          key: 'system:menu',
          permissions: ['system:menu:view']
        },
        canActivate: [PermissionGuard]
      },
      {
        path: 'department',
        loadComponent: () => import('./department/department.component').then(m => m.DepartmentComponent),
        data: { 
          title: '部門管理',
          key: 'system:department',
          permissions: ['system:department:view']
        },
        canActivate: [PermissionGuard]
      }
    ]
  }
];
```

### 權限守衛模式

```typescript
@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate {
  constructor(
    private aclService: ACLService,
    private router: Router,
    private message: NzMessageService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const permissions = route.data['permissions'] as string[];
    
    if (!permissions || permissions.length === 0) {
      return of(true);
    }
    
    return this.aclService.can(permissions).pipe(
      map(hasPermission => {
        if (!hasPermission) {
          this.message.error('您沒有權限存取此功能');
          this.router.navigate(['/exception/403']);
        }
        return hasPermission;
      })
    );
  }
}
```

## 📊 資料模型模式

### 統一資料介面

```typescript
// core/firebase/models/base.model.ts
export interface BaseModel {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
  status: 'active' | 'inactive' | 'deleted';
}

// 用戶模型
export interface User extends BaseModel {
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  departmentId?: string;
  roleIds: string[];
  lastLoginAt?: Timestamp;
  isEmailVerified: boolean;
}

// 角色模型
export interface Role extends BaseModel {
  name: string;
  description?: string;
  permissions: string[];
  isSystemRole: boolean;
  priority: number;
}

// 部門模型
export interface Department extends BaseModel {
  name: string;
  description?: string;
  parentId?: string;
  path: string;
  level: number;
  sort: number;
  managerIds: string[];
}

// 菜單模型
export interface Menu extends BaseModel {
  name: string;
  path?: string;
  icon?: string;
  parentId?: string;
  sort: number;
  isVisible: boolean;
  requiredPermissions: string[];
  type: 'menu' | 'page' | 'button';
}
```

### Firebase 查詢模式

```typescript
// 標準查詢建構器
export class FirebaseQueryBuilder {
  private constraints: QueryConstraint[] = [];
  
  where(field: string, operator: WhereFilterOp, value: any): this {
    this.constraints.push(where(field, operator, value));
    return this;
  }
  
  orderBy(field: string, direction: OrderByDirection = 'asc'): this {
    this.constraints.push(orderBy(field, direction));
    return this;
  }
  
  limit(limit: number): this {
    this.constraints.push(limit(limit));
    return this;
  }
  
  build(): QueryConstraint[] {
    return this.constraints;
  }
}

// 使用範例
const queryBuilder = new FirebaseQueryBuilder()
  .where('status', '==', 'active')
  .where('departmentId', '==', deptId)
  .orderBy('createdAt', 'desc')
  .limit(50);

const users = await this.userService.list(queryBuilder.build());
```

## 🔄 狀態管理模式

### 服務狀態管理

```typescript
@Injectable({providedIn: 'root'})
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  
  // 公開的狀態流
  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  
  // 派生狀態
  activeUsers$ = this.users$.pipe(
    map(users => users.filter(user => user.status === 'active'))
  );
  
  totalCount$ = this.users$.pipe(
    map(users => users.length)
  );
  
  constructor(private userService: UserService) {}
  
  // 狀態操作方法
  loadUsers(query?: any): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    this.userService.list(query).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe({
      next: users => this.usersSubject.next(users),
      error: error => this.errorSubject.next(error.message)
    });
  }
  
  addUser(user: Partial<User>): Observable<string> {
    return this.userService.create(user).pipe(
      tap(() => this.loadUsers()) // 重新載入資料
    );
  }
  
  updateUser(id: string, data: Partial<User>): Observable<void> {
    return this.userService.update(id, data).pipe(
      tap(() => this.loadUsers())
    );
  }
}
```

## 🧪 測試模式

### 組件測試模式

```typescript
describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let aclService: jasmine.SpyObj<ACLService>;
  
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['list', 'create', 'update', 'delete']);
    const aclServiceSpy = jasmine.createSpyObj('ACLService', ['can']);
    
    await TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ACLService, useValue: aclServiceSpy }
      ]
    }).compileComponents();
    
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    aclService = TestBed.inject(ACLService) as jasmine.SpyObj<ACLService>;
    
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });
  
  it('should load users on init', () => {
    const mockUsers = [{ id: '1', email: 'test@example.com' }];
    userService.list.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(userService.list).toHaveBeenCalled();
    component.data$.subscribe(data => {
      expect(data).toEqual(mockUsers);
    });
  });
});
```

## 📋 程式碼品質模式

### TypeScript 嚴格模式配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### ESLint 規則配置

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  }
];
```

---

**架構原則**: 高內聚、低耦合、可測試、可維護  
**效能策略**: OnPush + RxJS + Firebase 優化  
**安全考量**: 型別安全 + 權限控制 + 資料驗證 
