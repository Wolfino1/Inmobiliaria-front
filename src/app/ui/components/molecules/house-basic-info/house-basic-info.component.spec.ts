import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HouseBasicInfoComponent } from './house-basic-info.component';

@Component({
  selector: 'app-input-field',
  template: ''
})
class InputFieldStubComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder?: string;
  @Input() maxLength?: number;
  @Input() type?: string;
}

describe('HouseBasicInfoComponent', () => {
  let component: HouseBasicInfoComponent;
  let fixture: ComponentFixture<HouseBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HouseBasicInfoComponent,
        InputFieldStubComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseBasicInfoComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      name:    new FormControl('Casa Ejemplo'),
      price:   new FormControl(123456),
      address: new FormControl('Calle Falsa 123')
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    it('nameControl debe devolver el FormControl "name"', () => {
      expect(component.nameControl).toBeInstanceOf(FormControl);
      expect(component.nameControl.value).toBe('Casa Ejemplo');
    });

    it('priceControl debe devolver el FormControl "price"', () => {
      expect(component.priceControl).toBeInstanceOf(FormControl);
      expect(component.priceControl.value).toBe(123456);
    });

    it('addressControl debe devolver el FormControl "address"', () => {
      expect(component.addressControl).toBeInstanceOf(FormControl);
      expect(component.addressControl.value).toBe('Calle Falsa 123');
    });
  });

  it('should render three <app-input-field> elements', () => {
    const inputs = fixture.debugElement.queryAll(By.css('app-input-field'));
    expect(inputs.length).toBe(3);
  });
});
