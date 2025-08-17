import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brand } from '@models/brand.model';
import { selectFilteredBrands } from '@store/selectors/brands.selectors';
import { combineLatest, Observable } from 'rxjs';
import { AppState } from '@store/index';
import { VehicleModel } from '@models/vehicle-model.model';
import { VehicleType } from '@models/vehicle-type.model';
import { ActivatedRoute } from '@angular/router';
import { selectVehiclesModelsByBrand, selectVehiclesTypesByBrand } from '@store/selectors/vehicles.selectors';

@Injectable()
export class BrandService {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  getFilteredBrands(search: string | null): Observable<Brand[]> {
    return this.store.select(selectFilteredBrands(search));
  }

  getBrandDetails(): Observable<[VehicleModel[], VehicleType[]]> {
    const brandId = +this.route.snapshot.params['id'];
    const models$ = this.store.select(selectVehiclesModelsByBrand(brandId));
    const types$ = this.store.select(selectVehiclesTypesByBrand(brandId));
    return combineLatest([models$, types$]);
  }
}
