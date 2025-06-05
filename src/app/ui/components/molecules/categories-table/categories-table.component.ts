import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Category } from 'src/app/core/services/category.service';

export interface PageEvent {
  page: number;
  size: number;
  orderAsc: boolean;
}

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesTableComponent {
  @Input() categories: Category[] = [];
  @Input() totalElements = 0;

  @Input() page = 0;
  @Input() size = 10;
  @Input() orderAsc = false;

  @Output() pageChange = new EventEmitter<PageEvent>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalElements / this.size));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  changePage(newPage: number): void {
    if (newPage < 0 || newPage >= this.totalPages) return;
    this.pageChange.emit({
      page: newPage,
      size: this.size,
      orderAsc: this.orderAsc
    });
  }

  nextPage(): void {
    this.changePage(this.page + 1);
  }

  prevPage(): void {
    this.changePage(this.page - 1);
  }
}




