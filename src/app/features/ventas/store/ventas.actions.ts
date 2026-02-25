import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const VentasActions = createActionGroup({
    source: 'Ventas',
    events: {
        'Load Ventas': emptyProps(),
        'Load Ventas Success': props<{ data: any[] }>(),
        'Load Ventas Failure': props<{ error: any }>(),

        // Clientes actions
        'Load Clientes': emptyProps(),
        'Load Clientes Success': props<{ clientes: any[] }>(),
    }
});
