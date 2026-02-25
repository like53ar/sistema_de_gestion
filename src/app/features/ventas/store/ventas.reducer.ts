import { createReducer, on } from '@ngrx/store';
import { VentasActions } from './ventas.actions';

export const ventasFeatureKey = 'ventas';

export interface VentasState {
    clientes: any[];
    isLoading: boolean;
    error: any | null;
}

export const initialState: VentasState = {
    clientes: [],
    isLoading: false,
    error: null
};

export const ventasReducer = createReducer(
    initialState,
    on(VentasActions.loadClientes, (state) => ({
        ...state,
        isLoading: true
    })),
    on(VentasActions.loadClientesSuccess, (state, { clientes }) => ({
        ...state,
        clientes,
        isLoading: false
    })),
    // Add other handlers here
);
