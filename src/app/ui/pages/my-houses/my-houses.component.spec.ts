import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MyHousesPageComponent } from './my-houses.component';
import { HouseService } from 'src/app/core/services/house.service';
import { SellerHouse } from '../../components/organisms/seller-house-table/seller-house-table.component';
import { PagedResult } from 'src/app/core/models/paged-result.model';
import { SellerHouseQueryParams } from 'src/app/core/models/seller-house-query-params.model';

const houseServiceMock = {
  getSellerHouses: jest.fn()
};

describe('MyHousesPageComponent', () => {
  let component: MyHousesPageComponent;
  let fixture: ComponentFixture<MyHousesPageComponent>;
  let houseService: HouseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [MyHousesPageComponent],
      providers: [
        { provide: HouseService, useValue: houseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyHousesPageComponent);
    component = fixture.componentInstance;
    houseService = TestBed.inject(HouseService);
    router = TestBed.inject(Router);

    component.page = 0;
    component.size = 10;
    jest.clearAllMocks();
  });

  describe('ngOnInit & loadHouses', () => {
    it('debe llamar a loadHouses y poblar houses al inicializar', () => {
      const fakeHouses: SellerHouse[] = [
        { id: 1, name: 'Casa 1', category: 'A', price: 100, location: 'Loc1' },
        { id: 2, name: 'Casa 2', category: 'B', price: 200, location: 'Loc2' }
      ];
      const pagedResult: PagedResult<SellerHouse> = {
        content: fakeHouses,
        totalElements: 2
      };

      (houseServiceMock.getSellerHouses as jest.Mock).mockReturnValueOnce(of(pagedResult));

      fixture.detectChanges();

      expect(houseService.getSellerHouses).toHaveBeenCalledWith({
        page: 0,
        size: 10,
        orderAsc: true
      } as SellerHouseQueryParams);
      expect(component.houses).toEqual(fakeHouses);
      expect(component.totalElements).toBe(2);
      expect(component.totalPages).toBe(1); // Math.ceil(2 / 10) === 1
      expect(component.pages).toEqual([0]);
      expect(component.isLoading).toBe(false);
      expect(component.error).toBeNull();
    });

    it('debe manejar error si getSellerHouses falla', () => {
      (houseServiceMock.getSellerHouses as jest.Mock).mockReturnValueOnce(throwError(() => new Error('fallo')));

      fixture.detectChanges();

      expect(houseService.getSellerHouses).toHaveBeenCalled();
      expect(component.houses).toEqual([]);
      expect(component.error).toBe('No se pudieron cargar tus casas');
      expect(component.isLoading).toBe(false);
    });
  });

  describe('changePage', () => {
    it('no debe cambiar la página si p < 0', () => {
      component.totalPages = 3;
      component.page = 1;

      component.changePage(-1);
      expect(component.page).toBe(1);
    });

    it('no debe cambiar la página si p >= totalPages', () => {
      component.totalPages = 3;
      component.page = 1;

      component.changePage(3);
      expect(component.page).toBe(1);
    });

    it('cambia la página y llama a loadHouses si p es válido', () => {
      jest.spyOn(component, 'loadHouses').mockImplementation(() => {});

      component.totalPages = 3;
      component.page = 0;

      component.changePage(2);
      expect(component.page).toBe(2);
      expect(component.loadHouses).toHaveBeenCalled();
    });
  });

  describe('onManage', () => {
    it('debe navegar a la ruta /propiedades/gestionar-horarios/:id', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      const houseId = 5;

      component.onManage(houseId);
      expect(navigateSpy).toHaveBeenCalledWith(['/propiedades/gestionar-horarios', houseId]);
    });
  });
});

