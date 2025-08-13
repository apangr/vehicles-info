import { inject, Injectable } from '@angular/core';
import { BrandService } from '@infra/services/brand/brand.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadBrands, loadBrandsFailure, loadBrandsSuccess } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private brandService = inject(BrandService);

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrands),
      switchMap(() =>
        this.brandService.getAllBrands().pipe(
          map((brands) => loadBrandsSuccess({ brands })),
          catchError((error) => of(loadBrandsFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
