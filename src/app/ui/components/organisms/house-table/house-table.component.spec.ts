// src/app/ui/components/organisms/house-table/house-table.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { HouseTableComponent } from './house-table.component';
import { HouseService } from 'src/app/core/services/house.service';
import { HouseResponse } from 'src/app/core/models/house-response.model';
import { HouseQueryParams } from 'src/app/core/models/house-query-params.model';

describe('HouseTableComponent', () => {
  let component: HouseTableComponent;
  let fixture: ComponentFixture<HouseTableComponent>;
  let houseServiceMock: { getFilteredHouses: jest.Mock };

  const DEFAULT_PAGE      = 0;
  const DEFAULT_SIZE      = 10;
  const DEFAULT_SORT_BY   = 'numberOfRooms';
  const DEFAULT_ORDER_ASC = false;

  const mockHouses: HouseResponse[] = [
    {
      id: 1,
      sellerId: 5,
      category: 'Apartamento',
      numberOfRooms: 2,
      numberOfBathrooms: 1,
      priceMin: 100_000_000,
      location: { id: 10, name: 'Bucaramanga' }
    },
    {
      id: 2,
      sellerId: 8,
      category: 'Casa',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      priceMin: 200_000_000,
      location: { id: 20, name: 'Floridablanca' }
    }
  ];
  const mockResponse = {
    content: mockHouses,
    totalElements: mockHouses.length + 5  // e.g. 7 total
  };

  beforeEach(async () => {
    houseServiceMock = { getFilteredHouses: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [ HouseTableComponent ],
      providers: [
        { provide: HouseService, useValue: houseServiceMock }
      ]
    }).compileComponents();

    // Primer llamado en ngOnInit devuelve datos exitosos
    houseServiceMock.getFilteredHouses.mockReturnValue(of(mockResponse));

    fixture = TestBed.createComponent(HouseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit()
  });

  it('debe crearse y cargar casas con parámetros por defecto', () => {
    expect(component).toBeTruthy();
    expect(houseServiceMock.getFilteredHouses).toHaveBeenCalledWith({
      page:     DEFAULT_PAGE,
      size:     DEFAULT_SIZE,
      sortBy:   DEFAULT_SORT_BY,
      orderAsc: DEFAULT_ORDER_ASC
    } as HouseQueryParams);

    expect(component.houses).toEqual(mockHouses);
    expect(component.totalElements).toBe(mockResponse.totalElements);

    const expectedPages = Math.ceil(mockResponse.totalElements / DEFAULT_SIZE);
    expect(component.totalPages).toBe(expectedPages);
    expect(component.pages).toEqual(Array.from({ length: expectedPages }, (_, i) => i));

    expect(component.errorMessage).toBeNull();
    expect(component.isLoading).toBe(false);
  });

  it('debe manejar error al cargar casas', fakeAsync(() => {
    // Preparamos el servicio para arrojar error en el siguiente llamado
    houseServiceMock.getFilteredHouses.mockReturnValueOnce(throwError(() => new Error('fail')));
    component.totalPages = 1;  // permitir changePage(0)
    component.changePage(0);
    tick();

    expect(component.errorMessage).toBe('Error cargando casas.');
    expect(component.isLoading).toBe(false);
  }));

  it('debe cambiar página válida y recargar los datos', () => {
    jest.clearAllMocks();
    houseServiceMock.getFilteredHouses.mockReturnValue(of(mockResponse));

    // Aseguramos que totalPages sea mayor que 2 para que p=2 sea válido
    component.totalPages = 5;

    component.changePage(2);

    expect(component.page).toBe(2);
    expect(houseServiceMock.getFilteredHouses).toHaveBeenCalledWith({
      page:     2,
      size:     DEFAULT_SIZE,
      sortBy:   DEFAULT_SORT_BY,
      orderAsc: DEFAULT_ORDER_ASC
    } as HouseQueryParams);
  });

  it('no debe cambiar página si es inválida', () => {
    jest.clearAllMocks();
    component.totalPages = 3;

    component.changePage(-1);
    component.changePage(3);

    expect(houseServiceMock.getFilteredHouses).not.toHaveBeenCalled();
  });

  it('debe ordenar por nuevo campo y reiniciar página', () => {
    jest.clearAllMocks();
    houseServiceMock.getFilteredHouses.mockReturnValue(of(mockResponse));

    component.onSortChange('priceMin');

    expect(component.sortBy).toBe('priceMin');
    expect(component.orderAsc).toBe(true);
    expect(component.page).toBe(0);
    expect(houseServiceMock.getFilteredHouses).toHaveBeenCalledWith({
      page:     0,
      size:     DEFAULT_SIZE,
      sortBy:   'priceMin',
      orderAsc: true
    } as HouseQueryParams);
  });

  it('debe alternar orden si selecciona el mismo campo', () => {
    jest.clearAllMocks();
    houseServiceMock.getFilteredHouses.mockReturnValue(of(mockResponse));

    component.sortBy   = DEFAULT_SORT_BY;
    component.orderAsc = false;
    component.page     = 5;

    component.onSortChange(DEFAULT_SORT_BY);

    expect(component.orderAsc).toBe(true);
    expect(component.page).toBe(0);
    expect(houseServiceMock.getFilteredHouses).toHaveBeenCalledWith({
      page:     0,
      size:     DEFAULT_SIZE,
      sortBy:   DEFAULT_SORT_BY,
      orderAsc: true
    } as HouseQueryParams);
  });
});


