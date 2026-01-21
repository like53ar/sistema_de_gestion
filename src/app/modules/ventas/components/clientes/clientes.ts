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
  cuit: string = '';
  denominacion: string = '';
  loading: boolean = false;
  notFound: boolean = false;

  constructor(private padronService: PadronService) { }

  onCuitBlur() {
    if (!this.cuit) return;

    this.loading = true;
    this.notFound = false;
    this.denominacion = ''; // Limpiar mientras busca

    this.padronService.getPersonaByCuit(this.cuit).subscribe({
      next: (data) => {
        this.loading = false;
        if (data) {
          this.denominacion = data.denominacion;
        } else {
          this.notFound = true;
          // Opcional: Dejar que el usuario escriba si no se encuentra
        }
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      }
    });
  }
}
