import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HouseMetaComponent } from './house-meta.component';

@Component({
  selector: 'app-select-field',
  template: ''
})
class SelectFieldStubComponent {
  @Input() control!: FormControl;
  @Input() options!: { id: number; name: string }[];
  @Input() label!: string;
}

@Component({
  selector: 'app-date-picker',
  template: ''
})
class DatePickerStubComponent {
  @Input() control!: FormControl;
  @Input() minDate!: string;
  @Input() maxDate!: string;
  @Input() label!: string;
}

describe('HouseMetaComponent', () => {
  let component: HouseMetaComponent;
  let fixture: ComponentFixture<HouseMetaComponent>;
  let form: FormGroup;
  const mockCategories = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
  ];
  const mockLocations = [
    { id: 10, name: 'X' },
    { id: 20, name: 'Y' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HouseMetaComponent,
        SelectFieldStubComponent,
        DatePickerStubComponent
      ],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseMetaComponent);
    component = fixture.componentInstance;

    form = new FormGroup({
      idCategory:            new FormControl(1),
      idLocation:            new FormControl(20),
      publishActivationDate: new FormControl('2025-06-01')
    });
    component.form = form;
    component.categories = mockCategories;
    component.locations = mockLocations;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe calcular todayIso y maxIso correctamente', () => {
    const today = new Date().toISOString().substring(0,10);
    const max   = new Date();
    max.setMonth(max.getMonth() + 1);
    const maxIso = max.toISOString().substring(0,10);

    expect(component.todayIso).toBe(today);
    expect(component.maxIso).toBe(maxIso);
  });

  describe('getters', () => {
    it('idCategoryControl devuelve el control correcto', () => {
      expect(component.idCategoryControl.value).toBe(1);
    });
    it('idLocationControl devuelve el control correcto', () => {
      expect(component.idLocationControl.value).toBe(20);
    });
    it('publishActivationDateControl devuelve el control correcto', () => {
      expect(component.publishActivationDateControl.value).toBe('2025-06-01');
    });
  });

  it('should render two <app-select-field> and one <app-date-picker>', () => {
    const selects = fixture.debugElement.queryAll(By.css('app-select-field'));
    const dates   = fixture.debugElement.queryAll(By.css('app-date-picker'));
    expect(selects.length).toBe(2);
    expect(dates.length).toBe(1);
  });
});
