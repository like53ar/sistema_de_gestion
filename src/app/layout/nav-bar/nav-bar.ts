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
}
