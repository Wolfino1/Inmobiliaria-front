import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent (Jest)', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose emailControl and passwordControl getters', () => {
    expect(component.emailControl).toBeInstanceOf(FormControl);
    expect(component.passwordControl).toBeInstanceOf(FormControl);
  });

  it('should not emit submitForm when form is invalid', () => {
    const emitSpy = jest.spyOn(component.submitForm, 'emit');
    component.onSubmit();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit submitForm once when form is valid', () => {
    component.form.get('email')!.setValue('user@example.com');
    component.form.get('password')!.setValue('secure123');

    const emitSpy = jest.spyOn(component.submitForm, 'emit');
    component.onSubmit();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
