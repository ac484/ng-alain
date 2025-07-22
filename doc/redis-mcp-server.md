# Redis MCP Server Rules for ng-alain Project

## Core Redis Principles

### 1. 快取策略
- **用戶會話快取**：存儲用戶認證狀態和權限
- **應用配置快取**：存儲應用程式配置和設定
- **資料快取**：存儲常用資料，減少 Firebase 查詢
- **API 響應快取**：存儲 API 響應，提升效能

### 2. 資料結構設計
- **Hash**：存儲複雜物件（用戶資料、配置）
- **String**：存儲簡單值（設定、標記）
- **List**：存儲有序資料（日誌、通知）
- **Set**：存儲唯一值（權限、標籤）
- **Sorted Set**：存儲排序資料（排行榜、時間序列）

## ng-alain 專案 Redis 使用

### 1. 用戶會話管理
```typescript
// 用戶會話快取
interface UserSession {
  userId: string;
  email: string;
  displayName: string;
  role: string;
  permissions: string[];
  lastLogin: number;
  expiresAt: number;
}

// 存儲用戶會話
mcp_redis_mcp_json_set({
  name: "session:user:123",
  path: "$",
  value: {
    userId: "123",
    email: "user@example.com",
    displayName: "John Doe",
    role: "admin",
    permissions: ["read", "write", "delete"],
    lastLogin: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24小時
  },
  expire_seconds: 86400 // 24小時過期
});

// 取得用戶會話
const session = mcp_redis_mcp_json_get({
  name: "session:user:123",
  path: "$"
});
```

### 2. 應用配置快取
```typescript
// 應用配置
interface AppConfig {
  version: string;
  features: {
    firebase: boolean;
    analytics: boolean;
    notifications: boolean;
  };
  settings: {
    theme: string;
    language: string;
    timezone: string;
  };
}

// 存儲應用配置
mcp_redis_mcp_json_set({
  name: "config:app:ng-alain",
  path: "$",
  value: {
    version: "20.0.0",
    features: {
      firebase: true,
      analytics: true,
      notifications: true
    },
    settings: {
      theme: "default",
      language: "zh-CN",
      timezone: "Asia/Taipei"
    }
  },
  expire_seconds: 3600 // 1小時過期
});

// 取得應用配置
const config = mcp_redis_mcp_json_get({
  name: "config:app:ng-alain",
  path: "$"
});
```

### 3. Firebase 資料快取
```typescript
// 用戶資料快取
interface CachedUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
  cachedAt: number;
}

// 存儲用戶資料
mcp_redis_mcp_hset({
  name: "cache:users:123",
  key: "email",
  value: "user@example.com"
});

mcp_redis_mcp_hset({
  name: "cache:users:123",
  key: "displayName",
  value: "John Doe"
});

mcp_redis_mcp_hset({
  name: "cache:users:123",
  key: "role",
  value: "admin"
});

mcp_redis_mcp_hset({
  name: "cache:users:123",
  key: "cachedAt",
  value: Date.now().toString()
});

// 設定過期時間
mcp_redis_mcp_expire({
  name: "cache:users:123",
  expire_seconds: 1800 // 30分鐘過期
});

// 取得用戶資料
const userData = mcp_redis_mcp_hgetall({
  name: "cache:users:123"
});
```

### 4. API 響應快取
```typescript
// API 響應快取
interface ApiResponse {
  data: any;
  timestamp: number;
  ttl: number;
}

// 存儲 API 響應
mcp_redis_mcp_json_set({
  name: "api:users:list",
  path: "$",
  value: {
    data: [
      { id: "1", name: "User 1", email: "user1@example.com" },
      { id: "2", name: "User 2", email: "user2@example.com" }
    ],
    timestamp: Date.now(),
    ttl: 300 // 5分鐘
  },
  expire_seconds: 300
});

// 取得 API 響應
const apiResponse = mcp_redis_mcp_json_get({
  name: "api:users:list",
  path: "$"
});
```

### 5. 權限管理
```typescript
// 用戶權限集合
mcp_redis_mcp_sadd({
  name: "permissions:user:123",
  value: "read"
});

mcp_redis_mcp_sadd({
  name: "permissions:user:123",
  value: "write"
});

mcp_redis_mcp_sadd({
  name: "permissions:user:123",
  value: "delete"
});

// 檢查權限
const hasReadPermission = mcp_redis_mcp_smembers({
  name: "permissions:user:123"
}).includes("read");

// 移除權限
mcp_redis_mcp_srem({
  name: "permissions:user:123",
  value: "delete"
});
```

### 6. 日誌記錄
```typescript
// 用戶操作日誌
mcp_redis_mcp_lpush({
  name: "logs:user:123",
  value: JSON.stringify({
    action: "login",
    timestamp: Date.now(),
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0..."
  })
});

mcp_redis_mcp_lpush({
  name: "logs:user:123",
  value: JSON.stringify({
    action: "create_user",
    timestamp: Date.now(),
    targetUserId: "456",
    details: "Created new user account"
  })
});

// 取得最近日誌
const recentLogs = mcp_redis_mcp_lrange({
  name: "logs:user:123",
  start: 0,
  stop: 9
});

// 限制日誌數量
const logCount = mcp_redis_mcp_llen({
  name: "logs:user:123"
});

if (logCount > 100) {
  // 移除舊日誌
  mcp_redis_mcp_lrange({
    name: "logs:user:123",
    start: 100,
    stop: -1
  });
}
```

### 7. 通知系統
```typescript
// 用戶通知
mcp_redis_mcp_lpush({
  name: "notifications:user:123",
  value: JSON.stringify({
    id: "notif_001",
    type: "info",
    title: "系統更新",
    message: "系統將在今晚進行維護",
    timestamp: Date.now(),
    read: false
  })
});

// 取得未讀通知
const unreadNotifications = mcp_redis_mcp_lrange({
  name: "notifications:user:123",
  start: 0,
  stop: -1
}).filter(notification => {
  const notif = JSON.parse(notification);
  return !notif.read;
});

// 標記通知為已讀
const notification = JSON.parse(unreadNotifications[0]);
notification.read = true;
mcp_redis_mcp_lpush({
  name: "notifications:user:123",
  value: JSON.stringify(notification)
});
```

### 8. 計數器和統計
```typescript
// 用戶登入次數
mcp_redis_mcp_set({
  key: "stats:logins:user:123",
  value: "0"
});

// 增加登入次數
const currentLogins = parseInt(mcp_redis_mcp_get({
  key: "stats:logins:user:123"
}));
mcp_redis_mcp_set({
  key: "stats:logins:user:123",
  value: (currentLogins + 1).toString()
});

// 頁面訪問統計
mcp_redis_mcp_zadd({
  key: "stats:page_views",
  score: Date.now(),
  member: "dashboard"
});

// 取得熱門頁面
const popularPages = mcp_redis_mcp_zrange({
  key: "stats:page_views",
  start: 0,
  end: 9,
  with_scores: true
});
```

### 9. 快取失效策略
```typescript
// 快取標籤管理
interface CacheTag {
  tag: string;
  keys: string[];
  expiresAt: number;
}

// 存儲快取標籤
mcp_redis_mcp_json_set({
  name: "cache:tags:users",
  path: "$",
  value: {
    tag: "users",
    keys: [
      "cache:users:123",
      "cache:users:456",
      "api:users:list"
    ],
    expiresAt: Date.now() + 3600000 // 1小時
  },
  expire_seconds: 3600
});

// 失效快取標籤
const cacheTag = mcp_redis_mcp_json_get({
  name: "cache:tags:users",
  path: "$"
});

if (cacheTag) {
  cacheTag.keys.forEach(key => {
    mcp_redis_mcp_delete({
      key: key
    });
  });

  // 刪除標籤本身
  mcp_redis_mcp_delete({
    key: "cache:tags:users"
  });
}
```

### 10. 分散式鎖
```typescript
// 實現分散式鎖
interface DistributedLock {
  resource: string;
  token: string;
  expiresAt: number;
}

// 獲取鎖
const lockToken = `lock_${Date.now()}_${Math.random()}`;
const lockAcquired = mcp_redis_mcp_set({
  key: "lock:user_update:123",
  value: lockToken,
  expiration: 30 // 30秒過期
});

if (lockAcquired) {
  try {
    // 執行需要鎖定的操作
    updateUserData();
  } finally {
    // 釋放鎖
    const currentToken = mcp_redis_mcp_get({
      key: "lock:user_update:123"
    });

    if (currentToken === lockToken) {
      mcp_redis_mcp_delete({
        key: "lock:user_update:123"
      });
    }
  }
}
```

## Redis 服務整合

### 1. Angular 服務整合
```typescript
// Redis 快取服務
@Injectable({
  providedIn: 'root'
})
export class RedisCacheService {
  constructor(private http: HttpClient) {}

  // 取得快取資料
  get<T>(key: string): Observable<T | null> {
    return this.http.get<T>(`/api/cache/${key}`).pipe(
      catchError(() => of(null))
    );
  }

  // 設定快取資料
  set<T>(key: string, value: T, ttl: number = 3600): Observable<void> {
    return this.http.post<void>(`/api/cache/${key}`, {
      value,
      ttl
    });
  }

  // 刪除快取資料
  delete(key: string): Observable<void> {
    return this.http.delete<void>(`/api/cache/${key}`);
  }

  // 失效快取標籤
  invalidateTag(tag: string): Observable<void> {
    return this.http.delete<void>(`/api/cache/tag/${tag}`);
  }
}
```

### 2. HTTP 攔截器整合
```typescript
// 快取攔截器
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: RedisCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 檢查是否可快取
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cacheKey = `api:${req.url}`;

    // 嘗試從快取取得
    return this.cacheService.get(cacheKey).pipe(
      switchMap(cachedData => {
        if (cachedData) {
          return of(new HttpResponse({ body: cachedData }));
        }

        // 從伺服器取得並快取
        return next.handle(req).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              this.cacheService.set(cacheKey, event.body, 300).subscribe();
            }
          })
        );
      })
    );
  }
}
```

## 效能監控

### 1. Redis 效能指標
```typescript
// Redis 資訊監控
const redisInfo = mcp_redis_mcp_info({
  section: "memory"
});

const redisStats = mcp_redis_mcp_info({
  section: "stats"
});

// 資料庫大小
const dbSize = mcp_redis_mcp_dbsize({
  random_string: "check_size"
});

// 客戶端列表
const clients = mcp_redis_mcp_client_list({
  random_string: "check_clients"
});
```

### 2. 快取命中率統計
```typescript
// 快取命中統計
mcp_redis_mcp_hset({
  name: "stats:cache:hits",
  key: "users",
  value: "0"
});

mcp_redis_mcp_hset({
  name: "stats:cache:misses",
  key: "users",
  value: "0"
});

// 增加命中次數
const currentHits = parseInt(mcp_redis_mcp_hget({
  name: "stats:cache:hits",
  key: "users"
}));
mcp_redis_mcp_hset({
  name: "stats:cache:hits",
  key: "users",
  value: (currentHits + 1).toString()
});

// 計算命中率
const hits = parseInt(mcp_redis_mcp_hget({
  name: "stats:cache:hits",
  key: "users"
}));
const misses = parseInt(mcp_redis_mcp_hget({
  name: "stats:cache:misses",
  key: "users"
}));
const hitRate = hits / (hits + misses) * 100;
```

## Redis 檢查清單

### ✅ 必須遵循
- [ ] 設定適當的過期時間
- [ ] 使用有意義的鍵名
- [ ] 實現快取失效策略
- [ ] 監控記憶體使用量
- [ ] 處理快取穿透
- [ ] 實現分散式鎖
- [ ] 記錄快取統計

### ❌ 禁止事項
- [ ] 存儲敏感資料
- [ ] 使用過長的鍵名
- [ ] 忽略過期時間設定
- [ ] 存儲過大物件
- [ ] 忽略錯誤處理
- [ ] 使用同步操作

> **核心原則**：使用 Redis 提升應用效能，實現可靠的快取策略和資料管理。
