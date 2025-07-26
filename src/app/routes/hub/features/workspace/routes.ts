import { Routes } from '@angular/router';

export const workspaceRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/workspace-dashboard').then(m => m.WorkspaceDashboardComponent)
    }
];