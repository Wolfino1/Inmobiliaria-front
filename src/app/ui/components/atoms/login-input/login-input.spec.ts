import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginInputComponent } from './login-input.component';

describe('LoginInputComponent (Jest)', () => {
  let component: LoginInputComponent;
  let fixture: ComponentFixture<LoginInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginInputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('', Validators.required);
    component.label = 'Test Label';
    component.id = 'test-id';
    component.type = 'text';
    component.placeholder = 'Enter text';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when provided', () => {
    const labelEl = fixture.debugElement.query(By.css('label'));
    expect(labelEl).toBeTruthy();
    expect(labelEl.nativeElement.textContent.trim()).toBe('Test Label');
    expect(labelEl.nativeElement.getAttribute('for')).toBe('test-id');
  });

  it('should set input attributes correctly', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.getAttribute('id')).toBe('test-id');
    expect(inputEl.getAttribute('type')).toBe('text');
    expect(inputEl.getAttribute('placeholder')).toBe('Enter text');
    expect(inputEl.hasAttribute('maxlength')).toBe(false);
  });

  it('should apply maxlength when input property is set', () => {
    component.maxLength = 5;
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.getAttribute('maxlength')).toBe('5');
  });

  it('should display required error when control is touched and invalid', () => {
    const ctrl = component.control;
    ctrl.markAsTouched();
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(By.css('.login-input__error'));
    expect(errorEl).toBeTruthy();
    const span = errorEl.query(By.css('span'));
    expect(span.nativeElement.textContent.trim()).toBe('Test Label es obligatorio');
  });

  it('should display email error when type=email and invalid email entered', () => {
    component.type = 'email';
    component.control.setValidators([Validators.required, Validators.email]);
    component.control.setValue('not-an-email');
    component.control.markAsTouched();
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('.login-input__error span'));
    expect(spans.length).toBeGreaterThanOrEqual(1);
    expect(spans[0].nativeElement.textContent.trim()).toBe('Correo no válido');
  });
});
