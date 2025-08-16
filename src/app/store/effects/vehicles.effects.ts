import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, forkJoin } from 'rxjs';
import { VehiclesRepository } from '@repo/vehicles.repository';
import {
  loadVehiclesDataByBrand,
  loadVehiclesDataByBrandSuccess,
  loadVehiclesDataByBrandFailure,
} from '@store/actions/vehicles.actions';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class VehicleEffects {
  private actions$ = inject(Actions);
  private vehiclesRepository = inject(VehiclesRepository);

  loadBrandData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehiclesDataByBrand),
      mergeMap(({ brandId }) =>
        forkJoin({
          models: this.vehiclesRepository.getModelsByBrandId(brandId),
          types: this.vehiclesRepository.getTypesByBrandId(brandId),
        }).pipe(
          map(({ models, types }) => loadVehiclesDataByBrandSuccess({ brandId, models, types })),
          catchError((error) => of(loadVehiclesDataByBrandFailure({ brandId, error: error.message }))),
        ),
      ),
    ),
  );
}
