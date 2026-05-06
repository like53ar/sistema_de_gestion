import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametros-inventario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="zen-modal-overlay fade-in" (click)="closeModal()">
        <div class="zen-modal-container sm" (click)="$event.stopPropagation()">
            <div class="modal-header no-border">
                <button class="btn-close" (click)="closeModal()">×</button>
            </div>
            <div class="modal-content centered-content">
                <div class="construction-container">
                    <div class="construction-icon">📦</div>
                    <h2>Inventario en Desarrollo</h2>
                    <p>La configuración de stock, depósitos y artículos está en proceso de rediseño. Muy pronto estará disponible.</p>
                    <div class="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer no-border">
                <button class="btn-zen-secondary" (click)="closeModal()">Volver</button>
            </div>
        </div>
    </div>
  `,
  styleUrl: '../tesoreria/tesoreria.scss'
})
export class ParametrosInventario {
  constructor(private router: Router) {}
  closeModal() {
    this.router.navigate(['/parametros']);
  }
}
