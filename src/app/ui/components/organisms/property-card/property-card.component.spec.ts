import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent } from './property-card.component';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería aceptar un objeto property como input', () => {
    const mockProperty = {
      imageSrc: 'assets/houses/casa1.jpg',
      title: 'Casa Bonita',
      city: 'Bucaramanga',
      price: 250000000,
      bedrooms: 3,
      bathrooms: 2
    };

    component.property = mockProperty;
    fixture.detectChanges();

    expect(component.property.title).toBe('Casa Bonita');
    expect(component.property.city).toBe('Bucaramanga');
    expect(component.property.bedrooms).toBe(3);
  });
});
