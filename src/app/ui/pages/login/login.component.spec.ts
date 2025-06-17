import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginResponse } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR, WRONG_USER_OR_PASSWORD } from 'src/app/shared/errors/constant-error';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn(),
      setUserName: jest.fn(),
      getUserRole: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize form', () => {
    expect(component).toBeTruthy();
    const form = component.loginForm;
    expect(form).toBeTruthy();
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.valid).toBe(false);
  });

  it('should navigate to /categories when role is ADMIN', () => {
    const loginResp: LoginResponse = { token: 'abc', name: 'Admin User' };
    mockAuthService.login.mockReturnValue(of(loginResp));
    mockAuthService.getUserRole.mockReturnValue('ADMIN');

    component.loginForm.setValue({ email: 'a@b.com', password: '123' });
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'a@b.com', password: '123' });
    expect(localStorage.getItem('token')).toBe('abc');
    expect(mockAuthService.setUserName).toHaveBeenCalledWith('Admin User');
    expect(mockAuthService.getUserRole).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/categories']);
    expect(component.errorMessage).toBeNull();
  });

  it('should navigate to /propiedades/mis-casas when role is SELLER', () => {
    const loginResp: LoginResponse = { token: 'xyz', name: 'Seller User' };
    mockAuthService.login.mockReturnValue(of(loginResp));
    mockAuthService.getUserRole.mockReturnValue('SELLER');

    component.loginForm.setValue({ email: 's@b.com', password: 'pwd' });
    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/propiedades/mis-casas']);
  });

  it('should navigate to /home when role is neither ADMIN nor SELLER', () => {
    const loginResp: LoginResponse = { token: '123', name: 'Other User' };
    mockAuthService.login.mockReturnValue(of(loginResp));
    mockAuthService.getUserRole.mockReturnValue('BUYER');

    component.loginForm.setValue({ email: 'o@b.com', password: 'pwd' });
    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/schedule']);
  });

  it('should set NO_INTERNET_ERROR when navigator.onLine is false', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    mockAuthService.login.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));

    component.loginForm.setValue({ email: 'x@b.com', password: 'pwd' });
    component.onSubmit();

    expect(component.errorMessage).toBe(NO_INTERNET_ERROR);
    jest.spyOn(navigator, 'onLine', 'get').mockRestore();
  });

  it('should set NO_SERVER when error status is 0', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const httpErr = new HttpErrorResponse({ status: 0 });
    mockAuthService.login.mockReturnValue(throwError(() => httpErr));

    component.loginForm.setValue({ email: 'x@b.com', password: 'pwd' });
    component.onSubmit();

    expect(component.errorMessage).toBe(NO_SERVER);
  });

  it('should set WRONG_USER_OR_PASSWORD when error status is 401', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const httpErr = new HttpErrorResponse({ status: 401 });
    mockAuthService.login.mockReturnValue(throwError(() => httpErr));

    component.loginForm.setValue({ email: 'x@b.com', password: 'pwd' });
    component.onSubmit();

    expect(component.errorMessage).toBe(WRONG_USER_OR_PASSWORD);
  });

  it('should set UNKNOWN_ERROR for other error statuses', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const httpErr = new HttpErrorResponse({ status: 400 });
    mockAuthService.login.mockReturnValue(throwError(() => httpErr));

    component.loginForm.setValue({ email: 'x@b.com', password: 'pwd' });
    component.onSubmit();

    expect(component.errorMessage).toBe(UNKNOWN_ERROR);
  });
});
