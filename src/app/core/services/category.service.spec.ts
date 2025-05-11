import { TestBed } from '@angular/core/testing';
import { CategoryService, Category } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener categorías con paginación', () => {
    const mockResponse = {
      content: [{ name: 'Casa' }],
      totalElements: 1
    };

    service.getAllCategories(1, 5, true).subscribe(res => {
      expect(res.content.length).toBe(1);
      expect(res.totalElements).toBe(1);
    });

    const req = httpMock.expectOne(
      'http://localhost:8082/api/v1/category/get?page=1&size=5&orderAsc=true'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería crear una nueva categoría', () => {
    const newCategory: Category = { name: 'Apartamento', description: 'Una descripción' };

    service.createCategory(newCategory).subscribe(res => {
      expect(res.name).toBe('Apartamento');
    });

    const req = httpMock.expectOne('http://localhost:8082/api/v1/category/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCategory);
    req.flush(newCategory);
  });
});
