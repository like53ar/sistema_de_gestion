import { Routes } from '@angular/router';
import { Contabilidad } from './contabilidad';

export const CONTABILIDAD_ROUTES: Routes = [
    {
        path: '',
        component: Contabilidad,
        children: [
            { path: '', redirectTo: 'plan-cuentas', pathMatch: 'full' },
            {
                path: 'plan-cuentas',
                loadComponent: () => import('./plan-cuentas/plan-cuentas').then(m => m.PlanCuentas),
                data: { breadcrumb: 'Plan de Cuentas' }
            },
            {
                path: 'asientos-contables',
                loadComponent: () => import('./asientos-contables/asientos-contables').then(m => m.AsientosContables),
                data: { breadcrumb: 'Asientos Contables' }
            },
            {
                path: 'libro-mayor',
                loadComponent: () => import('./libro-mayor/libro-mayor').then(m => m.LibroMayor),
                data: { breadcrumb: 'Libro Mayor' }
            },
            {
                path: 'balance-general',
                loadComponent: () => import('./balance-general/balance-general').then(m => m.BalanceGeneral),
                data: { breadcrumb: 'Balance General' }
            },
            {
                path: 'estado-resultados',
                loadComponent: () => import('./estado-resultados/estado-resultados').then(m => m.EstadoResultados),
                data: { breadcrumb: 'Estado de Resultados' }
            },
            {
                path: 'periodos-contables',
                loadComponent: () => import('./periodos-contables/periodos-contables').then(m => m.PeriodosContables),
                data: { breadcrumb: 'Períodos Contables' }
            }
        ]
    }
];
