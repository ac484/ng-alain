import { Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [NzFloatButtonModule, NzIconModule, DragDropModule],
  template: `
    <div
      class="fab-drag-anchor"
      cdkDrag
      [cdkDragFreeDragPosition]="{ x: dragX, y: dragY }"
      (cdkDragEnded)="onDragEnd($event)"
      (cdkDragMoved)="onDragMove($event)"
    >
      <nz-float-button-group
        [nzIcon]="currentIcon"
        nzType="primary"
        nzTrigger="click"
        [nzPlacement]="smartPlacement"
        (nzOnOpenChange)="openChange($event)"
      >
        <nz-float-button [nzIcon]="commentIcon" (click)="onAction.emit('add')"></nz-float-button>
        <!-- 你可以保留其他功能按鈕 -->
      </nz-float-button-group>

      <!-- 方向圖標 -->
      <ng-template #upIcon>
        <nz-icon nzType="up" nzTheme="outline" />
      </ng-template>
      <ng-template #downIcon>
        <nz-icon nzType="down" nzTheme="outline" />
      </ng-template>
      <ng-template #leftIcon>
        <nz-icon nzType="left" nzTheme="outline" />
      </ng-template>
      <ng-template #rightIcon>
        <nz-icon nzType="right" nzTheme="outline" />
      </ng-template>

      <!-- 功能圖標 -->
      <ng-template #commentIcon>
        <nz-icon nzType="plus" nzTheme="outline" />
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
      .fab-drag-anchor:active {
        cursor: grabbing;
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
  smartPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private currentX = 0;
  private currentY = 0;

  @ViewChild('upIcon', { static: true }) upIcon!: TemplateRef<any>;
  @ViewChild('downIcon', { static: true }) downIcon!: TemplateRef<any>;
  @ViewChild('leftIcon', { static: true }) leftIcon!: TemplateRef<any>;
  @ViewChild('rightIcon', { static: true }) rightIcon!: TemplateRef<any>;
  @ViewChild('commentIcon', { static: true }) commentIcon!: TemplateRef<any>;

  @Output() onAction = new EventEmitter<string>();

  get currentIcon(): TemplateRef<any> {
    const iconMap = {
      top: this.upIcon,
      bottom: this.downIcon,
      left: this.leftIcon,
      right: this.rightIcon
    };
    return iconMap[this.smartPlacement];
  }

  onDragMove(event: any): void {
    const rect = event.source.element.nativeElement.getBoundingClientRect();
    this.currentX = rect.left;
    this.currentY = rect.top;
    this.smartPlacement = this.calculateSmartPlacement(this.currentX, this.currentY);
  }

  onDragEnd(event: any): void {
    this.dragX = event.source.getFreeDragPosition().x;
    this.dragY = event.source.getFreeDragPosition().y;
    this.smartPlacement = this.calculateSmartPlacement(this.currentX, this.currentY);
  }

  private calculateSmartPlacement(x: number, y: number): 'top' | 'bottom' | 'left' | 'right' {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fabSize = 56;
    const centerX = x + fabSize / 2;
    const centerY = y + fabSize / 2;
    const screenCenterX = vw / 2;
    const screenCenterY = vh / 2;
    const deltaX = centerX - screenCenterX;
    const deltaY = centerY - screenCenterY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'left' : 'right';
    } else {
      return deltaY > 0 ? 'top' : 'bottom';
    }
  }

  openChange(status: boolean): void {}
}
