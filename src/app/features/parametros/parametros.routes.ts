import { Routes } from '@angular/router';
import { ParametrosGenerales } from './parametros';

export const PARAMETROS_ROUTES: Routes = [
    {
        path: '',
        component: ParametrosGenerales,
        children: [
            { path: 'provincias', title: 'Provincias - Parámetros', data: { breadcrumb: 'Provincias' }, loadComponent: () => import('./components/provincias/provincias').then(m => m.Provincias) },
            { path: 'monedas', title: 'Monedas - Parámetros', data: { breadcrumb: 'Monedas' }, loadComponent: () => import('./components/monedas/monedas').then(m => m.Monedas) },
            { path: 'bancos', title: 'Bancos - Parámetros', data: { breadcrumb: 'Bancos' }, loadComponent: () => import('./components/bancos/bancos').then(m => m.Bancos) },
            { path: 'paises', title: 'Países - Parámetros', data: { breadcrumb: 'Países' }, loadComponent: () => import('./components/paises/paises').then(m => m.Paises) }
        ]
    }
];
