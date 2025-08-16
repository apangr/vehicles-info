import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { BrandDto } from '@infra/dto/brand.dto';
import { ResultListDto } from '@infra/dto/api-response.dto';
import { provideHttpClient } from '@angular/common/http';
import { mockBrandApiSuccessResponse } from '@testing/test-mocks';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all brands and map them correctly', () => {
    service.getAllBrands().subscribe((brands) => {
      expect(brands).toEqual([
        { id: 1, name: 'Toyota' },
        { id: 2, name: 'Honda' },
      ]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}GetAllMakes${service['responseFormat']}`);
    expect(req.request.method).toBe('GET');
    // Simulate the API response
    req.flush(mockBrandApiSuccessResponse);
  });

  it('should handle an empty response from the API', () => {
    const emptyResponse: ResultListDto<BrandDto> = {
      Count: 0,
      Message: 'No data',
      Results: [],
      SearchCriteria: null,
    };

    service.getAllBrands().subscribe((brands) => {
      expect(brands).toEqual([]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}GetAllMakes${service['responseFormat']}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });
});
