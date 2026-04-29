import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametros-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.html',
  styleUrl: './compras.scss'
})
export class ParametrosCompras {
  activeTab: string = 'principal';

  tabs = [
    { id: 'principal', label: 'Principal' },
    { id: 'impuestos', label: 'Impuestos' },
    { id: 'retenciones', label: 'Retenciones' },
    { id: 'comprobantes', label: 'Comprobantes' },
    { id: 'controles', label: 'Controles' },
    { id: 'referencia', label: 'Comprobantes de Referencia' },
    { id: 'clasificacion', label: 'Clasificacion de Comprobantes' }
  ];

  selectTab(id: string) {
    this.activeTab = id;
  }
}
