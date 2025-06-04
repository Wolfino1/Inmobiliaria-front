import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from 'src/app/core/services/house.service';
import { SellerHouse } from '../../components/organisms/seller-house-table/seller-house-table.component';
import { PagedResult } from 'src/app/core/models/paged-result.model';
import { SellerHouseQueryParams } from 'src/app/core/models/seller-house-query-params.model';

@Component({
  selector: 'app-my-houses-page',
  templateUrl: './my-houses.component.html',
  styleUrls: ['./my-houses.component.scss']
})
export class MyHousesPageComponent implements OnInit {
  houses: SellerHouse[] = [];
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;
  pages: number[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses(): void {
    this.isLoading = true;
    this.error = null;

    const params: SellerHouseQueryParams = {
      page: this.page,
      size: this.size,
      orderAsc: true
    };

    this.houseService.getSellerHouses(params)
      .subscribe({
    next: (res: PagedResult<SellerHouse>) => {
    console.log('>> Backend me devolvió:', res.content);
    this.houses = res.content;
    this.totalElements = res.totalElements;
    this.totalPages   = Math.ceil(res.totalElements / this.size);
    this.pages        = Array.from({ length: this.totalPages }, (_, i) => i);
    this.isLoading    = false;
  },
        error: () => {
          this.error = 'No se pudieron cargar tus casas';
          this.isLoading = false;
        }
      });
  }

  onManage(id: number): void {
    this.router.navigate(['/propiedades/gestionar-horarios', id]);
  }

  changePage(p: number): void {
    if (p < 0 || p >= this.totalPages) return;
    this.page = p;
    this.loadHouses();
  }
}
