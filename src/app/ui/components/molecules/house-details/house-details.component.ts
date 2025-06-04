import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent {
  @Input() form!: FormGroup;

  get numberOfRoomsControl(): FormControl {
    return this.form.get('numberOfRooms') as FormControl;
  }

  get numberOfBathroomsControl(): FormControl {
    return this.form.get('numberOfBathrooms') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
