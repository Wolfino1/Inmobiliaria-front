// src/app/core/services/visits.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitsResponse, SaveVisitRequest } from 'src/app/core/models/visits.model';

export interface VisitResponse {
  id: number;
  startDateTime: string; // ISO string
  endDateTime: string;   // ISO string
  houseId: number;
  // ...otros campos si los tuvieras
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

  /**
   * HU-6/HU-7: Guarda un nuevo horario de visita (no es parte directamente de HU-10/11,
   * pero se deja aquí por compatibilidad con saveVisit).
   */
  saveVisit(dto: SaveVisitRequest): Observable<VisitsResponse> {
    return this.http.post<VisitsResponse>(`${this.baseUrl}`, dto);
  }

  /**
   * (Antiguo) Obtiene visitas próximas de una casa en particular (sin filtros de HU-10).
   */
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

  /**
   * HU-10: Obtiene todas las visitas disponibles según filtros (rango de fechas/hora y ubicación),
   * con paginación y orden dinámico.
   *
   * @param page      Número de página (0-based)
   * @param size      Tamaño de página
   * @param sortBy    Campo por el cual ordenar (ej. "startDateTime")
   * @param orderAsc  true para ascendente, false para descendente
   * @param startFrom Fecha/hora mínima de inicio (ISO string), opcional
   * @param startTo   Fecha/hora máxima de inicio (ISO string), opcional
   * @param endFrom   Fecha/hora mínima de fin (ISO string), opcional
   * @param endTo     Fecha/hora máxima de fin (ISO string), opcional
   * @param locationId ID de la ubicación para filtrar, opcional
   */
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

  /**
   * HU-11: Agendar una visita enviando únicamente { visitId }.
   * El backend extrae el buyerId del token.
   */
  scheduleVisit(dto: ScheduleVisitRequest): Observable<VisitsResponse> {
    return this.http.post<VisitsResponse>(
      `${this.baseUrl}/schedule`,
      dto
    );
  }
}
