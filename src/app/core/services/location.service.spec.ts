import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Department } from '../models/department.model';
import { City } from '../models/city.model';
import { Location } from '../models/location.model';
import { PagedResult } from '../models/paged-result.model';
import { LocationResponse } from '../models/location-response.model';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });

    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener todas las ubicaciones paginadas', () => {
    const mockResponse: PagedResult<LocationResponse> = {
      content: [
        { id: 1, name: 'Bucaramanga', cityResponse: {} as any }
      ],
      totalElements: 1
    };
  
    service.getAllLocations(1, 5).subscribe(res => {
      expect(res.content.length).toBe(1);
      expect(res.totalElements).toBe(1);
    });
  
    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === 'http://localhost:8082/api/v1/locations/filters'
    );
  
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('5');
    expect(req.request.params.get('orderAsc')).toBe('false');
  
    req.flush(mockResponse);
  });

  it('debería obtener departamentos', () => {
    const mockDepartments: Department[] = [
      { id: 1, name: 'Santander' }
    ];

    service.getDepartments().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Santander');
    });

    const req = httpMock.expectOne('http://localhost:8082/api/v1/department/get');
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments);
  });

  it('debería obtener ciudades por departamento', () => {
    const mockCities: City[] = [
      { id: 1, name: 'Girón', idDepartment: 1, department: {} as any }
    ];
  
    service.getCitiesByDepartment(1).subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Girón');
    });
  
    const req = httpMock.expectOne('http://localhost:8082/api/v1/city/by-department/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });

  it('debería crear una ubicación', () => {
    const payload = { name: 'La Cumbre', idCity: 2 };
    const mockLocation: Location = { id: 1, name: 'La Cumbre', idCity: 2, city: {} as any };

    service.createLocation(payload).subscribe(res => {
      expect(res.name).toBe('La Cumbre');
    });

    const req = httpMock.expectOne('http://localhost:8082/api/v1/locations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockLocation);
  });
});