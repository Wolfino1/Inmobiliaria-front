// src/app/ui/pages/visits-config/visits-config.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { VisitsConfigComponent } from './visits-config.component';
import { HouseService } from 'src/app/core/services/house.service';
import { SellerHouse } from 'src/app/ui/components/organisms/seller-house-table/seller-house-table.component';
import { PagedResult } from 'src/app/core/models/paged-result.model';
import { SellerHouseQueryParams } from 'src/app/core/models/seller-house-query-params.model';

const houseServiceMock = {
  getSellerHouses: jest.fn()
};

describe('VisitsConfigComponent', () => {
  let component: VisitsConfigComponent;
  let fixture: ComponentFixture<VisitsConfigComponent>;
  let houseService: HouseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitsConfigComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '6' } } } 
        },
        { provide: HouseService, useValue: houseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsConfigComponent);
    component = fixture.componentInstance;
    houseService = TestBed.inject(HouseService);
    jest.clearAllMocks();
  });

  it('debe cargar houseId desde la ruta y establecer houseName correctamente si existe', () => {
    const fakeHouses: SellerHouse[] = [
      { id: 5, name: 'Casa A', category: 'X', price: 100, location: 'Loc1' },
      { id: 6, name: 'Casa B', category: 'Y', price: 200, location: 'Loc2' }
    ];
    const pagedResult: PagedResult<SellerHouse> = {
      content: fakeHouses,
      totalElements: 2
    };

    (houseServiceMock.getSellerHouses as jest.Mock).mockReturnValueOnce(of(pagedResult));

    fixture.detectChanges(); // dispara ngOnInit

    expect(houseService.getSellerHouses).toHaveBeenCalledWith({
      page: 0,
      size: 10,
      orderAsc: true
    } as SellerHouseQueryParams);
    expect(component.houseId).toBe(6);
    expect(component.houseName).toBe('Casa B');
  });

  it('debe establecer houseName como "Casa desconocida" si no se encuentra en content', () => {
    const fakeHouses: SellerHouse[] = [
      { id: 5, name: 'Casa A', category: 'X', price: 100, location: 'Loc1' }
    ];
    const pagedResult: PagedResult<SellerHouse> = {
      content: fakeHouses,
      totalElements: 1
    };

    (houseServiceMock.getSellerHouses as jest.Mock).mockReturnValueOnce(of(pagedResult));

    fixture.detectChanges();

    expect(component.houseName).toBe('Casa desconocida');
  });

  it('debe establecer houseName como "Casa desconocida" si getSellerHouses falla', () => {
    (houseServiceMock.getSellerHouses as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('Error'))
    );

    fixture.detectChanges();

    expect(component.houseName).toBe('Casa desconocida');
  });
});
