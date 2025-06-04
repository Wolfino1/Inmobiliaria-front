import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService, Category, PagedResult } from 'src/app/core/services/category.service';
import { of, throwError } from 'rxjs';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

const mockCategories: Category[] = [
  { id: 1, name: 'Cat 1' },
  { id: 2, name: 'Cat 2' }
];

  const mockPaged: PagedResult<Category> = {
    content: mockCategories,
    totalElements: 2
  };

  beforeEach(async () => {
    // Creamos un mock del servicio
    categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of(mockPaged))
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults before init', () => {
    it('should have correct default properties', () => {
      expect(component.userName).toBe('Admin');
      expect(component.userAvatarUrl).toBe('/assets/user-avatar.jpg');
      expect(component.categories).toEqual([]);
      expect(component.totalElements).toBe(0);
      expect(component.page).toBe(0);
      expect(component.size).toBe(10);
      expect(component.orderAsc).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should call loadCategories with defaults', fakeAsync(() => {
      fixture.detectChanges(); // dispara ngOnInit()
      tick();

      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(0, 10, false);
      expect(component.categories).toEqual(mockCategories);
      expect(component.totalElements).toBe(2);
    }));

    it('should handle error when getAllCategories throws', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      categoryServiceMock.getAllCategories.mockReturnValueOnce(throwError(() => 'fail'));

      fixture.detectChanges();
      tick();

      expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error loading categories', 'fail');
      consoleSpy.mockRestore();
    }));
  });

  describe('loadCategories()', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should call service with default params', fakeAsync(() => {
      component.loadCategories();
      tick();

      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(0, 10, false);
      expect(component.categories).toEqual(mockCategories);
      expect(component.totalElements).toBe(2);
    }));

    it('should call service with provided params', fakeAsync(() => {
      component.loadCategories(1, 5, true);
      tick();

      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(1, 5, true);
    }));

    it('should log error on failure', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      categoryServiceMock.getAllCategories.mockReturnValueOnce(throwError(() => new Error('oops')));

      component.loadCategories();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith('Error loading categories', new Error('oops'));
      consoleSpy.mockRestore();
    }));
  });

describe('handleNewCategory()', () => {
  it('should call loadCategories again', fakeAsync(() => {
    const spy = jest.spyOn(component, 'loadCategories');
    component.handleNewCategory({ id: 999, name: 'X' });
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
});