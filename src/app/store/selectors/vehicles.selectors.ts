import { createSelector } from '@ngrx/store';
import { AppState } from '@store/index';
import { VehiclesState } from '@store/reducers/vehicles.reducers';

export const selectVehiclesState = (state: AppState) => state.vehicles;

export const selectVehiclesTypesByBrand = (brandId: number) =>
  createSelector(selectVehiclesState, (state) => state.typesByBrandId[brandId]);

export const selectVehiclesModelsByBrand = (brandId: number) =>
  createSelector(selectVehiclesState, (state) => state.modelsByBrandId[brandId]);

export const selectVehiclesDataLoading = createSelector(selectVehiclesState, (state: VehiclesState) => state.loading);
