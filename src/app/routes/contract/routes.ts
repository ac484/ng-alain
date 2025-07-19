import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(m => m.ContractListComponent),
        data: { title: '合約列表', titleI18n: 'menu.contract.list' }
      },
      {
        path: 'create',
        loadComponent: () => import('./create/create.component').then(m => m.ContractCreateComponent),
        data: { title: '創建合約', titleI18n: 'menu.contract.create' }
      },
      {
        path: 'review',
        loadComponent: () => import('./review/review.component').then(m => m.ContractReviewComponent),
        data: { title: '合約審查', titleI18n: 'menu.contract.review' }
      },
      {
        path: 'edit',
        redirectTo: 'edit/1',
        pathMatch: 'full'
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./edit/edit.component').then(m => m.ContractEditComponent),
        data: { title: '編輯合約' }
      },
      {
        path: 'detail',
        redirectTo: 'detail/1',
        pathMatch: 'full'
      },
      {
        path: 'detail/:id',
        loadComponent: () => import('./detail/detail.component').then(m => m.ContractDetailComponent),
        data: { title: '合約詳情' }
      }
    ]
  }
] as Routes;
