import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HouseService } from 'src/app/core/services/house.service';
import { HouseQueryParams } from 'src/app/core/models/house-query-params.model';
import { HouseResponse }    from 'src/app/core/models/house-response.model';
import { GENERIC_ERROR_LOADING_HOUSE } from 'src/app/shared/errors/constant-error';

@Component({
  selector: 'app-house-table',
  templateUrl: './house-table.component.html',
  styleUrls: ['./house-table.component.scss']
})
export class HouseTableComponent implements OnInit {
  houses: HouseResponse[] = [];
  errorMessage: string | null = null;    
  isLoading = false;

  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;
  pages: number[] = [];

  sortBy = 'numberOfRooms';  
  orderAsc = false;

  constructor(private houseService: HouseService) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  private loadHouses(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const params: HouseQueryParams = {
      page:     this.page,
      size:     this.size,
      sortBy:   this.sortBy,
      orderAsc: this.orderAsc
    };

    this.houseService.getFilteredHouses(params)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: resp => {
          this.houses = resp.content;
          this.totalElements = resp.totalElements;
          this.totalPages = Math.ceil(this.totalElements / this.size);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
        },
        error: () => {
          this.errorMessage = GENERIC_ERROR_LOADING_HOUSE;
        }
      });
  }

  changePage(p: number): void {
    if (p < 0 || p >= this.totalPages) return;
    this.page = p;
    this.loadHouses();
  }

onSortChange(field: string): void {
  if (this.sortBy === field) {
    this.orderAsc = !this.orderAsc;
  } else {
    this.sortBy = field;
    this.orderAsc = true;
  }
  this.page = 0;
  this.loadHouses();
}
}