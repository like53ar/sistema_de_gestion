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
            { path: 'clientes', title: 'Clientes - Ventas', loadComponent: () => import('./components/clientes/clientes').then(m => m.Clientes) },
            { path: 'productos', title: 'Productos - Ventas', loadComponent: () => import('./components/productos/productos').then(m => m.Productos) },
            { path: 'vendedores', title: 'Vendedores - Ventas', loadComponent: () => import('./components/vendedores/vendedores').then(m => m.Vendedores) },
            { path: 'zonas', title: 'Zonas - Ventas', loadComponent: () => import('./components/zonas/zonas').then(m => m.Zonas) },
            { path: 'lista-precios', title: 'Lista de Precios - Ventas', loadComponent: () => import('./components/lista-precios/lista-precios').then(m => m.ListaPrecios) }
        ]
    }
];
