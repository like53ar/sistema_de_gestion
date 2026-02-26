import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PadronService } from '../../../../core/services/padron.service';
import { ConfirmDialogService } from '../../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { TooltipDirective } from '../../../../shared/tooltip/tooltip.directive';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective, SkeletonComponent],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  currentTab: number = 1;
  loading: boolean = false;
  notFound: boolean = false;
  saving: boolean = false;

  cliente = {
    // Solapa 1: Datos Generales
    codigo: '',
    razonSocial: '',
    nombreFantasia: '',
    domicilio: '',
    numero: '',
    piso: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    telefonos: '',
    emails: '',

    // Solapa 2: Datos Impositivos
    tipoDocumento: 'CUIT',
    cuit: '',
    categoriaIva: '',
    ingresosBrutos: '',
    regimenIb: '',

    // Solapa 3: Datos Comerciales
    condicionVenta: '',
    listaPrecios: '',
    limiteCredito: 0,
    vendedor: '',
    zona: '',

    // Solapa 4: Entregas y Observaciones
    direccionesEntrega: '',
    notas: ''
  };

  private defaultCliente = { ...this.cliente };

  constructor(
    private padronService: PadronService,
    private confirmService: ConfirmDialogService,
    private toastService: ToastService
  ) { }

  setTab(tabIndex: number) {
    this.currentTab = tabIndex;
  }

  onCuitBlur() {
    if (!this.cliente.cuit) return;

    this.loading = true;
    this.notFound = false;
    this.cliente.razonSocial = '';

    this.padronService.getPersonaByCuit(this.cliente.cuit).subscribe({
      next: (data) => {
        this.loading = false;
        if (data) {
          this.cliente.razonSocial = data.denominacion;
          this.toastService.info(`Datos cargados para CUIT ${this.cliente.cuit}`);
        } else {
          this.notFound = true;
          this.toastService.warning('CUIT no encontrado en el padrón local.');
        }
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
        this.toastService.error('Error al consultar el padrón. Intente nuevamente.');
      }
    });
  }

  onSubmit() {
    this.saving = true;
    // Simulate async save — replace with real persistence call
    setTimeout(() => {
      this.saving = false;
      console.log('Cliente a guardar:', this.cliente);
      this.toastService.success(`Cliente "${this.cliente.razonSocial || this.cliente.codigo}" guardado correctamente.`);
    }, 600);
  }

  onReset() {
    this.confirmService.confirm(
      '¿Desea descartar todos los cambios y limpiar el formulario?',
      { title: 'Limpiar Formulario', confirmText: 'Sí, limpiar', cancelText: 'Cancelar', danger: true }
    ).subscribe(confirmed => {
      if (confirmed) {
        this.cliente = { ...this.defaultCliente };
        this.currentTab = 1;
        this.notFound = false;
        this.toastService.info('Formulario limpiado.');
      }
    });
  }
}

