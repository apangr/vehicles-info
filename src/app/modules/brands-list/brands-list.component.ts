import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Brand } from '@models/brand.model';
import { Store } from '@ngrx/store';
import { selectFilteredBrands } from '@store/selectors/brands.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brands-list',
  imports: [
    ScrollingModule,
    RouterModule,
    FormsModule,
    CdkVirtualScrollViewport,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
})
export class BrandsListComponent {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  public search = signal<string | null>(null);
  public filteredBrands = signal<Brand[]>([]);
  public isLoading = signal<boolean>(false);

  constructor() {
    // Effect to update filtered brands when search changes
    effect(() => {
      const searchValue = this.search();
      this.store
        .select(selectFilteredBrands(searchValue))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((brands) => {
          this.filteredBrands.set(brands);
        });
    });
  }

  public onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }
}
