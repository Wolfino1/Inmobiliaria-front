import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input() control!: FormControl;
  @Input() label       = '';
  @Input() minDate?: string; 
  @Input() maxDate?: string;
}
