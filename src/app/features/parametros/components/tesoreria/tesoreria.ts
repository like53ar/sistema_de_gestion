import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParametrosTesoreriaService, ParametrosTesoreriaData } from '../../../../core/services/parametros-tesoreria.service';

@Component({
  selector: 'app-parametros-tesoreria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tesoreria.html',
  styleUrl: './tesoreria.scss'
})
export class ParametrosTesoreria implements OnInit {
  activeTab: string = 'principal';
  config!: ParametrosTesoreriaData;

  tabs = [
    { id: 'principal', label: 'Principal' },
    { id: 'tarjetas', label: 'Administración de Tarjetas' },
    { id: 'clasificacion', label: 'Clasificación de Comprobantes' }
  ];

  constructor(
    private router: Router,
    private paramsService: ParametrosTesoreriaService
  ) {}

  ngOnInit() {
    this.config = this.paramsService.getParametros();
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  save() {
    this.paramsService.saveParametros(this.config);
    console.log('Parámetros de Tesorería guardados:', this.config);
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['/parametros']);
  }
}
