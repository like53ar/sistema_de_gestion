import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  navItems = [
    { label: 'Ventas', path: '/ventas' },
    { label: 'Tesorería', path: '/tesoreria' },
    { label: 'Proveedores', path: '/proveedores' },
    { label: 'Contabilidad', path: '/contabilidad' },
    { label: 'Sueldos', path: '/sueldos' },
  ];
}
