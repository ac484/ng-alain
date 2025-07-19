/**
 * NG-ALAIN 表單元件演示
 *
 * 功能：展示 SF 表單元件
 * 特性：搜尋表單、表格展示
 * 整合：SF + ST 元件組合
 */

import { Component } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-delon-form',
  templateUrl: './form.component.html',
  imports: SHARED_IMPORTS
})
export class DelonFormComponent {
  params: any = {};
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' }
  ];
}
