import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, filter, switchMap, catchError } from 'rxjs/operators';
import { loadVehiclesDataByBrand } from '@store/actions/vehicles.actions';
import { selectVehiclesDataLoading } from '@store/selectors/vehicles.selectors';
import { AppState } from '@store/index';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const brandId = +route.params['id'];

    this.store.dispatch(loadVehiclesDataByBrand({ brandId }));

    // Wait for the brand loading to complete
    return this.store.select(selectVehiclesDataLoading).pipe(
      filter((loading) => !loading), // Continue when `loading` is `false`
      take(1), // Complete the observable after one value
      switchMap(() => of(true)), // Return `true` when the data is ready
      catchError(() => of(false)), // Handle errors by returning `false`
    );
  }
}
