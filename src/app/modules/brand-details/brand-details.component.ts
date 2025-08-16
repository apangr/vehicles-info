import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectVehiclesModelsByBrand, selectVehiclesTypesByBrand } from '@store/selectors/vehicles.selectors';
import { VehicleModel } from '@models/vehicle-model.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { VehicleType } from '@models/vehicle-type.model';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brand-details',
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent implements OnInit, AfterViewInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  public vehicleModels = signal<VehicleModel[]>([]);
  public vehicleTypes = signal<VehicleType[]>([]);
  public brandName = signal<string>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumnsModels: string[] = ['modelId', 'modelName'];
  dataSourceModels = new MatTableDataSource<VehicleModel>([]);

  constructor() {
    // Effect to update the table data
    effect(() => {
      const models = this.vehicleModels();
      this.dataSourceModels.data = models;
      this.brandName.set(this.getBrandName());
    });
  }

  ngOnInit(): void {
    const brandId = +this.route.snapshot.params['id'];

    const models$ = this.store.select(selectVehiclesModelsByBrand(brandId));
    const types$ = this.store.select(selectVehiclesTypesByBrand(brandId));

    combineLatest([models$, types$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([models, types]) => {
        this.vehicleModels.set(models);
        this.vehicleTypes.set(types);
      });
  }
  ngAfterViewInit(): void {
    this.syncPaginator();
  }

  syncPaginator(): void {
    if (this.paginator) {
      this.dataSourceModels.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  getBrandName(): string {
    const models = this.vehicleModels();
    return models && models.length > 0 ? models[0].name : 'Marca desconocida';
  }

  public goBack(): void {
    this.location.back();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSourceModels.filter = filterValue;
  }
}
