import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '@core/services/loading/loading.service';

@Component({
  selector: 'app-global-loader',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
})
export class GlobalLoaderComponent {
  private loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
}
