import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrandsListComponent } from './brands-list.component';
import { selectAllBrands, selectFilteredBrands } from '@store/selectors/brands.selectors';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { mockBrands } from '@testing/test-mocks';

describe('BrandsListComponent', () => {
  let component: BrandsListComponent;
  let fixture: ComponentFixture<BrandsListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            brands: {
              items: mockBrands,
              loading: false,
              error: null,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
            },
          },
        },
      ],
      imports: [
        BrandsListComponent,
        RouterModule,
        FormsModule,
        ScrollingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Mock the selector
    store.overrideSelector(selectAllBrands, mockBrands);
    store.overrideSelector(selectFilteredBrands(''), mockBrands);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of brands', () => {
    store.overrideSelector(selectAllBrands, mockBrands);
    store.refreshState();
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(mockBrands.length);
    expect(listItems[0].nativeElement.textContent).toContain('Toyota');
    expect(listItems[1].nativeElement.textContent).toContain('Honda');
  });

  it('should update the search signal when input changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simulate user typing in the search input
    inputElement.value = 'Toy';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search()).toBe('Toy');
  });

  it('should not update the search signal if the value does not change', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simulate user typing in the search input
    inputElement.value = 'Toy';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Simulate the user typing the same value again
    inputElement.value = 'Toy';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search()).toBe('Toy');
  });

  it('should filter brands based on search input', async () => {
    store.overrideSelector(selectFilteredBrands('Toy'), [{ id: 1, name: 'Toyota' }]);
    store.refreshState();
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Toy';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].nativeElement.textContent).toContain('Toyota');
  });

  it('should show all brands when search input is cleared', async () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Toyota');
    expect(listItems[1].nativeElement.textContent).toContain('Honda');
  });
});
