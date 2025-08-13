import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadBrands } from '@store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vehicles-info';
  private store = inject(Store);

  ngOnInit() {
    this.loadBrands();
  }

  private loadBrands() {
    this.store.dispatch(loadBrands({ searchCriteria: null }));
  }
}
