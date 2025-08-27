import { VehicleTypeDto } from '@infra/dto/vehicle-type.dto';
import { VehicleType } from '@core/models/vehicle-type.model';

export class VehicleTypeMapper {
  static fromApiToDomain(apiTask: VehicleTypeDto): VehicleType {
    return {
      typeId: apiTask.VehicleTypeId,
      typeName: apiTask.VehicleTypeName,
    };
  }
}
