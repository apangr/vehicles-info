import { Observable } from 'rxjs';
import { Brand } from '@models/brand.model';

export abstract class BrandRepository {
  abstract getAll(): Observable<Brand[]>;
}
