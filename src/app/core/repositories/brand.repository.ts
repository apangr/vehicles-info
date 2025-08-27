import { Observable } from 'rxjs';
import { Brand } from '@core/models/brand.model';

export abstract class BrandRepository {
  abstract getAll(): Observable<Brand[]>;
}
