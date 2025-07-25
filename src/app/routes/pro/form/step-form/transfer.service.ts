/**
 * 轉賬服務
 *
 * 此服務負責：
 * - 管理分步表單的狀態
 * - 存儲轉賬相關資料
 * - 提供轉賬流程的資料共享
 * - 支援與 Redis 快取整合的資料持久化
 */

import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
  step = 1;

  /**
   * 付款账户
   */
  pay_account = '';

  /**
   * 收款账户类型
   */
  receiver_type: 'alipay' | 'bank' = 'alipay';

  get receiver_type_str(): string {
    return this.receiver_type === 'alipay' ? '支付宝' : '银行';
  }

  /**
   * 收款账户
   */
  receiver_account = '';

  /**
   * 收款姓名
   */
  receiver_name = '';

  /**
   * 金额
   */
  amount = 500;

  /**
   * 支付密码
   */
  password = '123456';

  again(): void {
    this.step = 0;
    this.pay_account = 'ant-design@alipay.com';
    this.receiver_type = 'alipay';
    this.receiver_account = 'test@example.com';
    this.receiver_name = 'asdf';
    this.amount = 500;
  }

  constructor() {
    this.again();
  }
}
