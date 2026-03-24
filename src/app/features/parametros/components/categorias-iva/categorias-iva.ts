import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CategoriaIva {
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-categorias-iva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias-iva.html',
  styleUrl: './categorias-iva.scss'
})
export class CategoriasIva {
  constructor(private router: Router, private route: ActivatedRoute) { }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  categoriasIvaBD: CategoriaIva[] = [
    { codigo: '1', descripcion: 'IVA Responsable Inscripto' },
    { codigo: '4', descripcion: 'IVA Sujeto Exento' },
    { codigo: '5', descripcion: 'Consumidor Final' },
    { codigo: '6', descripcion: 'Responsable Monotributo' },
    { codigo: '7', descripcion: 'Sujeto no Categorizado' },
    { codigo: '8', descripcion: 'Proveedor del Exterior' },
    { codigo: '9', descripcion: 'Cliente del Exterior' },
    { codigo: '10', descripcion: 'IVA Liberado – Ley Nº 19.640' },
    { codigo: '13', descripcion: 'Monotributista Social' },
    { codigo: '15', descripcion: 'IVA No Alcanzado' },
    { codigo: '16', descripcion: 'Monotributo Trabajador Independiente Promovido' }
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
    // Para categorías de IVA (tipos de responsables) opcionalmente se puede formatear a 2 o 3 posiciones,
    // pero el usuario pide alfanumérico, así que solo pasaremos a mayúsculas si es necesario.
    if (this.nuevoCodigo) {
      this.nuevoCodigo = this.nuevoCodigo.trim().toUpperCase();
    }
  }

  esValido(): boolean {
    return this.nuevoCodigo.trim().length > 0 && this.nuevaDescripcion.trim().length > 0;
  }

  agregarCodigo() {
    this.formatearCodigo();

    const existe = this.categoriasIvaBD.find(c => c.codigo === this.nuevoCodigo);
    if (existe) {
      this.errorMsg = 'Este código ya existe.';
      return;
    }

    this.categoriasIvaBD.push({
      codigo: this.nuevoCodigo,
      descripcion: this.nuevaDescripcion
    });

    // Ordenamos la tabla por código (intentando numéricamente si es posible)
    this.categoriasIvaBD.sort((a, b) => {
        const numA = parseInt(a.codigo);
        const numB = parseInt(b.codigo);
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        return a.codigo.localeCompare(b.codigo);
    });

    this.toggleAgregar();
  }

  get categoriasFiltradas(): CategoriaIva[] {
    return this.categoriasIvaBD.filter(c =>
      c.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
