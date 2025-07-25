import { Routes } from '@angular/router';

export default [
  {
    path: 'contract',
    loadComponent: () => import('./contract/contract.component').then(m => m.HubContractComponent)
  },
  {
    path: 'tree',
    loadComponent: () => import('./tree/tree.component').then(m => m.HubTreeContractComponent)
  },
  {
    path: 'workspace',
    loadComponent: () => import('./workspace/workspace.component').then(m => m.HubWorkspaceComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.HubSettingsComponent)
  }
] as Routes;
