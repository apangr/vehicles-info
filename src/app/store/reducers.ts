import { Brand } from '@models/brand.model';
import { createReducer, on } from '@ngrx/store';
import { loadBrands, loadBrandsFailure, loadBrandsSuccess } from './actions';

export interface AppState {
  brands: {
    items: Brand[];
    loading: boolean;
    error: string | null;
  };
}

export const initialBrandState: AppState = {
  brands: {
    items: [],
    loading: false,
    error: null,
  },
};

export const appReducer = createReducer<AppState>(
  initialBrandState,
  on(loadBrands, (state) => ({
    ...state,
    brands: {
      ...state.brands,
      loading: true,
      error: null,
    },
  })),
  on(loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands: {
      ...state.brands,
      items: brands,
      loading: false,
      error: null,
    },
  })),
  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    brands: {
      ...state.brands,
      loading: false,
      error: error,
    },
  })),
);
