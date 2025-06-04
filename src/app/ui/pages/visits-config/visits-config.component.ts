import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }      from '@angular/router';
import { HouseService }       from 'src/app/core/services/house.service';
import { House }              from 'src/app/core/models/house.model';

@Component({
  selector: 'app-visits-config',
  templateUrl: './visits-config.component.html',
  styleUrls: ['./visits-config.component.scss']
})
export class VisitsConfigComponent implements OnInit {
  houseId!: number;
  houseName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private houseService: HouseService
  ) {}

ngOnInit(): void {

this.houseId = +this.activatedRoute.snapshot.paramMap.get('houseId')!;
  if (this.houseId != null) {
    this.houseService.getSellerHouses({ page: 0, size: 10, orderAsc: true })
      .subscribe({
        next: paged => {
          const found = paged.content.find(h => h.id === this.houseId);
          if (found) {
            this.houseName = found.name;
          } else {
            this.houseName = 'Casa desconocida';
          }
        },
        error: err => {
          console.error('Error al cargar seller houses', err);
          this.houseName = 'Casa desconocida';
        }
    });
  }
}
}

