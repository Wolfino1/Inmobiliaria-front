import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  categories = [
    { id: 1, name: 'Apartamento' },
    { id: 2, name: 'Casa Campestre' },
    { id: 3, name: 'Finca' }
  ];

  properties = [
    {
      imageSrc: 'assets/houses/casa1.jpg',
      title: 'Casa Bonita',
      city: 'Bucaramanga',
      price: 250000000,
      bedrooms: 3,
      bathrooms: 2
    },
    {
      imageSrc: 'assets/houses/casa2.jpg',
      title: 'Apartamento Moderno',
      city: 'Floridablanca',
      price: 320000000,
      bedrooms: 2,
      bathrooms: 2
    },
    {
      imageSrc: 'assets/houses/casa3.jpg',
      title: 'Villa de Lujo',
      city: 'Girón',
      price: 800000000,
      bedrooms: 5,
      bathrooms: 4
    }
  ];
}

  
