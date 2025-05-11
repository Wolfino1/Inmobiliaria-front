import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLocationComponent } from './create-location.component';
import { LocationService } from 'src/app/core/services/location.service';

describe('CreateLocationComponent', () => {
  let component: CreateLocationComponent;
  let fixture: ComponentFixture<CreateLocationComponent>;
  let mockLocationService: any;

  beforeEach(async () => {
    mockLocationService = {};

    await TestBed.configureTestingModule({
      declarations: [CreateLocationComponent],
      providers: [{ provide: LocationService, useValue: mockLocationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateLocationComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
  
});
