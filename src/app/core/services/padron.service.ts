import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { PadronData } from '../../models/padron.model';

@Injectable({
    providedIn: 'root'
})
export class PadronService {

    // Simulación de base de datos (en producción esto llamaría a una API)
    private mockDb: Record<string, string> = {
        '30-70918329-5': 'GOOGLE ARGENTINA S.R.L.',
        '30-70308853-4': 'MERCADOLIBRE S.R.L.',
        '30-67877536-2': 'GLOBANT S.A.',
        '30-50001091-2': 'BANCO DE LA NACION ARGENTINA',
        '33-65326527-9': 'AEROLINEAS ARGENTINAS S.E.',
        '20-12345678-9': 'CONSUMIDOR FINAL (PRUEBA)',
        '20-16579611-0': 'FABIAN ARMANDO CORREA',
        // Puedes agregar más aquí o cargar un JSON externo
    };

    constructor() { }

    getPersonaByCuit(cuit: string): Observable<PadronData | null> {
        // Normalizar CUIT (quitar guiones si el usuario los pone)
        const cleanCuit = cuit.replace(/-/g, '').trim();

        // Buscar en mock (intentando matchear con o sin guiones)
        let foundName: string | undefined;

        // Intento directo
        if (this.mockDb[cuit]) foundName = this.mockDb[cuit];

        // Búsqueda "inteligente" en las claves
        if (!foundName) {
            const key = Object.keys(this.mockDb).find(k => k.replace(/-/g, '') === cleanCuit);
            if (key) foundName = this.mockDb[key];
        }

        if (foundName) {
            return of({ cuit: cuit, denominacion: foundName }).pipe(delay(500)); // Simular delay de red (0.5s)
        }

        return of(null).pipe(delay(500));
    }
}
