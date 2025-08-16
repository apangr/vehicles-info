import {
  selectVehiclesState,
  selectVehiclesTypesByBrand,
  selectVehiclesModelsByBrand,
  selectVehiclesDataLoading,
} from './vehicles.selectors';
import { AppState } from '@store/index';

describe('Vehicles Selectors', () => {
  const mockState: AppState = {
    brands: {
      items: [],
      loading: false,
      error: null,
    },
    vehicles: {
      modelsByBrandId: {
        1: [{ modelId: 1, modelName: 'Corolla', id: 1, name: 'Toyota' }],
        2: [{ modelId: 2, modelName: 'Civic', id: 2, name: 'Honda' }],
      },
      typesByBrandId: {
        1: [{ typeId: 1, typeName: 'Sedan' }],
        2: [{ typeId: 2, typeName: 'SUV' }],
      },
      loading: false,
      error: null,
    },
  };

  it('selectVehiclesState should return the vehicles state', () => {
    const result = selectVehiclesState(mockState);
    expect(result).toEqual(mockState.vehicles);
  });

  it('selectVehiclesTypesByBrand should return types for a specific brand', () => {
    const result = selectVehiclesTypesByBrand(1).projector(mockState.vehicles);
    expect(result).toEqual([{ typeId: 1, typeName: 'Sedan' }]);
  });

  it('selectVehiclesModelsByBrand should return models for a specific brand', () => {
    const result = selectVehiclesModelsByBrand(1).projector(mockState.vehicles);
    expect(result).toEqual([{ modelId: 1, modelName: 'Corolla', id: 1, name: 'Toyota' }]);
  });

  it('selectVehiclesDataLoading should return the loading state', () => {
    const result = selectVehiclesDataLoading.projector(mockState.vehicles);
    expect(result).toBeFalse();
  });
});
