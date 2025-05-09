import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategorySelectComponent } from './category-select.component';
import { CategoryService } from 'src/app/shared/services/category.service';

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;
  let mockCategoryService: any;

  beforeEach(() => {
    mockCategoryService = {
      getAllCategories: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [CategorySelectComponent],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }]
    });

    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
  });

  it('debe llamar a getAllCategories y asignar las categorías en ngOnInit', () => {
    const mockResponse = {
      content: [
        { id: 1, name: 'Apartamento' },
        { id: 2, name: 'Casa Campestre' }
      ]
    };

    mockCategoryService.getAllCategories.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockResponse.content);
  });
});
