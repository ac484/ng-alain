import { Routes } from '@angular/router';

export const contractRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/contract-list').then(m => m.ContractListComponent)
    },
    {
        path: 'new',
        loadComponent: () =>
            import('./components/contract-form').then(m => m.ContractFormComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./components/contract-detail').then(m => m.ContractDetailComponent)
    },
    {
        path: ':id/edit',
        loadComponent: () =>
            import('./components/contract-form').then(m => m.ContractFormComponent)
    }
];