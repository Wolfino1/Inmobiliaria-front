import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationInputComponent } from './location-input.component';

describe('LocationInputComponent', () => {
  let component: LocationInputComponent;
  let fixture: ComponentFixture<LocationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationInputComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener placeholder por defecto', () => {
    expect(component.placeholder).toBe('Buscar por ubicación');
  });

  it('debería aceptar un nuevo placeholder', () => {
    component.placeholder = 'Busca en tu ciudad';
    fixture.detectChanges();
    expect(component.placeholder).toBe('Busca en tu ciudad');
  });

  it('debería estar deshabilitado por defecto', () => {
    expect(component.disabled).toBe(true);
  });

  it('debería aceptar que disabled sea false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(component.disabled).toBe(false);
  });
});
