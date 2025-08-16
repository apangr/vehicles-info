import { Routes } from '@angular/router';
import { BrandDetailsResolver } from '@modules/brand-details/brand-details.resolver';
import { BrandsListResolver } from '@modules/brands-list/brand-list.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () => import('./modules/brands-list/brands-list.component').then((m) => m.BrandsListComponent),
    resolve: {
      brandsData: BrandsListResolver,
    },
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./modules/brand-details/brand-details.component').then((m) => m.BrandDetailsComponent),
    resolve: {
      brandData: BrandDetailsResolver,
    },
  },
];
