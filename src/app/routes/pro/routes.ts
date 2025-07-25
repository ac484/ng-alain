/**
 * Pro 模組路由配置
 *
 * 此檔案負責：
 * - 定義 Pro 模組的路由結構
 * - 組織專業版功能的導航路徑
 * - 整合表單、列表、個人中心等子模組
 * - 支援與 Redis 快取整合的路由資料管理
 */

import { Routes } from '@angular/router';

// Import components for Pro module routes
import { ProAccountCenterApplicationsComponent } from './account/center/applications/applications.component';
import { ProAccountCenterArticlesComponent } from './account/center/articles/articles.component';
import { ProAccountCenterComponent } from './account/center/center.component';
import { ProAccountCenterProjectsComponent } from './account/center/projects/projects.component';
import { ProAccountSettingsBaseComponent } from './account/settings/base/base.component';
import { ProAccountSettingsBindingComponent } from './account/settings/binding/binding.component';
import { ProAccountSettingsNotificationComponent } from './account/settings/notification/notification.component';
import { ProAccountSettingsSecurityComponent } from './account/settings/security/security.component';
import { ProAccountSettingsComponent } from './account/settings/settings.component';
import { AdvancedFormComponent } from './form/advanced-form/advanced-form.component';
import { BasicFormComponent } from './form/basic-form/basic-form.component';
import { StepFormComponent } from './form/step-form/step-form.component';
import { ProListApplicationsComponent } from './list/applications/applications.component';
import { ProListArticlesComponent } from './list/articles/articles.component';
import { ProBasicListComponent } from './list/basic-list/basic-list.component';
import { ProCardListComponent } from './list/card-list/card-list.component';
import { ProListLayoutComponent } from './list/list/list.component';
import { ProListProjectsComponent } from './list/projects/projects.component';
import { ProTableListComponent } from './list/table-list/table-list.component';
import { ProProfileAdvancedComponent } from './profile/advanced/advanced.component';
import { ProProfileBaseComponent } from './profile/basic/basic.component';
import { ProResultFailComponent } from './result/fail/fail.component';
import { ProResultSuccessComponent } from './result/success/success.component';

// Define routes for Pro module
export const routes: Routes = [
  {
    path: 'form',
    children: [
      { path: 'basic-form', component: BasicFormComponent },
      { path: 'step-form', component: StepFormComponent },
      { path: 'advanced-form', component: AdvancedFormComponent }
    ]
  },
  {
    path: 'list',
    children: [
      { path: 'table-list', component: ProTableListComponent },
      { path: 'basic-list', component: ProBasicListComponent },
      { path: 'card-list', component: ProCardListComponent },
      {
        path: '',
        component: ProListLayoutComponent,
        children: [
          { path: 'articles', component: ProListArticlesComponent },
          { path: 'projects', component: ProListProjectsComponent },
          { path: 'applications', component: ProListApplicationsComponent }
        ]
      }
    ]
  },
  {
    path: 'profile',
    children: [
      { path: 'basic', component: ProProfileBaseComponent },
      { path: 'advanced', component: ProProfileAdvancedComponent }
    ]
  },
  {
    path: 'result',
    children: [
      { path: 'success', component: ProResultSuccessComponent },
      { path: 'fail', component: ProResultFailComponent }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'center',
        component: ProAccountCenterComponent,
        children: [
          { path: '', redirectTo: 'articles', pathMatch: 'full' },
          {
            path: 'articles',
            component: ProAccountCenterArticlesComponent,
            data: { titleI18n: 'pro-account-center' }
          },
          {
            path: 'projects',
            component: ProAccountCenterProjectsComponent,
            data: { titleI18n: 'pro-account-center' }
          },
          {
            path: 'applications',
            component: ProAccountCenterApplicationsComponent,
            data: { titleI18n: 'pro-account-center' }
          }
        ]
      },
      {
        path: 'settings',
        component: ProAccountSettingsComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: ProAccountSettingsBaseComponent,
            data: { titleI18n: 'pro-account-settings' }
          },
          {
            path: 'security',
            component: ProAccountSettingsSecurityComponent,
            data: { titleI18n: 'pro-account-settings' }
          },
          {
            path: 'binding',
            component: ProAccountSettingsBindingComponent,
            data: { titleI18n: 'pro-account-settings' }
          },
          {
            path: 'notification',
            component: ProAccountSettingsNotificationComponent,
            data: { titleI18n: 'pro-account-settings' }
          }
        ]
      }
    ]
  }
];
