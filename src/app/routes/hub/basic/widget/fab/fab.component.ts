import { Component } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [NzFloatButtonModule, NzIconModule, DragDropModule],
  template: `
    <div class="fab-drag-anchor" cdkDrag [cdkDragFreeDragPosition]="{ x: dragX, y: dragY }" (cdkDragEnded)="onDragEnd($event)">
      <nz-float-button-group
        [nzIcon]="currentIcon"
        nzType="primary"
        nzTrigger="click"
        (nzOnOpenChange)="openChange($event)"
        [nzPlacement]="placement"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button [nzIcon]="inner"></nz-float-button>
      </nz-float-button-group>
      <ng-template #inner>
        <nz-icon nzType="comment" nzTheme="outline"></nz-icon>
      </ng-template>
      <ng-template #up>
        <nz-icon nzType="up" nzTheme="outline" />
      </ng-template>
      <ng-template #down>
        <nz-icon nzType="down" nzTheme="outline" />
      </ng-template>
      <ng-template #left>
        <nz-icon nzType="left" nzTheme="outline" />
      </ng-template>
      <ng-template #right>
        <nz-icon nzType="right" nzTheme="outline" />
      </ng-template>
    </div>
  `,
  styles: [
    `
      .fab-drag-anchor {
        position: fixed;
        z-index: 1000;
        right: 32px;
        bottom: 32px;
        cursor: grab;
        user-select: none;
      }
      nz-float-button-group {
        position: absolute;
      }
    `
  ]
})
export class FabComponent {
  dragX = 0;
  dragY = 0;
  placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  // 根據拖曳位置自動切換方向與icon
  get currentIcon() {
    switch (this.placement) {
      case 'top':
        return this.up;
      case 'bottom':
        return this.down;
      case 'left':
        return this.left;
      case 'right':
        return this.right;
      default:
        return this.up;
    }
  }

  // template refs for icons
  up: any;
  down: any;
  left: any;
  right: any;

  openChange(status: boolean): void {
    // 可根據 status 控制彈出狀態
    // console.log('openChange', status);
  }

  onDragEnd(event: any): void {
    this.dragX = event.source.getFreeDragPosition().x;
    this.dragY = event.source.getFreeDragPosition().y;
    this.placement = this.autoPlacement(this.dragX, this.dragY);
  }

  // 智能選擇彈出方向：靠近哪個邊就從對側彈出
  autoPlacement(x: number, y: number): 'top' | 'bottom' | 'left' | 'right' {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnW = 56; // FAB 寬度
    const btnH = 56; // FAB 高度
    const centerX = x + btnW / 2;
    const centerY = y + btnH / 2;
    const dTop = centerY;
    const dBottom = vh - centerY;
    const dLeft = centerX;
    const dRight = vw - centerX;
    const min = Math.min(dTop, dBottom, dLeft, dRight);
    if (min === dTop) return 'bottom';
    if (min === dBottom) return 'top';
    if (min === dLeft) return 'right';
    return 'left';
  }
}
