import { Injectable } from '@angular/core';
import { BrandRepository } from '@repo/brand.repository';
import { BrandService } from '@infra/services/brand/brand.service';

@Injectable({
  providedIn: 'root',
})
export class BrandRepositoryImpl implements BrandRepository {
  constructor(private brandService: BrandService) {}

  /**
   * Gets all car brands.
   * @returns An observable that emits an array of Brand objects.
   */
  getAll() {
    return this.brandService.getAllBrands();
  }
}
