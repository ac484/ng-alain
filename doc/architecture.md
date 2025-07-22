# Architecture Rules for ng-alain Project

## Core Architecture Principles

### 1. 極簡主義架構
- **單一職責原則**：每個檔案只負責一個明確功能
- **最少依賴原則**：優先使用 ng-alain 內建功能
- **扁平結構原則**：避免過度嵌套的目錄結構

### 2. 模組化設計
- **功能模組化**：按業務功能組織代碼
- **懶載入優先**：所有路由模組使用懶載入
- **共享模組化**：可重用元件放在 shared 模組

## 專案結構規範

### 標準目錄結構
```
src/app/
├── core/                    # 核心服務
│   ├── firebase/           # Firebase 相關服務
│   ├── services/           # 核心業務服務
│   ├── guards/             # 路由守衛
│   ├── interceptors/       # HTTP 攔截器
│   ├── startup/            # 啟動服務
│   └── i18n/               # 國際化服務
├── layout/                 # 佈局元件
│   ├── basic/              # 基本佈局
│   ├── blank/              # 空白佈局
│   └── passport/           # 認證佈局
├── routes/                 # 功能模組
│   ├── dashboard/          # 儀表板
│   ├── delon/              # ng-alain 功能
│   ├── pro/                # 專業版功能
│   ├── passport/           # 認證相關
│   └── extras/             # 額外功能
├── shared/                 # 共享元件
│   ├── components/         # 共享元件
│   ├── pipes/              # 共享管道
│   ├── directives/         # 共享指令
│   └── utils/              # 工具函數
└── app.config.ts           # 應用配置
```

## 架構模式

### 1. Firebase 適配器模式
```typescript
// 統一 API 介面，支援 Mock 和真實服務
@Injectable()
export class FirebaseAdapterService {
  private readonly isMock = !environment.production;

  collection<T>(collectionName: string) {
    return {
      get: (): Observable<T[]> => {
        if (this.isMock) {
          return this.http.get<T[]>(`/api/firestore/${collectionName}`);
        }
        // 真實 Firebase 實作
        return from(getDocs(collection(this.firestore, collectionName)));
      }
    };
  }
}
```

### 2. 啟動服務模式
```typescript
// 應用初始化時載入必要資料
@Injectable()
export class StartupService {
  load(): Observable<void> {
    return zip(
      this.i18n.loadLangData(defaultLang),
      this.httpClient.get('./assets/tmp/app-data.json')
    ).pipe(
      map(([langData, appData]) => {
        this.i18n.use(defaultLang, langData);
        this.settingService.setApp(appData.app);
        this.settingService.setUser(appData.user);
        this.aclService.setFull(true);
        this.menuService.add(appData.menu);
      })
    );
  }
}
```

### 3. 路由守衛模式
```typescript
// 多層級路由保護
export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/routes').then(m => m.routes)
      }
    ]
  }
];
```

## 服務架構

### 1. 核心服務 (Core Services)
```typescript
// 放在 core/services 目錄
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // 全域可用的核心服務
}
```

### 2. 功能服務 (Feature Services)
```typescript
// 放在對應功能模組目錄
@Injectable()
export class FeatureService {
  // 特定功能模組的服務
}
```

### 3. 共享服務 (Shared Services)
```typescript
// 放在 shared/services 目錄
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // 多個模組共用的服務
}
```

## 元件架構

### 1. 智能元件 (Smart Components)
```typescript
// 包含業務邏輯的元件
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  // 業務邏輯
  // 資料管理
  // 事件處理
}
```

### 2. 展示元件 (Dumb Components)
```typescript
// 純展示元件，無業務邏輯
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<string>();
}
```

### 3. 佈局元件 (Layout Components)
```typescript
// 負責頁面佈局的元件
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
  // 佈局配置
}
```

## 資料流架構

### 1. 響應式資料流
```typescript
// 使用 RxJS 進行資料流管理
@Injectable()
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  data$ = this.dataSubject.asObservable();

  loadData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data').pipe(
      tap(data => this.dataSubject.next(data))
    );
  }
}
```

### 2. 狀態管理
```typescript
// 使用 ng-alain 內建狀態管理
@Injectable()
export class StateService {
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  state$ = this.stateSubject.asObservable();

  updateState(newState: Partial<AppState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...newState
    });
  }
}
```

## 錯誤處理架構

### 1. 全域錯誤處理
```typescript
// HTTP 攔截器處理錯誤
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        // 統一錯誤處理邏輯
        return throwError(() => error);
      })
    );
  }
}
```

### 2. 元件錯誤處理
```typescript
// 元件層級錯誤處理
@Component({
  selector: 'app-error-boundary',
  template: `
    <ng-container *ngIf="!hasError; else errorTemplate">
      <ng-content />
    </ng-container>
    <ng-template #errorTemplate>
      <nz-result nzStatus="error" [nzTitle]="'錯誤'">
        <button nz-button nzType="primary" (click)="retry()">重試</button>
      </nz-result>
    </ng-template>
  `
})
export class ErrorBoundaryComponent {
  hasError = false;

  @Input() set error(value: boolean) {
    this.hasError = value;
  }

  retry(): void {
    this.hasError = false;
  }
}
```

## 效能優化架構

### 1. 變更檢測策略
```typescript
// 使用 OnPush 策略提升效能
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // 只在輸入變更時檢測
}
```

### 2. 懶載入策略
```typescript
// 路由懶載入
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
}
```

### 3. 虛擬滾動
```typescript
// 大量資料使用虛擬滾動
<nz-virtual-scroll-viewport [itemSize]="54" [maxBufferPx]="200" [minBufferPx]="100">
  <div *cdkVirtualFor="let item of items">
    {{ item.name }}
  </div>
</nz-virtual-scroll-viewport>
```

## 安全架構

### 1. 認證架構
```typescript
// 多層級認證保護
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

### 2. 權限架構
```typescript
// 基於角色的權限控制
@Injectable()
export class AclService {
  can(ability: string): boolean {
    return this.userRoles.includes(ability);
  }
}
```

## 測試架構

### 1. 單元測試
```typescript
// 服務測試
describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load data', () => {
    service.loadData().subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
  });
});
```

### 2. 整合測試
```typescript
// 元件整合測試
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListModule],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  });
});
```

## 部署架構

### 1. 環境配置
```typescript
// 環境變數配置
export const environment = {
  production: false,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true
  },
  firebase: {
    // Firebase 配置
  }
};
```

### 2. 建置配置
```typescript
// angular.json 配置
{
  "build": {
    "configurations": {
      "production": {
        "optimization": true,
        "outputHashing": "all",
        "sourceMap": false
      }
    }
  }
}
```

## 架構檢查清單

### ✅ 必須遵循
- [ ] 使用 TypeScript 嚴格模式
- [ ] 實現懶載入路由
- [ ] 使用 OnPush 變更檢測
- [ ] 實現適當的錯誤處理
- [ ] 遵循單一職責原則
- [ ] 使用依賴注入
- [ ] 實現響應式程式設計

### ❌ 禁止事項
- [ ] 使用 any 型別
- [ ] 在元件中直接操作 DOM
- [ ] 建立過度複雜的模組結構
- [ ] 忽略錯誤處理
- [ ] 使用同步 HTTP 請求
- [ ] 建立單次使用的抽象層

> **核心原則**：保持架構簡潔，優先使用 ng-alain 內建功能，避免過度設計。
description:
globs:
alwaysApply: false
---
