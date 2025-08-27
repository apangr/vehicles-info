import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResultListDto } from '@infra/dto/api-response.dto';
import { BrandDto } from '@infra/dto/brand.dto';
import { Brand } from '@core/models/brand.model';
import { BrandMapper } from '@mappers/brand.mapper';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandAPIService {
  private apiUrl = env.apiUrl;
  private responseFormat = '?format=json';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of all vehicle brands from the API.
   *
   * @returns An observable that emits an array of `Brand` objects, each representing a vehicle brand.
   */
  getAllBrands(): Observable<Brand[]> {
    return this.http
      .get<ResultListDto<BrandDto>>(`${this.apiUrl}GetAllMakes${this.responseFormat}`)
      .pipe(map((response) => response.Results.map(BrandMapper.fromApiToDomain)));
  }
}
