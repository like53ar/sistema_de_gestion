import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'ventas', pathMatch: 'full' },

            // Feature Modules (Lazy Loaded)
            {
                path: 'ventas',
                loadChildren: () => import('./features/ventas/ventas.routes').then(m => m.VENTAS_ROUTES)
            },
            {
                path: 'compras',
                loadChildren: () => import('./features/proveedores/compras.routes').then(m => m.COMPRAS_ROUTES)
            },
            {
                path: 'contabilidad',
                loadChildren: () => import('./features/contabilidad/contabilidad.routes').then(m => m.CONTABILIDAD_ROUTES)
            },
            {
                path: 'tesoreria',
                loadChildren: () => import('./features/tesoreria/tesoreria.routes').then(m => m.TESORERIA_ROUTES)
            },
            {
                path: 'inventario',
                loadChildren: () => import('./features/inventario/inventario.routes').then(m => m.INVENTARIO_ROUTES)
            },
            {
                path: 'sueldos',
                title: 'Sueldos - Sabia',
                loadComponent: () => import('./features/sueldos/sueldos').then(m => m.Sueldos)
            },
        ]
    },
    { path: '**', redirectTo: '' }
];
