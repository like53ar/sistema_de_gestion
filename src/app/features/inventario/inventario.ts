import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inventario',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <div class="card">
        <h2>Módulo de Inventario</h2>
        <p>Gestión de stock, depósitos y movimientos de mercadería.</p>
      </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; }
    .card { background: var(--bg-card); padding: 20px; border-radius: 8px; }
  `]
})
export class Inventario { }
