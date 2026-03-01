import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../../shared/tooltip/tooltip.directive';
import { Provincia, ProvinciaService } from '../../../../core/services/provincia.service';

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provincias.html',
  styleUrl: './provincias.scss'
})
export class Provincias implements OnInit {
  provinciasBD: Provincia[] = [];
  searchTerm: string = '';

  constructor(private provinciaService: ProvinciaService) { }

  ngOnInit() {
    this.provinciasBD = this.provinciaService.getProvincias();
  }

  get provinciasFiltradas(): Provincia[] {
    return this.provinciasBD.filter(p =>
      p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.id.includes(this.searchTerm)
    );
  }
}
