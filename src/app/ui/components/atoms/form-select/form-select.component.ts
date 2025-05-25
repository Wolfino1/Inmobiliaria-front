import { Component, Input } from '@angular/core';
import { FormControl }      from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() control!: FormControl;
  @Input() label       = '';
  @Input() id          = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder = '';
}