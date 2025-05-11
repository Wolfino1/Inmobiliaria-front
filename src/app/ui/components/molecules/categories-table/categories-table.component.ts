import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/core/services/category.service';

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
  @Input() categories: Category[] = [];
  @Input() totalElements = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();

  page = 0;
  size = 10;
  orderAsc = false;

  errorMessage: string | null = null;

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  changePage(newPage: number): void {
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.page = newPage;
    this.emitPage();
  }

  nextPage(): void {
    this.changePage(this.page + 1);
  }

  prevPage(): void {
    this.changePage(this.page - 1);
  }

  private emitPage(): void {
    this.pageChange.emit({
      page: this.page,
      size: this.size,
      orderAsc: this.orderAsc
    });
  }
}



