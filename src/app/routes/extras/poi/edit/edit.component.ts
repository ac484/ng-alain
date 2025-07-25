/**
 * NG-ALAIN POI 編輯元件
 *
 * 功能：編輯門店資訊
 * 模式：新增/編輯模式
 * 分類：支援多級分類選擇
 */

import { Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-extras-poi-edit',
  templateUrl: './edit.component.html',
  imports: SHARED_IMPORTS
})
export class ExtrasPoiEditComponent implements OnInit {
  readonly msgSrv = inject(NzMessageService);
  private readonly modal = inject(NzModalRef);
  readonly http = inject(_HttpClient);

  i: any;
  cat: string[] = ['美食', '美食,粤菜', '美食,粤菜,湛江菜'];

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/pois').subscribe(res => (this.i = res.list[0]));
    }
  }

  save(): void {
    this.http.get('/pois').subscribe(() => {
      this.msgSrv.success('保存成功，只是模拟，实际未变更');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
