import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LoginContainerComponent } from './login-container.component';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginContainerComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    component.errorMessage = 'Error de prueba';

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default errorMessage as null when no input is provided', () => {
    const temp = new LoginContainerComponent();
    expect(temp.errorMessage).toBeNull();
  });

  it('should emit submitLogin when onSubmit is called', () => {
    const emitSpy = jest.spyOn(component.submitLogin, 'emit');
    component.onSubmit();
    expect(emitSpy).toHaveBeenCalled();
  });
});
