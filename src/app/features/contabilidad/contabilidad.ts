import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-contabilidad',
  imports: [RouterOutlet, RouterLink, TooltipDirective],
  templateUrl: './contabilidad.html',
  styleUrl: './contabilidad.scss',
})
export class Contabilidad {

}
