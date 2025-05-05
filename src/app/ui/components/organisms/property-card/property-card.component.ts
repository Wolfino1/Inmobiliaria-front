import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() property!: {
    imageSrc: string;
    title: string;
    city: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
  };
}

