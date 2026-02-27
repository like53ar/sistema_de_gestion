import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-compras',
  imports: [RouterOutlet, RouterLink, TooltipDirective],
  templateUrl: './compras.html',
  styleUrl: './compras.scss',
})
export class Compras {

}
