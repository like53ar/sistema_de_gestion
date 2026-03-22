import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CodigoIva {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-codigos-iva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './codigos-iva.html',
  styleUrl: './codigos-iva.scss'
})
export class CodigosIva {
  constructor(private router: Router, private route: ActivatedRoute) { }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  codigosIvaBD: CodigoIva[] = [
    { codigo: '0003', descripcion: '0,00 %' },
    { codigo: '0004', descripcion: '10,50 %' },
    { codigo: '0005', descripcion: '21,00 %' },
    { codigo: '0006', descripcion: '27,00 %' },
    { codigo: '0008', descripcion: '5,00 %' },
    { codigo: '0009', descripcion: '2,50 %' }
  ];

  searchTerm: string = '';

  mostrandoFormulario: boolean = false;
  nuevoCodigo: string = '';
  nuevaDescripcion: string = '';
  errorMsg: string = '';

  toggleAgregar() {
    this.mostrandoFormulario = !this.mostrandoFormulario;
    this.errorMsg = '';
    this.nuevoCodigo = '';
    this.nuevaDescripcion = '';
  }

  formatearCodigo() {
    // Rellena con ceros a la izquierda hasta 4 caracteres (si es numérico o alfanumérico corto)
    if (this.nuevoCodigo) {
      this.nuevoCodigo = this.nuevoCodigo.padStart(4, '0').toUpperCase();
    }
  }

  esValido(): boolean {
    return this.nuevoCodigo.trim().length > 0 && this.nuevaDescripcion.trim().length > 0;
  }

  agregarCodigo() {
    this.formatearCodigo();

    if (this.nuevoCodigo.length > 4) {
      this.errorMsg = 'El código debe tener como máximo 4 caracteres.';
      return;
    }

    const existe = this.codigosIvaBD.find(c => c.codigo === this.nuevoCodigo);
    if (existe) {
      this.errorMsg = 'Este código ya existe.';
      return;
    }

    this.codigosIvaBD.push({
      codigo: this.nuevoCodigo,
      descripcion: this.nuevaDescripcion
    });

    // Ordenamos la tabla
    this.codigosIvaBD.sort((a, b) => a.codigo.localeCompare(b.codigo));
    this.toggleAgregar();
  }

  get codigosFiltrados(): CodigoIva[] {
    return this.codigosIvaBD.filter(c =>
      c.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
