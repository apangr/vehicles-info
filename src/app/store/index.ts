import { ActionReducerMap } from '@ngrx/store';
import { brandsReducer, BrandsState } from '@store/reducers/brands.reducers';
import { vehiclesReducer, VehiclesState } from '@store/reducers/vehicles.reducers';

export interface AppState {
  brands: BrandsState;
  vehicles: VehiclesState;
}

export const reducers: ActionReducerMap<AppState> = {
  brands: brandsReducer,
  vehicles: vehiclesReducer,
};
