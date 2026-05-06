import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';
import { PlanCuentas } from './plan-cuentas/plan-cuentas';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, TooltipDirective, PlanCuentas],
  templateUrl: './contabilidad.html',
  styleUrl: './contabilidad.scss',
})
export class Contabilidad {
  isPlanCuentasOpen = false;

  abrirPlanCuentas() {
    this.isPlanCuentasOpen = true;
  }

  cerrarPlanCuentas() {
    this.isPlanCuentasOpen = false;
  }
}
