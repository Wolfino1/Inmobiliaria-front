import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent {
  @Input() placeholder = 'Buscar por ubicación';
  @Input() disabled = true;
}
