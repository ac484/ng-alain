# Design Document

## Overview

This design document outlines the optimization of the hub directory structure to align with Angular v20 best practices, improve maintainability, and support future feature expansion. The design focuses on feature-based organization, standalone components, proper separation of concerns, and scalable architecture patterns.

## Architecture

### Current State Analysis

The existing hub structure has several architectural issues:
- Mixed concerns (business logic and generic utilities)
- Inconsistent organization patterns
- Tight coupling between generic and business-specific code
- Limited support for lazy loading and modern Angular patterns

### Target Architecture

The new architecture will implement:

1. **Feature-Based Organization**: Each business domain gets its own feature module
2. **Layered Architecture**: Clear separation between presentation, business logic, and data access
3. **Standalone Components**: Leverage Angular v20 standalone component architecture
4. **Lazy Loading Support**: Route-based code splitting for optimal performance
5. **Shared Infrastructure**: Common utilities and components in dedicated shared modules

### Directory Structure Design

```
src/app/routes/hub/
├── core/                           # Core infrastructure and services
│   ├── services/                   # Core business services
│   │   ├── hub-crud.service.ts     # Generic CRUD operations
│   │   └── index.ts                # Barrel export
│   ├── models/                     # Core data models and interfaces
│   │   ├── base.model.ts           # Base model interfaces
│   │   └── index.ts                # Barrel export
│   └── index.ts                    # Core module barrel export
├── shared/                         # Shared components and utilities
│   ├── components/                 # Reusable UI components
│   │   ├── fab/                    # Floating Action Button
│   │   │   ├── fab.component.ts
│   │   │   ├── fab.component.html
│   │   │   ├── fab.component.less
│   │   │   └── index.ts
│   │   └── index.ts                # Components barrel export
│   ├── directives/                 # Shared directives
│   │   └── index.ts
│   ├── pipes/                      # Shared pipes
│   │   └── index.ts
│   └── index.ts                    # Shared module barrel export
├── features/                       # Feature modules
│   ├── contracts/                  # Contract management feature
│   │   ├── components/             # Contract-specific components
│   │   │   ├── contract-list/
│   │   │   │   ├── contract-list.component.ts
│   │   │   │   ├── contract-list.component.html
│   │   │   │   ├── contract-list.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-form/
│   │   │   │   ├── contract-form.component.ts
│   │   │   │   ├── contract-form.component.html
│   │   │   │   ├── contract-form.component.less
│   │   │   │   └── index.ts
│   │   │   ├── contract-payments/  # Payment sub-feature
│   │   │   │   ├── payment-list/
│   │   │   │   ├── payment-form/
│   │   │   │   └── index.ts
│   │   │   ├── contract-workflow/  # Workflow sub-feature
│   │   │   │   ├── workflow-steps/
│   │   │   │   ├── workflow-designer/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── services/               # Contract business logic
│   │   │   ├── contract.service.ts
│   │   │   ├── contract-payment.service.ts
│   │   │   ├── contract-workflow.service.ts
│   │   │   └── index.ts
│   │   ├── models/                 # Contract data models
│   │   │   ├── contract.model.ts
│   │   │   ├── contract-payment.model.ts
│   │   │   ├── contract-workflow.model.ts
│   │   │   └── index.ts
│   │   ├── routes.ts               # Contract feature routes
│   │   └── index.ts                # Feature barrel export
│   ├── settings/                   # Settings management feature
│   │   ├── components/
│   │   │   ├── settings-list/
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── settings.service.ts
│   │   │   └── index.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── routes.ts
│   │   └── index.ts
│   ├── workspace/                  # Workspace management feature
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes.ts
│   │   └── index.ts
│   └── index.ts                    # Features barrel export
├── routes.ts                       # Main hub routing configuration
└── index.ts                        # Hub module barrel export
```

## Components and Interfaces

### Core Services Layer

#### HubCrudService (Enhanced)
```typescript
@Injectable({ providedIn: 'root' })
export class HubCrudService<T extends BaseModel = BaseModel> {
  private firestore = inject(Firestore);
  
  // Generic CRUD operations with type safety
  useCollection<TModel extends BaseModel>(
    collectionName: string
  ): Observable<TModel[]>;
  
  useDoc<TModel extends BaseModel>(
    collectionName: string, 
    id: string
  ): Observable<TModel | undefined>;
  
  add<TModel extends BaseModel>(
    collectionName: string, 
    data: Omit<TModel, 'key'>
  ): Promise<string>;
  
  update<TModel extends BaseModel>(
    collectionName: string, 
    id: string, 
    data: Partial<TModel>
  ): Promise<void>;
  
  delete(collectionName: string, id: string): Promise<void>;
}
```

#### Repository Pattern Implementation
```typescript
export abstract class BaseRepository<T extends BaseModel> {
  constructor(
    protected crudService: HubCrudService,
    protected collectionName: string
  ) {}
  
  abstract list(): Observable<T[]>;
  abstract getById(id: string): Observable<T | undefined>;
  abstract create(data: Omit<T, 'key'>): Promise<string>;
  abstract update(id: string, data: Partial<T>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
```

### Feature Components Architecture

#### Standalone Component Pattern
```typescript
@Component({
  selector: 'hub-contract-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    FabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-table 
      [nzData]="contracts()" 
      [nzLoading]="loading()"
      nzSize="small">
      <!-- Table content -->
    </nz-table>
    <hub-fab (onAction)="handleFabAction($event)"></hub-fab>
  `
})
export class ContractListComponent {
  private contractService = inject(ContractService);
  
  // Angular v20 Signals
  contracts = signal<Contract[]>([]);
  loading = signal(false);
  
  // Lifecycle and methods
  ngOnInit() {
    this.loadContracts();
  }
  
  private loadContracts() {
    this.loading.set(true);
    this.contractService.list().subscribe({
      next: (contracts) => {
        this.contracts.set(contracts);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
```

### Lazy Loading Implementation

#### Feature Route Configuration
```typescript
// features/contracts/routes.ts
import { Routes } from '@angular/router';

export const contractRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/contract-list').then(m => m.ContractListComponent)
  },
  {
    path: 'new',
    loadComponent: () => 
      import('./components/contract-form').then(m => m.ContractFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./components/contract-form').then(m => m.ContractFormComponent)
  },
  {
    path: ':id/payments',
    loadComponent: () => 
      import('./components/contract-payments/payment-list')
        .then(m => m.PaymentListComponent)
  }
];
```

#### Main Hub Routes
```typescript
// routes.ts
import { Routes } from '@angular/router';

export const hubRoutes: Routes = [
  {
    path: 'contracts',
    loadChildren: () => 
      import('./features/contracts/routes').then(m => m.contractRoutes)
  },
  {
    path: 'settings',
    loadChildren: () => 
      import('./features/settings/routes').then(m => m.settingsRoutes)
  },
  {
    path: 'workspace',
    loadChildren: () => 
      import('./features/workspace/routes').then(m => m.workspaceRoutes)
  }
];
```

## Data Models

### Base Model Interface
```typescript
export interface BaseModel {
  key?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuditableModel extends BaseModel {
  createdBy?: string;
  updatedBy?: string;
}
```

### Contract Domain Models
```typescript
export interface Contract extends AuditableModel {
  contractSerial: string;
  client: string;
  contractName: string;
  amount: number;
  status: ContractStatus;
  payments?: ContractPayment[];
  workflow?: ContractWorkflow;
}

export interface ContractPayment extends AuditableModel {
  contractId: string;
  amount: number;
  dueDate: Date;
  status: PaymentStatus;
  approvalWorkflow?: WorkflowInstance;
}

export interface ContractWorkflow extends BaseModel {
  name: string;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
}
```

## Error Handling

### Centralized Error Handling Service
```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private notification = inject(NzNotificationService);
  
  handleError(error: any, context?: string): void {
    console.error(`Error in ${context}:`, error);
    
    const message = this.getErrorMessage(error);
    this.notification.error('Error', message);
  }
  
  private getErrorMessage(error: any): string {
    if (error?.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
  }
}
```

### Error Boundary Implementation
```typescript
@Component({
  selector: 'hub-error-boundary',
  standalone: true,
  template: `
    @if (hasError()) {
      <nz-result 
        nzStatus="error" 
        nzTitle="Something went wrong"
        [nzSubTitle]="errorMessage()">
        <div nz-result-extra>
          <button nz-button nzType="primary" (click)="retry()">
            Try Again
          </button>
        </div>
      </nz-result>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class ErrorBoundaryComponent {
  hasError = signal(false);
  errorMessage = signal('');
  
  handleError(error: any) {
    this.hasError.set(true);
    this.errorMessage.set(error.message || 'An error occurred');
  }
  
  retry() {
    this.hasError.set(false);
    this.errorMessage.set('');
  }
}
```

## Testing Strategy

### Unit Testing Approach

#### Service Testing
```typescript
describe('ContractService', () => {
  let service: ContractService;
  let mockCrudService: jasmine.SpyObj<HubCrudService>;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HubCrudService', [
      'useCollection', 'add', 'update', 'delete'
    ]);
    
    TestBed.configureTestingModule({
      providers: [
        ContractService,
        { provide: HubCrudService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(ContractService);
    mockCrudService = TestBed.inject(HubCrudService) as jasmine.SpyObj<HubCrudService>;
  });
  
  it('should list contracts', () => {
    const mockContracts: Contract[] = [
      { key: '1', contractSerial: 'C00001', client: 'Test Client' }
    ];
    
    mockCrudService.useCollection.and.returnValue(of(mockContracts));
    
    service.list().subscribe(contracts => {
      expect(contracts).toEqual(mockContracts);
    });
    
    expect(mockCrudService.useCollection).toHaveBeenCalledWith('hub_contract');
  });
});
```

#### Component Testing
```typescript
describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;
  let mockContractService: jasmine.SpyObj<ContractService>;
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContractService', ['list']);
    
    await TestBed.configureTestingModule({
      imports: [ContractListComponent],
      providers: [
        { provide: ContractService, useValue: spy }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
    mockContractService = TestBed.inject(ContractService) as jasmine.SpyObj<ContractService>;
  });
  
  it('should load contracts on init', () => {
    const mockContracts: Contract[] = [
      { key: '1', contractSerial: 'C00001', client: 'Test Client' }
    ];
    
    mockContractService.list.and.returnValue(of(mockContracts));
    
    component.ngOnInit();
    
    expect(component.contracts()).toEqual(mockContracts);
    expect(component.loading()).toBeFalse();
  });
});
```

### Integration Testing

#### Feature Module Testing
```typescript
describe('Contract Feature Integration', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<any>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(contractRoutes),
        // Other necessary imports
      ],
      providers: [
        // Mock services
      ]
    }).compileComponents();
    
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TestHostComponent);
  });
  
  it('should navigate to contract list', fakeAsync(() => {
    router.navigate(['/contracts']);
    tick();
    
    expect(location.path()).toBe('/contracts');
    // Additional assertions for component loading
  }));
});
```

### Performance Testing

#### Lazy Loading Verification
```typescript
describe('Lazy Loading Performance', () => {
  it('should lazy load contract feature', async () => {
    const router = TestBed.inject(Router);
    
    // Spy on dynamic imports
    spyOn(window, 'import').and.callThrough();
    
    await router.navigate(['/contracts']);
    
    expect(window.import).toHaveBeenCalledWith(
      jasmine.stringMatching(/contract.*routes/)
    );
  });
});
```

## Migration Strategy

### Phase 1: Core Infrastructure
1. Create new directory structure
2. Implement base services and models
3. Set up barrel exports
4. Create shared components

### Phase 2: Feature Migration
1. Migrate contract feature first (highest priority)
2. Update routing configuration
3. Implement lazy loading
4. Update existing components to standalone

### Phase 3: Enhancement and Optimization
1. Implement error boundaries
2. Add comprehensive testing
3. Performance optimization
4. Documentation updates

### Migration Checklist

#### Pre-Migration
- [ ] Backup current codebase
- [ ] Create feature branch
- [ ] Set up new directory structure
- [ ] Implement core services

#### During Migration
- [ ] Move components to new structure
- [ ] Update imports and dependencies
- [ ] Convert to standalone components
- [ ] Implement lazy loading
- [ ] Update routing configuration

#### Post-Migration
- [ ] Run comprehensive tests
- [ ] Performance benchmarking
- [ ] Code review and cleanup
- [ ] Documentation updates
- [ ] Team training on new structure

## Performance Considerations

### Bundle Size Optimization
- Lazy loading for feature modules
- Tree-shaking with proper barrel exports
- OnPush change detection strategy
- Standalone components for better tree-shaking

### Runtime Performance
- Signal-based reactivity for better performance
- Efficient change detection with OnPush
- Proper subscription management
- Optimized data structures

### Memory Management
- Proper cleanup in component destruction
- Efficient observable patterns
- Avoid memory leaks in services
- Optimize large data sets with virtual scrolling

This design provides a solid foundation for the hub structure optimization, ensuring scalability, maintainability, and alignment with Angular v20 best practices.