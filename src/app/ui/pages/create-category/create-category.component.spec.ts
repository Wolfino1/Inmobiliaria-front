import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { of, throwError } from 'rxjs';
import { Category, PagedResult } from 'src/app/core/services/category.service';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  const mockCategories: Category[] = [
    {  name: 'Category 1' },
    {  name: 'Category 2' }
  ];

  const mockPagedResult: PagedResult<Category> = {
    content: mockCategories,
    totalElements: 2,
  };

  beforeEach(async () => {
    categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of(mockPagedResult)),
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

  describe('Initialization', () => {
    it('should set default values', () => {
      expect(component.userName).toBe('Admin');
      expect(component.userAvatarUrl).toBe('/assets/user-avatar.jpg');
      expect(component.page).toBe(0);
      expect(component.size).toBe(10);
      expect(component.orderAsc).toBe(false);
    });

    it('should load categories on init', fakeAsync(() => {
      categoryServiceMock.getAllCategories.mockReturnValue(of(mockPagedResult));
      
      fixture.detectChanges(); 
      tick();
      
      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(0, 10, false);
      expect(component.categories).toEqual(mockCategories);
      expect(component.totalElements).toBe(2);
    }));

    it('should handle error when loading categories', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      categoryServiceMock.getAllCategories.mockReturnValue(throwError('Error'));
      
      fixture.detectChanges();
      tick();
      
      expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error loading categories', 'Error');
      consoleSpy.mockRestore();
    }));
  });

  describe('loadCategories', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call service with default parameters', fakeAsync(() => {
      categoryServiceMock.getAllCategories.mockReturnValue(of(mockPagedResult));
      
      component.loadCategories();
      tick();
      
      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(0, 10, false);
    }));

    it('should call service with custom parameters', fakeAsync(() => {
      categoryServiceMock.getAllCategories.mockReturnValue(of(mockPagedResult));
      
      component.loadCategories(2, 20, true);
      tick();
      
      expect(categoryServiceMock.getAllCategories).toHaveBeenCalledWith(2, 20, true);
    }));

    it('should update component properties on success', fakeAsync(() => {
      categoryServiceMock.getAllCategories.mockReturnValue(of(mockPagedResult));
      
      component.loadCategories();
      tick();
      
      expect(component.categories).toEqual(mockCategories);
      expect(component.totalElements).toBe(2);
    }));
  });

  describe('handleNewCategory', () => {
    it('should reload categories when a new category is added', fakeAsync(() => {
      const loadSpy = jest.spyOn(component, 'loadCategories');
      const newCategory: Category = { name: 'New Category' };
      
      component.handleNewCategory(newCategory);
      tick();
      
      expect(loadSpy).toHaveBeenCalled();
    }));
  });
});
