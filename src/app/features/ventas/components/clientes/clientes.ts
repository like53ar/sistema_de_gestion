import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importante para ngModel
import { CommonModule } from '@angular/common';
import { PadronService } from '../../../../core/services/padron.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  currentTab: number = 1;
  loading: boolean = false;
  notFound: boolean = false;

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
    regimenIb: '', // Local, Convenio Multilateral o No Inscripto

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

  constructor(private padronService: PadronService) { }

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
          // Si el padrón devuelve más datos, podríamos mapearlos aquí
          // p.ej. this.cliente.domicilio = data.direccion
        } else {
          this.notFound = true;
        }
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      }
    });
  }

  onSubmit() {
    console.log('Cliente a guardar:', this.cliente);
    // Aquí iría la lógica de persistencia
  }
}
