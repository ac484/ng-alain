import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      {
        path: 'accounts',
        loadChildren: () => import('./account/account.routes').then(m => m.routes),
        data: { title: '帳號管理', titleI18n: 'menu.system.accounts' }
      },
      {
        path: 'roles',
        loadChildren: () => import('./role-management/role.routes').then(m => m.routes),
        data: { title: '角色管理', titleI18n: 'menu.system.roles' }
      },
      {
        path: 'menus',
        loadChildren: () => import('./menu-management/menu.routes').then(m => m.routes),
        data: { title: '菜單管理', titleI18n: 'menu.system.menus' }
      },
      {
        path: 'departments',
        loadChildren: () => import('./dept-management/dept.routes').then(m => m.routes),
        data: { title: '部門管理', titleI18n: 'menu.system.departments' }
      }
    ]
  }
];
