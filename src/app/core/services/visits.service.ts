import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitsResponse, SaveVisitRequest } from 'src/app/core/models/visits.model';

export interface VisitResponse {
  id: number;
  startDateTime: string;
  endDateTime: string
}

export interface VisitFilteredResponse {
  id: number;
  sellerId: number;
  houseId: number;
  startDateTime: string;
  endDateTime: string;
  locationId: number;
}

export interface PagedResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ScheduleVisitRequest {
  visitId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
  private baseUrl = 'http://localhost:8081/api/v1/visits';

  constructor(private http: HttpClient) {}

  saveVisit(dto: SaveVisitRequest): Observable<VisitsResponse> {
    return this.http.post<VisitsResponse>(`${this.baseUrl}`, dto);
  }

  getUpcomingVisitsByHouse(houseId: number): Observable<PagedResult<VisitResponse>> {
    const params = new HttpParams()
      .set('page', '0')
      .set('size', '10')
      .set('sortBy', 'id')
      .set('orderAsc', 'false')
      .set('houseId', houseId.toString());

    return this.http.get<PagedResult<VisitResponse>>(
      `${this.baseUrl}/get`,
      { params }
    );
  }

  getFilteredVisits(
    page: number,
    size: number,
    sortBy: string,
    orderAsc: boolean,
    startFrom?: string,
    startTo?: string,
    endFrom?: string,
    endTo?: string,
    locationId?: number
  ): Observable<PagedResult<VisitFilteredResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('orderAsc', orderAsc.toString());

    if (startFrom)    params = params.set('startFrom', startFrom);
    if (startTo)      params = params.set('startTo', startTo);
    if (endFrom)      params = params.set('endFrom', endFrom);
    if (endTo)        params = params.set('endTo', endTo);
    if (locationId != null) params = params.set('locationId', locationId.toString());

    return this.http.get<PagedResult<VisitFilteredResponse>>(
      `${this.baseUrl}/get`,
      { params }
    );
  }
scheduleVisit(dto: ScheduleVisitRequest): Observable<VisitsResponse> {
  const token = localStorage.getItem('token'); 
  return this.http.post<VisitsResponse>(
      `${this.baseUrl}/schedule`,
      dto,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
  );
}
}
