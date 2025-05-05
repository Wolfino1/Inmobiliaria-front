// src/app/ui/components/molecules/categories-table/categories-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/services/category.service';

export interface PageEvent {
  page: number;
  size: number;
  orderAsc: boolean;
}

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  /** Recibe el array de categorías del padre */
  @Input() categories: Category[] = [];
  /** Recibe el total de elementos para paginación */
  @Input() totalElements = 0;

  /** Emite un evento con el nuevo estado de paginación */
  @Output() pageChange = new EventEmitter<PageEvent>();

  /** Estado interno de la tabla */
  page = 0;
  size = 10;
  orderAsc = false;

  /** Mensaje de error (si ocurre) */
  errorMessage: string | null = null;

  /** Calcula el total de páginas */
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }

  /** Genera un array de índices de página */
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  /** Cambia a una página específica */
  changePage(newPage: number): void {
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.page = newPage;
    this.emitPage();
  }

  /** Avanza una página */
  nextPage(): void {
    this.changePage(this.page + 1);
  }

  /** Retrocede una página */
  prevPage(): void {
    this.changePage(this.page - 1);
  }

  /** Emite el evento de paginación */
  private emitPage(): void {
    this.pageChange.emit({
      page: this.page,
      size: this.size,
      orderAsc: this.orderAsc
    });
  }
}



