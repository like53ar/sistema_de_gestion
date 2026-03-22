import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TipoDocumento {
  codigo: string;
  documento: string;
}

@Component({
  selector: 'app-tipos-documento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos-documento.html',
  styleUrl: './tipos-documento.scss'
})
export class TiposDocumento {
  constructor(private router: Router, private route: ActivatedRoute) { }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  tiposDocumentoBD: TipoDocumento[] = [
    { codigo: '00', documento: 'C I CAPITAL FEDERAL' },
    { codigo: '01', documento: 'C I BUENOS AIRES' },
    { codigo: '02', documento: 'C I CATAMARCA' },
    { codigo: '03', documento: 'C I CORDOBA' },
    { codigo: '04', documento: 'C I CORRIENTES' },
    { codigo: '05', documento: 'C I ENTRE RIOS' },
    { codigo: '06', documento: 'C I JUJUY' },
    { codigo: '07', documento: 'C I MENDOZA' },
    { codigo: '08', documento: 'C I LA RIOJA' },
    { codigo: '09', documento: 'C I SALTA' },
    { codigo: '10', documento: 'C I SAN JUAN' },
    { codigo: '11', documento: 'C I SAN LUIS' },
    { codigo: '12', documento: 'C I SANTA FE' },
    { codigo: '13', documento: 'C I SGO DEL ESTERO' },
    { codigo: '14', documento: 'C I TUCUMAN' },
    { codigo: '16', documento: 'C I CHACO' },
    { codigo: '17', documento: 'C I CHUBUT' },
    { codigo: '18', documento: 'C I FORMOSA' },
    { codigo: '19', documento: 'C I MISIONES' },
    { codigo: '20', documento: 'C I NEUQUEN' },
    { codigo: '21', documento: 'C I LA PAMPA' },
    { codigo: '22', documento: 'C I RIO NEGRO' },
    { codigo: '23', documento: 'C I SANTA CRUZ' },
    { codigo: '24', documento: 'C I TIERRA DEL FUEGO' },
    { codigo: '80', documento: 'C U I T' },
    { codigo: '86', documento: 'C U I L' },
    { codigo: '87', documento: 'C D I' },
    { codigo: '89', documento: 'LIBRETA DE ENROLAMIENTO' },
    { codigo: '90', documento: 'LIBRETA CIVICA' },
    { codigo: '91', documento: 'C I EXTRANJERA' },
    { codigo: '92', documento: 'EN TRAMITE' },
    { codigo: '93', documento: 'ACTA DE NACIMIENTO' },
    { codigo: '94', documento: 'PASAPORTE' },
    { codigo: '95', documento: 'C I BS AS R N P' },
    { codigo: '96', documento: 'DOC NACIONAL DE IDENTIDAD' },
    { codigo: '99', documento: 'SIN IDENTIFICAR / VENTA GLOBAL DIARIA' }
  ];

  searchTerm: string = '';

  mostrandoFormulario: boolean = false;
  nuevoCodigo: string = '';
  nuevoDocumento: string = '';
  errorMsg: string = '';

  toggleAgregar() {
    this.mostrandoFormulario = !this.mostrandoFormulario;
    this.errorMsg = '';
    this.nuevoCodigo = '';
    this.nuevoDocumento = '';
  }

  formatearCodigo() {
    // Rellena con ceros a la izquierda hasta 2 caracteres (si es numérico o alfanumérico corto)
    if (this.nuevoCodigo) {
      this.nuevoCodigo = this.nuevoCodigo.padStart(2, '0').toUpperCase();
    }
  }

  esValido(): boolean {
    return this.nuevoCodigo.trim().length > 0 && this.nuevoDocumento.trim().length > 0;
  }

  agregarCodigo() {
    this.formatearCodigo();

    if (this.nuevoCodigo.length > 2) {
      this.errorMsg = 'El código debe tener como máximo 2 caracteres.';
      return;
    }

    const existe = this.tiposDocumentoBD.find(c => c.codigo === this.nuevoCodigo);
    if (existe) {
      this.errorMsg = 'Este código ya existe.';
      return;
    }

    this.tiposDocumentoBD.push({
      codigo: this.nuevoCodigo,
      documento: this.nuevoDocumento.toUpperCase()
    });

    // Ordenamos la tabla
    this.tiposDocumentoBD.sort((a, b) => a.codigo.localeCompare(b.codigo));
    this.toggleAgregar();
  }

  get tiposFiltrados(): TipoDocumento[] {
    return this.tiposDocumentoBD.filter(c =>
      c.documento.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
