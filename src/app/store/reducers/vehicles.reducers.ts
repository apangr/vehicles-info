import { VehicleModel } from '@models/vehicle-model.model';
import { VehicleType } from '@models/vehicle-type.model';
import { createReducer, on } from '@ngrx/store';
import {
  loadVehiclesDataByBrand,
  loadVehiclesDataByBrandSuccess,
  loadVehiclesDataByBrandFailure,
} from '@store/actions/vehicles.actions';

export interface VehiclesState {
  modelsByBrandId: Record<number, VehicleModel[]>;
  typesByBrandId: Record<number, VehicleType[]>;
  loading: boolean;
  error: string | null;
}

export const initialState: VehiclesState = {
  modelsByBrandId: {},
  typesByBrandId: {},
  loading: false,
  error: null,
};

export const vehiclesReducer = createReducer(
  initialState,
  on(loadVehiclesDataByBrand, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadVehiclesDataByBrandSuccess, (state, { brandId, models, types }) => ({
    ...state,
    modelsByBrandId: {
      ...state.modelsByBrandId,
      [brandId]: models,
    },
    typesByBrandId: {
      ...state.typesByBrandId,
      [brandId]: types,
    },
    loading: false,
  })),
  on(loadVehiclesDataByBrandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
