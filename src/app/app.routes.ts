import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Ventas } from './modules/ventas/ventas';
import { Tesoreria } from './modules/tesoreria/tesoreria';
import { Proveedores } from './modules/proveedores/proveedores';
import { Contabilidad } from './modules/contabilidad/contabilidad';
import { Sueldos } from './modules/sueldos/sueldos';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'ventas', pathMatch: 'full' },

            // Ventas Module
            {
                path: 'ventas',
                children: [
                    { path: '', title: 'Ventas - Sabia', component: Ventas },
                    { path: 'clientes', title: 'Clientes - Ventas', loadComponent: () => import('./modules/ventas/components/clientes/clientes').then(m => m.Clientes) },
                    { path: 'productos', title: 'Productos - Ventas', loadComponent: () => import('./modules/ventas/components/productos/productos').then(m => m.Productos) },
                    { path: 'vendedores', title: 'Vendedores - Ventas', loadComponent: () => import('./modules/ventas/components/vendedores/vendedores').then(m => m.Vendedores) },
                    { path: 'zonas', title: 'Zonas - Ventas', loadComponent: () => import('./modules/ventas/components/zonas/zonas').then(m => m.Zonas) },
                ]
            },

            { path: 'tesoreria', title: 'Tesorería - Sabia', component: Tesoreria },
            { path: 'proveedores', title: 'Proveedores - Sabia', component: Proveedores },
            { path: 'contabilidad', title: 'Contabilidad - Sabia', component: Contabilidad },
            { path: 'sueldos', title: 'Sueldos - Sabia', component: Sueldos },
        ]
    },
    { path: '**', redirectTo: '' }
];
