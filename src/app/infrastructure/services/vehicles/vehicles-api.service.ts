import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultListDto } from '@infra/dto/api-response.dto';
import { VehicleModelDto } from '@infra/dto/vehicle-model.dto';
import { VehicleTypeDto } from '@infra/dto/vehicle-type.dto';
import { VehicleModelMapper } from '@mappers/vehicle-model.mapper';
import { VehicleTypeMapper } from '@mappers/vehicle-type.mapper';
import { VehicleModel } from '@core/models/vehicle-model.model';
import { VehicleType } from '@core/models/vehicle-type.model';
import { map, Observable } from 'rxjs';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiclesAPIService {
  private apiUrl = env.apiUrl;
  private responseFormat = '?format=json';

  constructor(private http: HttpClient) {}
  /**
   * Retrieves a list of vehicle types for a specific brand by its ID.
   * This method sends a GET request to the API and maps the response to an array of `VehicleType` objects.
   *
   * @param id The ID of the brand for which to fetch vehicle types.
   * @returns An observable that emits an array of `VehicleType` objects representing the types of vehicles for the given brand.
   */
  getVehicleTypesByBrandId(id: number): Observable<VehicleType[]> {
    return this.http
      .get<ResultListDto<VehicleTypeDto>>(`${this.apiUrl}GetVehicleTypesForMakeId/${id}${this.responseFormat}`)
      .pipe(map((response) => response.Results.map(VehicleTypeMapper.fromApiToDomain)));
  }

  /**
   * Retrieves a list of vehicle models for a specific brand by its ID.
   * This method sends a GET request to the API and maps the response to an array of `VehicleModel` objects.
   *
   * @param id The ID of the brand for which to fetch vehicle models.
   * @returns An observable that emits an array of `VehicleModel` objects representing the models of vehicles for the given brand.
   */
  getVehicleModelsByBrandId(id: number): Observable<VehicleModel[]> {
    return this.http
      .get<ResultListDto<VehicleModelDto>>(`${this.apiUrl}GetModelsForMakeId/${id}${this.responseFormat}`)
      .pipe(map((response) => response.Results.map(VehicleModelMapper.fromApiToDomain)));
  }
}
