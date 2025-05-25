import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: Partial<AuthService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn(),
      setUserName: jest.fn()
    };
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

  it('should create the login form with email and password controls', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should not call login when the form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect((mockAuthService.login as jest.Mock)).not.toHaveBeenCalled();
  });

  it('should call login and store token, set user name, and navigate on success', fakeAsync(() => {
    const mockResponse = { token: 'abc123', name: 'TestUser' };
    (mockAuthService.login as jest.Mock).mockReturnValue(of(mockResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'pass' });

    const spySetItem = jest.spyOn(Storage.prototype, 'setItem');

    component.onSubmit();
    tick();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'pass' });
    expect(spySetItem).toHaveBeenCalledWith('token', mockResponse.token);
    expect((mockAuthService.setUserName as jest.Mock)).toHaveBeenCalledWith(mockResponse.name);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should set errorMessage when login fails', fakeAsync(() => {
    (mockAuthService.login as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));
    component.loginForm.setValue({ email: 'fail@example.com', password: 'wrong' });

    component.onSubmit();
    tick();

    expect(component.errorMessage).toBe('Correo o contraseña incorrectos');
  }));
});