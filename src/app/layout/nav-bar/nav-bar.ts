import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  navItems = [
    { label: 'Parámetros Generales', path: '/parametros', tooltip: 'Ajustes globales y padrones base' },
    { label: 'Ventas', path: '/ventas', tooltip: 'Facturación, clientes y pedidos' },
    { label: 'Compras', path: '/compras', tooltip: 'Órdenes de compra y proveedores' },
    { label: 'Tesorería', path: '/tesoreria', tooltip: 'Caja, bancos y movimientos' },
    { label: 'Contabilidad', path: '/contabilidad', tooltip: 'Asientos, mayor y balances' },
    { label: 'Inventario', path: '/inventario', tooltip: 'Stock, depósitos y movimientos' },
    { label: 'Sueldos', path: '/sueldos', tooltip: 'Liquidación de haberes y recibos' },
  ];

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  /** Apaga el servidor Node.js limpiamente vía /api/shutdown */
  cerrarSistema() {
    const confirmar = window.confirm(
      '⚠️  ¿Confirma el cierre del sistema?\n\nEsto detendrá el servidor y cerrará la aplicación.'
    );
    if (!confirmar) return;

    fetch('/api/shutdown', { method: 'POST' })
      .then(() => {
        // Mostrar pantalla de cierre en el browser
        document.body.innerHTML = `
          <div style="
            display:flex; flex-direction:column; align-items:center; justify-content:center;
            height:100vh; background:#0d1117; color:#c8a882; font-family:'Segoe UI',sans-serif;
            gap:16px;
          ">
            <div style="font-size:3rem">⏻</div>
            <h2 style="margin:0;font-size:1.4rem;font-weight:600">Sistema cerrado correctamente</h2>
            <p style="margin:0;color:#8b949e;font-size:0.95rem">
              El servidor fue detenido. Puede cerrar esta pestaña.
            </p>
          </div>`;
      })
      .catch(() => {
        // Si ya no hay servidor, igual mostramos el mensaje
        document.body.innerHTML = `
          <div style="
            display:flex; flex-direction:column; align-items:center; justify-content:center;
            height:100vh; background:#0d1117; color:#c8a882; font-family:'Segoe UI',sans-serif;
            gap:16px;
          ">
            <div style="font-size:3rem">⏻</div>
            <h2 style="margin:0;font-size:1.4rem;font-weight:600">Sistema cerrado correctamente</h2>
            <p style="margin:0;color:#8b949e;font-size:0.95rem">
              El servidor fue detenido. Puede cerrar esta pestaña.
            </p>
          </div>`;
      });
  }
}
