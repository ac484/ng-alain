import { Injectable } from '@angular/core';
import { FirebaseUserService, UserProfile } from '@core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AccountData {
  id: string;
  displayName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  role: string;
  department: string;
  lastLogin?: Date;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class AccountService extends FirebaseUserService {
  users$ = new BehaviorSubject<UserProfile[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  // 獲取帳號列表
  getAccounts(): Observable<AccountData[]> {
    this.loading$.next(true);
    return this.getAllUsers().pipe(
      map((users: UserProfile[]) => {
        const accounts: AccountData[] = users.map((user: UserProfile) => ({
          id: user.uid,
          displayName: user.displayName || '未命名用戶',
          email: user.email || '',
          status: user.isActive ? 'active' : 'inactive',
          avatar: user.photoURL || undefined,
          role: user.role || '一般用戶',
          department: '未分配', // TODO: 從 Firebase 獲取部門
          lastLogin: user.lastLoginAt ? new Date(user.lastLoginAt) : undefined,
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
        }));
        this.users$.next(users);
        this.loading$.next(false);
        return accounts;
      })
    );
  }

  // 刪除帳號
  deleteAccount(accountId: string): Observable<void> {
    // TODO: 實作刪除用戶功能
    return from(Promise.resolve());
  }

  // 批量啟用/停用
  batchUpdateStatus(userIds: string[], isActive: boolean): Observable<void> {
    // TODO: 實作 Firebase 批量更新
    return from(Promise.resolve());
  }

  // 載入用戶（可加上搜尋/篩選參數）
  loadUsers(params?: any): void {
    this.loading$.next(true);
    this.getAllUsers().subscribe({
      next: (users: UserProfile[]) => {
        this.users$.next(users);
        this.loading$.next(false);
      },
      error: () => this.loading$.next(false)
    });
  }
}
