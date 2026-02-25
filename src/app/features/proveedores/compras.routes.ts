import { Routes } from '@angular/router';
import { Proveedores } from '../proveedores/proveedores';

export const COMPRAS_ROUTES: Routes = [
    {
        path: '',
        component: Proveedores,
        children: [
            // Add child routes for Compras here
        ]
    }
];
