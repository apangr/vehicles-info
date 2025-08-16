import { Brand } from './brand.model';

export class VehicleModel extends Brand {
  constructor(
    public modelId: number,
    public modelName: string,
  ) {
    super(modelId, modelName);
  }
}
