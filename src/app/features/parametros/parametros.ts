import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
    selector: 'app-parametros',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, TooltipDirective],
    templateUrl: './parametros.html',
    styleUrl: './parametros.scss'
})
export class ParametrosGenerales { }
