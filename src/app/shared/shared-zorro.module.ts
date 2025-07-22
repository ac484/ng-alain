/**
 * NG-ALAIN 共享 NG-ZORRO 模組
 *
 * 此模組負責：
 * - 匯出 NG-ZORRO 元件庫的常用模組
 * - 提供統一的 UI 元件集合
 * - 確保專案中使用一致的 UI 風格
 * - 支援與 Redis 快取和記憶體狀態管理整合的 UI 元件
 *
 * 基於 ng-alain 20.0.0 框架和 NG-ZORRO 元件庫
 */

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

export const SHARED_ZORRO_MODULES = [
  NzButtonModule,
  NzDropDownModule,
  NzGridModule,
  NzCheckboxModule,
  NzToolTipModule,
  NzPopoverModule,
  NzSelectModule,
  NzIconModule,
  NzBadgeModule,
  NzAlertModule,
  NzModalModule,
  NzTableModule,
  NzDrawerModule,
  NzTabsModule,
  NzInputModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzTagModule,
  NzBreadCrumbModule,
  NzListModule,
  NzSwitchModule,
  NzRadioModule,
  NzFormModule,
  NzAvatarModule,
  NzSpinModule,
  NzCardModule,
  NzDividerModule,
  NzProgressModule,
  NzPopconfirmModule,
  NzSpaceModule
];
