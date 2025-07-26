import { Routes } from '@angular/router';

export const treeRoutes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () =>
            import('./components/tree-list').then(m => m.TreeListComponent)
    },
    {
        path: 'panel',
        loadComponent: () =>
            import('./components/tree-panel').then(m => m.TreePanelComponent)
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./components/tree-form').then(m => m.TreeFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./components/tree-form').then(m => m.TreeFormComponent)
    },
    {
        path: 'pdf-scan',
        loadComponent: () =>
            import('./components/tree-pdf-scan').then(m => m.TreePdfScanComponent)
    },
    {
        path: 'scan-result',
        loadComponent: () =>
            import('./components/tree-scan-result').then(m => m.TreeScanResultComponent)
    },
    {
        path: 'document-viewer',
        loadComponent: () =>
            import('./components/tree-document-viewer').then(m => m.TreeDocumentViewerComponent)
    }
];