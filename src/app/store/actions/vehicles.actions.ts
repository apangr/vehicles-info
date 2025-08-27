import { createAction, props } from '@ngrx/store';
import { VehicleModel } from '@core/models/vehicle-model.model';
import { VehicleType } from '@core/models/vehicle-type.model';

export const loadVehiclesDataByBrand = createAction(
  '[Vehicles] Load Vehicles Data By Brand',
  props<{ brandId: number }>(),
);

export const loadVehiclesDataByBrandSuccess = createAction(
  '[Vehicles] Load Vehicles Data By Brand Success',
  props<{ brandId: number; models: VehicleModel[]; types: VehicleType[] }>(),
);

export const loadVehiclesDataByBrandFailure = createAction(
  '[Vehicles] Load Vehicles Data By Brand Failure',
  props<{ brandId: number; error: string }>(),
);
