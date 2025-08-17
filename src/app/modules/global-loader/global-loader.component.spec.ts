import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoadingService } from '@core/services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('GlobalLoaderComponent', () => {
  let component: GlobalLoaderComponent;
  let fixture: ComponentFixture<GlobalLoaderComponent>;
  let mockLoadingService: Partial<LoadingService>;
  let loadingSubject: Subject<boolean>;

  beforeEach(async () => {
    loadingSubject = new Subject<boolean>();
    mockLoadingService = {
      loading$: loadingSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule, GlobalLoaderComponent],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the spinner when loading$ is false', () => {
    loadingSubject.next(false);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeNull();
  });

  it('should display the spinner when loading$ is true', () => {
    loadingSubject.next(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });
});
