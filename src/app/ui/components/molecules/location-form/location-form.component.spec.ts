import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationFormComponent } from './location-form.component';
import { LocationService } from 'src/app/core/services/location.service';
import { of, throwError } from 'rxjs';
import { Department } from 'src/app/core/models/department.model';
import { City } from 'src/app/core/models/city.model';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR } from 'src/app/shared/errors/constant-error';

describe('LocationFormComponent', () => {
  let component: LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;
  let locationServiceMock: any;

  const mockDepartments: Department[] = [
    { id: 1, name: 'Department 1' },
    { id: 2, name: 'Department 2' }
  ];

  const mockCities: City[] = [
    { id: 1, name: 'City 1', idDepartment: 1, department: {} as any },
    { id: 2, name: 'City 2', idDepartment: 1, department: {} as any }
  ];

  beforeEach(async () => {
    locationServiceMock = {
      getDepartments: jest.fn().mockReturnValue(of([])),
      getCitiesByDepartment: jest.fn(),
      createLocation: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LocationFormComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with required validators', fakeAsync(() => {

      locationServiceMock.getDepartments.mockReturnValue(of([]));
        
        fixture.detectChanges();
        tick();
        
        expect(component.form).toBeTruthy();
        expect(component.form.get('name')?.hasError('required')).toBeTruthy();
        expect(component.form.get('departmentId')?.hasError('required')).toBeTruthy();
        expect(component.form.get('cityId')?.hasError('required')).toBeTruthy();
      }));

    it('should load departments on init', fakeAsync(() => {
      locationServiceMock.getDepartments.mockReturnValue(of(mockDepartments));
      
      fixture.detectChanges();
      tick();
      
      expect(locationServiceMock.getDepartments).toHaveBeenCalled();
      expect(component.departments).toEqual(mockDepartments);
    }));

    it('should handle error when loading departments', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      locationServiceMock.getDepartments.mockReturnValue(throwError('Error'));
      
      fixture.detectChanges();
      tick();
      
      expect(locationServiceMock.getDepartments).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error loading departments', 'Error');
      consoleSpy.mockRestore();
    }));
  });

  describe('department selection', () => {
    beforeEach(fakeAsync(() => {
      locationServiceMock.getDepartments.mockReturnValue(of(mockDepartments));
      fixture.detectChanges();
      tick();
    }));

    it('should load cities when department changes', fakeAsync(() => {
      locationServiceMock.getCitiesByDepartment.mockReturnValue(of(mockCities));
      
      component.form.get('departmentId')?.setValue(1);
      tick();
      
      expect(locationServiceMock.getCitiesByDepartment).toHaveBeenCalledWith(1);
      expect(component.cities).toEqual(mockCities);
      expect(component.form.get('cityId')?.value).toBeNull();
    }));

    it('should reset cities when department is null', fakeAsync(() => {
      component.cities = mockCities;
      component.form.get('cityId')?.setValue(1);
      
      component.form.get('departmentId')?.setValue(null);
      tick();
      
      expect(component.cities).toEqual([]);
      expect(component.form.get('cityId')?.value).toBeNull();
    }));

    it('should handle error when loading cities', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      locationServiceMock.getCitiesByDepartment.mockReturnValue(throwError('Error'));
      
      component.form.get('departmentId')?.setValue(1);
      tick();
      
      expect(locationServiceMock.getCitiesByDepartment).toHaveBeenCalledWith(1);
      expect(consoleSpy).toHaveBeenCalledWith('Error loading cities', 'Error');
      consoleSpy.mockRestore();
    }));
  });

  describe('onSubmit', () => {
    beforeEach(fakeAsync(() => {
      locationServiceMock.getDepartments.mockReturnValue(of(mockDepartments));
      fixture.detectChanges();
      tick();
      
      locationServiceMock.getCitiesByDepartment.mockReturnValue(of(mockCities));
      component.form.get('departmentId')?.setValue(1);
      component.form.get('cityId')?.setValue(1);
      component.form.get('name')?.setValue('Test Location');
      tick();
    }));

    it('should not submit if form is invalid', () => {
      component.form.get('name')?.setValue('');
      component.onSubmit();
      
      expect(component.form.touched).toBeTruthy();
      expect(locationServiceMock.createLocation).not.toHaveBeenCalled();
    });

    it('should create location and emit event on success', fakeAsync(() => {
      const mockResponse = { id: 1, name: 'Test Location' };
      locationServiceMock.createLocation.mockReturnValue(of(mockResponse));
      const emitSpy = jest.spyOn(component.created, 'emit');
      
      component.onSubmit();
      tick();
      
      expect(locationServiceMock.createLocation).toHaveBeenCalledWith({
        name: 'Test Location',
        idCity: 1
      });
      expect(component.successMessage).toBe('Ubicación creada con éxito');
      expect(component.errorMessage).toBe('');
      expect(component.form.pristine).toBeTruthy();
      expect(component.cities).toEqual([]);
      expect(emitSpy).toHaveBeenCalledWith(mockResponse);
      
      tick(3000);
      expect(component.successMessage).toBe('');
    }));

    it('should handle connection error', fakeAsync(() => {
      locationServiceMock.createLocation.mockReturnValue(throwError({ status: 0 }));
      
      component.onSubmit();
      tick();
      
      expect(component.errorMessage).toBe(NO_INTERNET_ERROR);
      expect(component.successMessage).toBe('');
    }));

    it('should handle server error (500+)', fakeAsync(() => {
      locationServiceMock.createLocation.mockReturnValue(throwError({ status: 500 }));
      
      component.onSubmit();
      tick();
      
      expect(component.errorMessage).toBe(NO_SERVER);
      expect(component.successMessage).toBe('');
    }));

    it('should handle other errors with custom message', fakeAsync(() => {
      locationServiceMock.createLocation.mockReturnValue(throwError({ 
        status: 400, 
        error: { message: 'Custom error' } 
      }));
      
      component.onSubmit();
      tick();
      
      expect(component.errorMessage).toBe('Custom error');
      expect(component.successMessage).toBe('');
    }));


  });
});