import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-house-basic-info',
  templateUrl: './house-basic-info.component.html',
  styleUrls: ['./house-basic-info.component.scss']
})
export class HouseBasicInfoComponent {
  @Input() form!: FormGroup;

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get priceControl(): FormControl {
    return this.form.get('price') as FormControl;
  }

  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }
}
