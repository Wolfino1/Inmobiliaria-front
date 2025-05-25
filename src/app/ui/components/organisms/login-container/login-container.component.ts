import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {
  @Input() form!: FormGroup;
  @Input() errorMessage: string | null = null;
  @Output() submitLogin = new EventEmitter<void>();

  onSubmit(): void {
    this.submitLogin.emit();
  }
}
