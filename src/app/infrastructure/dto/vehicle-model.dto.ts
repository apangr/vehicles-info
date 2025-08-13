import { BrandDto } from './brand.dto';

export interface VehicleModelDto extends BrandDto {
  Model_ID: number;
  Model_Name: string;
}
