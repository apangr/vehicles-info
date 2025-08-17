import { Injectable } from '@angular/core';
import { BrandRepository } from '@repo/brand.repository';
import { BrandAPIService } from '@infra/services/brand/brand-api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandRepositoryImpl implements BrandRepository {
  constructor(private brandApiService: BrandAPIService) {}

  /**
   * Gets all car brands.
   * @returns An observable that emits an array of Brand objects.
   */
  getAll() {
    return this.brandApiService.getAllBrands();
  }
}
