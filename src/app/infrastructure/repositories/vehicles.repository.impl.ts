import { Injectable } from '@angular/core';
import { VehiclesRepository } from '@core/repositories/vehicles.repository';
import { VehiclesAPIService } from '@infra/services/vehicles/vehicles-api.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesRepositoryImpl implements VehiclesRepository {
  constructor(private vehiclesApiService: VehiclesAPIService) {}

  /**
   * Retrieves a list of vehicle types for the given brand id.
   * @param id The id of the brand to retrieve vehicle types for.
   * @returns An observable that emits a list of vehicle types.
   */
  getTypesByBrandId(id: number) {
    return this.vehiclesApiService.getVehicleTypesByBrandId(id);
  }

  /**
   * Retrieves a list of vehicle models for the given brand id.
   * @param id The id of the brand to retrieve vehicle models for.
   * @returns An observable that emits a list of vehicle models.
   */
  getModelsByBrandId(id: number) {
    return this.vehiclesApiService.getVehicleModelsByBrandId(id);
  }
}
