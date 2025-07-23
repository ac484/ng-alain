import { Injectable } from '@angular/core';
import { FirebaseUserService } from '@core/firebase/firebase-user.service';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '@core/firebase/models/base.model';

@Injectable({ providedIn: 'root' })
export class SystemAccountService extends FirebaseUserService {
  users$ = new BehaviorSubject<User[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  // 批量啟用/停用
  batchUpdateStatus(userIds: string[], isActive: boolean): Observable<void> {
    // TODO: 實作 Firebase 批量更新
    return from(Promise.resolve());
  }

  // 載入用戶（可加上搜尋/篩選參數）
  loadUsers(params?: any): void {
    this.loading$.next(true);
    this.list().subscribe({
      next: users => {
        this.users$.next(users);
        this.loading$.next(false);
      },
      error: () => this.loading$.next(false)
    });
  }
}
