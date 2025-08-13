import { Brand } from '@models/brand.model';
import { VehicleModel } from '@models/vehicle-model.model';
import { VehicleType } from '@models/vehicle-type.model';
import { createAction, props } from '@ngrx/store';

export const loadBrands = createAction('[Brands] Load Brands', props<{ searchCriteria: string | null }>());
export const loadBrandsSuccess = createAction('[Brands] Load Brands Success', props<{ brands: Brand[] }>());
export const loadBrandsFailure = createAction('[Brands] Load Brands Failure', props<{ error: string }>());

export const loadVehiclesTypesByBrand = createAction(
  '[Vehicles Types] Load Vehicles Types By Brand',
  props<{ brandId: string }>(),
);
export const loadVehiclesTypesByBrandSuccess = createAction(
  '[Vehicles Types] Load Vehicles Types By Brand Success',
  props<{ brandId: string; vehiclesTypes: VehicleType[] }>(),
);
export const loadVehiclesTypesByBrandFailure = createAction(
  '[Vehicles Types] Load Vehicles Types By Brand Failure',
  props<{ brandId: string; error: string }>(),
);

export const loadVehiclesModelsByBrand = createAction(
  '[Vehicles Models] Load Vehicles Models By Brand',
  props<{ brandId: string }>(),
);
export const loadVehiclesModelsByBrandSuccess = createAction(
  '[Vehicles Models] Load Vehicles Models By Brand Success',
  props<{ brandId: string; vehiclesModels: VehicleModel[] }>(),
);
export const loadVehiclesModelsByBrandFailure = createAction(
  '[Vehicles Models] Load Vehicles Models By Brand Failure',
  props<{ brandId: string; error: string }>(),
);
