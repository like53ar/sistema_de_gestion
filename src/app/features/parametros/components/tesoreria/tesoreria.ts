import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametros-tesoreria',
  standalone: true,
  templateUrl: './tesoreria.html',
  styleUrl: './tesoreria.scss'
})
export class ParametrosTesoreria {
  constructor(private router: Router) {}
  closeModal() {
    this.router.navigate(['/parametros']);
  }
}
