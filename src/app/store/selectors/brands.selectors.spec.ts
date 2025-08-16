import { AppState } from '@store/index';
import { selectBrandsState, selectAllBrands, selectFilteredBrands, selectBrandsLoading } from './brands.selectors';

describe('Brands Selectors', () => {
  const mockState: AppState = {
    brands: {
      items: [
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
      ],
      loading: true,
      error: null,
    },
    vehicles: {
      modelsByBrandId: {},
      typesByBrandId: {},
      loading: false,
      error: null,
    },
  };

  it('selectBrandsState should return the brands state', () => {
    const result = selectBrandsState(mockState);
    expect(result).toEqual(mockState.brands);
  });

  it('selectAllBrands should return all brands', () => {
    const result = selectAllBrands.projector(mockState.brands);
    expect(result).toEqual(mockState.brands.items);
  });

  it('selectFilteredBrands should return filtered brands based on search input', () => {
    const search = 'Toy';
    const result = selectFilteredBrands(search).projector(mockState.brands.items);
    expect(result).toEqual([{ id: 1, name: 'Toyota' }]);
  });

  it('selectFilteredBrands should return all brands if search input is empty', () => {
    const search = '';
    const result = selectFilteredBrands(search).projector(mockState.brands.items);
    expect(result).toEqual(mockState.brands.items);
  });

  it('selectBrandsLoading should return the loading state', () => {
    const result = selectBrandsLoading.projector(mockState.brands);
    expect(result).toBeTrue();
  });
});
