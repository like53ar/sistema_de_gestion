import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { VentasActions } from './store/ventas.actions';
import { selectAllClientes, selectVentasLoading } from './store/ventas.selectors';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-ventas',
  imports: [RouterLink, RouterOutlet, CommonModule, SkeletonComponent, TooltipDirective],
  templateUrl: './ventas.html',
  styleUrl: './ventas.scss',
})
export class Ventas implements OnInit {
  private store = inject(Store);
  clientes$ = this.store.select(selectAllClientes);
  loading$ = this.store.select(selectVentasLoading);

  ngOnInit(): void {
    this.store.dispatch(VentasActions.loadClientes());
  }
}
