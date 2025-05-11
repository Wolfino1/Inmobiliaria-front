import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent {
  searchTerm: string = '';
  
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    this.search.emit(this.searchTerm.trim());
  }
}
