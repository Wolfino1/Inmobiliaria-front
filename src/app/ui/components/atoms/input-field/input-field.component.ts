import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() control!: FormControl;
  @Input() label     = '';
  @Input() type      = 'text';
  @Input() placeholder = '';
  @Input() maxLength?: number;
}
