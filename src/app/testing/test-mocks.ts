import { ResultListDto } from '@infra/dto/api-response.dto';
import { BrandDto } from '@infra/dto/brand.dto';
import { VehicleModelDto } from '@infra/dto/vehicle-model.dto';
import { VehicleTypeDto } from '@infra/dto/vehicle-type.dto';
import { VehicleModel } from '@core/models/vehicle-model.model';
import { VehicleType } from '@core/models/vehicle-type.model';

export const mockVehicleModels: VehicleModel[] = [
  { id: 1, name: 'Brand A', modelId: 1, modelName: 'Model A' },
  { id: 2, name: 'Brand B', modelId: 2, modelName: 'Model B' },
];

export const mockVehicleTypes: VehicleType[] = [
  { typeId: 1, typeName: 'Type A' },
  { typeId: 2, typeName: 'Type B' },
];

export const mockBrands = [
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Honda' },
];

export const mockAppState = {
  brands: {
    items: mockBrands,
    loading: true,
    error: null,
  },
  vehicles: {
    modelsByBrandId: {
      1: mockVehicleModels,
    },
    typesByBrandId: {
      1: mockVehicleTypes,
    },
    loading: false,
    error: null,
  },
};

export const mockBrandApiSuccessResponse: ResultListDto<BrandDto> = {
  Count: 2,
  Message: 'Success',
  Results: [
    { Make_ID: 1, Make_Name: 'Toyota' },
    { Make_ID: 2, Make_Name: 'Honda' },
  ],
  SearchCriteria: null,
};

export const mockVehicleTypesApiSuccessResponse: ResultListDto<VehicleTypeDto> = {
  Count: 2,
  Message: 'Success',
  Results: [
    { VehicleTypeId: 1, VehicleTypeName: 'SUV' },
    { VehicleTypeId: 2, VehicleTypeName: 'Sedan' },
  ],
  SearchCriteria: null,
};

export const mockVehicleModelsApiSuccessResponse: ResultListDto<VehicleModelDto> = {
  Count: 2,
  Message: 'Success',
  Results: [
    { Model_ID: 1, Model_Name: 'Corolla', Make_ID: 1, Make_Name: 'Toyota' },
    { Model_ID: 2, Model_Name: 'Civic', Make_ID: 2, Make_Name: 'Honda' },
  ],
  SearchCriteria: null,
};
