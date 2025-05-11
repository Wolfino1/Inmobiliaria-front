import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchButtonComponent } from './search-button.component';

describe('SearchButtonComponent', () => {
  let component: SearchButtonComponent;
  let fixture: ComponentFixture<SearchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchButtonComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el label por defecto', () => {
    expect(component.label).toBe('Buscar');
  });

  it('debería aceptar un nuevo label', () => {
    component.label = 'Explorar';
    fixture.detectChanges();
    expect(component.label).toBe('Explorar');
  });
});
