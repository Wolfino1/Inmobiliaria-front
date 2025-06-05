import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RegisterComponent } from './register.component';
import { AuthService, RegisterRequest } from 'src/app/core/services/auth.service';
import { NO_INTERNET_ERROR, NO_SERVER } from 'src/app/shared/errors/constant-error';

describe('RegisterComponent (Jest)', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: {
    registerBuyer: jest.Mock;
    registerSeller: jest.Mock;
  };

  interface FormData {
    name: string;
    lastname: string;
    document: string;
    phoneNumber: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }

  beforeEach(async () => {
    authServiceMock = {
      registerBuyer: jest.fn(),
      registerSeller: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form initialization & validators', () => {
    it('should mark all fields required initially (except role)', () => {
      const form = component.registerForm;
      expect(form.valid).toBe(false);

      const requiredFields = [
        'name','lastname','document','phoneNumber',
        'dateOfBirth','email','password','confirmPassword'
      ];

      requiredFields.forEach(field => {
        const ctrl = form.get(field)!;
        expect(ctrl.hasError('required')).toBe(true);
      });

      expect(form.get('role')!.hasError('required')).toBe(false);
    });

    it('should reject non-numeric document', () => {
      const doc = component.registerForm.get('document')!;
      doc.setValue('abc123');
      expect(doc.hasError('pattern')).toBe(true);
      doc.setValue('123456');
      expect(doc.valid).toBe(true);
    });

    it('should enforce phone pattern + digits', () => {
      const phone = component.registerForm.get('phoneNumber')!;
      phone.setValue('12345X');
      expect(phone.hasError('pattern')).toBe(true);
      phone.setValue('+1234567890');
      expect(phone.valid).toBe(true);
    });

    it('should validate age ≥ 18', () => {
      const dob = component.registerForm.get('dateOfBirth')!;
      const under17 = new Date();
      under17.setFullYear(under17.getFullYear() - 17);
      dob.setValue(under17.toISOString().slice(0,10));
      expect(dob.hasError('underAge')).toBe(true);

      const adult = new Date();
      adult.setFullYear(adult.getFullYear() - 18);
      dob.setValue(adult.toISOString().slice(0,10));
      expect(dob.hasError('underAge')).toBe(false);
    });

    it('should enforce password match', () => {
      const form = component.registerForm;
      form.get('password')!.setValue('pass123');
      form.get('confirmPassword')!.setValue('pass321');
      expect(form.hasError('mismatch')).toBe(true);
      form.get('confirmPassword')!.setValue('pass123');
      expect(form.hasError('mismatch')).toBe(false);
    });
  });

  describe('onSubmit()', () => {
    const validFormData: FormData = {
      name: 'Test',
      lastname: 'User',
      document: '123456',
      phoneNumber: '+12345678901',
      dateOfBirth: (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 20);
        return d.toISOString().slice(0,10);
      })(),
      email: 'test@example.com',
      password: 'abcdef',
      confirmPassword: 'abcdef',
      role: 'buyer'
    };

    beforeEach(() => {
      Object.entries(validFormData).forEach(([key, val]) => {
        component.registerForm.get(key)!.setValue(val as any);
      });
    });

    it('should not call service if form is invalid', () => {
      component.registerForm.get('name')!.setValue('');
      component.onSubmit();
      expect(authServiceMock.registerBuyer).not.toHaveBeenCalled();
      expect(authServiceMock.registerSeller).not.toHaveBeenCalled();
    });

    it('should call registerBuyer and reset form on success', () => {
      authServiceMock.registerBuyer.mockReturnValue(of({ token: 'abc' }));
      component.onSubmit();

      const expectedPayload: RegisterRequest = {
        name: validFormData.name,
        lastname: validFormData.lastname,
        document: validFormData.document,
        phoneNumber: validFormData.phoneNumber,
        dateOfBirth: validFormData.dateOfBirth,
        email: validFormData.email,
        password: validFormData.password
      };

      expect(authServiceMock.registerBuyer).toHaveBeenCalledWith(expectedPayload);
      expect(component.successMessage).toBe('¡Usuario creado correctamente!');
      expect(component.nameControl.value).toBe('');
      expect(component.registerForm.pristine).toBe(true);
    });

    it('should call registerSeller when role is seller', () => {
      component.registerForm.get('role')!.setValue('seller');
      authServiceMock.registerSeller.mockReturnValue(of({ token: 'xyz' }));
      component.onSubmit();
      expect(authServiceMock.registerSeller).toHaveBeenCalled();
      expect(component.successMessage).toBe('¡Usuario creado correctamente!');
    });

    it('should show connection error message on status 0', () => {
      authServiceMock.registerBuyer.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 0 }))
      );
      component.onSubmit();
      expect(component.errorMessage).toBe(NO_INTERNET_ERROR);
    });

    it('should show server error message on status >=500', () => {
      authServiceMock.registerBuyer.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 500 }))
      );
      component.onSubmit();
      expect(component.errorMessage).toBe(NO_SERVER);
    });

    it('should show backend message on 400 error', () => {
      authServiceMock.registerBuyer.mockReturnValue(
        throwError(() => new HttpErrorResponse({
          status: 400,
          error: { message: 'Bad Request' }
        }))
      );
      component.onSubmit();
      expect(component.errorMessage).toBe('Bad Request');
    });
  });
});