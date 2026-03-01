import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Ventas } from './ventas';
import { ventasReducer, ventasFeatureKey } from './store/ventas.reducer';
import { VentasEffects } from './store/ventas.effects';

export const VENTAS_ROUTES: Routes = [
    {
        path: '',
        component: Ventas,
        providers: [
            provideState(ventasFeatureKey, ventasReducer),
            provideEffects(VentasEffects)
        ],
        children: [
            { path: 'clientes', title: 'Clientes - Ventas', data: { breadcrumb: 'Clientes' }, loadComponent: () => import('./components/clientes/clientes').then(m => m.Clientes) },
            { path: 'productos', title: 'Productos - Ventas', data: { breadcrumb: 'Productos' }, loadComponent: () => import('./components/productos/productos').then(m => m.Productos) },
            { path: 'vendedores', title: 'Vendedores - Ventas', data: { breadcrumb: 'Vendedores' }, loadComponent: () => import('./components/vendedores/vendedores').then(m => m.Vendedores) },
            { path: 'zonas', title: 'Zonas - Ventas', data: { breadcrumb: 'Zonas' }, loadComponent: () => import('./components/zonas/zonas').then(m => m.Zonas) },
            { path: 'lista-precios', title: 'Lista de Precios - Ventas', data: { breadcrumb: 'Lista de Precios' }, loadComponent: () => import('./components/lista-precios/lista-precios').then(m => m.ListaPrecios) },
            { path: 'informes', title: 'Informes - Ventas', data: { breadcrumb: 'Informes' }, loadComponent: () => import('./components/informes/informes').then(m => m.Informes) }
        ]
    }
];
