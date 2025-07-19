/**
 * 個人文章元件
 *
 * 此元件負責：
 * - 顯示用戶發表的文章列表
 * - 加載文章資料
 * - 處理文章列表的互動
 * - 支援與 Redis 快取整合的文章資料展示
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-account-center-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class ProAccountCenterArticlesComponent {
  list$ = inject(_HttpClient).get('/api/list', { count: 8 });
}
