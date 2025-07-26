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
    {
        path: 'overview',
        loadComponent: () =>
            import('./components/workspace-overview').then(m => m.WorkspaceOverviewComponent)
    },
    {
        path: 'calendar',
        loadComponent: () =>
            import('./components/workspace-calendar').then(m => m.WorkspaceCalendarComponent)
    },
    {
        path: 'tasks',
        loadComponent: () =>
            import('./components/workspace-tasks').then(m => m.WorkspaceTasksComponent)
    },
    {
        path: 'daily-log',
        loadComponent: () =>
            import('./components/workspace-daily-log').then(m => m.WorkspaceDailyLogComponent)
    },
    {
        path: 'memos',
        loadComponent: () =>
            import('./components/workspace-memos').then(m => m.WorkspaceMemosComponent)
    }
];