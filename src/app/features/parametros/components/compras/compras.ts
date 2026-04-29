import { Component } from '@angular/core';

@Component({
  selector: 'app-parametros-compras',
  standalone: true,
  template: `
    <div class="empty-state">
      <h3>Configuración de Compras</h3>
      <p>Esta sección se ha trasladado al módulo de Compras / Archivos.</p>
    </div>
  `,
  styles: [`
    .empty-state {
      padding: 40px;
      text-align: center;
      color: #a89880;
    }
  `]
})
export class ParametrosCompras {}
