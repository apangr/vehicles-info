import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { VehicleModel } from '@core/models/vehicle-model.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { VehicleType } from '@core/models/vehicle-type.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrandService } from '@core/services/brand/brand.service';

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
  providers: [BrandService],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent implements OnInit, AfterViewInit {
  private brandDetailsService = inject(BrandService);
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
    this.brandDetailsService
      .getBrandDetails()
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
