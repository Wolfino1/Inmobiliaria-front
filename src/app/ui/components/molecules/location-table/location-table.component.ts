import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocationResponse } from 'src/app/core/models/location-response.model';

export interface PageEvent {
  page: number;
  size: number;
  orderAsc: boolean;
}

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent {
  @Input() locations: LocationResponse[] = [];
  @Input() totalElements = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();

  page = 0;
  size = 10;
  orderAsc = true;
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
    this.pageChange.emit({
      page: this.page,
      size: this.size,
      orderAsc: this.orderAsc
    });
  }
}