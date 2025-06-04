import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { CreateHouseComponent } from './create-house.component';
import { HouseService } from 'src/app/core/services/house.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { LocationService } from 'src/app/core/services/location.service';

import {
  ADDRESS_ALREADY_EXISTS,
  LISTING_DATE_IS_IN_MORE_THAN_ONE_MONTH,
  GENERIC_ERROR_CREATING_HOUSE
} from 'src/app/shared/errors/constant-error';
import { HOUSE_CREATED } from 'src/app/shared/errors/constant-success';

import { Component, Input } from '@angular/core';
@Component({ selector: 'app-house-basic-info', template: '' })
class HouseBasicInfoStub { @Input() form!: FormGroup; }
@Component({ selector: 'app-house-details', template: '' })
class HouseDetailsStub { @Input() form!: FormGroup; }
@Component({ selector: 'app-house-meta', template: '' })
class HouseMetaStub {
  @Input() form!: FormGroup;
  @Input() categories!: { id: number; name: string }[];
  @Input() locations!: { id: number; name: string }[];
}

describe('CreateHouseComponent', () => {
  let component: CreateHouseComponent;
  let fixture: ComponentFixture<CreateHouseComponent>;
  let houseServiceMock: { createHouse: jest.Mock };
  let categoryServiceMock: { getAllCategories: jest.Mock };
  let locationServiceMock: { getAllLocations: jest.Mock };

  const mockCategories = [{ id: 1, name: 'Cat A' }];
  const mockLocations = [{ id: 10, name: 'Loc X' }];

  beforeEach(async () => {
    houseServiceMock    = { createHouse: jest.fn() };
    categoryServiceMock = { getAllCategories: jest.fn() };
    locationServiceMock = { getAllLocations: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [
        CreateHouseComponent,
        HouseBasicInfoStub,
        HouseDetailsStub,
        HouseMetaStub
      ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: HouseService,    useValue: houseServiceMock    },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: LocationService, useValue: locationServiceMock }
      ]
    }).compileComponents();

    categoryServiceMock.getAllCategories.mockReturnValue(of({ content: mockCategories }));
    locationServiceMock.getAllLocations.mockReturnValue(of({ content: mockLocations }));

    fixture = TestBed.createComponent(CreateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // ejecuta ngOnInit
  });

  it('debe crearse y cargar categorías y ubicaciones', () => {
    expect(component).toBeTruthy();
    expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();
    expect(locationServiceMock.getAllLocations).toHaveBeenCalledWith(0, 100, false);
    expect(component.categories).toEqual(mockCategories);
    expect(component.locations).toEqual(mockLocations);
    expect(component.form).toBeDefined();
  });

it('debe crear casa exitosamente', fakeAsync(() => {
  houseServiceMock.createHouse.mockReturnValue(of({}));
  const resetSpy = jest.spyOn(component.form, 'reset');

  const expectedRequest = {
    name: 'Casa X',
    price: 100,
    address: 'Av 123',
    numberOfRooms: 2,
    numberOfBathrooms: 1,
    sellerId: 5,
    description: 'Desc',
    idCategory: 1,
    idLocation: 10,
    publishActivationDate: '2025-06-01'
  };
  component.form.setValue(expectedRequest);

  component.onSubmit();
  tick();

  expect(houseServiceMock.createHouse).toHaveBeenCalledWith(expectedRequest);
  expect(component.successMessage).toBe(HOUSE_CREATED);
  expect(resetSpy).toHaveBeenCalled();
}));


  it('debe marcar error addressExists cuando ADDRESS_ALREADY_EXISTS', fakeAsync(() => {
    houseServiceMock.createHouse.mockReturnValue(
      throwError(() => ({ error: { message: ADDRESS_ALREADY_EXISTS } }))
    );
    component.form.patchValue({
      name: 'X', price: 1, address: 'dup', numberOfRooms: 1,
      numberOfBathrooms: 1, sellerId: 1, description: 'D',
      idCategory: 1, idLocation: 10, publishActivationDate: '2025-06-01'
    });

    component.onSubmit();
    tick();

    expect(component.form.get('address')?.errors).toEqual({ addressExists: true });
  }));

  it('debe marcar error listingDateExceed cuando LISTING_DATE_IS_IN_MORE_THAN_ONE_MONTH', fakeAsync(() => {
    houseServiceMock.createHouse.mockReturnValue(
      throwError(() => ({ error: { message: LISTING_DATE_IS_IN_MORE_THAN_ONE_MONTH } }))
    );
    component.form.patchValue({
      name: 'X', price: 1, address: 'A', numberOfRooms: 1,
      numberOfBathrooms: 1, sellerId: 1, description: 'D',
      idCategory: 1, idLocation: 10, publishActivationDate: '2025-06-01'
    });

    component.onSubmit();
    tick();

    expect(component.form.get('publishActivationDate')?.errors)
      .toEqual({ listingDateExceed: true });
  }));

  it('debe mostrar error genérico cuando ocurre un error desconocido', fakeAsync(() => {
    houseServiceMock.createHouse.mockReturnValue(
      throwError(() => ({ error: { message: 'OTHER_ERROR' } }))
    );
    component.form.patchValue({
      name: 'X', price: 1, address: 'A', numberOfRooms: 1,
      numberOfBathrooms: 1, sellerId: 1, description: 'D',
      idCategory: 1, idLocation: 10, publishActivationDate: '2025-06-01'
    });

    component.onSubmit();
    tick();

    expect(component.errorMessage).toBe(GENERIC_ERROR_CREATING_HOUSE);
  }));
});

