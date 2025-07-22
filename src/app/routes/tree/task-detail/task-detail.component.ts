/**
 * 任務詳情頁面（極簡主義風格）
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FirebaseCrudService } from '../firebase-crud/firebase-crud.service';
import { SpaceNode, STATUS_COLORS, TaskStatus } from '../models/models';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzEmptyModule,
    NzIconModule,
    NzSpinModule,
    NzTagModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less']
})
export class TaskDetailComponent implements OnInit {
  taskId: string | null = null;
  task$: Observable<SpaceNode | null> = of(null);
  loading = true;
  editMode = false;
  statusColors = STATUS_COLORS;
  taskStatus: TaskStatus = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: FirebaseCrudService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => {
          this.taskId = id;
          if (!id) {
            this.loading = false;
            return of(null);
          }
          return this.crudService.getNode(id).pipe(
            catchError(() => {
              this.message.error('無法載入任務詳情');
              this.loading = false;
              return of(null);
            })
          );
        })
      )
      .subscribe(task => {
        if (task && task.isTask) {
          this.taskStatus = task.taskStatus || 'pending';
        }
        this.loading = false;
      });

    // 直接從服務獲取任務數據
    if (this.taskId) {
      this.task$ = this.crudService.getNode(this.taskId).pipe(
        map(node => node || null) // 將 undefined 轉換為 null
      );
    }
  }

  updateTaskStatus(status: TaskStatus): void {
    if (!this.taskId) return;

    this.loading = true;
    this.taskStatus = status;
    this.crudService
      .updateNode(this.taskId, {
        taskStatus: status,
        updatedAt: new Date().toISOString()
      })
      .then(() => {
        this.message.success('任務狀態已更新');
        this.loading = false;
      })
      .catch(() => {
        this.message.error('更新任務狀態失敗');
        this.loading = false;
      });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(task: SpaceNode): void {
    if (!this.taskId) return;

    this.loading = true;
    this.crudService
      .updateNode(this.taskId, {
        taskStatus: this.taskStatus,
        updatedAt: new Date().toISOString()
      })
      .then(() => {
        this.message.success('任務已更新');
        this.editMode = false;
        this.loading = false;
      })
      .catch(err => {
        this.message.error('更新任務失敗');
        this.loading = false;
      });
  }

  goBack(): void {
    this.router.navigate(['/tree']);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '未知';
    const date = new Date(dateString);
    return date.toLocaleString('zh-TW');
  }
}
