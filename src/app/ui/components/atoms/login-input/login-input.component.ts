// añade al top:
import { Component, Input } from '@angular/core';
import { FormControl }      from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent {
  @Input() control!: FormControl;
  @Input() label       = '';
  @Input() id          = '';
  @Input() type        = 'text';
  @Input() placeholder = '';
  @Input() maxLength?: number;
}
