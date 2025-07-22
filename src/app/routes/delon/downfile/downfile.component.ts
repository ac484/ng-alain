/**
 * NG-ALAIN 檔案下載元件
 *
 * 功能：檔案下載功能演示
 * 支援：多種檔案格式下載
 * 資料：附加下載參數
 */

import { Component } from '@angular/core';
import { DownFileDirective } from '@delon/abc/down-file';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-down-file',
  templateUrl: './downfile.component.html',
  imports: [...SHARED_IMPORTS, DownFileDirective]
})
export class DownFileComponent {
  fileTypes = ['.xlsx', '.docx', '.pptx', '.pdf'];

  data = {
    otherdata: 1,
    time: new Date()
  };
}
