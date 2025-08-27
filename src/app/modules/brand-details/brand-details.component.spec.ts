import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDetailsComponent } from './brand-details.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { mockVehicleModels, mockVehicleTypes } from '@testing/test-mocks';
import { BrandService } from '@core/services/brand/brand.service';
import { of } from 'rxjs';

describe('BrandDetailsComponent', () => {
  let component: BrandDetailsComponent;
  let fixture: ComponentFixture<BrandDetailsComponent>;
  let brandServiceMock: jasmine.SpyObj<BrandService>;

  beforeEach(async () => {
    brandServiceMock = jasmine.createSpyObj('BrandService', ['getBrandDetails']);

    await TestBed.configureTestingModule({
      imports: [BrandDetailsComponent, MatPaginatorModule],
      providers: [
        provideMockStore({
          initialState: {
            vehicles: {
              modelsByBrandId: { 1: mockVehicleModels },
              typesByBrandId: { 1: mockVehicleTypes },
              loading: false,
              error: null,
            },
          },
        }),
        {
          provide: BrandService,
          useValue: brandServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicle models from the service', () => {
    brandServiceMock.getBrandDetails.and.returnValue(of([mockVehicleModels, mockVehicleTypes]));

    expect(component.vehicleModels()).toEqual(mockVehicleModels);
    expect(component.vehicleTypes()).toEqual(mockVehicleTypes);
    expect(component.getBrandName()).toBe('Brand A');
  });

  it('should return "Marca desconocida" if no models are available', () => {
    component.vehicleModels.set([]);

    expect(component.getBrandName()).toBe('Marca desconocida');
  });

  it('should navigate back when goBack is called', () => {
    const locationSpy = spyOn(component['location'], 'back');
    component.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should sync the paginator with the table', () => {
    const paginator = TestBed.createComponent(MatPaginator).componentInstance;
    component.paginator = paginator;
    component.syncPaginator();

    expect(component.dataSourceModels.paginator).toBe(paginator);
  });

  it('should apply filter using applyFilter method', () => {
    component.dataSourceModels.filterPredicate = (data, filter) => data.modelName.toLowerCase().includes(filter);

    component.vehicleModels.set(mockVehicleModels);

    const input = document.createElement('input');
    input.value = 'Model A';
    component.applyFilter({ target: input } as unknown as Event);

    component.dataSourceModels._updateChangeSubscription();

    expect(component.dataSourceModels.filteredData.length).toBe(1);
    expect(component.dataSourceModels.filteredData[0].modelName).toBe('Model A');
  });
});
