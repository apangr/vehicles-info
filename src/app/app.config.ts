import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrandRepository } from '@repo/brand.repository';
import { BrandRepositoryImpl } from '@infra/repositories/brand.respository.impl';
import { provideHttpClient } from '@angular/common/http';
import { AppEffects } from '@store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideEffects(AppEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    { provide: BrandRepository, useClass: BrandRepositoryImpl },
  ],
};
