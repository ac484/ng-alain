import { Routes } from '@angular/router';

export const workspaceRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./components/workspace-dashboard').then(m => m.WorkspaceDashboardComponent)
    },
    {
        path: 'list',
        loadComponent: () =>
            import('./components/workspace-list').then(m => m.WorkspaceListComponent)
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./components/workspace-form').then(m => m.WorkspaceFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./components/workspace-form').then(m => m.WorkspaceFormComponent)
    },

];