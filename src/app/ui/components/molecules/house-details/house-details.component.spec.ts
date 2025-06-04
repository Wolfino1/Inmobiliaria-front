import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HouseDetailsComponent } from './house-details.component';

@Component({
  selector: 'app-input-field',
  template: ''
})
class InputFieldStubComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type?: string;
  @Input() placeholder?: string;
  @Input() maxLength?: number;
}

describe('HouseDetailsComponent', () => {
  let component: HouseDetailsComponent;
  let fixture: ComponentFixture<HouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HouseDetailsComponent,
        InputFieldStubComponent
      ],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailsComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      numberOfRooms:     new FormControl(3),
      numberOfBathrooms: new FormControl(2),
      sellerId:          new FormControl(42),
      description:       new FormControl('Descripción de prueba')
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('numberOfRoomsControl debe devolver el FormControl correcto', () => {
      expect(component.numberOfRoomsControl).toBeInstanceOf(FormControl);
      expect(component.numberOfRoomsControl.value).toBe(3);
    });

    it('numberOfBathroomsControl debe devolver el FormControl correcto', () => {
      expect(component.numberOfBathroomsControl).toBeInstanceOf(FormControl);
      expect(component.numberOfBathroomsControl.value).toBe(2);
    });

    it('descriptionControl debe devolver el FormControl correcto', () => {
      expect(component.descriptionControl).toBeInstanceOf(FormControl);
      expect(component.descriptionControl.value).toBe('Descripción de prueba');
    });
  });

  it('should render four <app-input-field> elements', () => {
    const inputs = fixture.debugElement.queryAll(By.css('app-input-field'));
    expect(inputs.length).toBe(3);
  });
});
