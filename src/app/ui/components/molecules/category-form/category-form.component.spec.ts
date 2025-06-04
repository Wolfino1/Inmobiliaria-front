// category-form.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryFormComponent } from './category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService, Category } from 'src/app/core/services/category.service';
import { of, throwError } from 'rxjs';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR } from 'src/app/shared/errors/constant-error';
import { CATEGORY_CREATED } from 'src/app/shared/errors/constant-success';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let mockCategoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    mockCategoryService = {
      createCategory: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CategoryFormComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty controls', () => {
    const form = component.form;
    expect(form).toBeTruthy();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');
    expect(form.valid).toBe(false);
  });

  it('should mark all fields touched if submitting invalid form', () => {
    const nameControl = component.form.get('name')!;
    const descriptionControl = component.form.get('description')!;
    // Both untouched initially
    expect(nameControl.touched).toBe(false);
    expect(descriptionControl.touched).toBe(false);

    component.onSubmit();

    expect(nameControl.touched).toBe(true);
    expect(descriptionControl.touched).toBe(true);
    // Service should not be called
    expect(mockCategoryService.createCategory).not.toHaveBeenCalled();
  });

  it('should call service and emit created + set successMessage on valid submit', fakeAsync(() => {
    const dummyCategory: Category = { id: 1, name: 'Test', description: 'Desc' };
    mockCategoryService.createCategory.mockReturnValue(of(dummyCategory));

    const emitSpy = jest.spyOn(component.created, 'emit');
    component.form.setValue({ name: 'Test', description: 'Desc' });

    component.onSubmit();
    expect(mockCategoryService.createCategory).toHaveBeenCalledWith({ name: 'Test', description: 'Desc' });

    // next block runs synchronously because of of(...)
    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe(CATEGORY_CREATED);
    expect(component.form.value).toEqual({ name: null, description: null });
    expect(emitSpy).toHaveBeenCalledWith(dummyCategory);

    // After 3000ms, successMessage should clear
    tick(3000);
    expect(component.successMessage).toBe('');
  }));

  it('should set errorMessage to NO_INTERNET_ERROR when service returns status 0', () => {
    const httpError: any = { status: 0 };
    mockCategoryService.createCategory.mockReturnValue(throwError(() => httpError));

    component.form.setValue({ name: 'A', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toBe(NO_INTERNET_ERROR);
    expect(component.successMessage).toBe('');
  });

  it('should set errorMessage to NO_SERVER when service returns status >= 500', () => {
    const httpError: any = { status: 500 };
    mockCategoryService.createCategory.mockReturnValue(throwError(() => httpError));

    component.form.setValue({ name: 'A', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toBe(NO_SERVER);
    expect(component.successMessage).toBe('');
  });

  it('should set errorMessage to error.error.message or UNKNOWN_ERROR for other statuses', () => {
    const httpErrorWithMessage: any = { status: 400, error: { message: 'Bad request' } };
    mockCategoryService.createCategory.mockReturnValue(throwError(() => httpErrorWithMessage));

    component.form.setValue({ name: 'A', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toBe('Bad request');
    expect(component.successMessage).toBe('');

    // Now simulate no error.message
    const httpErrorNoMsg: any = { status: 422, error: {} };
    mockCategoryService.createCategory.mockReturnValue(throwError(() => httpErrorNoMsg));

    component.form.setValue({ name: 'A', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toBe(UNKNOWN_ERROR);
    expect(component.successMessage).toBe('');
  });
});

