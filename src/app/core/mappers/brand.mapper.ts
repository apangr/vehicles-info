import { BrandDto } from '@infra/dto/brand.dto';
import { Brand } from '@core/models/brand.model';

export class BrandMapper {
  /**
   * Maps a BrandDto object from the API to a Brand object.
   *
   * @param apiTask The BrandDto object from the API.
   * @returns A Brand object with the API data.
   */
  static fromApiToDomain(apiTask: BrandDto): Brand {
    return {
      id: apiTask.Make_ID,
      name: apiTask.Make_Name,
    };
  }
}
