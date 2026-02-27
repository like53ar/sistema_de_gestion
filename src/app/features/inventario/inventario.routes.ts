import { Routes } from '@angular/router';
import { Inventario } from './inventario';

export const INVENTARIO_ROUTES: Routes = [
    {
        path: '',
        component: Inventario,
        children: [
            { path: '', redirectTo: 'gestion-productos', pathMatch: 'full' },
            {
                path: 'gestion-productos',
                loadComponent: () => import('./gestion-productos/gestion-productos').then(m => m.GestionProductos),
                data: { breadcrumb: 'Gestión de Productos' }
            },
            {
                path: 'control-stock',
                loadComponent: () => import('./control-stock/control-stock').then(m => m.ControlStock),
                data: { breadcrumb: 'Control de Stock' }
            },
            {
                path: 'movimientos-inventario',
                loadComponent: () => import('./movimientos-inventario/movimientos-inventario').then(m => m.MovimientosInventario),
                data: { breadcrumb: 'Movimientos de Inventario' }
            },
            {
                path: 'ajustes-stock',
                loadComponent: () => import('./ajustes-stock/ajustes-stock').then(m => m.AjustesStock),
                data: { breadcrumb: 'Ajustes de Stock' }
            },
            {
                path: 'valorizacion-inventario',
                loadComponent: () => import('./valorizacion-inventario/valorizacion-inventario').then(m => m.ValorizacionInventario),
                data: { breadcrumb: 'Valorización de Inventario' }
            },
            {
                path: 'alertas-reposicion',
                loadComponent: () => import('./alertas-reposicion/alertas-reposicion').then(m => m.AlertasReposicion),
                data: { breadcrumb: 'Alertas de Reposición' }
            }
        ]
    }
];
