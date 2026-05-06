import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asientos-contables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asientos-contables.html',
  styleUrl: './asientos-contables.scss',
})
export class AsientosContables {
  
  tabs = [
    { id: 'asientos_contables', label: 'Asientos contables', icon: '📝' },
    { id: 'asientos_extracontables', label: 'Asientos extracontables', icon: '📎' },
    { id: 'generacion_masiva', label: 'Generación masiva de asientos', icon: '⚡' },
    { id: 'eliminacion_masiva', label: 'Eliminación masiva de asientos', icon: '🗑️' },
    { id: 'reasignacion', label: 'Reasignación de apropiaciones', icon: '🔄' },
    { id: 'cambio_estado', label: 'Cambio de estado de asientos', icon: '⚙️' }
  ];

  activeTab = signal<string>('asientos_contables');

  selectTab(tabId: string) {
    this.activeTab.set(tabId);
  }
}
