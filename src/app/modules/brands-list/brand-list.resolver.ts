import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, filter, switchMap, catchError } from 'rxjs/operators';
import { loadBrands } from '@store/actions/brands.actions';
import { selectBrandsLoading } from '@store/selectors/brands.selectors';
import { AppState } from '@store/index';

@Injectable({
  providedIn: 'root',
})
export class BrandsListResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<boolean> {
    this.store.dispatch(loadBrands());

    // Wait for the brand loading to complete
    return this.store.select(selectBrandsLoading).pipe(
      filter((loading) => !loading), // Continue when `loading` is `false`
      take(1), // Complete the observable after one value
      switchMap(() => of(true)), // Return `true` when the data is ready
      catchError(() => of(false)), // Handle errors by returning `false`
    );
  }
}
