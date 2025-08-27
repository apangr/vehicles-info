import { createReducer, on } from '@ngrx/store';
import { Brand } from '@core/models/brand.model';
import { loadBrands, loadBrandsSuccess, loadBrandsFailure } from '../actions/brands.actions';

export interface BrandsState {
  items: Brand[];
  loading: boolean;
  error: string | null;
}

export const initialBrandsState: BrandsState = {
  items: [],
  loading: false,
  error: null,
};

export const brandsReducer = createReducer<BrandsState>(
  initialBrandsState,
  on(loadBrands, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    items: brands,
    loading: false,
    error: null,
  })),
  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
