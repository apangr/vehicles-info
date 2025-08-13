import { Observable } from 'rxjs';
import { VehicleType } from '@models/vehicle-type.model';
import { VehicleModel } from '@models/vehicle-model.model';

export abstract class VehiclesRepository {
  abstract getTypesByBrandId(id: number): Observable<VehicleType[]>;
  abstract getModelsByBrandId(id: number): Observable<VehicleModel[]>;
}
