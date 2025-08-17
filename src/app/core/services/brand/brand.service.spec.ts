import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectFilteredBrands } from '@store/selectors/brands.selectors';
import { selectVehiclesModelsByBrand, selectVehiclesTypesByBrand } from '@store/selectors/vehicles.selectors';
import { ActivatedRoute } from '@angular/router';
import { mockBrands, mockVehicleModels, mockVehicleTypes } from '@testing/test-mocks';

describe('BrandService', () => {
  let service: BrandService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrandService,
        provideMockStore({
          initialState: {
            brands: {
              items: mockBrands,
            },
            vehicles: {
              modelsByBrandId: { 1: mockVehicleModels },
              typesByBrandId: { 1: mockVehicleTypes },
              loading: false,
              error: null,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
          },
        },
      ],
    });

    service = TestBed.inject(BrandService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get filtered brands based on search', (done) => {
    store.overrideSelector(selectFilteredBrands('Toy'), [mockBrands[0]]);
    store.refreshState();

    service.getFilteredBrands('Toy').subscribe((brands) => {
      expect(brands.length).toBe(1);
      expect(brands[0].name).toBe('Toyota');
      done();
    });
  });

  it('should get brand details combining models and types', (done) => {
    store.overrideSelector(selectVehiclesModelsByBrand(1), mockVehicleModels);
    store.overrideSelector(selectVehiclesTypesByBrand(1), mockVehicleTypes);
    store.refreshState();

    service.getBrandDetails().subscribe(([models, types]) => {
      expect(models).toEqual(mockVehicleModels);
      expect(types).toEqual(mockVehicleTypes);
      done();
    });
  });
});
