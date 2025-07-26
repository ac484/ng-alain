import { Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'hub-fab',
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
      >
        <nz-float-button [nzIcon]="actionIcon" (click)="onAction.emit('add')"></nz-float-button>
      </nz-float-button-group>

      <ng-template #upIcon><nz-icon nzType="up" nzTheme="outline" /></ng-template>
      <ng-template #downIcon><nz-icon nzType="down" nzTheme="outline" /></ng-template>
      <ng-template #leftIcon><nz-icon nzType="left" nzTheme="outline" /></ng-template>
      <ng-template #rightIcon><nz-icon nzType="right" nzTheme="outline" /></ng-template>
      <ng-template #actionIcon><nz-icon nzType="plus" nzTheme="outline" /></ng-template>
    </div>
  `,
    styles: [`
    .fab-drag-anchor {
      position: fixed;
      z-index: 1000;
      right: 32px;
      bottom: 32px;
      cursor: grab;
      user-select: none;
    }
    .fab-drag-anchor:active { cursor: grabbing; }
    nz-float-button-group { position: absolute; }
  `]
})
export class FabComponent {
    dragX = 0;
    dragY = 0;
    smartPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top';

    @ViewChild('upIcon', { static: true }) upIcon!: TemplateRef<any>;
    @ViewChild('downIcon', { static: true }) downIcon!: TemplateRef<any>;
    @ViewChild('leftIcon', { static: true }) leftIcon!: TemplateRef<any>;
    @ViewChild('rightIcon', { static: true }) rightIcon!: TemplateRef<any>;
    @ViewChild('actionIcon', { static: true }) actionIcon!: TemplateRef<any>;

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
        this.smartPlacement = this.calculateSmartPlacement(rect.left, rect.top);
    }

    onDragEnd(event: any): void {
        this.dragX = event.source.getFreeDragPosition().x;
        this.dragY = event.source.getFreeDragPosition().y;
    }

    private calculateSmartPlacement(x: number, y: number): 'top' | 'bottom' | 'left' | 'right' {
        const centerX = x + 28; // fab size / 2
        const centerY = y + 28;
        const deltaX = centerX - window.innerWidth / 2;
        const deltaY = centerY - window.innerHeight / 2;

        return Math.abs(deltaX) > Math.abs(deltaY)
            ? (deltaX > 0 ? 'left' : 'right')
            : (deltaY > 0 ? 'top' : 'bottom');
    }
}