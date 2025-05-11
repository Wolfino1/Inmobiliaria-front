import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { City       } from '../models/city.model';
import { Location } from '../models/location.model';
import { PagedResult } from '../models/paged-result.model';
import { LocationResponse } from '../models/location-response.model';


@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl = 'http://localhost:8082/api/v1';

  constructor(private http: HttpClient) {}
  
  getAllLocations(
    page = 0,
    size = 10,
    orderAsc = false
  ): Observable<PagedResult<LocationResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderAsc', orderAsc.toString());
  
    return this.http.get<PagedResult<LocationResponse>>(
      `${this.baseUrl}/locations/filters`,
      { params }
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department/get`);
  }

  getCitiesByDepartment(departmentId: number): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.baseUrl}/city/by-department/${departmentId}`
    );
  }

  createLocation(payload: { name: string; idCity: number }): Observable<Location> {
    return this.http.post<Location>(`${this.baseUrl}/locations`, payload);
  }
}