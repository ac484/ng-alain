import { Routes } from '@angular/router';

export default [
  {
    path: 'contracts',
    loadChildren: () => import('./features/contracts/routes').then(m => m.contractRoutes)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/routes').then(m => m.settingsRoutes)
  },
  {
    path: 'workspace',
    loadChildren: () => import('./features/workspace/routes').then(m => m.workspaceRoutes)
  },
  // Legacy redirects
  {
    path: 'contract',
    redirectTo: 'contracts'
  },
  {
    path: '',
    redirectTo: 'contracts',
    pathMatch: 'full'
  }
] as Routes;
