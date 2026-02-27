import { Routes } from '@angular/router';
import { Sueldos } from './sueldos';

export const SUELDOS_ROUTES: Routes = [
    {
        path: '',
        component: Sueldos,
        children: [
            { path: '', redirectTo: 'gestion-legajos', pathMatch: 'full' },
            {
                path: 'gestion-legajos',
                loadComponent: () => import('./gestion-legajos/gestion-legajos').then(m => m.GestionLegajos),
                data: { breadcrumb: 'Gestión de Legajos' }
            },
            {
                path: 'liquidacion-haberes',
                loadComponent: () => import('./liquidacion-haberes/liquidacion-haberes').then(m => m.LiquidacionHaberes),
                data: { breadcrumb: 'Liquidación de Haberes' }
            },
            {
                path: 'control-asistencia',
                loadComponent: () => import('./control-asistencia/control-asistencia').then(m => m.ControlAsistencia),
                data: { breadcrumb: 'Control de Asistencia y Novedades' }
            },
            {
                path: 'obligaciones-legales',
                loadComponent: () => import('./obligaciones-legales/obligaciones-legales').then(m => m.ObligacionesLegales),
                data: { breadcrumb: 'Obligaciones Legales y Reportes' }
            },
            {
                path: 'integracion-contable',
                loadComponent: () => import('./integracion-contable/integracion-contable').then(m => m.IntegracionContable),
                data: { breadcrumb: 'Integración Contable' }
            }
        ]
    }
];
