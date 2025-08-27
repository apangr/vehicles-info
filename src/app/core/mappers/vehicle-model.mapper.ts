import { VehicleModelDto } from '@infra/dto/vehicle-model.dto';
import { VehicleModel } from '@core/models/vehicle-model.model';

export class VehicleModelMapper {
  static fromApiToDomain(apiTask: VehicleModelDto): VehicleModel {
    return {
      id: apiTask.Make_ID,
      name: apiTask.Make_Name,
      modelId: apiTask.Model_ID,
      modelName: apiTask.Model_Name,
    };
  }
}
