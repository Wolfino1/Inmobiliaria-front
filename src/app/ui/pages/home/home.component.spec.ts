import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener 3 categorías', () => {
    expect(component.categories.length).toBe(3);
    expect(component.categories[0].name).toBe('Apartamento');
  });

  it('debería tener 3 propiedades', () => {
    expect(component.properties.length).toBe(3);
    expect(component.properties[1].title).toBe('Apartamento Moderno');
  });
});

