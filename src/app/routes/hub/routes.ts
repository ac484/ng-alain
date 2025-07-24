import { Routes } from '@angular/router';

export default [
  {
    path: 'contract',
    loadComponent: () => import('./contract/contract.component').then(m => m.HubContractComponent)
  },
  {
    path: 'tree/contract',
    loadComponent: () => import('./tree/contract.component').then(m => m.HubTreeContractComponent)
  },
  {
    path: 'workspace',
    loadComponent: () => import('./workspace/workspace.component').then(m => m.HubWorkspaceComponent)
  }
] as Routes;
