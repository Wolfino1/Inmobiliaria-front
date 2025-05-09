import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../core/models/department.model';
import { City       } from '../../core/models/city.model';
import { Location } from '../../core/models/location.model';
import { PagedResult } from '../../core/models/paged-result.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl = 'http://localhost:8082/api/v1';

  constructor(private http: HttpClient) {}
  
  getAllLocations(page = 0, size = 10): Observable<PagedResult<Location>> {
    return this.http.get<PagedResult<Location>>(
      `${this.baseUrl}/locations?page=${page}&size=${size}`
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department/get`);
  }

  getCitiesByDepartment(departmentId: number): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.baseUrl}/cities/by-department/${departmentId}`
    );
  }

  createLocation(payload: { name: string; idCity: number }): Observable<Location> {
    return this.http.post<Location>(`${this.baseUrl}/locations`, payload);
  }

}


