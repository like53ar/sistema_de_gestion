import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Ingreso - Sabia',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'ventas', pathMatch: 'full' },

            // Feature Modules (Lazy Loaded)
            {
                path: 'ventas',
                data: { breadcrumb: 'Ventas', roles: ['ADMIN', 'VENTAS'] },
                canActivate: [roleGuard],
                loadChildren: () => import('./features/ventas/ventas.routes').then(m => m.VENTAS_ROUTES)
            },
            {
                path: 'compras',
                data: { breadcrumb: 'Compras', roles: ['ADMIN', 'COMPRAS'] },
                canActivate: [roleGuard],
                loadChildren: () => import('./features/proveedores/compras.routes').then(m => m.COMPRAS_ROUTES)
            },
            {
                path: 'contabilidad',
                data: { breadcrumb: 'Contabilidad', roles: ['ADMIN', 'CONTADOR'] },
                canActivate: [roleGuard],
                loadChildren: () => import('./features/contabilidad/contabilidad.routes').then(m => m.CONTABILIDAD_ROUTES)
            },
            {
                path: 'tesoreria',
                data: { breadcrumb: 'Tesorería', roles: ['ADMIN', 'TESORERIA'] },
                canActivate: [roleGuard],
                loadChildren: () => import('./features/tesoreria/tesoreria.routes').then(m => m.TESORERIA_ROUTES)
            },
            {
                path: 'inventario',
                data: { breadcrumb: 'Inventario', roles: ['ADMIN', 'DEPOSITO'] },
                canActivate: [roleGuard],
                loadChildren: () => import('./features/inventario/inventario.routes').then(m => m.INVENTARIO_ROUTES)
            },
            {
                path: 'sueldos',
                title: 'Sueldos - Sabia',
                data: { breadcrumb: 'Sueldos', roles: ['ADMIN', 'RRHH'] },
                canActivate: [roleGuard],
                loadComponent: () => import('./features/sueldos/sueldos').then(m => m.Sueldos)
            },
        ]
    },
    { path: '**', redirectTo: '' }
];
