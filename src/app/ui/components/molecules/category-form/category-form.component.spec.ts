import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CategoryFormComponent } from './category-form.component';
import { CategoryService } from 'src/app/core/services/category.service';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let mockCategoryService: any;

  beforeEach(async () => {
    mockCategoryService = {
      createCategory: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CategoryFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores vacíos', () => {
    expect(component.form.value).toEqual({ name: '', description: '' });
  });

  it('no debería enviar si el formulario es inválido', () => {
    const spy = jest.spyOn(mockCategoryService, 'createCategory');
    component.form.setValue({ name: '', description: '' }); // name es requerido
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('debería enviar y emitir evento si el formulario es válido', () => {
    const mockCategory = { id: 1, name: 'Test', description: 'Desc' };
    const spy = jest.spyOn(mockCategoryService, 'createCategory').mockReturnValue(of(mockCategory));
    const emitSpy = jest.spyOn(component.created, 'emit');

    component.form.setValue({ name: 'Test', description: 'Desc' });
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({ name: 'Test', description: 'Desc' });
    expect(component.successMessage).toBe('Categoría creada con éxito');
    expect(component.errorMessage).toBe('');
    expect(emitSpy).toHaveBeenCalledWith(mockCategory);
    expect(component.form.value).toEqual({ name: null, description: null });
  });

  it('debería limpiar successMessage después de 3 segundos', fakeAsync(() => {
    const mockCategory = { id: 1, name: 'Test', description: '' };
    jest.spyOn(mockCategoryService, 'createCategory').mockReturnValue(of(mockCategory));

    component.form.setValue({ name: 'Test', description: '' });
    component.onSubmit();

    expect(component.successMessage).toBe('Categoría creada con éxito');
    tick(3000);
    expect(component.successMessage).toBe('');
  }));

  it('debería mostrar mensaje de error si no hay conexión', () => {
    jest.spyOn(mockCategoryService, 'createCategory').mockReturnValue(
      throwError({ status: 0 })
    );

    component.form.setValue({ name: 'Test', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toContain('No se pudo conectar al servidor');
    expect(component.successMessage).toBe('');
  });

  it('debería mostrar mensaje de error si hay error 500', () => {
    jest.spyOn(mockCategoryService, 'createCategory').mockReturnValue(
      throwError({ status: 500 })
    );

    component.form.setValue({ name: 'Test', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toContain('Error en el servidor');
  });

  it('debería mostrar mensaje personalizado si el error lo tiene', () => {
    jest.spyOn(mockCategoryService, 'createCategory').mockReturnValue(
      throwError({ status: 400, error: { message: 'Nombre inválido' } })
    );

    component.form.setValue({ name: 'Test', description: '' });
    component.onSubmit();

    expect(component.errorMessage).toBe('Nombre inválido');
  });
});
