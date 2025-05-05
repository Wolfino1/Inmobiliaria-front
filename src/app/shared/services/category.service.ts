import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  name: string;
  description?: string;
}
export interface PagedResult<T> {
  content: T[];
  totalElements: number;
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl = 'http://localhost:8082/api/v1/category';

  constructor(private http: HttpClient) {}

/** GET paginado */
getAllCategories(page = 0, size = 10, orderAsc = false)
  : Observable<PagedResult<Category>> {   // <-- aquí usamos el genérico
  return this.http.get<PagedResult<Category>>(
    `${this.baseUrl}/get?page=${page}&size=${size}&orderAsc=${orderAsc}`
  );
}


  /** POST crea una nueva categoría */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/`, category);
  }
}

