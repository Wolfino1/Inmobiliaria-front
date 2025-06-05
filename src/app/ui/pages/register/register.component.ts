import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { AuthService, RegisterRequest } from 'src/app/core/services/auth.service';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR } from 'src/app/shared/errors/constant-error';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  roleOptions = [
    { value: 'buyer', label: 'Comprador' },
    { value: 'seller', label: 'Vendedor' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document:       ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]+$')]], 
      dateOfBirth: ['', [Validators.required, this.ageValidator(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['buyer', Validators.required]
    }, { validator: this.passwordMatch });
  }

    ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const dob = new Date(value);
      if (isNaN(dob.getTime())) return null;

      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= minAge ? null : { underAge: true };
    };
  }
  

  get nameControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get lastnameControl(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }
  get documentControl(): FormControl {
    return this.registerForm.get('document') as FormControl;
  }
  get phoneNumberControl(): FormControl {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get dateOfBirthControl(): FormControl {
    return this.registerForm.get('dateOfBirth') as FormControl;
  }
  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPasswordControl(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  get roleControl(): FormControl {
    return this.registerForm.get('role') as FormControl;
  }

  private passwordMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.errorMessage   = null;
    this.successMessage = null;

    const { name, lastname, document, phoneNumber, dateOfBirth, email, password, role } =
      this.registerForm.value as RegisterRequest & { role: string };

    const payload: RegisterRequest = { name, lastname, document, phoneNumber, dateOfBirth, email, password };

    const call$ = role === 'buyer'
      ? this.authService.registerBuyer(payload)
      : this.authService.registerSeller(payload);

    call$.subscribe({
      next: res => {
        this.successMessage = '¡Usuario creado correctamente!';

        this.registerForm.reset({
          name: '',
          lastname: '',
          document: '',
          phoneNumber: '',
          dateOfBirth: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'buyer'   
        });

        this.registerForm.markAsPristine();
        this.registerForm.markAsUntouched();
      },
      error: err => {
        console.error(err);
        if (err.status === 0) {
          this.errorMessage = NO_INTERNET_ERROR;
        } else if (err.status >= 500) {
          this.errorMessage = NO_SERVER;
        } else {
          this.errorMessage = err.error?.message || UNKNOWN_ERROR;
        }
      }
    });
  }
}
