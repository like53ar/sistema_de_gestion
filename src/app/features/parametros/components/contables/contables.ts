import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametrosContabilidadService, ParametrosContabilidadData } from '../../../../core/services/parametros-contabilidad.service';

@Component({
  selector: 'app-parametros-contables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contables.html',
  styleUrl: '../tesoreria/tesoreria.scss'
})
export class ParametrosContables implements OnInit {
  activeTab: string = 'principal';
  config!: ParametrosContabilidadData;

  tabs = [
    { id: 'principal', label: 'Principal' },
    { id: 'cuentas', label: 'Cuentas para procesos automáticos' },
    { id: 'asientos', label: 'Tipo de Asientos para procesos automáticos' }
  ];

  constructor(
    private router: Router,
    private paramsService: ParametrosContabilidadService
  ) {}

  ngOnInit() {
    this.config = this.paramsService.getParametros();
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  save() {
    this.paramsService.saveParametros(this.config);
    console.log('Parámetros de Contabilidad guardados:', this.config);
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['/parametros']);
  }
}
