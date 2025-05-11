import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBannerComponent } from './search-banner.component';

describe('SearchBannerComponent', () => {
  let component: SearchBannerComponent;
  let fixture: ComponentFixture<SearchBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBannerComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el array de categorías vacío por defecto', () => {
    expect(component.categories).toEqual([]);
  });

  it('debería aceptar nuevas categorías por input', () => {
    const mockCategories = [
      { id: 1, name: 'Casa' },
      { id: 2, name: 'Apartamento' }
    ];

    component.categories = mockCategories;
    fixture.detectChanges();

    expect(component.categories.length).toBe(2);
    expect(component.categories[0].name).toBe('Casa');
  });
});
