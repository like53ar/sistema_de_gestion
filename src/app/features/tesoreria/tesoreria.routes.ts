import { Routes } from '@angular/router';
import { Tesoreria } from './tesoreria';

export const TESORERIA_ROUTES: Routes = [
    {
        path: '',
        component: Tesoreria,
        children: [
            { path: '', redirectTo: 'arqueo-caja', pathMatch: 'full' },
            {
                path: 'arqueo-caja',
                loadComponent: () => import('./arqueo-caja/arqueo-caja').then(m => m.ArqueoCaja),
                data: { breadcrumb: 'Arqueo de Caja' }
            },
            {
                path: 'gestion-bancos',
                loadComponent: () => import('./gestion-bancos/gestion-bancos').then(m => m.GestionBancos),
                data: { breadcrumb: 'Gestión de Bancos' }
            },
            {
                path: 'cobros-pagos',
                loadComponent: () => import('./cobros-pagos/cobros-pagos').then(m => m.CobrosPagos),
                data: { breadcrumb: 'Cobros y Pagos' }
            },
            {
                path: 'conciliacion-bancaria',
                loadComponent: () => import('./conciliacion-bancaria/conciliacion-bancaria').then(m => m.ConciliacionBancaria),
                data: { breadcrumb: 'Conciliación Bancaria' }
            },
            {
                path: 'flujo-caja',
                loadComponent: () => import('./flujo-caja/flujo-caja').then(m => m.FlujoCaja),
                data: { breadcrumb: 'Flujo de Caja Proyectado' }
            },
            {
                path: 'movimientos-efectivo',
                loadComponent: () => import('./movimientos-efectivo/movimientos-efectivo').then(m => m.MovimientosEfectivo),
                data: { breadcrumb: 'Movimientos de Efectivo' }
            }
        ]
    }
];
