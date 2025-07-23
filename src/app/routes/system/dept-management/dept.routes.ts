import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dept-list.component').then(m => m.DeptListComponent),
    data: { title: '部門列表' }
  }
];
