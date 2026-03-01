import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../../shared/tooltip/tooltip.directive';

export interface Provincia {
  id: string; // Alfanumérico
  nombre: string;
}

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provincias.html',
  styleUrl: './provincias.scss'
})
export class Provincias {
  // Base de datos de provincias con formato alfanumérico
  provinciasBD: Provincia[] = [
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

  searchTerm: string = '';

  get provinciasFiltradas(): Provincia[] {
    return this.provinciasBD.filter(p =>
      p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.id.includes(this.searchTerm)
    );
  }
}
