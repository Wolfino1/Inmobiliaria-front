import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SellerHouse {
  id:  number;
  name: string;
  category: string;
  price: number;
  location: string;
}

@Component({
  selector: 'app-seller-house-table',
  templateUrl: './seller-house-table.component.html',
  styleUrls: ['./seller-house-table.component.scss']
})
export class SellerHouseTableComponent {
  @Input() houses: SellerHouse[] = [];

  @Output() manage = new EventEmitter<number>();

  onManage(id: number): void {
    console.log('[SellerHouseTable] emitir manage con id =', id);
    this.manage.emit(id);
  }
}
