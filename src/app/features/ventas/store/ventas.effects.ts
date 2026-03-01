import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { VentasActions } from './ventas.actions';

@Injectable()
export class VentasEffects {
    private actions$ = inject(Actions);

    loadClientes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VentasActions.loadClientes),
            delay(1000), // Simulate network
            map(() => VentasActions.loadClientesSuccess({
                clientes: [] // Vaciamos la tabla de clientes para empezar a probar limpios
            })),
            catchError(error => of(VentasActions.loadVentasFailure({ error })))
        )
    );
}
