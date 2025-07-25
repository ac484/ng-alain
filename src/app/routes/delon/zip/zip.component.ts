/**
 * NG-ALAIN ZIP 檔案處理元件
 *
 * 功能：ZIP 檔案讀取和下載
 * 支援：URL 下載、本地檔案上傳
 * 格式：解析 ZIP 檔案結構
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ZipService } from '@delon/abc/zip';
import { SHARED_IMPORTS } from '@shared';
import type jsZipType from 'jszip';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SHARED_IMPORTS
})
export class ZipComponent implements OnInit {
  private readonly zip = inject(ZipService);
  private readonly msg = inject(NzMessageService);
  private readonly cdr = inject(ChangeDetectorRef);

  list: any;
  instance: jsZipType | null = null;
  data: Array<{ path?: string; url?: string }> = [
    { path: 'demo.docx', url: 'https://ng-alain.com/assets/demo.docx' },
    {
      path: '小程序标志.zip',
      url: 'https://wximg.gtimg.com/shake_tv/mina/standard_logo.zip'
    }
  ];

  ngOnInit(): void {
    this.zip.create().then(ret => {
      this.instance = ret;
      this.cdr.detectChanges();
    });
  }

  private format(data: any): void {
    const files = data.files;
    this.list = Object.keys(files).map(key => {
      return {
        name: key,
        dir: files[key].dir,
        date: files[key].date
      };
    });
    this.cdr.detectChanges();
  }

  url(): void {
    this.zip.read(`./assets/tmp/demo.zip`).then(res => this.format(res));
  }

  change(e: Event): void {
    const file = (e.target as HTMLInputElement).files![0];
    this.zip.read(file).then(res => this.format(res));
  }

  download(): void {
    const promises: Array<Promise<void>> = [];
    this.data.forEach(item => {
      promises.push(this.zip.pushUrl(this.instance, item.path!, item.url!));
    });
    Promise.all(promises).then(
      () => {
        this.zip.save(this.instance).then(() => {
          this.msg.success('download success');
          this.data = [];
        });
      },
      (error: unknown) => {
        console.warn(error);
        this.msg.error(JSON.stringify(error));
      }
    );
  }
}
