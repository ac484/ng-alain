import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/settings-list').then(m => m.SettingsListComponent)
    }
];