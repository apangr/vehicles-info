import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadBrands, loadBrandsFailure, loadBrandsSuccess } from '@store/actions/brands.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BrandRepository } from '@repo/brand.repository';

@Injectable()
export class BrandEffects {
  private actions$ = inject(Actions);
  private brandRepository = inject(BrandRepository);

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrands),
      switchMap(() => this.fetchBrandsFromApi()),
    ),
  );

  /**
   * Fetches all brands from the API and returns an observable that emits an
   * action to notify the store of the fetched brands or the error.
   *
   * @returns An observable that emits an action to notify the store of the
   * fetched brands or the error.
   */
  private fetchBrandsFromApi() {
    return this.brandRepository.getAll().pipe(
      map((brands) => loadBrandsSuccess({ brands })),
      catchError((error) => of(loadBrandsFailure({ error: error.message }))),
    );
  }
}
