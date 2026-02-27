import { Routes } from '@angular/router';
import { Compras } from './compras';

export const COMPRAS_ROUTES: Routes = [
    {
        path: '',
        component: Compras,
        children: [
            { path: '', redirectTo: 'ordenes-compra', pathMatch: 'full' },
            {
                path: 'ordenes-compra',
                loadComponent: () => import('./ordenes-compra/ordenes-compra').then(m => m.OrdenesCompra),
                data: { breadcrumb: 'Órdenes de Compra' }
            },
            {
                path: 'registro-compras',
                loadComponent: () => import('./registro-compras/registro-compras').then(m => m.RegistroCompras),
                data: { breadcrumb: 'Registro de Compras' }
            },
            {
                path: 'recepcion-mercaderia',
                loadComponent: () => import('./recepcion-mercaderia/recepcion-mercaderia').then(m => m.RecepcionMercaderia),
                data: { breadcrumb: 'Recepción de Mercadería' }
            },
            {
                path: 'gestion-proveedores',
                loadComponent: () => import('./gestion-proveedores/gestion-proveedores').then(m => m.GestionProveedores),
                data: { breadcrumb: 'Gestión de Proveedores' }
            },
            {
                path: 'seguimiento-pagos',
                loadComponent: () => import('./seguimiento-pagos/seguimiento-pagos').then(m => m.SeguimientoPagos),
                data: { breadcrumb: 'Seguimiento de Pagos' }
            }
        ]
    }
];
