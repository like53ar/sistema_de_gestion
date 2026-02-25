import { Routes } from '@angular/router';
import { Tesoreria } from './tesoreria';

export const TESORERIA_ROUTES: Routes = [
    {
        path: '',
        component: Tesoreria,
        children: [
            // Add child routes for Tesoreria here
        ]
    }
];
