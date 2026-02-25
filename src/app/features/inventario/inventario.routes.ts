import { Routes } from '@angular/router';
import { Inventario } from './inventario';

export const INVENTARIO_ROUTES: Routes = [
    {
        path: '',
        component: Inventario,
        children: [
            // Add child routes for Inventario here
        ]
    }
];
