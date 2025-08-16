import { createSelector } from '@ngrx/store';
import { AppState } from '@store/index';

export const selectBrandsState = (state: AppState) => state.brands;
export const selectAllBrands = createSelector(selectBrandsState, (state) => state.items);

export const selectFilteredBrands = (search: string | null) =>
  createSelector(selectAllBrands, (brands) =>
    brands.filter((brand) => brand.name.toLowerCase().includes(search?.toLowerCase() || '')),
  );

export const selectBrandsLoading = createSelector(selectBrandsState, (state) => state.loading);
