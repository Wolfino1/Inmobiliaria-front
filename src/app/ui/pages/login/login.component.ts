import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR, WRONG_USER_OR_PASSWORD } from 'src/app/shared/errors/constant-error';

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

    this.errorMessage = null;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password })
      .subscribe({
        next: (res) => {

          localStorage.setItem('token', res.token);
          this.authService.setUserName(res.name);

          const role = this.authService.getUserRole();
          if (role === 'ADMIN') {
            this.router.navigate(['/categories']);
          }
          else if (role === 'SELLER') {
            this.router.navigate(['/propiedades/mis-casas']);
          }
          else if (role === 'BUYER') {
            this.router.navigate(['/schedule']);
          }
          else {
            this.router.navigate(['/home']);
            
          }        
        },
        error: (err: HttpErrorResponse) => {

          if (!navigator.onLine) {
            this.errorMessage = NO_INTERNET_ERROR;
          }
          else if (err.status === 0) {
            this.errorMessage = NO_SERVER;
          }
          else if (err.status === 401) {
            this.errorMessage = WRONG_USER_OR_PASSWORD;
          }
          else {
            this.errorMessage = UNKNOWN_ERROR;
          }

        }
      });
  }
}


