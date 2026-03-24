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
            { path: 'paises', title: 'Países - Parámetros', data: { breadcrumb: 'Países' }, loadComponent: () => import('./components/paises/paises').then(m => m.Paises) },
            { path: 'codigos-iva', title: 'Códigos de IVA - Parámetros', data: { breadcrumb: 'Códigos de IVA' }, loadComponent: () => import('./components/codigos-iva/codigos-iva').then(m => m.CodigosIva) },
            { path: 'categorias-iva', title: 'Categorías de IVA - Parámetros', data: { breadcrumb: 'Categorías de IVA' }, loadComponent: () => import('./components/categorias-iva/categorias-iva').then(m => m.CategoriasIva) },
            { path: 'tipos-comprobante', title: 'Tipos de Comprobante - Parámetros', data: { breadcrumb: 'Tipos de Comprobante' }, loadComponent: () => import('./components/tipos-comprobante/tipos-comprobante').then(m => m.TiposComprobante) },
            { path: 'tipos-documento', title: 'Tipos de Documento - Parámetros', data: { breadcrumb: 'Tipos de Documento' }, loadComponent: () => import('./components/tipos-documento/tipos-documento').then(m => m.TiposDocumento) },
            { path: 'ventas', title: 'Ventas - Parámetros', data: { breadcrumb: 'Ventas' }, loadComponent: () => import('./components/ventas/ventas').then(m => m.ParametrosVentas) }
        ]
    }
];
