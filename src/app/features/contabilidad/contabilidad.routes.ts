import { Routes } from '@angular/router';
import { Contabilidad } from './contabilidad';

export const CONTABILIDAD_ROUTES: Routes = [
    {
        path: '',
        component: Contabilidad,
        children: [
            // Add child routes for Contabilidad here
        ]
    }
];
