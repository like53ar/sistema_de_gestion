import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Provincia, ProvinciaService } from '../../../../core/services/provincia.service';
import { ParametrosVentasData, ParametrosVentasService } from '../../../../core/services/parametros-ventas.service';

@Component({
  selector: 'app-parametros-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.scss'
})
export class ParametrosVentas implements OnInit {
  activeTab: string = 'Principal';

  tabs: string[] = [
    'Principal', 'Impuestos', 'Clientes', 'Artículos', 'Comprobantes',
    'Controles', 'Comprobantes de referencia', 'Clasificación de comprobantes',
    'Comprobantes electrónicos', 'Padrones', 'Observaciones'
  ];

  provincias: Provincia[] = [];
  formData!: ParametrosVentasData;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private provinciaService: ProvinciaService,
    private parametrosVentasService: ParametrosVentasService
  ) { }

  ngOnInit() {
    this.provincias = this.provinciaService.getProvincias();
    // Traer la configuración del servicio (base de ventas)
    this.formData = this.parametrosVentasService.getParametros();
  }

  getProvinciaNombre(): string {
    const prov = this.provincias.find(p => p.id === this.formData.codigoProvincia);
    return prov ? prov.nombre : '';
  }

  guardar() {
    this.parametrosVentasService.saveParametros(this.formData);
    // Podríamos añadir una notificación sutil tipo alert() o toast, por ahora solo cerramos o avisamos:
    alert('✅ Parámetros de Ventas guardados correctamente en la base del módulo.');
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
