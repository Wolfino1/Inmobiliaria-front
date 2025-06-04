import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HouseRequest } from '../models/house-request.model';
import { HttpParams } from '@angular/common/http';

import { HouseQueryParams }    from '../models/house-query-params.model';
import { HouseResponse }       from '../models/house-response.model';
import { PagedResult }         from '../models/paged-result.model';
import { SellerHouseQueryParams } from '../models/seller-house-query-params.model';
import { SellerHouse } from '../models/seller-house.model';
import { House }        from 'src/app/core/models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly baseUrl = 'http://localhost:8082/api/v1/house/';

  constructor(private http: HttpClient) {}

  createHouse(request: HouseRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, request);
  }

  getFilteredHouses(params: HouseQueryParams): Observable<PagedResult<HouseResponse>> {
    let httpParams = new HttpParams()
      .set('page',          params.page.toString())
      .set('size',          params.size.toString())
      .set('sortBy',        params.sortBy)
      .set('orderAsc',      params.orderAsc.toString());

    if (params.category)               httpParams = httpParams.set('category',          params.category);
    if (params.location)               httpParams = httpParams.set('location',          params.location);
    if (params.numberOfRooms != null)  httpParams = httpParams.set('numberOfRooms',     params.numberOfRooms.toString());
    if (params.numberOfBathrooms != null) httpParams = httpParams.set('numberOfBathrooms', params.numberOfBathrooms.toString());
    if (params.minPrice != null)       httpParams = httpParams.set('minPrice',          params.minPrice.toString());
    if (params.maxPrice != null)       httpParams = httpParams.set('maxPrice',          params.maxPrice.toString());

    return this.http.get<PagedResult<HouseResponse>>(
      `${this.baseUrl}filters`,
      { params: httpParams }
    );
  }
  getSellerHouses(params: SellerHouseQueryParams): Observable<PagedResult<SellerHouse>> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString())
      .set('orderAsc', (params.orderAsc ?? true).toString());

    if (params.name)      httpParams = httpParams.set('name', params.name);
    if (params.category)  httpParams = httpParams.set('category', params.category);
    if (params.minPrice != null) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.location)  httpParams = httpParams.set('location', params.location);

    return this.http.get<PagedResult<SellerHouse>>(
      `${this.baseUrl}seller/filters`,
      { params: httpParams }
    );
  }
    getHouseById(houseId: number): Observable<House> {
    return this.http.get<House>(`${this.baseUrl}${houseId}`);
  }
}

