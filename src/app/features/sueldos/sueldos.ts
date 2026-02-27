import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-sueldos',
  imports: [RouterOutlet, RouterLink, TooltipDirective],
  templateUrl: './sueldos.html',
  styleUrl: './sueldos.scss',
})
export class Sueldos {

}
