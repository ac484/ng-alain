/**
 * ACL 管理組件
 *
 * 提供角色和權限的管理界面
 */

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { SHARED_IMPORTS } from '@shared';
import { FirebaseACLService, ACLRole, ACLPermission } from '../../../core/firebase/firebase-acl.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-acl-admin',
  template: `
    <div class="alain-default__content-title">
      <h1>ACL 管理</h1>
    </div>

    <div nz-row [nzGutter]="16">
      <div nz-col [nzSpan]="12">
        <nz-card nzTitle="角色管理">
          <div *ngFor="let role of roles" class="mb-md">
            <nz-card nzSize="small">
              <div nz-row>
                <div nz-col [nzSpan]="18">
                  <h4>{{ role.name }} ({{ role.id }})</h4>
                  <p class="text-grey">{{ role.description }}</p>
                  <div>
                    <nz-tag *ngFor="let permission of role.permissions" class="mb-xs">
                      {{ permission }}
                    </nz-tag>
                  </div>
                </div>
                <div nz-col [nzSpan]="6" class="text-right">
                  <nz-switch [ngModel]="role.isActive" (ngModelChange)="toggleRoleStatus(role.id, $event)"> </nz-switch>
                </div>
              </div>
            </nz-card>
          </div>
        </nz-card>
      </div>

      <div nz-col [nzSpan]="12">
        <nz-card nzTitle="權限管理">
          <div *ngFor="let permission of permissions" class="mb-md">
            <nz-card nzSize="small">
              <div nz-row>
                <div nz-col [nzSpan]="18">
                  <h4>{{ permission.name }} ({{ permission.id }})</h4>
                  <p class="text-grey">{{ permission.description }}</p>
                  <nz-tag>{{ permission.resource }}:{{ permission.action }}</nz-tag>
                </div>
                <div nz-col [nzSpan]="6" class="text-right">
                  <nz-switch [ngModel]="permission.isActive" (ngModelChange)="togglePermissionStatus(permission.id, $event)"> </nz-switch>
                </div>
              </div>
            </nz-card>
          </div>
        </nz-card>
      </div>
    </div>
  `,
  imports: [SHARED_IMPORTS, ReactiveFormsModule, FormsModule, NgFor]
})
export class ACLAdminComponent implements OnInit {
  private readonly firebaseACLSrv = inject(FirebaseACLService);
  private readonly message = inject(NzMessageService);

  roles: ACLRole[] = [];
  permissions: ACLPermission[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.firebaseACLSrv.getRoles().subscribe(roles => {
      this.roles = roles;
    });

    this.firebaseACLSrv.getPermissions().subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  toggleRoleStatus(roleId: string, isActive: boolean): void {
    // 這裡可以實現角色狀態切換
    this.message.info(`角色 ${roleId} 狀態已${isActive ? '啟用' : '停用'}`);
  }

  togglePermissionStatus(permissionId: string, isActive: boolean): void {
    // 這裡可以實現權限狀態切換
    this.message.info(`權限 ${permissionId} 狀態已${isActive ? '啟用' : '停用'}`);
  }
}
