/**
 * NG-ALAIN QR Code 生成元件
 *
 * 功能：生成和自訂 QR Code
 * 設定：背景色、前景色、大小、容錯等級
 * 格式：支援多種圖片格式
 */

import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzQRCodeComponent } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  imports: [...SHARED_IMPORTS, NzQRCodeComponent]
})
export class QRComponent {
  value = 'https://ng-alain.com/';
  background = '#ffffff';
  foreground = '#000000';
  level: 'L' | 'M' | 'Q' | 'H' = 'L';
  mime = 'image/png';
  padding = 10;
  size = 220;
}
