import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TipoComprobante {
  codigo: string;
  denominacion: string;
}

@Component({
  selector: 'app-tipos-comprobante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos-comprobante.html',
  styleUrl: './tipos-comprobante.scss'
})
export class TiposComprobante {
  constructor(private router: Router, private route: ActivatedRoute) { }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  tiposComprobanteBD: TipoComprobante[] = [
    { codigo: '001', denominacion: 'FACTURAS A' },
    { codigo: '002', denominacion: 'NOTAS DE DEBITO A' },
    { codigo: '003', denominacion: 'NOTAS DE CREDITO A' },
    { codigo: '004', denominacion: 'RECIBOS A' },
    { codigo: '005', denominacion: 'NOTAS DE VENTA AL CONTADO A' },
    { codigo: '006', denominacion: 'FACTURAS B' },
    { codigo: '007', denominacion: 'NOTAS DE DEBITO B' },
    { codigo: '008', denominacion: 'NOTAS DE CREDITO B' },
    { codigo: '009', denominacion: 'RECIBOS B' },
    { codigo: '010', denominacion: 'NOTAS DE VENTA AL CONTADO B' },
    { codigo: '011', denominacion: 'FACTURAS C' },
    { codigo: '012', denominacion: 'NOTAS DE DEBITO C' }
  ];

  searchTerm: string = '';

  mostrandoFormulario: boolean = false;
  nuevoCodigo: string = '';
  nuevaDenominacion: string = '';
  errorMsg: string = '';

  toggleAgregar() {
    this.mostrandoFormulario = !this.mostrandoFormulario;
    this.errorMsg = '';
    this.nuevoCodigo = '';
    this.nuevaDenominacion = '';
  }

  formatearCodigo() {
    // Rellena con ceros a la izquierda hasta 3 caracteres (si es numérico o alfanumérico corto)
    if (this.nuevoCodigo) {
      this.nuevoCodigo = this.nuevoCodigo.padStart(3, '0').toUpperCase();
    }
  }

  esValido(): boolean {
    return this.nuevoCodigo.trim().length > 0 && this.nuevaDenominacion.trim().length > 0;
  }

  agregarCodigo() {
    this.formatearCodigo();

    if (this.nuevoCodigo.length > 3) {
      this.errorMsg = 'El código debe tener como máximo 3 caracteres.';
      return;
    }

    const existe = this.tiposComprobanteBD.find(c => c.codigo === this.nuevoCodigo);
    if (existe) {
      this.errorMsg = 'Este código ya existe.';
      return;
    }

    this.tiposComprobanteBD.push({
      codigo: this.nuevoCodigo,
      denominacion: this.nuevaDenominacion.toUpperCase()
    });

    // Ordenamos la tabla
    this.tiposComprobanteBD.sort((a, b) => a.codigo.localeCompare(b.codigo));
    this.toggleAgregar();
  }

  get tiposFiltrados(): TipoComprobante[] {
    return this.tiposComprobanteBD.filter(c =>
      c.denominacion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
