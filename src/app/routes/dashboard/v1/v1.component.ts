/**
 * NG-ALAIN 儀表板 V1 元件
 *
 * 功能：主要儀表板頁面
 * 圖表：時間軸、柱狀圖、迷你圖表
 * 特性：新手引導、響應式設計
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Chart } from '@antv/g2';
import { OnboardingModule, OnboardingService } from '@delon/abc/onboarding';
import { QuickMenuModule } from '@delon/abc/quick-menu';
import { G2BarModule } from '@delon/chart/bar';
import { G2MiniBarModule } from '@delon/chart/mini-bar';
import { G2TimelineModule } from '@delon/chart/timeline';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...SHARED_IMPORTS, G2TimelineModule, G2BarModule, G2MiniBarModule, QuickMenuModule, OnboardingModule]
})
export class DashboardV1Component implements OnInit {
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly obSrv = inject(OnboardingService);
  private readonly platform = inject(Platform);
  private readonly doc = inject(DOCUMENT);
  todoData = [
    {
      completed: true,
      avatar: '1',
      name: '苏先生',
      content: `请告诉我，我应该说点什么好？`
    },
    {
      completed: false,
      avatar: '2',
      name: 'はなさき',
      content: `ハルカソラトキヘダツヒカリ`
    },
    {
      completed: false,
      avatar: '3',
      name: 'cipchk',
      content: `this world was never meant for one as beautiful as you.`
    },
    {
      completed: false,
      avatar: '4',
      name: 'Kent',
      content: `my heart is beating with hers`
    },
    {
      completed: false,
      avatar: '5',
      name: 'Are you',
      content: `They always said that I love beautiful girl than my friends`
    },
    {
      completed: false,
      avatar: '6',
      name: 'Forever',
      content: `Walking through green fields ，sunshine in my eyes.`
    }
  ];

  webSite!: any[];
  salesData!: any[];
  offlineChartData!: any[];

  constructor() {
    timer(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.genOnboarding());
  }

  fixDark(chart: Chart): void {
    if (!this.platform.isBrowser || (this.doc.body as HTMLBodyElement).getAttribute('data-theme') !== 'dark') return;

    chart.theme({
      styleSheet: {
        backgroundColor: 'transparent'
      }
    });
  }

  ngOnInit(): void {
    this.http.get('/chart').subscribe(res => {
      this.webSite = res.visitData.slice(0, 10);
      this.salesData = res.salesData;
      this.offlineChartData = res.offlineChartData;
      this.cdr.detectChanges();
    });
  }

  private genOnboarding(): void {
    const KEY = 'on-boarding';
    if (!this.platform.isBrowser || localStorage.getItem(KEY) === '1') {
      return;
    }
    this.http.get(`./assets/tmp/on-boarding.json`).subscribe(res => {
      this.obSrv.start(res);
      localStorage.setItem(KEY, '1');
    });
  }
}
