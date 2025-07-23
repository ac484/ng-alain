import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./role-list.component').then(m => m.RoleListComponent),
    data: { title: '角色列表' }
  }
];
