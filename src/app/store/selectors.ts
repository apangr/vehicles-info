import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const selectBrandsState = (state: AppState) => state.brands;
export const selectAllBrands = createSelector(selectBrandsState, (state) => state.items);

export const selectBrandsLoading = createSelector(selectBrandsState, (state) => state.loading);
