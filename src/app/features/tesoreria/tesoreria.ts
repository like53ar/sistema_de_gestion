import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-tesoreria',
  imports: [RouterOutlet, RouterLink, TooltipDirective],
  templateUrl: './tesoreria.html',
  styleUrl: './tesoreria.scss',
})
export class Tesoreria {

}
