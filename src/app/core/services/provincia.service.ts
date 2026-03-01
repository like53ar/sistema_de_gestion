import { Injectable } from '@angular/core';

export interface Provincia {
    id: string; // Alfanumérico
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProvinciaService {
    private _provinciasBD: Provincia[] = [
        { id: '00', nombre: 'Ciudad Autónoma de Buenos Aires' },
        { id: '01', nombre: 'Buenos Aires' },
        { id: '02', nombre: 'Catamarca' },
        { id: '03', nombre: 'Córdoba' },
        { id: '04', nombre: 'Corrientes' },
        { id: '05', nombre: 'Entre Ríos' },
        { id: '06', nombre: 'Jujuy' },
        { id: '07', nombre: 'Mendoza' },
        { id: '08', nombre: 'La Rioja' },
        { id: '09', nombre: 'Salta' },
        { id: '10', nombre: 'San Juan' },
        { id: '11', nombre: 'San Luis' },
        { id: '12', nombre: 'Santa Fe' },
        { id: '13', nombre: 'Santiago del Estero' },
        { id: '14', nombre: 'Tucumán' },
        { id: '16', nombre: 'Chaco' },
        { id: '17', nombre: 'Chubut' },
        { id: '18', nombre: 'Formosa' },
        { id: '19', nombre: 'Misiones' },
        { id: '20', nombre: 'Neuquén' },
        { id: '21', nombre: 'La Pampa' },
        { id: '22', nombre: 'Río Negro' },
        { id: '23', nombre: 'Santa Cruz' },
        { id: '24', nombre: 'Tierra del Fuego' }
    ];

    getProvincias(): Provincia[] {
        return this._provinciasBD;
    }
}
