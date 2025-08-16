import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { take } from 'rxjs';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit `true` when `show` is called', (done) => {
    service.loading$.subscribe((isLoading) => {
      if (isLoading) {
        expect(isLoading).toBeTrue();
        done();
      }
    });

    service.show();
  });

  it('should emit `false` when `hide` is called', (done) => {
    service.loading$.pipe(take(1)).subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });

    service.hide();
  });

  it('should emit the correct sequence of values when `show` and `hide` are called', (done) => {
    const expectedSequence = [false, true, false];
    const emittedValues: boolean[] = [];

    service.loading$.subscribe((isLoading) => {
      emittedValues.push(isLoading);

      if (emittedValues.length === expectedSequence.length) {
        expect(emittedValues).toEqual(expectedSequence);
        done();
      }
    });

    service.show();
    service.hide();
  });
});
