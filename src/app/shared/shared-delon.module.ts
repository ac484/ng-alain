/**
 * NG-ALAIN 共享 Delon 模組
 *
 * 此模組負責：
 * - 匯出 Delon 框架的常用模組
 * - 提供表單、表格、描述列表等元件
 * - 提供 ACL 權限指令
 * - 提供通用管道和工具
 * - 整合 Redis 快取和記憶體狀態管理
 *
 * 基於 ng-alain 20.0.0 框架的共享元件系統
 */

import { PageHeaderModule } from '@delon/abc/page-header';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { ACLDirective, ACLIfDirective } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { CurrencyPricePipe } from '@delon/util';

export const SHARED_DELON_MODULES = [
  DelonFormModule,
  STModule,
  SVModule,
  SEModule,
  PageHeaderModule,
  ACLDirective,
  ACLIfDirective,
  CurrencyPricePipe
];
