import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./menu-list.component').then(m => m.MenuListComponent),
    data: { title: '菜單列表' }
  }
];
