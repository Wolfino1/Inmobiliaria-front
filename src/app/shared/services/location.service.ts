import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../core/models/department.model';
import { City       } from '../../core/models/city.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl = 'http://localhost:8082/api/v1';

  constructor(private http: HttpClient) {}

  /** departamentos */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department/get`);
  }

  /** ciudades de un departamento */
  getCitiesByDepartment(departmentId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/city/by-department/${departmentId}`);
  }

  /** Crea una nueva ubicación */
  createLocation(payload: { name: string; idCity: number }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/locations/`,
      payload
    );
  }
}

