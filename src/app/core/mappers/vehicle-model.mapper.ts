import { VehicleModelDto } from '@infra/dto/vehicle-model.dto';
import { VehicleModel } from '@models/vehicle-model.model';

export class VehicleModelMapper {
  static fromApiToDomain(apiTask: VehicleModelDto): VehicleModel {
    return {
      id: apiTask.Model_ID,
      name: apiTask.Model_Name,
      modelId: apiTask.Model_ID,
      modelName: apiTask.Model_Name,
    };
  }
}
