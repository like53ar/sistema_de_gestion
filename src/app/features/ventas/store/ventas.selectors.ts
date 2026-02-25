import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ventasFeatureKey, VentasState } from './ventas.reducer';

export const selectVentasState = createFeatureSelector<VentasState>(ventasFeatureKey);

export const selectAllClientes = createSelector(
    selectVentasState,
    (state: VentasState) => state.clientes
);

export const selectVentasLoading = createSelector(
    selectVentasState,
    (state: VentasState) => state.isLoading
);
