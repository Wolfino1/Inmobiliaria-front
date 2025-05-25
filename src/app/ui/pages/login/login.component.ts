import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }   from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.errorMessage = null;  
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password })
      .subscribe({
    next: (res) => {
  // 1) guardo el token
    localStorage.setItem('token', res.token);

  // 2) tomo el name que vino del backend y lo emito
    this.authService.setUserName(res.name);

  // 3) redirijo
    this.router.navigate(['/home']);
      },

        error: () => {
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      });
  }
}
