import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrandEffects } from '@store/effects/brands.effects';
import { VehicleEffects } from '@store/effects/vehicles.effects';
import { BrandRepository } from '@repo/brand.repository';
import { BrandRepositoryImpl } from '@infra/repositories/brand.respository.impl';
import { VehiclesRepository } from '@repo/vehicles.repository';
import { VehiclesRepositoryImpl } from '@infra/repositories/vehicles.repository.impl';
import { reducers } from './store';
import { loadingInterceptor } from '@core/interceptors/router-loading.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([BrandEffects, VehicleEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    { provide: BrandRepository, useClass: BrandRepositoryImpl },
    { provide: VehiclesRepository, useClass: VehiclesRepositoryImpl },
  ],
};
