import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-cell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="!editing" class="editable-cell-view" (click)="enterEdit()">
      {{ value }}
    </div>
    <input
      *ngIf="editing"
      [type]="type"
      class="editable-cell-input"
      [ngModel]="value"
      (ngModelChange)="onValueChange($event)"
      (blur)="exitEdit()"
      (keydown.enter)="exitEdit()"
      autofocus
    />
  `,
  styles: [
    `
      .editable-cell-view {
        min-height: 28px;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: border 0.2s;
      }
      .editable-cell-view:hover {
        border: 1px solid #d9d9d9;
        background: #fafafa;
      }
      .editable-cell-input {
        width: 100%;
        min-height: 28px;
        padding: 2px 8px;
        font-size: 14px;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        outline: none;
      }
    `
  ]
})
export class EditableCellComponent {
  @Input() value: string | number = '';
  @Output() valueChange = new EventEmitter<string | number>();
  @Input() type: 'text' | 'number' = 'text';
  @Input() editing = false;
  @Output() editingChange = new EventEmitter<boolean>();

  private wasEditing = false;

  enterEdit() {
    if (!this.editing) {
      this.editing = true;
      this.editingChange.emit(true);
    }
  }

  exitEdit() {
    if (this.editing) {
      this.editing = false;
      this.editingChange.emit(false);
    }
  }

  onValueChange(val: any) {
    this.value = val as string | number;
    this.valueChange.emit(this.value);
  }
}
