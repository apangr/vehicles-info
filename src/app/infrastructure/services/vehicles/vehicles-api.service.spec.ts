import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { VehiclesAPIService } from './vehicles-api.service';
import { VehicleType } from '@models/vehicle-type.model';
import { mockVehicleModelsApiSuccessResponse, mockVehicleTypesApiSuccessResponse } from '@testing/test-mocks';

describe('VehiclesAPIService', () => {
  let service: VehiclesAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesAPIService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(VehiclesAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehicle types by brand ID and map them correctly', () => {
    service.getVehicleTypesByBrandId(1).subscribe((vehicleTypes) => {
      expect(vehicleTypes).toEqual([
        { typeId: 1, typeName: 'SUV' },
        { typeId: 2, typeName: 'Sedan' },
      ] as VehicleType[]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}GetVehicleTypesForMakeId/1${service['responseFormat']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicleTypesApiSuccessResponse);
  });

  it('should fetch vehicle models by brand ID and map them correctly', () => {
    service.getVehicleModelsByBrandId(1).subscribe((vehicleModels) => {
      expect(vehicleModels).toEqual([
        { modelId: 1, modelName: 'Corolla', id: 1, name: 'Toyota' },
        { modelId: 2, modelName: 'Civic', id: 2, name: 'Honda' },
      ]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}GetModelsForMakeId/1${service['responseFormat']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicleModelsApiSuccessResponse);
  });
});
