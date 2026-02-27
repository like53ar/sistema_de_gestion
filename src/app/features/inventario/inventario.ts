import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TooltipDirective, CommonModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss'
})
export class Inventario { }
