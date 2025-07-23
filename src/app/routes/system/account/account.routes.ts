import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./account-list.component').then(m => m.AccountListComponent),
    data: { title: '帳號列表' }
  }
];
